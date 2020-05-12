export default {
    namespaced: true,
    state: {
        loginDialog: false,
        loadingDialog: false,
        // signedInDialog: false,
        // loggedInSnackbar: false,
        loginLoading: false,
        registerLoading: false,
        token: localStorage.getItem('token'),
        user: null
    },
    mutations: {
        // open_signedin_dialog(state) {
        //     state.signedInDialog = true
        // },
        // openSnackbar(state) {
        //     state.loggedInSnackbar = true
        // },
        // closeSnackbar(state) {
        //     state.loggedInSnackbar = false
        // },
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
        set_login_dialog(state) {
            state.loginDialog = !state.loginDialog;
        },
        set_loading_dialog(state) {
            state.loadingDialog = !state.loadingDialog;
        }
        // set_log_load(state) {
        //     state.loginLoading = true;
        // },
        // deset_log_load(state) {
        //     state.loginLoading = false;
        // },
        // close_signedin_dialog(state) {
        //     state.signedInDialog = false;
        // }

    },
    actions: {
        setLoadingDialog({ commit }) {
            commit('set_loading_dialog');
        },
        setLoginDialog({ commit }) {
            commit('set_login_dialog');
        },
        // setFakeUser({ commit }) {
        //     commit('set_fake_user')
        // },
        // closeSignedInDialog({ commit }) {
        //     commit("close_signedin_dialog")
        // },
        // openSignedInDialog({ commit }) {
        //     commit("open_signedin_dialog");
        // },
        // setLoginLoading({ commit }) {
        //     commit('set_log_load');
        // },
        login({ dispatch }, credentials) {
            axios.post("api/auth/login", credentials).then(response => dispatch('verifyToken', response.data.access_token))
        },
        verifyToken({ commit }, token) {
            commit('set_token', token);

            axios({
                url: 'api/auth/me', method: 'POST', headers: { 'Authorization': 'Bearer ' + token }
            }).then(response => {
                commit('set_user', response.data)
            }).catch(e => {
                console.log(e)
                commit('remove_token')
                commit('set_user', null)
            })
        },
        logOut({ commit }) {
            // axios({ url: '/api/auth/logout', method: 'POST' })
            //     .then(() => {
            //         commit('remove_token', null)
            //         commit('set_user', null)
            //             .catch(e => {
            //                 console.log(e);
            //             })
            //     });
            return axios.post('api/auth/logout').then(() => {
                console.log('ye');
            })
        }
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
        loginDialog(state) {
            return state.loginDialog;
        },
        loadingDialog(state) {
            return state.loadingDialog;
        },
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
        user(state) {
            return state.user;
        },
        loginLoading: state => {
            return state.loginLoading;
        },
        registerLoading: state => {
            return state.registerLoading;
        }
    }
}