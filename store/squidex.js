import cookie from 'js-cookie'
import squidex from '~/config/squidex.json'

export const state = () => {
    return {
        token: cookie.get('token') || null,
    }
}

export const mutations = {
    define(state, token) {
        state.token = token
    }
}

export const actions = {
    async init({ state, commit }) {
        if (!state.token) {
            const data = new URLSearchParams()
            data.append('grant_type', 'client_credentials')
            data.append('client_id', squidex.client_id)
            data.append('client_secret', squidex.client_secret)
            data.append('scope', 'squidex-api')
            const response = await this.$axios.$post(
                '/identity-server/connect/token',
                data,
                {
                    baseURL: squidex.host,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            commit('define', response.access_token)
            // Expire before Squidex token (TTL: 30 days)
            cookie.set('token', response.access_token, { expires: 20 })
        }
        this.$axios.setToken(state.token, 'Bearer')
    },
    async reset({ commit, dispatch }) {
        cookie.remove('token')
        commit('define', null)
        this.$axios.setToken(false)
        await dispatch('init')
    }
}
