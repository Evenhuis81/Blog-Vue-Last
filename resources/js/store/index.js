import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    state: {
        // v-progress-linear switch:
        contentLoad: false,
        // after register/login button pressed:
        btnLoad: false,
        // when unauthenticated trying to access premium content (for now, goal = global dialog activator):
        dialog: false
    },
    mutations: {
        set_content_load(state, boolean) { state.contentLoad = boolean },
        switch_btn_load(state) { state.btnLoad = !state.btnLoad },
        switch_dialog(state) { state.dialog = !state.dialog },
        set_dialog(state, boolean) { state.dialog = boolean }
    },
    actions: {
        switchBtnLoad(context) { context.commit("switch_btn_load") },
        setContentLoad(context, boolean) { context.commit("set_content_load", boolean) },
        switchDialog(context) { context.commit("switch_dialog") },
        setDialog(context, boolean) { context.commit("set_login_dialog", boolean) }
    },
    getters: {
        btnLoad: state => state.btnLoad,
        getDialog: state => state.dialog
    }
})
