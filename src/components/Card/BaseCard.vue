<template>
  <div class="card card--movie">
    <router-link :to="`/${slug}/${object.id}`" class="cardLink">
      <figure class="cardPoster" :style="`background-image: url(${poster(object.poster_path)});`" />
      <div class="cardDetails">
        <div class="cardDetails__pad">
          <h3 class="cardDetails__title">
            <span v-if="$store.state.mode === 'search'" class="cardDetails__type">[{{ type }}]</span>
            {{ object.title ? object.title : object.name }}
          </h3>
          <div
            v-if="object.release_date"
            class="cardDetails__year"
          >{{ object.release_date.slice(0,4) }}</div>

          <!-- <div class="cardDetails__overview">{{ object.overview }}</div> -->
        </div>
      </div>
    </router-link>
    <div
      v-if="showHover"
      class="cardPopout"
      :class="{ 'cardPopout--right' : counter === 3 || counter === 4 || counter === 8 || counter === 9 || counter === 13 || counter === 14 || counter === 18 || counter === 19 }"
    >
      <div class="cardPopout__pad">
        <h3>
          {{ object.title }}
          <span v-if="object.release_date">({{ object.release_date.slice(0,4) }})</span>
        </h3>
        <div class="overview">{{ object.overview }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "movie"
    },
    slug: {
      type: String,
      default: "movie"
    },
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
  }
};
</script>

<style lang="postcss">
.card {
  position: relative;
  /* overflow: hidden; */

  &Link {
    /* position: absolute; */
    /* width: 100%;
    height: 100%; */
    color: white;
  }

  &Poster {
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    padding-bottom: 150%;
    background-size: cover;
    z-index: 1;
    transition: z-index 0 ease;
    transition-delay: 1s;
  }

  &Details {
    &__pad {
      padding: 0.5rem 0;
    }

    &__type {
      color: rgba(255, 255, 255, 0.4);
    }

    &__knownFor,
    &__year,
    &__title {
      font-weight: 600;
      font-size: var(--font-size-smaller);
      line-height: 1.2;
      margin: 0;
      padding: 0;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }

    &__knownFor,
    &__year {
      color: rgba(255, 255, 255, 0.3);
      margin-top: 5px;
      font-size: 0.6rem;
    }

    &__knownFor {
      font-style: italic;
      list-style-type: square;
      margin-left: 0.8rem;

      &__item {
        margin-bottom: 3px;
      }
    }

    &__overview {
    }
  }

  &Popout {
    position: absolute;
    left: -1rem;
    top: -1rem;
    width: 600px;
    min-height: calc(100% + 2rem);
    z-index: 2;
    background-color: var(--color-black-darker);
    box-shadow: 0 0 2rem var(--color-black-darker);
    font-size: var(--font-size-small);
    clip-path: circle(0 at 0 0);
    transition: clip-path 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &__pad {
      padding: 1rem 2rem 1rem 240px;
    }

    &--right {
      left: auto;
      right: -1rem;

      .cardPopout__pad {
        padding: 1rem 240px 1rem 2rem;
      }
    }

    &:hover {
      opacity: 1;
    }

    .overview {
      font-size: var(--font-size-smaller);
    }
  }

  &:hover {
    z-index: 10;
    .card {
      &Poster {
        z-index: 5;
        transition-delay: 0s;
      }

      &Popout {
        clip-path: circle(1000px at 0 0);
      }
    }
  }
}
</style>