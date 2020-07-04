// bootstrap = axios + moment (Vue.prototypes)
require('./bootstrap')
require('./interceptors')

import Vue from "vue"
import App from "./App.vue"
import vuetify from "./vuetify.js"
import router from './router'
import store from './store'

Vue.component('vf-list-item', require('./components/VfCustom/VFListItem.vue').default)
Vue.component('vf-list-item-group', require('./components/VfCustom/VFListItemGroup').default)

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#root')
