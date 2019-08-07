<template>
  <div class="action-icon" v-tooltip="theTooltip">
    <button
      class="action-icon__button button button--invisible button--icon button--colorWhite"
      @click="activeAction"
      @keyup.enter.prevent="activeAction"
      v-if="!active"
    >
      <slot name="inactiveIcon"></slot>
    </button>
    <button
      v-else
      class="action-icon__button button button--invisible button--icon button--colorWhite"
      @click="inactiveAction"
      @keyup.enter.prevent="inactiveAction"
    >
      <slot name="activeIcon"></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true
    },

    activeAction: {
      type: Function,
      required: true
    },

    inactiveAction: {
      type: Function,
      required: true
    },

    tooltip: {
      type: String,
      required: false
    }
  },

  computed: {
    movieInFavorites() {
      return this.$store.getters[`${USER_MODULE}/favorites`].includes(
        this.movie.id
      );
    },

    theTooltip() {
      return this.tooltip !== "" ? this.tooltip : false;
    }
  },

  methods: {
    addToFavorites() {
      return this.$store.dispatch(
        `${USER_MODULE}/${USER_ACTIONS.USER_ADD_FAVORITE}`,
        this.movie.id
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-icon {
  color: white;

  &__button {
    font-size: var(--icon-size-large);
  }
}
</style>