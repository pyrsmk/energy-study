const items = {}

const cache = async (key, promise) => {
    if (key in items === false) {
        items[key] = {
            value: await promise(),
            promise: promise()
        }
    }
    return items[key].promise
}

export default ({ app }, inject) => {
    inject('cache', cache)
    app.store.$cache = cache
}
