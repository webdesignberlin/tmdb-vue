<template>
  <div class="card card--movie">
    <router-link :to="'/movie/'+movie.id" class="cardLink">
      <figure class="cardPoster" :style="`background-image: url(${poster(movie.poster_path)});`" />
      <div class="cardDetails">
        <div class="cardDetails__pad">
          <h3 class="cardDetails__title">
            <span v-if="$store.state.mode === 'search'" class="cardDetails__type">[MOVIE]</span>
            {{ movie.title ? movie.title : movie.name }}
          </h3>
          <div
            v-if="movie.release_date"
            class="cardDetails__year"
          >{{ movie.release_date.slice(0,4) }}</div>

          <!-- <div class="cardDetails__overview">{{ movie.overview }}</div> -->
        </div>
      </div>
    </router-link>
    <div
      class="cardPopout"
      :class="{ 'cardPopout--right' : counter === 3 || counter === 4 || counter === 8 || counter === 9 || counter === 13 || counter === 14 || counter === 18 || counter === 19 }"
    >
      <div class="cardPopout__pad">
        <h3>
          {{ movie.title }}
          <span v-if="movie.release_date">({{ movie.release_date.slice(0,4) }})</span>
        </h3>
        <div class="overview">{{ movie.overview }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    },
    counter: {
      type: Number,
      required: false
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../assets/css/card.css";
</style>