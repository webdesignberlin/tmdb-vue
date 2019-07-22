import Vue from 'vue';
import kebabcase from 'lodash.kebabcase';

Vue.mixin({
  methods: {
    poster: function(img) {
      return img ? 'https://image.tmdb.org/t/p/w300' + img : '';
    },

    backdrop: function(img) {
      return img ? 'https://image.tmdb.org/t/p/original' + img : '';
    },

    castImg: function(img) {
      return img ? 'https://image.tmdb.org/t/p/w200' + img : '';
    },

    createSlug: function(text) {
      return kebabcase(text);
    },

    numberWithCommas: function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    getDirector: function(movie) {
      return movie.credits.crew.find(c => c.department === 'Directing');
    },
  },
});
