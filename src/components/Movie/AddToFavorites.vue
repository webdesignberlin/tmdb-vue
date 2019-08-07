<template>
  <ActionIcon
    class="add-to-favorites"
    :active="movieInFavorites"
    :activeAction="addToFavorites"
    :inactiveAction="removeFromFavorites"
    :tooltip="movieInFavorites ? 'Remove from Favorites' : 'Add to Favorites'"
  >
    <template v-slot:inactiveIcon>
      <fa-icon :icon="['fal', 'heart']" />
    </template>
    <template v-slot:activeIcon>
      <fa-icon :icon="['fas', 'heart']" />
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
    movieInFavorites() {
      return this.$store.getters[`${USER_MODULE}/favorites`].includes(
        this.movie.id
      );
    }
  },

  methods: {
    addToFavorites() {
      return this.$store.dispatch(
        `${USER_MODULE}/${USER_ACTIONS.USER_ADD_FAVORITE}`,
        this.movie.id
      );
    },

    removeFromFavorites() {
      return this.$store.dispatch(
        `${USER_MODULE}/${USER_ACTIONS.USER_REMOVE_FAVORITE}`,
        this.movie.id
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
.add-to-favorites {
  color: white;

  &__button {
    font-size: var(--icon-size-large);
  }
}
</style>