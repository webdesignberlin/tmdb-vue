<template>
  <div class="search-bar">
    <fa-icon class="search-bar__icon" :icon="['fal', 'search']" />
    <input
      class="search-bar__input"
      type="text"
      v-model="searchString"
      placeholder="Search movies, actors, directors, etc..."
      @keypress.enter="doSearch()"
    />
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  data() {
    return {
      searchString: ""
    };
  },

  methods: {
    doSearch() {
      if (this.searchString.length < 3) {
        return false;
        return this.$store.dispatch("changeMode", "browse");
      }

      EventBus.$emit("GLOBAL:do-search", this.searchString);
    }
  }
};
</script>

<style lang="postcss" scoped>
.search-bar {
  background-color: var(--color-black);
  position: fixed;
  width: 100%;
  left: var(--sidebar-width);
  top: 0;
  box-shadow: 0 0 3rem rgba(var(--color-black), 0.75);
  z-index: 5;

  &__icon {
    position: fixed;
    left: calc(var(--sidebar-width) + 1.3rem);
    top: 1.5rem;
    font-size: 1.3rem;
  }

  &__input {
    background-color: var(--color-black-darker);
    height: var(--searchbar-height);
    line-height: var(--searchbar-height);
    width: 100%;
    border: 0;
    color: white;
    font-size: 1.2rem;
    padding: 0 3.4rem;
    font-family: inherit;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>