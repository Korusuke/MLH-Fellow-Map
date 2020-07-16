require('dotenv').config();

module.exports = {
    plugins: [
        'gatsby-plugin-graphql-codegen', // for typescript GraphQL Typing
        'gatsby-plugin-sass',
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/profiles/images`,
            },
        },
        'gatsby-plugin-react-leaflet',
        // Image Processing using Sharp IMG Utils
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `profiles`,
                path: `${__dirname}/src/profiles`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-mdx`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `MLH Fellows`,
                short_name: `MLH`,
                start_url: `/`,
                background_color: `#acd3de`,
                theme_color: `#acd3de`,
                display: `standalone`,
                icon: `src/assets/images/favicon.ico`,
            },
        },
        {
            resolve: `gatsby-source-github-api`,
            options: {
                // token: required by the GitHub API
                token: process.env.GITHUB_TOKEN,
                // GraphQLquery: defaults to a search query
                graphQLQuery: `
                {
                    organization(login: "MLH-Fellowship") {
                      teams(first: 50) {
                        edges {
                          node {
                            description
                            name
                            id
                            members {
                              nodes {
                                avatarUrl
                                bio
                                email
                                followers {
                                  totalCount
                                }
                                following {
                                  totalCount
                                }
                                location
                                login
                                name
                                twitterUsername
                                url
                                websiteUrl
                                company
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  
                    `,
                // variables: defaults to variables needed for a search query
                variables: {}
            }
        }
    ],
   
};
