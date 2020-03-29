import 'babel-polyfill';
import Vue from 'vue';
import './plugins/vuetify.js';
import App from './App.vue';
import router from './router.js';
import { createProvider } from './vue-apollo.js';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false;

Vue.prototype.$appName = 'Tallcraft Bans';
Vue.prototype.$clone = obj => JSON.parse(JSON.stringify(obj));

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
