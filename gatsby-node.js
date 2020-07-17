const { githubParser } = require('./src/lib/github');
const path = require('path');
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

const options = {
  provider: 'opencage',

  apiKey: process.env.OPEN_CAGE_API_KEY, // for Mapquest, OpenCage, Google Premier
};

const geocoder = NodeGeocoder(options);

// Using callback

const githubQuery = `
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
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }`;

let addedNode = false;
export const onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'GithubData' && !addedNode) {
    let memberLocationMap = {};
    node.data.organization.teams.edges.forEach(({ node: team }) => {
      team.members.nodes.forEach((member) => {
        memberLocationMap[member.login] = member.location;
      });
    });
    const entries = Object.entries(memberLocationMap);
    const geocodeResult = await geocoder.batchGeocode(
      entries.map((entry) => entry[1]),
    );

    const ret = entries.map((entry, i) => {
      const value = geocodeResult[i].value ? geocodeResult[i].value[0] : {};
      return {
        name: entry[0],
        long: value && value.longitude,
        lat: value && value.latitude,
      };
    });
    console.log(ret);
    createNodeField({
      node,
      name: 'memberLocationMap',
      value: ret,
    });
    addedNode = true;
  }
};

export const createPages = async ({ graphql, actions, reporter }) => {
  // destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
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
      (node) =>
        node.frontmatter.github.toLowerCase() ===
        profile.username.toLowerCase(),
    );

    createPage({
      // slug that is created before
      path: profile.username,
      // this component will wrap the MDX content
      component: path.resolve(`./src/components/ConditionalPortfolio.tsx`),
      // values here are made available to graphql
      context: { id: mdxNode ? mdxNode.id : null, githubProfile: profile },
    });
  });
};
