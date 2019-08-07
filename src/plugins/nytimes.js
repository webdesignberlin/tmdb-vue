'use strict';

import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_OMDB_BASE_API_URL;

let config = {
  baseURL: process.env.VUE_APP_NYTIMES_BASE_API_URL,
  params: {
    'api-key': process.env.VUE_APP_NYTIMES_API_KEY,
  },
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const nytimes = axios.create(config);

nytimes.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
nytimes.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  },
);

let Plugin = {};

Plugin.install = function(Vue, options) {
  Vue.nytimes = nytimes;
  window.nytimes = nytimes;
  Object.defineProperties(Vue.prototype, {
    nytimes: {
      get() {
        return nytimes;
      },
    },
    $nytimes: {
      get() {
        return nytimes;
      },
    },
  });
};

Vue.use(Plugin);
export default Plugin;
