export default {
    namespaced: true,
    state: {
        snackbar: false,
        snackText: "",
    },
    mutations: {
        set_snackbar(state, text) {
            state.snackText = text;
            state.snackbar = !state.snackbar
            setTimeout(() => {
                state.snackbar = !state.snackbar
                state.snackText = "";
            }, 2000)
        },  
    },
    actions: {
        setSnackbar({ commit }, text) {
            commit('set_snackbar', text)
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