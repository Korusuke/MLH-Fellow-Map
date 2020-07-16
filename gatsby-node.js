const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // only operate on `Mdx` nodes.
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      // name of the field added
      name: 'slug',
      // individual MDX node
      node,
      // generated value for filepath
      value: value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              github
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // create profile pages
  const profiles = result.data.allMdx.edges;
  // call `createPage` for each result
  profiles.forEach(({ node }) => {
    createPage({
      // slug that is created before
      path: node.frontmatter.github,
      // this component will wrap the MDX content
      component: path.resolve(`./src/components/ConditionalPortfolio.tsx`),
      // values here are made available to graphql
      context: { id: node.id },
    });
  });
};
