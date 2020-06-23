export default {
    namespaced: true,
    state: {
        navigationDrawer: true,
    },
    mutations: {
        set_navigation_drawer(state, boolean) {
            state.navigationDrawer = boolean
        },
        switch_navigation_drawer(state) {
            state.navigationDrawer = !state.navigationDrawer
        }
    },
    actions: {
        setNavigationDrawer({ commit, boolean }) {
            commit('set_navigation_drawer', boolean)
        },
        switchNavigationDrawer({ commit }) {
            commit('switch_navigation_drawer')
        },
    },
    getters: {
        getNavigationDrawer: state => {
            return state.navigationDrawer
        },
    }
}
