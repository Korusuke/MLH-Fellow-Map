import React from 'react';
import { graphql } from 'gatsby';
import { ConditionalPortfolioQuery } from '../../graphql-types';
import { Fellow, FellowType } from '../data/fellow-type';
import { githubParser } from '../lib/github';
import PortfolioModal from './PortfolioModal';
import PortfolioPage from './PortfolioPage';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';

// renders a PortfolioModal or PortfolioPage and passes in Fellow data
export default function ConditionalPortfolio({
  data: { mdx, allGithubData, allImageSharp },
}: {
  data: ConditionalPortfolioQuery;
}) {
  if (!mdx?.frontmatter) {
    return <p>{"Can't find MDX Data!"}</p>;
  }

  const githubProfiles = githubParser(
    allGithubData.nodes[0]?.data?.organization?.teams?.edges,
  );

  const fellow = new Fellow(
    mdx.frontmatter as FellowType,
    mdx.body,
    allImageSharp,
    githubProfiles,
  );

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }: { modal: boolean; closeTo: string }) => (
        <div>
          {modal ? (
            <PortfolioModal fellow={fellow} />
          ) : (
            <PortfolioPage fellow={fellow} />
          )}
        </div>
      )}
    </ModalRoutingContext.Consumer>
  );
}

export const pageQuery = graphql`
  query ConditionalPortfolio($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        bio
        github
        lat
        linkedin
        long
        name
        profilepic
        title
        twitter
      }
    }
    allImageSharp {
      nodes {
        fluid(maxHeight: 200, maxWidth: 200) {
          src
          originalName
        }
      }
    }
    allGithubData {
      nodes {
        data {
          organization {
            teams {
              edges {
                node {
                  members {
                    nodes {
                      avatarUrl
                      bio
                      company
                      email
                      followers {
                        totalCount
                      }
                      following {
                        totalCount
                      }
                      login
                      name
                      twitterUsername
                      url
                      websiteUrl
                      location
                    }
                  }
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`;
