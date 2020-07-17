import * as path from 'path';
import { githubParser } from './src/lib/github';

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
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // create profile pages
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
