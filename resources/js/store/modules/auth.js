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
            state.token = null;
        },
        set_button_loading(state) {
            state.buttonLoading = !state.buttonLoading;
        },
    },
    actions: {
        setButtonLoading({ commit }) {
            commit('set_button_loading');
        },
        register({ }, credentials) {
            return this._vm.$http.post("api/auth/register", credentials)
        },
        loginPG({ commit }, credentials) {
            this._vm.$http.post("api/loginpg", credentials)
                .then(response => {
                    // commit('set_token', response.data.access_token);
                    // commit('set_user', response.data.user);
                    // return response.data.user.role;
                    console.log(response);
                }).catch(error => {
                    // if 401 or 429 resp.data.status
                    console.log(error);
                    // throw error;
                });
        },

        login({ commit }, credentials) {
            return this._vm.$http.post("api/auth/login", credentials)
                .then(response => {
                    commit('set_token', response.data.access_token);
                    commit('set_user', response.data.user);
                    return response.data.user.role;
                }).catch(error => {
                    // if 401 or 429 resp.data.status
                    throw error;
                });
        },
        verifyToken({ commit, rootState }) {
            return this._vm.$http.get('api/auth/details'
            ).then(response => {
                //use handler (internal success handler + log)
                commit('set_user', response.data)
            }).catch(error => {
                // use handler (internal error handler + log)
                commit('remove_token');
                commit('set_user', null);
                throw error;
            })
        },
        logOut({ commit }) {
            this._vm.$http.get('api/auth/logout'
            ).then(() => {
                //use handler (internal success handler + log)
            }).catch(() => {
                // use handler (internal error handler + log)
            }).then(() => {
                // this always runs and not in 1st then and catch, cause no matter the outcome, user must log out
                // in this case, the token should be revoked in another matter, if tempered with, can't revoke from localstorage
                commit('remove_token');
                commit('set_user', null);
            })
        },
    },
    getters: {
        unverifiedToken: state => (state.token && !state.user) ? true : false,
        authenticated: state => (state.token && state.user) ? true : false,
        buttonLoading: state => state.buttonLoading,
        role: state => state.user ? state.user.role : null
    }
}
