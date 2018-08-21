<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-container grid-list-md>
        <movie-grid
          block_title='Popular Movies'
          api_request='movie/popular'
          :pagination="false"
          :limit-results="5"
          :cards-per-row="5" />

        <movie-grid
          block_title='Top Rated Movies'
          api_request='movie/top_rated'
          :pagination="false"
          :limit-results="5"
          :cards-per-row="5" />

        <movie-grid
          block_title='Now Playing'
          api_request='movie/now_playing'
          :cards-per-row="5"
          :pagination="true" />

        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import MovieGrid from '../components/MovieGrid.vue';

export default {
  components: {
    MovieGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
