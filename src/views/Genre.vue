<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container grid-list-md>
          <movie-grid
            :block_title='blockTitle'
            :api_request="'discover/movie?sort_by=popularity.desc&with_genres=' + genreId"
            :pagination="true"
            :cards-per-row="5" />
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>

</template>

<script>
import startcase from 'lodash.startcase';
import MovieGrid from '../components/MovieGrid.vue';

export default {
  data() {
    return {
      genreId: 0,
      genreName: '',
      genres: false
    }
  },

  mounted() {
    if (localStorage.getItem('genres')) this.genres = JSON.parse(localStorage.getItem('genres'));
    this.genreName = this.$route.params.slug;
    this.genreId = this.mapNameToId(this.$route.params.slug);
  },

  beforeRouteUpdate (to, from, next) {
    this.genreName = to.params.slug;
    this.genreId = this.mapNameToId(to.params.slug);
    next();
  },

  computed: {
    blockTitle() {
      return startcase(this.genreName) + " Movies";
    }
  },

  methods: {
    mapNameToId(name) {
      name = startcase(name);
      let genre = this.genres.filter(genre => genre.name.toLowerCase() === name.toLowerCase());
      return genre[0].id;
    }
  },

  components: {
    MovieGrid
  }
}
</script>