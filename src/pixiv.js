const pixivAppApi = require("pixiv-api-client")

export async function getUserDetail({ refreshToken, user_id }) {
  const pixiv = new pixivAppApi()
  await pixiv.refreshAccessToken(refreshToken)
  return pixiv.userDetail(user_id)
}

export async function getUserIllusts({ refreshToken, user_id, maxArtworks }) {
  const pixiv = new pixivAppApi()
  await pixiv.refreshAccessToken(refreshToken)
  let json = await pixiv.userIllusts(user_id)
  let hasNext = !!json.next_url
  let illusts = json.illusts
  while (hasNext && maxArtworks && illusts.length >= maxArtworks) {
    json = await pixiv.requestUrl(json.next_url)
    hasNext = !!json.next_url
    illusts = illusts.concat(json.illusts)
  }
  return illusts.splice(0, maxArtworks || illusts.length)
}

export async function getUserBookmarksIllust({
  refreshToken,
  user_id,
  maxArtworks,
}) {
  const pixiv = new pixivAppApi()
  await pixiv.refreshAccessToken(refreshToken)
  let json = await pixiv.userBookmarksIllust(user_id)
  let hasNext = !!json.next_url
  let illusts = json.illusts
  while (hasNext && maxArtworks && illusts.length >= maxArtworks) {
    json = await pixiv.requestUrl(json.next_url)
    hasNext = !!json.next_url
    illusts = illusts.concat(json.illusts)
  }
  return illusts.splice(0, maxArtworks || illusts.length)
}
