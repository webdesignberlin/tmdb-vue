import '@babel/polyfill'
import Vue from 'vue';
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import helpers from './helpers';

import isEmpty from 'lodash.isempty';
window.isEmpty = isEmpty;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  helpers,
  render: h => h(App),
}).$mount('#app');
