export default {
    namespaced: true,
    state: {
        navigationDrawer: true,
    },
    mutations: {
        set_navigation_drawer(state) {
            state.navigationDrawer = !state.navigationDrawer
        }
    },
    actions: {
        setNavigationDrawer({ commit }) {
            commit('set_navigation_drawer');
        },
    },
    getters: {
        getNavigationDrawer: state => {
            return state.navigationDrawer
        },
    }
}
