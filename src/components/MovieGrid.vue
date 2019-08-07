<template>
  <div class="movie-grid">
    <h2 v-html="block_title"></h2>
    <div v-if="movies" class="movie-grid__movies">
      <div v-for="(result, i) in movies" :key="result.id" class="movie-grid__movies__item">
        <Card :showHover="showHover" :object="result" :counter="i" :type="result.media_type" />
      </div>
    </div>

    <div class="movie-grid__pagination" v-if="pagination && movies.length > 0">
      <ul class="movie-grid__pagination__items">
        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--first"
          @click="paginate('first')"
        >
          <fa-icon :icon="['fal', 'angle-double-left']" />
        </li>
        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--prev"
          @click="paginate('prev')"
        >
          <fa-icon :icon="['fal', 'angle-left']" />
        </li>

        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--select"
          :class="{ 'movie-grid__pagination__items__item--active' : page === p }"
          v-for="p in pageRange"
          :key="`page-${p}`"
          @click="paginate('page', p)"
        >{{ p }}</li>

        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--next"
          @click="paginate('next')"
        >
          <fa-icon :icon="['fal', 'angle-right']" />
        </li>
        <li
          class="movie-grid__pagination__items__item movie-grid__pagination__items__item--last"
          @click="paginate('last')"
        >
          <fa-icon :icon="['fal', 'angle-double-right']" />
        </li>
      </ul>
    </div>

    <div class="text-xs-center" v-if="!movies">
      <Loader />
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";

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
    },
    showHover: {
      type: Boolean,
      default: false
    },
    results: {
      type: Object,
      default: () => {
        return {};
      }
    },
    page: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      api_request: false,
      filterParams: {},
      movies: [],
      isNumber
    };
  },

  methods: {
    paginate(dir, p = false) {
      return this.$emit("paginate", { direction: dir, page: p });
    }
  },

  computed: {
    pageRange() {
      let pages = [];
      let start = Math.max(1, this.page - 2);
      let end = this.page < 3 ? 5 : Math.min(this.totalPages, this.page + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },

    totalPages() {
      return Math.min(this.results.total_pages, 1000);
    }
  },

  updated() {
    if (this.staticMovies && this.staticMovies.length > 0) {
      this.movies = this.staticMovies;
    }
  },

  mounted() {
    if (this.staticMovies && this.staticMovies.length > 0) {
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

      // this.getMovies();
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

        // this.getMovies();
      }
    });

    EventBus.$emit("MOVIE_GRID:ready-for-requests", true);
  },

  watch: {
    page: function() {
      // this.getMovies();
    }
  },

  components: {
    Loader: () => import("./Loader.vue"),
    MovieCard: () => import("./Movie/Card.vue"),
    PeopleCard: () => import("./People/Card.vue"),
    TVCard: () => import("./TV/Card.vue"),
    Card: () => import("./Card/BaseCard")
  }
};
</script>

<style lang="postcss">
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
    z-index: 10;
    margin: 2rem 0;

    &__items {
      display: flex;
      justify-content: center;
      align-items: stretch;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: hidden;

      &__item {
        display: flex;
        align-items: center;
        background-color: var(--color-black-darker);
        font-weight: 500;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        padding: 1rem 1.5rem;
        cursor: pointer;
        border-right: 1px solid var(--color-black-lighter);
        color: white;

        &:first-child {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
        }

        &:last-child {
          border-top-right-radius: 2rem;
          border-bottom-right-radius: 2rem;
          border-right: 0;
        }

        &:hover {
          background-color: var(--color-black-lighter);
        }

        &--active {
          background-color: var(--color-black-lighter);
        }

        &--select {
          letter-spacing: 0;
          font-size: 1rem;
          padding: 1rem 1.5rem;
        }
      }
    }
  }
}
</style>