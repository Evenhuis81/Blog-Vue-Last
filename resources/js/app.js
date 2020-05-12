// localStorage.setItem('token', 'blabla')

require('./plugins/bootstrap');
// require('./plugins/interceptors');
// require("./store/subscriber");

import Vue from 'vue'
Vue.config.productionTip = false
import App from "./App.vue"
import vuetify from "./plugins/vuetify.js"
import router from './plugins/router.js'
import store from './store'
import Vuex from "vuex";

Vue.use(Vuex);

new Vue({
    store,
    router,
    vuetify,
    el: '#root',
    components: { App }
});
