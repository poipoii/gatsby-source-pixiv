import React from "react"
import { graphql } from "gatsby"
import { Layout, Container } from "../components"

const IndexPage = ({ data: { allPixivNode } }) => (
  <Layout>
    <Container
      title="Gatsby-source-pixiv"
      text="The Gatsby-source-pixiv allows you to pull in all the available Pixiv artworks
      from a specific account using an refreshToken"
      nodes={allPixivNode}
    />
  </Layout>
)

export const pageQuery = graphql`
  query IndexQuery {
    allPixivNode(sort: {fields: timestamp, order: DESC}) {
      edges {
        node {
          id
          totalBookmarks
          totalComments
          totalView
          title
          caption
          localFile {
            childImageSharp {
              gatsbyImageData (
                width: 600,
                height: 600,
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`

export default IndexPage
