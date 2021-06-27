require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "gatsby-source-pixiv-example",
    author: "poipoii"
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: require.resolve("../"),
      options: {
        refreshToken: process.env.REFRESH_TOKEN,
        type: "user-profile",
        user_id: 19859044,
      },
    },
    {
      resolve: require.resolve("../"),
      options: {
        refreshToken: process.env.REFRESH_TOKEN,
        type: "illusts",
        user_id: 19859044,
        maxArtworks: 100,
      },
    }
  ],
}
