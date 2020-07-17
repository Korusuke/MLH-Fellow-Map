/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path';
import { githubParser } from './src/lib/github';
import { githubQuery } from './src/data/fellow-type';

//let changedIndex = false;
/*export const onCreatePage = async ({ page, actions, graphql }: any) => {
  const { createPage, deletePage } = actions;

  if (page.path === '/' && !changedIndex) {
    const result: any = await graphql(githubQuery);
    console.log(result.data.allGithubData);

    deletePage(page);
    createPage({ ...page, context: { ...page.context, hello: 'world' } }); //todo input location data
    changedIndex = true;
  }
};*/

export const onCreateNode = ({ node, getNode, actions }: any) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'GithubData') {
    console.log(JSON.stringify(node));
    createNodeField({
      node,
      name: 'test',
      value: ['hellow', 'world!'],
    });
  }
};

export const createPages = async ({ graphql, actions, reporter }: any) => {
  // destructure the createPage function from the actions object
  const { createPage } = actions;
  const result: any = await graphql(`
    query PageCreation {
      allMdx {
        nodes {
          id
          frontmatter {
            github
          }
        }
      }
      ${githubQuery}
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // create profile pages
  // setfields on graphql node type
  //createResolvers
  const profiles = result.data.allMdx.nodes;
  const githubProfiles = githubParser(result.data.allGithubData.nodes[0].data);

  githubProfiles.forEach((profile) => {
    const mdxNode = profiles.find(
      (node: any) =>
        node.frontmatter.github.toLowerCase() ===
        profile.username.toLowerCase(),
    );

    createPage({
      // slug that is created before
      path: profile.username,
      // this component will wrap the MDX content
      component: path.resolve(`./src/components/ConditionalPortfolio.tsx`),
      // values here are made available to graphql
      context: { id: mdxNode?.id, githubProfile: profile },
    });
  });
};
