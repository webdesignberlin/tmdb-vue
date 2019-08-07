<template>
  <ActionIcon
    class="add-to-watchlist"
    :active="movieInWatchlist"
    :activeAction="addToWatchlist"
    :inactiveAction="removeFromWatchlist"
    :tooltip="movieInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'"
  >
    <template v-slot:inactiveIcon>
      <fa-icon :icon="['fal', 'bookmark']" />
    </template>
    <template v-slot:activeIcon>
      <fa-icon :icon="['fas', 'bookmark']" />
    </template>
  </ActionIcon>
</template>

<script>
import {
  MODULE_NAME as USER_MODULE,
  ACTIONS as USER_ACTIONS
} from "@/store/user/types";
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },

  components: {
    ActionIcon: () => import("../Utility/ActionIcon")
  },

  computed: {
    movieInWatchlist() {
      return this.$store.getters[`${USER_MODULE}/watchlist`].includes(
        this.movie.id
      );
    }
  },

  methods: {
    addToWatchlist() {
      return this.$store.dispatch(
        `${USER_MODULE}/${USER_ACTIONS.USER_ADD_WATCHLIST}`,
        this.movie.id
      );
    },

    removeFromWatchlist() {
      return this.$store.dispatch(
        `${USER_MODULE}/${USER_ACTIONS.USER_REMOVE_WATCHLIST}`,
        this.movie.id
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
.add-to-watchlist {
  color: white;

  &__button {
    font-size: var(--icon-size-large);
  }
}
</style>