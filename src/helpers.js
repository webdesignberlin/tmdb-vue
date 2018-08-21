import kebabcase from 'lodash.kebabcase'

export default {
  poster: function (img) {
    return 'https://image.tmdb.org/t/p/w300' + img;
  },

  backdrop: function(img) {
    return 'https://image.tmdb.org/t/p/original' + img;
  },

  castImg: function (img) {
    return 'https://image.tmdb.org/t/p/w200' + img;
  },

  createSlug: function(text) {
    return kebabcase(text);
  }
}