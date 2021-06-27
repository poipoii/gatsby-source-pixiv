import React, { useContext } from "react"
import { Box, Heading, Text, ResponsiveContext } from "grommet"
import { Helmet } from "react-helmet"
import { PixivPosts } from "."
import favicon from "../images/icon.png"

export const Container = ({ title, text, nodes }) => {
  const size = useContext(ResponsiveContext)
  const extraProps =
    size !== `small` ? { style: { gridColumnStart: 2 } } : undefined
  return (
    <Box {...extraProps}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={text} />
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <Box background="white">
        <Heading alignSelf="center" level="4">
          {title}
        </Heading>
        <Box pad="small" width="large" alignSelf="center">
          <Text margin={{ bottom: `medium` }}>{text}</Text>
        </Box>
      </Box>

      <PixivPosts nodes={nodes} />
    </Box>
  )
}
