import Vue from 'vue';
import kebabcase from 'lodash.kebabcase';

const roleMap = {
  Acting: 'Actor',
  Writing: 'Writer',
  Production: 'Producer',
  Sound: 'Sound/Music',
  Directing: 'Director',
};

Vue.mixin({
  methods: {
    ucfirst: function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
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

    getPrimaryRole: function(person) {
      return 'known_for_department' in person ? roleMap[person.known_for_department] : false;
    },

    getConsolidatedCredits(creditsArray) {
      let cs = [];

      creditsArray.forEach(s => {
        let existing = cs.findIndex(c => s.id === c.id);
        let key = 'job' in s ? 'job' : 'character';

        if (existing >= 0) {
          cs[existing][key].push(s[key]);
        } else {
          let sCopy = { ...s };
          sCopy[key] = [];
          sCopy[key].push(s[key]);

          cs.push({ ...sCopy });
        }
      });

      return cs;
    },
  },
});
