const crypto = require(`crypto`)
const normalize = require(`./normalize`)
const {
  getUserDetail,
  getUserIllusts,
} = require(`./pixiv`)

const defaultOptions = {
  type: `user-profile`,
  paginate: 100,
}

async function getPixivUser(options) {
  return [await getUserDetail(options)]
}

async function getIllustsPosts(options) {
  return await getUserIllusts(options)
}

function createPostNode(datum, params) {
  return {
    type: params.type,
    user: datum.user,
    id: `${datum.id}`,
    parent: `__SOURCE__`,
    internal: {
      type: `PixivNode`,
    },
    title: datum.title,
    caption: datum.caption,
    thumbnails: datum.imageUrls,
    metaPages: datum.metaPages,
    mediaType: datum.type,
    preview: datum.imageUrls.squareMedium || datum.imageUrls.medium || datum.imageUrls.large,
    original: datum.display_url || datum.media_url,
    timestamp: new Date(datum.createDate).getTime() / 1000,
    tools: datum.tools,
    tags: datum.tags.map(t => t.name),
    totalBookmarks: datum.totalBookmarks,
    totalComments: datum.totalComments,
    totalView: datum.totalView,
  }
}

function createUserNode(datum, params) {
  return {
    type: params.type,
    id: `${datum.user.id}`,
    username: datum.user.name,
    biography: datum.user.comment,
    profile_pic_url: datum.user.profileImageUrls.medium,
    background_pic_url: datum.profile.backgroundImageUrl,
    data: datum,
    internal: {
      type: `PixivUserNode`,
    },
  }
}

function processDatum(datum, params) {
  const node =
    params.type === `user-profile`
      ? createUserNode(datum, params)
      : createPostNode(datum, params)

  // Get content digest of node. (Required field)
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)

  node.internal.contentDigest = contentDigest
  return node
}

exports.sourceNodes = async (
  { actions, store, cache, createNodeId },
  options
) => {
  const { createNode, touchNode } = actions
  const params = { ...defaultOptions, ...options }

  let data
  if (params.type === `illusts`) {
    data = await getIllustsPosts(params)
  } else if (params.type === `user-profile`) {
    data = await getPixivUser(params)
  } else {
    console.warn(`Unknown type for gatsby-source-pixiv: ${params.type}`)
  }

  // Process data into nodes.
  if (data) {
    return Promise.all(
      data.map(async datum => {
        const res = await normalize.downloadMediaFile({
          datum: processDatum(datum, params),
          store,
          cache,
          createNode,
          createNodeId,
          touchNode,
        })
        createNode(res)
      })
    )
  }
}
