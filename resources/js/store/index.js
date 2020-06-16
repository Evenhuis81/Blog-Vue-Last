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
        setContentLoading(state) { state.contentLoading = !state.contentLoading },
        setButtonLoading(state) { state.buttonLoading = !state.buttonLoading }
    },
    actions: {
        setButtonLoading(context) {
            context.commit("setButtonLoading");
        }
    },
    getters: {
        buttonLoading(state) {
            return state.buttonLoading;
        }
    }
})
