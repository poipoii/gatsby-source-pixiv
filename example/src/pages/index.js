import React from "react"
import { graphql } from "gatsby"
import { Layout, Container } from "../components"

const IndexPage = ({ data: { allPixivNode } }) => (
  <Layout>
    <Container
      title="Pixiv API"
      text="The Pixiv API allows you to pull in all the available Pixiv artworks
      from a specific account using an username password"
      nodes={allPixivNode}
    />
  </Layout>
)

export const pageQuery = graphql`
  query IndexQuery {
    allPixivNode(filter: {user: {id: {eq: 19859044}}}) {
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
              fluid(quality: 70, maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
