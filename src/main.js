import Vue from 'vue'
import App from './App.vue'
import './vuetify'
import router from './routes'
import store from './store'
import axios from './axios'

import currency from 'v-currency-field'
import 'v-currency-field/dist/index.css'

Vue.config.productionTip = false
Vue.use(currency)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
