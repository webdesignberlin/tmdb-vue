<template>
  <v-flex grid-list-md mt-5>
    <h2 v-html="block_title" class="mb-3"></h2>
    <v-layout row wrap v-if="movies">
      <v-flex
        v-for="gridMovie in movies"
        :style="'width: ' + (100 / cardsPerRow ) + '%;'"
        :key="gridMovie.id"
      >
      <router-link :to="'/movie/'+gridMovie.id">
        <v-card>
          <v-tooltip top>
            <v-card-media
              slot="activator"
              :src="helpers.poster(gridMovie.poster_path)"
              style="padding-top: 150%"
            >

            </v-card-media>
            <span v-text="gridMovie.title + ' (' + gridMovie.release_date.slice(0,4) + ')'"></span>
          </v-tooltip>

          <v-card-actions v-if="showMeta">
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <!-- <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </router-link>
      </v-flex>
    </v-layout>

    <div class="text-xs-center mt-4" v-if="pagination && results">
      <v-pagination
        v-model="page"
        :length="results.total_pages"
        :total-visible="7"
      ></v-pagination>
    </div>

    <div class="text-xs-center" v-if="!movies">
      <Loader />
    </div>
  </v-flex>
</template>

<script>
import helpers from '../helpers.js';
import Loader from './Loader.vue';

export default {
  props: {
    block_title: {
      type: String
    },
    api_request: {
      type: String
    },
    pagination: {
      type: Boolean
    },
    limitResults: {
      type: Number,
      default: null
    },
    cardsPerRow: {
      type: Number,
      default: 4
    },
    showMeta: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      movies: false,
      results: false,
      helpers
    }
  },

  methods: {
    getMovies: function() {
      axios.get(this.api_request, {
        params: {
          page: this.page
        }
      })
      .then((response) => {
        this.results = response.data;

        if ( this.limitResults ) {
          this.movies = response.data.results.slice(0, this.limitResults);
        } else {
          this.movies = response.data.results;
        }
      });
    }
  },

  beforeMount() {
    this.getMovies();
  },

  watch: {
    page: function(val) {
      this.getMovies();
    },

    api_request: function() {
      this.movies = false;
      this.page = 1;
      this.results = false;
      this.getMovies();
    }
  },

  components: {
    Loader
  }
}
</script>