window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
require('./plugins/interceptors');

import Vue from "vue";
Vue.config.productionTip = false;
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";
import router from './router';
import store from './store';
import Vuex from "vuex";
import * as moment from 'moment';
// import Axios from 'axios'

Vue.use(Vuex);

// store.state.router = router;

// Vue.prototype.$http = Axios;
Vue.prototype.$moment = moment;

new Vue({
    store,
    router,
    vuetify,
    created() {
        this.$store.dispatch("blogs/getBlogs");
        this.$store.dispatch("categories/getCategories");
    },
    render: h => h(App),
}).$mount('#root');
