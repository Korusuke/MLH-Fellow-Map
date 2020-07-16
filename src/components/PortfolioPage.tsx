import React from 'react';
import { graphql } from 'gatsby';
import { PortfolioPageQuery } from '../../graphql-types';
import { Fellow, FellowType } from '../data/fellow-type';
import { githubParser } from '../lib/github';
import PortfolioModal from './PortfolioModal';

export default function PortfolioPage({
  data: { mdx, allGithubData, allImageSharp },
}: {
  data: PortfolioPageQuery;
}) {
  if (!mdx?.frontmatter) {
    return <p>{"Can't find MDX Data!"}</p>;
  }
  const githubProfiles = githubParser(allGithubData.nodes[0].data);
  const fellow = new Fellow(
    mdx.frontmatter as FellowType,
    mdx.body,
    allImageSharp,
    githubProfiles,
  );

  return <PortfolioModal fellow={fellow} />;
}

export const pageQuery = graphql`
  query PortfolioPage($id: String) {
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
        fluid(maxHeight: 100, maxWidth: 100) {
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
