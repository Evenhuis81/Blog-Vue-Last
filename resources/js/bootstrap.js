 import Vue from 'vue'
 import Axios from 'axios'
 import * as moment from 'moment'
 Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
 Vue.prototype.$http = Axios
 Vue.prototype.$moment = moment
 Vue.config.productionTip = false
 