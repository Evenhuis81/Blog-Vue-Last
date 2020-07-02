import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    state: {
        // v-progress-linear switch:
        contentLoading: false,
        // after register/login button pressed:
        buttonLoading: false,
        // when unauthenticated trying to access premium content
        loginDialog: false
    },
    mutations: {
        set_content_loading(state, boolean) { state.contentLoading = boolean },
        set_button_loading(state) { state.buttonLoading = !state.buttonLoading },
        switch_login_dialog(state) {
            state.loginDialog = !state.loginDialog
        },
        set_login_dialog(state, boolean) {
            state.loginDialog = boolean
        }
    },
    actions: {
        setButtonLoading(context) {
            context.commit("set_button_loading")
        },
        setContentLoading(context, boolean) {
            context.commit("set_content_loading", boolean)
        },
        switchLoginDialog(context) {
            context.commit("switch_login_dialog")
        },
        setLoginDialog(context, boolean) {
            context.commit("set_login_dialog", boolean)
        }
    },
    getters: {
        buttonLoading(state) {
            return state.buttonLoading
        },
        loginDialog(state) {
            return state.loginDialog
        }
    }
})
