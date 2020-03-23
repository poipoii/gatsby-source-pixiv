require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `gatsby-source-pixiv-example`,
    author: `poipoii`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: require.resolve(`../`),
      options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        type: 'user-profile',
        user_id: 19859044,
      },
    },
    {
      resolve: require.resolve(`../`),
      options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        type: 'illusts',
        user_id: 19859044,
        maxArtworks: 100,
      },
    }
  ],
}
