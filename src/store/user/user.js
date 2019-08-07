import { MODULE_NAME as USER_MODULE, ACTIONS, MUTATIONS } from './types';
import { EASY_FS_ACTIONS } from '../types';
import { Firebase } from '../../plugins/firebase';

const state = {
  loggedIn: false,
  user: false,
  data: {
    settings: [],
    favorites: [],
    watchlist: [],
    diary: [],
    profile: {},
  },
};

const getters = {
  displayName: state => {
    if (!state.user) {
      return false;
    }

    if (state.user.displayName) {
      return state.user.displayName;
    } else if (state.user.email) {
      return state.user.email;
    }
  },
  favorites: state => state.data.favorites,
  watchlist: state => state.data.watchlist,
};

const actions = {
  [ACTIONS.USER_SIGNUP]({ commit }, payload) {
    return Firebase.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
      });
  },

  [ACTIONS.USER_LOGIN]({ dispatch }, payload) {
    return Firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {})
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  },

  [ACTIONS.USER_LOGOUT]({ dispatch, commit }) {
    return Firebase.auth()
      .signOut()
      .then(async () => {
        await Promise.all([
          dispatch(`${USER_MODULE}/${EASY_FS_ACTIONS.CLOSE_DB_CHANNEL}`, false, { root: true }),
          commit(MUTATIONS.USER_SET_LOGGED_IN_STATE, false),
        ]);
      });
  },

  [ACTIONS.USER_ADD_FAVORITE]({ state, dispatch }, id) {
    let favorites = [...state.data.favorites];
    favorites.push(id);
    dispatch('user/set', { favorites: [...new Set(favorites)] }, { root: true });
  },

  [ACTIONS.USER_REMOVE_FAVORITE]({ state, dispatch }, id) {
    let favorites = [...state.data.favorites];
    favorites = favorites.filter(f => f != id);
    dispatch('user/set', { favorites: [...new Set(favorites)] }, { root: true });
  },

  [ACTIONS.USER_ADD_WATCHLIST]({ state, dispatch }, id) {
    let watchlist = [...state.data.watchlist];
    watchlist.push(id);
    dispatch('user/set', { watchlist: [...new Set(watchlist)] }, { root: true });
  },

  [ACTIONS.USER_REMOVE_WATCHLIST]({ state, dispatch }, id) {
    let watchlist = [...state.data.watchlist];
    watchlist = watchlist.filter(f => f != id);
    dispatch('user/set', { watchlist: [...new Set(watchlist)] }, { root: true });
  },

  [ACTIONS.USER_UPDATE_LOGGED_IN_STATE]({ commit }, val) {
    commit(MUTATIONS.USER_SET_LOGGED_IN_STATE, val);
  },

  [ACTIONS.USER_UPDATE_USER]({ commit }, user) {
    commit(MUTATIONS.USER_SET_USER, {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData,
    });
  },
};

const mutations = {
  [MUTATIONS.USER_SET_LOGGED_IN_STATE](state, val) {
    this._vm.$set(state, 'loggedIn', val);
  },

  [MUTATIONS.USER_SET_USER](state, user) {
    this._vm.$set(state, 'user', user);
  },
};

export default {
  namespaced: true,
  firestorePath: 'users/{userId}',
  firestoreRefType: 'doc', // or 'collection'
  moduleName: USER_MODULE,
  statePropName: 'data',
  sync: {
    guard: ['created_at', 'created_by', 'updated_at', 'updated_by'],

    insertHook(updateStore, doc) {
      updateStore({ ...doc, createdAt: new Date() });
    },
    patchHook(updateStore, doc) {
      updateStore({ ...doc, updatedAt: new Date() });
    },
    insertHookBeforeSync(updateFirestore, doc) {
      updateFirestore({ ...doc, createdAt: Firebase.firestore.FieldValue.serverTimestamp() });
    },
    patchHookBeforeSync(updateFirestore, doc) {
      updateFirestore({ ...doc, updatedAt: Firebase.firestore.FieldValue.serverTimestamp() });
    },
  },

  state,
  getters,
  actions,
  mutations,
};
