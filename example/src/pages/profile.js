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
          totalFollowUsers
          totalIllusts
        }
      }
      localFile {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export default ProfilePage
