/* eslint-disable camelcase */
const pixivAppApi = require('pixiv-app-api')

export async function getUserDetail({ username, password, user_id }) {
    const pixiv = new pixivAppApi(username, password, {
        camelcaseKeys: true
    })
    await pixiv.login()
    return pixiv.userDetail(user_id)
}

export async function getUserIllusts({ username, password, user_id }) {
    const pixiv = new pixivAppApi(username, password, {
        camelcaseKeys: true
    })
    await pixiv.login()
    let json = await pixiv.userIllusts(user_id)
    let hasNext = pixiv.hasNext()
    let illusts = json.illusts
    while (hasNext) {
      json = await pixiv.next()
      hasNext = pixiv.hasNext()
      illusts = illusts.concat(json.illusts)
    }
    return illusts
}

export async function getUserBookmarksIllust({ username, password, user_id }) {
    const pixiv = new pixivAppApi(username, password, {
        camelcaseKeys: true
    })
    await pixiv.login()
    let json = await pixiv.userBookmarksIllust(user_id)
    let hasNext = pixiv.hasNext()
    let illusts = json.illusts
    while (hasNext) {
      json = await pixiv.next()
      hasNext = pixiv.hasNext()
      illusts = illusts.concat(json.illusts)
    }
    return illusts
}
