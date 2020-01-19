import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import store from './store'
import 'view-design/dist/styles/iview.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/utils/zj-global.less'
import AMap from 'vue-amap';

Vue.use(AMap);
Vue.use(ViewUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false


AMap.initAMapApiLoader({
  // key: '69b66582beb5a777f461ffc1293f752e',
  // plugin: ['AMap.Geolocation']
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
