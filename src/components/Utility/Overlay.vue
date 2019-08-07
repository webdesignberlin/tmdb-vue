<template>
  <transition name="overlay">
    <div class="overlay" v-if="show">
      <div class="overlay__contents">
        <slot></slot>
      </div>
      <button class="overlay__close" @click="$emit('close')">
        <fa-icon :icon="['fal', 'times']" />
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="postcss" scoped>
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(#1d1d26, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;

  &__contents {
    min-width: calc(500px + 4rem);
    background-color: var(--color-black-darker);
    padding: 2rem;
    box-shadow: 0 0 2rem color(rgba(255, 5, 113, 1) alpha(25%));
  }

  &__close {
    background: transparent;
    border: 0;
    color: white;
    font-size: 2rem;
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s;

  .overlay__contents {
    transition: transform 0.5s ease;
  }
}
.overlay-enter,
.overlay-leave-to {
  opacity: 0;

  .overlay__contents {
    transform: translateY(100%);
  }
}
</style>