// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import VueResource from 'vue-resource'
// import Router from 'vue-router'
// import goods from 'components/goods/goods'
// import ratings from 'components/ratings/ratings'
// import seller from 'components/seller/seller'
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

//
// let app = Vue.extend(App)
// let router = new Router({
//   linkActiveClass: 'active'
// })
// router.map({
//   '/goods': {
//     component: goods
//   },
//   '/ratings': {
//     component: ratings
//   },
//   '/seller': {
//     component: seller
//   }
// })
// router.start(app, '#app')
// router.go('/goods')
