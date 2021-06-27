import React from "react"
import { graphql } from "gatsby"
import { Layout, PixivProfile } from "../components"

const ProfilePage = ({ data: { pixivUserNode } }) => (
  <Layout>
    <PixivProfile profile={pixivUserNode} />
  </Layout>
)

export const pageQuery = graphql`
  query ProfileQuery {
    pixivUserNode {
      id
      username
      biography
      data {
        profile {
          total_follow_users
          total_illusts
        }
      }
      localFile {
        childImageSharp {
          gatsbyImageData(
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`

export default ProfilePage
