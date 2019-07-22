<template>
  <div class="page page--home">
    <Sidebar class="page__sidebar">
      <nav class="sidebar__menu">
        <h4 class="sidebar__menu__header">Common Filters</h4>
        <ul class="sidebar__menu__items">
          <li class="sidebar__menu__items__item">Now Playing in Theaters</li>
          <li class="sidebar__menu__items__item">Coming Soon</li>
        </ul>
      </nav>

      <nav class="sidebar__menu">
        <h4 class="sidebar__menu__header">Genres</h4>
        <ul class="sidebar__menu__items">
          <li v-for="genre in genres" :key="genre.slug" class="sidebar__menu__items__item">
            <router-link to="/">{{ genre.name }}</router-link>
          </li>
        </ul>
      </nav>
    </Sidebar>

    <div class="page__content page__content--withSidebar">
      <header class="filters">
        <h1 class="filters__count">
          <span v-if="$store.state.mode === 'search'">Your search returned</span>
          {{ totalResults }} Movies
        </h1>
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
                <option value="release_date.asc">Year</option>
                <option value="vote_average.desc">Rating</option>
                <option value="revenue.desc">Highest Grossing</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <movie-grid v-on:movies-loaded="moviesLoaded" :pagination="true" />
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

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
      sort: "popularity.desc",
      filters: [
        {
          label: "Horror"
        },
        {
          label: "Drama"
        }
      ]
    };
  },

  beforeMount() {
    this.getGenres();
  },

  mounted() {
    EventBus.$on("MOVIE_GRID:ready-for-requests", () => {
      EventBus.$emit("MOVIE_GRID:populate-movie-grid", {
        path: "discover/movie",
        params: {
          sort_by: this.sort
        }
      });
    });
  },

  methods: {
    getGenres() {
      axios.get(`genre/movie/list`).then(result => {
        this.genres = result.data.genres;
        for (let i = 0; i < this.genres.length; i++) {
          this.genres[i].slug = this.createSlug(this.genres[i].name);
        }
      });
    },

    filterMovies() {
      EventBus.$emit("MOVIE_GRID:filter-movie-grid", {
        params: {
          sort_by: this.sort
        }
      });
    },

    moviesLoaded(e) {
      this.totalResults = this.numberWithCommas(e.total_results);
    },

    removeFilter(position) {
      return this.filters.splice(position, 1);
    }
  },

  watch: {
    sort: function(newval) {
      this.filterMovies();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "../assets/css/variables.css";

.page--home {
  display: flex;
  min-height: 100%;
}

.page {
  display: flex;
  align-items: stretch;

  &__sidebar {
    background-color: var(--color-primary-dark);
    width: var(--movie-sidebar-width);
  }

  &__content {
    flex: 1;
    padding: 2.5rem 4rem;
  }
}

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
    }

    &__sort {
      margin-left: auto;
    }

    >>> .pills {
      justify-self: flex-start;
    }
  }
}
</style>
