export default {
    namespaced: true,
    state: {
        color: '',
        mode: '',
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        timeout: 6000,
        x: null,
        y: 'top',
    },
    mutations: {
        go_snackbar(state, text) {
            state.text = text;
            state.snackbar = !state.snackbar
            setTimeout(() => {
                state.snackbar = !state.snackbar
                state.text = "";
            }, 2000)
        },
        set_snackbar(state, boolean) {
            state.snackbar = boolean
        },
        set_timeout(state, number) {
            state.timeout = number
        }
    },
    actions: {
        goSnackbar({ commit }, text) {
            commit('go_snackbar', text)
        },
        setSnackbar({ commit }, boolean) {
            commit('set_snackbar', boolean)
        },
        setTimeout({ commit }, number) {
            commit('set_timeout', number)
        }
    },
    getters: {
        getSnackbar(state) {
            return state.snackbar;
        },
        snackbar(state) {
            return state.snackbar;
        },
        snackText(state) {
            return state.text;
        },
        color(state) {
            return state.color
        },
        mode(state) {
            return state.mode
        },
        text(state) {
            return state.text
        },
        getTimeout(state) {
            return state.timeout
        },
        x(state) {
            return state.x
        },
        y(state) {
            return state.y
        },
    }
}