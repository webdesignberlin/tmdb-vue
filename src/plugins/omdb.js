"use strict"

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_OMDB_BASE_API_URL;

let config = {
  baseURL: process.env.VUE_APP_OMDB_BASE_API_URL,
  params: {
    apikey: process.env.VUE_APP_OMDB_API_KEY,
    plot: 'full'
  }
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _omdb = axios.create(config);

_omdb.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_omdb.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

let Plugin = {}

Plugin.install = function (Vue, options) {
  Vue.omdb = _omdb;
  window.omdb = _omdb;
  Object.defineProperties(Vue.prototype, {
    omdb: {
      get() {
        return _omdb;
      }
    },
    $omdb: {
      get() {
        return _omdb;
      }
    },
  });
};

Vue.use(Plugin);
export default Plugin;