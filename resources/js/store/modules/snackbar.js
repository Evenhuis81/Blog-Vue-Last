export default {
    namespaced: true,
    state: {
        snackbar: false,
        snackText: "",
        // loginLoading: false
    },
    mutations: {
        set_snackbar(state) {
            state.snackbar = !state.snackbar
            setTimeout(() => {
                state.snackbar = !state.snackbar
            }, 2000)
        },
        set_snackbar_text(state, text) {
            state.snackText = text;
        }
    },
    actions: {
        setSnackbar({ commit }) {
            commit('set_snackbar')
        },
        setSnackbarText({ commit }, text) {
            commit('set_snackbar_text', text)
        }
    },
    getters: {
        snackbar(state) {
            return state.snackbar;
        },
        snackText(state) {
            return state.snackText;
        }
    }
}