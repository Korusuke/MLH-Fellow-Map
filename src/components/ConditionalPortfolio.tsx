import React from 'react';
import { graphql } from 'gatsby';
import { ConditionalPortfolioQuery } from '../../graphql-types';
import { Fellow, FellowType } from '../data/fellow-type';
import { githubParser, GithubProfile } from '../lib/github';
import PortfolioModal from './PortfolioModal';
import PortfolioPage from './PortfolioPage';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';

// renders a PortfolioModal or PortfolioPage and passes in Fellow data
export default function ConditionalPortfolio({
  data: { mdx, allImageSharp },
  pageContext: { githubProfile },
}: {
  data: ConditionalPortfolioQuery;
  pageContext: { id?: string; githubProfile: GithubProfile };
}) {
  const fellow = new Fellow(
    githubProfile,
    allImageSharp,
    mdx?.frontmatter,
    mdx?.body,
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
  }
`;
