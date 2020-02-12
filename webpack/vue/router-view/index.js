import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'font-awesome/css/font-awesome.css'
import 'flatpickr/dist/flatpickr.css'
import BootstrapVue from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import layout from './layout'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(flatPickr)
Vue.component('flat-pickr', flatPickr)
Vue.component('layout', layout)

const router = new VueRouter(require('./router'))
const store = new Vuex.Store(require('./store'))

router.beforeEach(function (to, from, next) {
  NProgress.start()
  store.dispatch('getAuthState').then(function (auth) {
    NProgress.done()
    if (!auth) {
      window.location = '/sign-in'
      return
    }
    next()
  })
})
export default new Vue({
  router: router,
  store: store
})
