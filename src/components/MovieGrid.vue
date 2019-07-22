<template>
  <div class="movie-grid">
    <h2 v-html="block_title"></h2>
    <div v-if="movies" class="movie-grid__movies">
      <div v-for="(result, i) in movies" :key="result.id" class="movie-grid__movies__item">
        <PeopleCard v-if="result.media_type === 'person'" :person="result" :counter="i" />
        <TVCard v-else-if="result.media_type === 'tv'" :show="result" :counter="i" />
        <MovieCard v-else :movie="result" :counter="i" />
      </div>
    </div>

    <div class="movie-grid__pagination" v-if="pagination && results">
      <ul class="movie-grid__pagination__items">
        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--prev"
          @click="page -= 1"
        >Prev</li>
        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--next"
          @click="page += 1"
        >Next</li>
      </ul>
    </div>

    <div class="text-xs-center" v-if="!movies">
      <Loader />
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import Loader from "./Loader.vue";

export default {
  props: {
    block_title: {
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
    },
    staticMovies: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      api_request: false,
      page: 1,
      filterParams: {},
      movies: false,
      results: false,
      isNumber
    };
  },

  methods: {
    getMovies: function() {
      if (!this.api_request || this.api_request == "") {
        return false;
      } else {
        axios
          .get(this.api_request, {
            params: {
              page: this.page,
              ...this.filterParams
            }
          })
          .then(response => {
            if (this.api_request.includes("combined_credits")) {
              this.results = response.data.cast;
              this.movies = response.data.cast;
            } else {
              this.results = response.data;
              this.movies = response.data.results;
            }

            if (typeof this.movies === "object") {
              let movies = [];

              Object.keys(this.movies).map(key => {
                movies.push(this.movies[key]);
              });

              this.movies = movies;
            }

            if (isNumber(this.limitResults) && typeof this.movies === "array") {
              // console.log(typeof this.movies)
              this.movies = this.movies.slice(
                0,
                Math.min(this.limitResults, this.movies.length)
              );
            }

            this.$emit("movies-loaded", response.data);
          });
      }
    }
  },

  mounted() {
    if (this.staticMovies) {
      this.movies = this.staticMovies;
    }

    EventBus.$on("MOVIE_GRID:populate-movie-grid", payload => {
      this.api_request = payload.path;
      this.page = 1;
      this.movies = false;

      if (payload.params) {
        // We want to persist the sort, unless overridden
        if (!payload.params.sort_by && this.filterParams.sort_by) {
          payload.params.sort_by = this.filterParams.sort_by;
        }

        this.filterParams = { ...payload.params };
      } else {
        this.filterParams = {};
      }

      this.getMovies();
    });

    // Maintains the current api_request but changes the filters
    EventBus.$on("MOVIE_GRID:filter-movie-grid", payload => {
      this.page = 1;

      if (payload.params) {
        // We want to persist the sort, unless overridden
        if (!payload.params.sort_by && this.filterParams.sort_by) {
          payload.params.sort_by = this.filterParams.sort_by;
        }

        // Persist the search term if we're searching
        if (this.filterParams.query) {
          payload.params.query = this.filterParams.query;
        }

        this.filterParams = { ...payload.params };

        this.getMovies();
      }
    });

    EventBus.$emit("MOVIE_GRID:ready-for-requests", true);
  },

  watch: {
    // page: function(val) {
    //   this.getMovies();
    // },

    api_request: function() {
      this.movies = false;
      this.page = 1;
      this.results = false;
    }
  },

  components: {
    Loader,
    MovieCard: () => import("./Movie/Card.vue"),
    PeopleCard: () => import("./People/Card.vue"),
    TVCard: () => import("./TV/Card.vue")
  }
};
</script>

<style lang="postcss">
@import "../assets/css/breakpoints.css";
@import "../assets/css/variables.css";

.movie-grid {
  &__movies {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: "";
    grid-gap: 2rem;

    &__item {
    }
  }

  &__pagination {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;

    &__items {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: 0 0 4rem rgba(#111, 0.5);

      &__item {
        background-color: rgba(#111, 0.9);
        font-weight: 500;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        padding: 1rem 1rem;
        cursor: pointer;

        &:hover {
          background-color: rgba(#fff, 0.9);
          color: #111;
        }

        &--prev {
          border-right: 1px solid rgba(#fff, 0.2);
        }
      }
    }
  }
}
</style>