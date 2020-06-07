// import router from '../../plugins/router.js'

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token'),
        user: null,
        buttonLoading: false
    },
    mutations: {
        set_token(state, token) {
            localStorage.setItem('token', token);
            state.token = token;
        },
        set_user(state, data) {
            state.user = data;
        },
        remove_token(state) {
            localStorage.removeItem('token');
            state.token = "";
        },
        // set_login_dialog(state) {
        //     state.loginDialog = !state.loginDialog;
        // },
        // set_loading_dialog(state) {
        //     state.loadingDialog = !state.loadingDialog;
        // }
        set_button_loading(state) {
            state.buttonLoading = !state.buttonLoading;
        },
        // deset_log_load(state) {
        //     state.loginLoading = false;
        // },
        // close_signedin_dialog(state) {
        //     state.signedInDialog = false;
        // }

    },
    actions: {
        setButtonLoading({ commit }) {
            commit('set_button_loading');
        },
        register({ }, credentials) {
            return axios.post("api/auth/register", credentials)
        },
        login({ commit }, credentials) {
            return axios.post("api/auth/login", credentials)
                .then(response => {
                    commit('set_token', response.data.access_token);
                    commit('set_user', response.data.user);
                    return response.data.user.role;
                    // return;
                }).catch(error => {
                    // if 401 or 429 resp.data.status
                    throw error.response.data.errors;
                });
            // })
        },
        verifyToken({ commit, rootState }, token) {
            axios.get('api/auth/details', { headers: { 'Authorization': 'Bearer ' + token }
                }).then(response => {
                    console.log(response);
                commit('set_user', response.data)
                }).catch(error => {
                console.log(error);
                    commit('remove_token');
                    commit('set_user', null);
                    rootState.router.push("/", () => { });
            })
        },
        logOut({ commit, rootState }) {
            axios.get('api/auth/logout', { headers: { 'Authorization': 'Bearer ' + token }
            }).then(() => {
                commit('remove_token', null);
                commit('set_user', null);
                return;
            }).catch(err => {
                throw err;
            })
        },
        // if (!state.token) {
        //     commit('set_initialToken')
        // commit('set_token', null)
        // commit('set_user', null)
        // return;
        // }

        // try {
        //     let response = axios.post('api/auth/me')
        //     commit('set_user', response.data)
        // } catch (e) {
        //     commit('set_token', null)
        //     commit('set_user', null)
        // }
        // axios.get('api/auth/me')
        //     .then(response => {
        //         commit('set_user', response.data)
        //         // commit('deset_log_load')
        //         // only show dialog when firstly signed in
        //         // commit("open_signedin_dialog")
        //         // console.log(response)
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         commit('set_token', null)
        //         commit('set_user', null)
        //         // commit('deset_log_load')
        //     })
    },
    getters: {
        unverifiedToken(state) {
            return (state.token && !state.user) ? state.token : false;
        },
        // signedInDialog(state) {
        //     return state.signedInDialog;
        // },
        // loggedInSnackbar(state) {
        //     return state.loggedInSnackbar
        // },
        authenticated(state) {
            // if (state.token === 'unset' && state.user === 'unset') { return 'unset' }
            // else if (!state.token && !state.user) { return 'out' }
            // else return 'in'
            return state.token && state.user;
        },
        // user(state) {
        //     return state.user;
        // },
        buttonLoading: state => {
            return state.buttonLoading;
        },
        // registerLoading: state => {
        //     return state.registerLoading;
        // }
    }
}