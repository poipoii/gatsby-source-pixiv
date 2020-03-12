require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `gatsby-source-pixiv-exaple`,
    author: `poipoii`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-pixiv`,
      options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        type: 'user-profile',
        user_id: 19859044,
      },
    },
    {
      resolve: `gatsby-source-pixiv`,
      options: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        type: 'illusts',
        user_id: 19859044,
      },
    }
  ],
}
