import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
