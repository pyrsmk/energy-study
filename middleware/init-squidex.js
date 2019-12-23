export default async ({ store }) => {
    if (store.state.maintenance.state === false) {
        await store.dispatch('squidex/init')
    }
}
