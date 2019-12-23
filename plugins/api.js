export default ({ app }, inject) => {
    // Get modules from app
    const {
        $axios,
        $cache,
        store: $store,
        router: $router
    } = app

    /*
        Handle errors
    */
    $axios.onError(error => {
        // Network error
        if ('response' in error === false || error.response === undefined) {
            throw new Error(
                "Vous êtes déconnecté d'internet. "
                + "Merci de renouveler l'opération ultérieurement."
            )
        // The token is not valid anymore, reset it
        } else if (error.response.status === 401) {
            $store.dispatch('squidex/reset').then(() => {
                $router.go()
            })
        // Squidex error
        } else if (error.response.status === 400 && 'data' in error.response) {
            const { message, details } = error.response.data
            throw new Error(`${message}<br>${details.join('<br>')}`)
        }
    })

    /**
     * Format params to a query string
     * @param {Object} params
     * @return {String}
     */
    const query = (params) => {
        const data = new URLSearchParams()
        for (const name in params) { // eslint-disable-line
            data.append(name, params[name])
        }
        const str = data.toString()
        return str ? `?${str}` : ''
    }

    const API = {
        /**
         * Send a GET request
         * @param {String} route
         * @param {Object} params
         * @return {Promise}
         */
        get(route, params = {}) {
            // Prepare URL
            const url = `${route}${query(params)}`
            // Request lambda
            const request = () => $axios.$get(url)
            // Send and cache the request
            return $cache(url, request).then(response => {
                // Cache all further items from the response
                if ('items' in response) {
                    for (const item of response.items) {
                        $cache(`${route}/${item.id}`, async () => item)
                    }
                }
                return response
            })
        },
        /**
         * Send a POST request
         * @param {String} route
         * @param {Object} data
         * @return {Promise}
         */
        post(route, data) {
            return $axios.$post(route, data)
        },
        /**
         * Send a PUT request
         * @param {String} route
         * @param {Object} data
         * @return {Promise}
         */
        put(route, data) {
            return $axios.$put(route, data)
        },
        /**
         * Send a DELETE request
         * @param {String} route
         * @return {Promise}
         */
        delete(route) {
            return $axios.$delete(route)
        },
    }

    // Declare API module
    inject('api', API)
    app.store.$api = API
}
