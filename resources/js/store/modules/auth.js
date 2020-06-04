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
        remove_token(state, data) {
            localStorage.removeItem('token');
            state.token = data;
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
            // .then(response => {
            //     return response;
            // }).catch(error => {
            //     throw error;
            // })
        },
        login({ commit, dispatch }, credentials) {
            // return new Promise((resolve, reject) => {
            return axios.post("api/auth/login", credentials)
                .then(res => {
                    commit('set_token', res.data.access_token);
                    dispatch('verifyToken', res.data.access_token);
                    return;
                    // resolve(res.data.access_token);
                }).catch(err => {
                    console.log('caught login error');
                    return (err);
                });
            // })
        },
        verifyToken({ commit, rootState }) {
            axios({
                url: 'api/auth/me', method: 'POST'
            }).then(res => {
                commit('set_user', res.data)
            }).catch(() => {
                commit('remove_token');
                commit('set_user', null);
                rootState.router.push("/", () => { });
            })
        },
        logOut({ commit, rootState }) {
            return new Promise((resolve, reject) => {
                axios({
                    url: '/api/auth/logout', method: 'POST'
                }).then(() => {
                    commit('remove_token', null);
                    commit('set_user', null);
                    rootState.router.push("/", () => { });
                    resolve();
                }).catch(err => reject(err))
            }
            )
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