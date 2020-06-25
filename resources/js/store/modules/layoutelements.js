export default {
    namespaced: true,
    state: {
        navigationDrawer: true,
        appBarNavIcon: false,
    },
    mutations: {
        set_navigation_drawer(state, boolean) {
            state.navigationDrawer = boolean
        },
        switch_navigation_drawer(state) {
            state.navigationDrawer = !state.navigationDrawer
        },
        set_app_bar_nav_icon(state, boolean) {
            state.appBarNavIcon = boolean
        }
    },
    actions: {
        setNavigationDrawer({ commit }, boolean) {
            commit('set_navigation_drawer', boolean)
        },
        switchNavigationDrawer({ commit }) {
            commit('switch_navigation_drawer')
        },
        setAppBarNavIcon({ commit }, boolean) {
            commit('set_app_bar_nav_icon', boolean)
        },
    },
    getters: {
        getNavigationDrawer: state => {
            return state.navigationDrawer
        },
        getAppBarNavIcon: state => {
            return state.appBarNavIcon
        },
    }
}
