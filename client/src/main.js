import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api'
import './registerServiceWorker'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import dateFilter from './filters/date.filter'
Vue.filter('date', dateFilter)

import Loader from './components/app/Loader'
Vue.component('Loader', Loader)

// Api
Vue.prototype.$http = new Api()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
