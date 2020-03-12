<div align="center">
<h1>gatsby-source-pixiv</h1>

[![npm version](https://badge.fury.io/js/gatsby-source-pixiv.svg)](https://badge.fury.io/js/gatsby-source-pixiv)
![npm](https://img.shields.io/npm/dw/gatsby-source-pixiv.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

Source plugin for sourcing data from Pixiv.

# Table of Contents

- [Install](#install)
- [How to use](#how-to-use)
  - [API for illustrations](#api-for-illustrations)
  - [API for a user's profile](#api-for-a-users-profile)
- [How to query](#how-to-query)
  - [Illustrations](#illustrations)
  - [User profile information](#user-profile-information)
- [Image processing](#image-processing)

## Install

`npm install --save gatsby-source-pixiv`

## How to use

### API for illustrations

If you want to get all illustrations then you need to pass the concerning user ID (e.g. [https://www.pixiv.net/users/19859044](https://www.pixiv.net/users/19859044)).


```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-pixiv`,
    options: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      type: 'illusts',
      user_id: 19859044,
    },
  },
]
```

### API for a user's profile

If you want to source a user's profile from their user ID then you need the following:

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-pixiv`,
    options: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      type: `user-profile`,
      user_id: 19859044,
    },
  },
]
```

## How to query

### Illustrations

The plugin tries to provide uniform results regardless of the way you choose to retrieve the information

Common fields include:

- id
- totalBookmarks
- totalComments
- totalView
- original
- timestamp
- title
- caption
- user (contains user_id_, name, ...)
- preview
- mediaType
- tags
- tools

```graphql
query {
  allPixivNode {
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
```

### User profile information

Fields include:

- id
- username
- biography
- profile_pic_url
- background_pic_url
- data

```graphql
query {
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
```

## Image processing

To use image processing you need gatsby-transformer-sharp, gatsby-plugin-sharp and their dependencies gatsby-image and gatsby-source-filesystem in your gatsby-config.js.

You can apply image processing on each pixiv node. To access image processing in your queries you need to use the localFile on the **PixivNode** as shown above.
