import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    state: { loading: false },
    // v-progress-linear switch:
    mutations: { setLoading(state) { state.loading = !state.loading }}
})
