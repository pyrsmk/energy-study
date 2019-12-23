import maintenance from '~/config/maintenance.json'

export const state = () => {
    return {
        state: false
    }
}

export const mutations = {
    set(state, underMaintenance) {
        state.state = underMaintenance
    }
}

export const actions = {
    async verify({ commit }) {
        commit(
            'set',
            await (await fetch(maintenance.endpoint)).json()
        )
    },
}
