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
        buttonLoading: false },
    mutations: {
        set_content_loading(state, boolean) { state.contentLoading = boolean },
        set_button_loading(state) { state.buttonLoading = !state.buttonLoading }
    },
    actions: {
        setButtonLoading(context) {
            context.commit("set_button_loading");
        },
        setContentLoading(context, boolean) {
            context.commit("set_content_loading", boolean)
        }
    },
    getters: {
        buttonLoading(state) {
            return state.buttonLoading;
        }
    }
})
