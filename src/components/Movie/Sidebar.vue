<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: []
};
</script>

<style lang="postcss" scoped>
.sidebar {
  padding: 1.8rem;
  &__menu {
    font-weight: 500;
    font-size: var(--font-size-small);
    margin-bottom: 1.8rem;

    &__header {
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      font-weight: 900;
      border-bottom: 1px solid white;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }

    &__items {
      list-style: none;
      padding: 0;
      margin: 0;
      color: rgba(255, 255, 255, 0.5);

      &__item {
        display: block;
        padding: 0.25rem 0;
        &:hover {
          color: rgba(255, 255, 255, 1);
        }

        a {
          color: inherit;
        }
      }
    }
  }
}
</style>