import '@babel/polyfill';
import Vue from 'vue';
import { Firebase, initFirebase } from './plugins/firebase';
import { MODULE_NAME as USER_MODULE, ACTIONS as USER_ACTIONS } from './store/user/types';
import { EASY_FS_ACTIONS } from './store/types';
import './helpers';
import './plugins/';

import App from './App.vue';
import router from './router';
import store from './store/index';

import './assets/css/index.css';

Vue.config.productionTip = false;

let theApp = false;

initFirebase().catch(err => {
  console.log(err);
});

Firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await Promise.all([
      store.dispatch(`${USER_MODULE}/${EASY_FS_ACTIONS.OPEN_DB_CHANNEL}`),
      store.dispatch(`${USER_MODULE}/${USER_ACTIONS.USER_UPDATE_USER}`, user),
      store.dispatch(`${USER_MODULE}/${USER_ACTIONS.USER_UPDATE_LOGGED_IN_STATE}`, true),
    ]);
  }
});

if (!theApp) {
  theApp = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}
