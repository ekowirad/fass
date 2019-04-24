import Vue from 'vue'
import App from './App.vue'
import './vuetify'
import router from './routes'
import store from './store'
import axios from './axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
