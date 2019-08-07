<template>
  <div
    class="movie-rating"
    v-tooltip.bottom="`${movie.vote_average} average out of ${numberWithCommas(movie.vote_count)} votes.`"
  >
    <div class="movie-rating__progress">
      <div class="movie-rating__progress__bar" ref="progress" :style="style"></div>
    </div>
    <div class="movie-rating__stats">{{ movie.vote_average }}/10</div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      style: ""
    };
  },

  mounted() {
    setTimeout(() => {
      this.setStyle();
    }, 1000);
  },

  computed: {},

  methods: {
    setStyle() {
      this.style = {
        width: `${Number(this.movie.vote_average) * 10}%`
      };
      this.$refs.progress.classList.add("active");
    }
  }
};
</script>

<style lang="postcss" scoped>
.movie-rating {
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;

  &__progress {
    flex: 1;
    display: flex;
    height: 10px;
    border-radius: 5px;
    position: relative;
    background: linear-gradient(to right, var(--color-red), var(--color-green));

    &__bar {
      will-change: width;
      transition: width 0.5s ease 0.5s;
      width: 0;
      height: 10px;
      position: relative;

      &.active:after {
        opacity: 1;
      }

      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: -3px;
        bottom: -3px;

        width: 3px;
        height: calc(100% + 6px);
        background-color: white;
        opacity: 0;
        transition: opacity 0.3s ease 0.5s;
        will-change: opacity;
      }
    }
  }

  &__stats {
    font-size: 0.7rem;
    font-weight: 800;
    padding-left: 5px;
  }
}
</style>