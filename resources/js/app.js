window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from "vue";
Vue.config.productionTip = false;
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";
import router from './plugins/router.js';
import store from './store';
import Vuex from "vuex";
Vue.use(Vuex);

// Vue.prototype.$moment = moment;

new Vue({
    store,
    router,
    vuetify,
    // created() {
    //     console.log(store.getters['auth/userVerified'])
    // },
    render: h => h(App)
}).$mount('#root');
