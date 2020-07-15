import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';

const shortcodes = { Link }; // Provide common components here

export default function PortfolioPage({ data: { mdx } }) {
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
  query PortfolioPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        name
      }
    }
  }
`;
