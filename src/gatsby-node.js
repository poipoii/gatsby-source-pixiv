const crypto = require(`crypto`)
const normalize = require(`./normalize`)
const { getUserDetail, getUserIllusts } = require(`./pixiv`)

const defaultOptions = {
  type: `user-profile`,
  maxArtworks: undefined,
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
    thumbnails: datum.image_urls,
    metaPages: datum.meta_pages,
    mediaType: datum.type,
    preview:
      datum.image_urls.large ||
      datum.image_urls.medium ||
      datum.image_urls.square_medium,
    original: datum.display_url || datum.media_url,
    timestamp: new Date(datum.create_date).getTime() / 1000,
    tools: datum.tools,
    tags: datum.tags.map((t) => t.name),
    totalBookmarks: datum.total_bookmarks,
    totalComments: datum.total_comments,
    totalView: datum.total_view,
  }
}

function createUserNode(datum, params) {
  return {
    type: params.type,
    id: `${datum.user.id}`,
    username: datum.user.name,
    biography: datum.user.comment,
    profile_pic_url: datum.user.profile_image_urls.medium,
    background_pic_url: datum.profile.background_image_url,
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
      data.map(async (datum) => {
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
