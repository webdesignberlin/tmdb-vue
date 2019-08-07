import Vue from 'vue';
import Vuex from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';
import { Firebase } from '../plugins/firebase';

Vue.use(Vuex);

import user from './user/user';

const easyFirestore = VuexEasyFirestore([user], { logging: true, FirebaseDependency: Firebase });

const store = new Vuex.Store({
  plugins: [easyFirestore],
  modules: {},
  state: {
    mode: 'browse',
  },
  actions: {
    changeMode({ commit }, mode) {
      commit('SET_MODE', mode);
    },
  },
  mutations: {
    SET_MODE(state, mode) {
      state.mode = mode;
    },
  },
});

export default store;
