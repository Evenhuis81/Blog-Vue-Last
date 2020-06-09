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

Vue.use(Vuex);

store.state.router = router;

Vue.prototype.$moment = moment;

router.beforeEach(async(to, from, next) => {
    if (store.getters['auth/unverifiedToken']) {
      store.commit('setLoading');
      await store.dispatch('auth/verifyToken').then(() => { store.commit('setLoading')
        }).catch(() => {
          store.commit('setLoading');
          next({ name: "index" });
      });
    }
    if (store.getters['auth/authenticated'] && to.meta.guestRouteOnly) {
      next({ name: store.getters['auth/role'] + "dashboard" });
    }
    if (to.meta.guestRouteOnly) {
      //
    }
    next();
});


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
