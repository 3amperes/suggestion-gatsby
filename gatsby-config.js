module.exports = {
  siteMetadata: {
    title: `Suggestion`,
    description: `desc`,
    author: `@wabdesign`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "b5kn4cib",
        dataset: "staging",
        token:
          "skaVhk93yfvMqEYLiY1qG5UcisMMaDHdsTHA8UNlHSlFdAuAQWzOM6mLM89Vw2ldsfBMb6VA7UI54JojAt9SN1RgjbrKhSM7IsBiCiVWVlO8PKhdH61qCKyxPij7EvzZxDZHJ6sQ9zriQhRUj8Dtyd7YWoWNSRpsQx6ahotZ7JBApXr29jNU",

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
