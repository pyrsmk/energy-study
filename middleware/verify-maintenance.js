export default async ({ store, route, redirect }) => {
    if (process.env.NODE_ENV === 'production'
        && route.path !== '/maintenance'
    ) {
        await store.dispatch('maintenance/verify')
    }
    if (store.state.maintenance.state === true
        && route.path !== '/maintenance'
    ) {
        redirect('/maintenance')
    } else if (store.state.maintenance.state === false
               && route.path === '/maintenance'
    ) {
        redirect('/')
    }
}
