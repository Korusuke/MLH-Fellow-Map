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
    `gatsby-plugin-mdx`,
  ],
};
