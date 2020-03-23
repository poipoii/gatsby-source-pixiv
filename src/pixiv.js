const pixivAppApi = require("pixiv-app-api")

export async function getUserDetail({ username, password, user_id }) {
  const pixiv = new pixivAppApi(username, password, {
    camelcaseKeys: true,
  })
  await pixiv.login()
  return pixiv.userDetail(user_id)
}

export async function getUserIllusts({
  username,
  password,
  user_id,
  maxArtworks,
}) {
  const pixiv = new pixivAppApi(username, password, {
    camelcaseKeys: true,
  })
  await pixiv.login()
  let json = await pixiv.userIllusts(user_id)
  let hasNext = pixiv.hasNext()
  let illusts = json.illusts
  while (hasNext && maxArtworks && illusts.length >= maxArtworks) {
    json = await pixiv.next()
    hasNext = pixiv.hasNext()
    illusts = illusts.concat(json.illusts)
  }
  return illusts.splice(0, maxArtworks || illusts.length)
}

export async function getUserBookmarksIllust({
  username,
  password,
  user_id,
  maxArtworks,
}) {
  const pixiv = new pixivAppApi(username, password, {
    camelcaseKeys: true,
  })
  await pixiv.login()
  let json = await pixiv.userBookmarksIllust(user_id)
  let hasNext = pixiv.hasNext()
  let illusts = json.illusts
  while (hasNext && maxArtworks && illusts.length >= maxArtworks) {
    json = await pixiv.next()
    hasNext = pixiv.hasNext()
    illusts = illusts.concat(json.illusts)
  }
  return illusts.splice(0, maxArtworks || illusts.length)
}
