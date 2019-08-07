<template>
  <div class="page page--home">
    <Sidebar class="page__sidebar">
      <nav class="sidebar__menu">
        <h4 class="sidebar__menu__header">Common Filters</h4>
        <ul class="sidebar__menu__items">
          <li
            class="sidebar__menu__items__item"
            @click="addFilter('primary_release_date.gte', 'Release Date is After Jul. 6', '2019-07-06') && addFilter('primary_release_date.lte', 'Release Date is Before Sept. 6', '2019-09-06')"
          >Now Playing in Theaters</li>
          <li
            class="sidebar__menu__items__item"
            @click="addFilter('primary_release_date.gte', 'Coming Soon', '2019-08-06')"
          >Coming Soon</li>
          <li
            class="sidebar__menu__items__item"
            @click="addFilter('primary_release_year', 'Released in 2019', '2019')"
          >Released in 2019</li>
          <li
            class="sidebar__menu__items__item"
            @click="addFilter('certification.lte', 'Kids Movies', 'G')"
          >Kids Movies</li>
        </ul>
      </nav>

      <nav class="sidebar__menu">
        <div class="input input--range">
          <label for="volume">Minimum Number of Votes</label>
          <div class="input--range__field">
            <input
              v-model="vote_count"
              type="range"
              id="start"
              name="vote_count"
              min="0"
              max="1000"
              step="100"
            />
            <div class="input--range__fieldValue">{{ vote_count }}</div>
          </div>
        </div>
      </nav>

      <nav class="sidebar__menu">
        <h4 class="sidebar__menu__header">Genres</h4>
        <ul class="sidebar__menu__items">
          <li
            v-for="genre in genres"
            :key="genre.slug"
            class="sidebar__menu__items__item"
            @click="addFilter('with_genres', ucfirst(genre.slug), `${Number(genre.id)}`)"
          >
            <router-link to="/">{{ genre.name }}</router-link>
          </li>
        </ul>
      </nav>
    </Sidebar>

    <div class="page__content page__content--withSidebar">
      <header class="filters">
        <h1 class="filters__count" v-if="movies">{{ numberWithCommas(movies.total_results) }} Movies</h1>
        <div class="filters__items">
          <Pills
            :pills="filters"
            :closable="true"
            v-on:pill-item-closed="removeFilter"
            class="filters__items__active"
          />

          <div class="filters__items__sort">
            <div class="input input--select">
              <select v-model="sort">
                <option value="popularity.desc">Popularity</option>
                <option value="release_date.asc">Year (oldest first)</option>
                <option value="release_date.desc">Year (newest first)</option>
                <option value="vote_average.desc">User Rating (highest first)</option>
                <option value="vote_average.asc">User Rating (lowest first)</option>
                <option value="revenue.desc">Highest Grossing</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <MovieGrid
        v-if="movies"
        :staticMovies="movies.results"
        :results="movies"
        :pagination="true"
        :page="page"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

const FILTER_KEYS = {
  GENRE: "with_genres"
};

export default {
  components: {
    MovieGrid: () => import("../components/MovieGrid.vue"),
    Sidebar: () => import("../components/Movie/Sidebar.vue"),
    Pills: () => import("../components/Utility/Pills.vue")
  },

  data() {
    return {
      genres: false,
      movies: false,
      totalResults: 0,
      page: 1,
      vote_count: 0,
      sort: "popularity.desc",
      filters: []
    };
  },

  beforeMount() {
    this.getGenres();
    this.getMovies();
  },

  beforeRouteUpdate(to, from, next) {
    console.log(to);
    next();
  },

  mounted() {
    // EventBus.$on("MOVIE_GRID:ready-for-requests", () => {
    //   EventBus.$emit("MOVIE_GRID:populate-movie-grid", {
    //     path: "discover/movie",
    //     params: {
    //       sort_by: this.sort
    //     }
    //   });
    // });
  },

  methods: {
    getMovies: function() {
      this.movies = false;

      let params = {
        page: this.page,
        sort_by: this.sort,
        "vote_count.gte": Number(this.vote_count),
        ...this.filterParams
      };

      axios
        .get("discover/movie", {
          params: params
        })
        .then(response => {
          console.log(response);
          this.movies = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getGenres() {
      axios.get(`genre/movie/list`).then(result => {
        this.genres = result.data.genres;
        for (let i = 0; i < this.genres.length; i++) {
          this.genres[i].slug = this.createSlug(this.genres[i].name);
        }
      });
    },

    removeFilter(position) {
      return this.filters.splice(position, 1);
    },

    addFilter(type, label, value) {
      return this.filters.push({
        label: `${label}`,
        key: type,
        value: value
      });
    },

    paginate(e) {
      if (!this.movies.total_pages) {
        return false;
      }

      switch (e.direction) {
        case "prev":
          this.page = this.page > 1 ? this.page - 1 : 1;
          break;
        case "next":
          this.page =
            this.page < this.totalPages ? this.page + 1 : this.totalPages;
          break;
        case "first":
          this.page = 1;
          break;
        case "last":
          this.page = this.totalPages;
          break;
        case "page":
          this.page = Number(e.page);
          break;
        default:
          return false;
      }
    }
  },

  computed: {
    filterParams() {
      let filters = {};
      this.filters.forEach(f => {
        if (f.key in filters) {
          filters[f.key] = `${filters[f.key]},${f.value}`;
        } else {
          filters[f.key] = f.value;
        }
      });
      return Object.keys(filters).length === 0 && filters.constructor === Object
        ? false
        : filters;
      // return this.filters;
    },

    totalPages() {
      return Math.min(this.movies.total_pages, 1000);
    }
  },

  watch: {
    sort: function(newval) {
      if (newval === "vote_average.asc" || newval === "vote_average.desc") {
        this.vote_count = 0;
      }
      this.getMovies();
    },

    page: function(newVal) {
      this.getMovies();
    },

    filters: function(newVal) {
      this.getMovies();
    },

    vote_count: function(newVal) {
      this.getMovies();
    }
  }
};
</script>

<style lang="postcss">
.page--home {
  .filters {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 2rem;
    margin-bottom: 4rem;

    &__count {
      margin: 0;
      padding: 0;
      font-weight: 400;
      font-size: var(--font-size-large);
    }

    &__items {
      flex: 1;
      display: flex;
      align-items: center;

      &__active.pills {
        padding-left: 2rem;

        .pills__item {
          margin-bottom: 0;
        }
      }

      &__sort {
        margin-left: auto;
        display: flex;

        .input {
          margin-left: 1rem;
        }
      }

      >>> .pills {
        justify-self: flex-start;
      }
    }
  }
}
</style>
