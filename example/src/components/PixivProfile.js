import React, { useContext } from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Box, Text, Paragraph, ResponsiveContext } from "grommet"

const Biography = styled(Paragraph)`
  white-space: pre;
`

export const PixivProfile = ({ profile }) => {
  const size = useContext(ResponsiveContext)
  const extraProps =
    size !== `small` ? { style: { gridColumnStart: 2 } } : undefined
  return (
    <Box pad="large" {...extraProps}>
      <Box alignSelf="center" width="small" height="small">
        <GatsbyImage fit="cover" image={getImage(profile.localFile)} alt={profile.username} />
      </Box>
      <Box alignSelf="center" height="small" pad="small">
        <Text>
          <b>@{profile.username}</b>
        </Text>
        <Text>{profile.data.profile.totalFollowUsers} following</Text>
        <Text>{profile.data.profile.totalIllusts} illustrations</Text>
        <Text>{profile.full_name}</Text>
      </Box>
      <Box alignSelf="center" width="medium" wrap>
        <Biography dangerouslySetInnerHTML={{ __html: profile.biography }}></Biography>
      </Box>
    </Box>
  )
}
