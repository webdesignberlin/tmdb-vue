<template>
  <transition name="search">
    <div v-if="$store.state.mode === 'search'" class="search-results">
      <div class="search-results__wrapper">
        <h1>
          Your search results for
          <em>{{ search }}</em>
        </h1>
        <transition name="fade" mode="out-in">
          <MovieGrid v-if="results.length > 0" :static-movies="results" :showHover="false" />
          <Loading v-else />
        </transition>
      </div>

      <button @click="$store.dispatch('changeMode', 'mode')">
        <fa-icon class="search-results__close" :icon="['fal', 'times']" />
      </button>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "../../event-bus";

export default {
  data() {
    return {
      results: [],
      search: ""
    };
  },

  components: {
    MovieGrid: () => import("../MovieGrid"),
    Loading: () => import("../Loader")
  },

  mounted() {
    EventBus.$on("GLOBAL:do-search", search => {
      this.results = [];
      this.search = search;

      return setTimeout(
        function() {
          return this.doSearch(search);
        }.bind(this),
        2000
      );
    });

    window.addEventListener("keyup", e => {
      if (e.key === "Escape" && this.$store.state.mode === "search") {
        this.$store.dispatch("changeMode", "browse");
      }
    });
  },

  methods: {
    doSearch(search) {
      axios
        .get("search/multi", {
          params: {
            query: search
          }
        })
        .then(response => {
          this.results = response.data.results;
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
.search-results {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  overflow: auto;
  will-change: opacity;

  &__wrapper {
    max-width: 80%;
    margin: 0 auto;
    padding: 10vh 0;
    will-change: transform opacity;
  }

  &__close {
    position: fixed;
    top: 2rem;
    right: 2rem;
    color: white;
    font-size: 2rem;
  }

  h1 {
    margin: 2rem 0;

    em {
      font-weight: 500;
      font-style: italic;
    }
  }

  .movie-grid {
  }
}

.search-enter-active,
.search-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.5s;

  .search-results__wrapper {
    transition: transform 1s ease, opacity 1s ease;
    transition-delay: 1s;
  }
}

.search-enter,
.search-leave-to {
  opacity: 0;
  transition-delay: 0;

  .search-results__wrapper {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>