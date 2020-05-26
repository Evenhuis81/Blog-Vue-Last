import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules";
import router from "../router";

Vue.use(Vuex);
export default new Vuex.Store({
    modules,
    state: { router }
})
