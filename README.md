<div align="center">
<h1>gatsby-source-pixiv</h1>

[![npm version](https://badge.fury.io/js/gatsby-source-pixiv.svg)](https://www.npmjs.com/package/gatsby-source-pixiv)
[![npm](https://img.shields.io/npm/dw/gatsby-source-pixiv.svg)](https://www.npmjs.com/package/gatsby-source-pixiv)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![NPM](https://img.shields.io/npm/l/gatsby-source-pixiv.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/fb6813a0-085c-4059-ace5-0a644ee57b13/deploy-status)](https://gatsby-source-pixiv.netlify.app/)
</div>

Source plugin for sourcing data from Pixiv.

# Demos

[gatsby-source-pixiv.netlify.app](https://gatsby-source-pixiv.netlify.app)

# Table of Contents

- [Install](#install)
- [How to use](#how-to-use)
  - [How to get the refreshToken](#how-to-get-the-refreshtoken)
  - [API for illustrations](#api-for-illustrations)
  - [API for a user's profile](#api-for-a-users-profile)
- [How to query](#how-to-query)
  - [Illustrations](#illustrations)
  - [User profile information](#user-profile-information)
- [Image processing](#image-processing)

## Install

`npm install --save gatsby-source-pixiv`

## How to use

### How to get the refreshToken

Follow this steps: https://gist.github.com/ZipFile/c9ebedb224406f4f11845ab700124362#file-pixiv_auth-py

### API for illustrations

If you want to get all illustrations then you need to pass the concerning user ID (e.g. [https://www.pixiv.net/users/19859044](https://www.pixiv.net/users/19859044)).


```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-pixiv`,
    options: {
      refreshToken: process.env.REFRESH_TOKEN,
      type: 'illusts',
      user_id: 19859044,
      maxArtworks: 100,
    },
  },
]
```

The `maxArtworks` parameter enables us to limit the maximum number of the artwork we will store. Defaults to undefined (no limit).

### API for a user's profile

If you want to source a user's profile from their user ID then you need the following:

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-pixiv`,
    options: {
      refreshToken: process.env.REFRESH_TOKEN,
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
```

## Image processing

To use image processing you need gatsby-transformer-sharp, gatsby-plugin-sharp and their dependencies gatsby-image and gatsby-source-filesystem in your gatsby-config.js.

You can apply image processing on each pixiv node. To access image processing in your queries you need to use the localFile on the **PixivNode** as shown above.
