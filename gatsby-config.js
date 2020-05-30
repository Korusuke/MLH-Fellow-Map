module.exports = {
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    'gatsby-plugin-react-leaflet',
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
  ],
};
