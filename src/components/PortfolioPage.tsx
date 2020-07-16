import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { PortfolioPageQuery } from '../../graphql-types';

const shortcodes = { Link }; // Provide common components here

export default function PortfolioPage({
  data: { mdx },
}: {
  data: PortfolioPageQuery;
}) {
  if (!mdx?.frontmatter) {
    return <p>{"Can't find MDX Data!"}</p>;
  }

  return (
    <div>
      <h1>{mdx.frontmatter.name}</h1>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  );
}

export const pageQuery = graphql`
  query PortfolioPage($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        name
      }
    }
  }
`;
