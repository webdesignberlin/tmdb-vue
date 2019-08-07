<template>
  <Card class="card--movie" :movie="movie"></Card>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    counter: {
      type: Number,
      required: false
    },
    showHover: {
      type: Boolean,
      default: true
    }
  },

  components: {
    Card: () => import("../Card/BaseCard")
  }
};
</script>

<style lang="postcss" scoped>
</style>