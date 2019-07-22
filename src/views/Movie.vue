<template>
  <div class="movie">
    <div class="movie__backdrop" :style="movieBackdrop" v-if="movie">
      <div class="movie__details">
        <div class="row">
          <div class="movie__details--left">
            <img class="movie__details__poster" :src="poster(movie.poster_path)" />

            <section>
              <h3 class="sectionHeader">Crew</h3>
              <ul class="castList castList--stacked">
                <li v-for="(person, i) in movie.credits.crew.slice(0,4)" :key="`${person.id}-${i}`">
                  <router-link :to="'/person/' + person.id">
                    <div
                      class="img"
                      :style="'background-image: url('+castImg(person.profile_path)+');'"
                    >&nbsp;</div>
                    <div class="details">
                      <strong>{{ person.name }}</strong>
                      <em v-html="person.job"></em>
                    </div>
                  </router-link>
                </li>
              </ul>
            </section>

            <section v-if="movie.belongs_to_collection">
              <h3 class="sectionHeader">Collections</h3>
              <ul class="castList castList--stacked">
                <li>
                  <router-link :to="'/collection/' + movie.belongs_to_collection.id">
                    <div
                      class="img"
                      :style="'background-image: url('+backdrop(movie.belongs_to_collection.backdrop_path)+');'"
                    >&nbsp;</div>
                    <div class="details">
                      <strong>{{ movie.belongs_to_collection.name }}</strong>
                    </div>
                  </router-link>
                </li>
              </ul>
            </section>
          </div>

          <div class="movie__details--right">
            <h1
              v-if="movie"
              v-html="movie.title + ' (' + movie.release_date.slice(0,4) + ')'"
              class="movie__details__title"
            ></h1>
            <h3 class="movie__details__director">
              Directed by
              <span>{{ director }}</span>
            </h3>

            <section>{{ movie.overview }}</section>

            <section>
              <ul class="property-list">
                <li>
                  <strong>Genres</strong>
                  <Pills :pills="movie.genres" label-key="name" />
                </li>
                <li>
                  <strong>Keywords</strong>
                  <Pills :pills="movie.keywords.keywords" label-key="name" />
                </li>
                <li>
                  <strong>Release Date:</strong>
                  <em>{{ movie.release_date }}</em>
                </li>
                <li>
                  <strong>Vote Average:</strong>
                  <em>{{ movie.vote_average }} ({{ movie.vote_count }} votes)</em>
                </li>
              </ul>
            </section>

            <div class="movie__details__credits" v-if="movie.credits">
              <h3 class="sectionHeader">Cast</h3>
              <ul class="castList">
                <li v-for="(person, i) in movie.credits.cast.slice(0,8)" :key="`${person.id}-${i}`">
                  <router-link :to="'/person/' + person.id">
                    <div
                      class="img"
                      :style="'background-image: url('+castImg(person.profile_path)+');'"
                    >&nbsp;</div>
                    <div class="details">
                      <strong>{{ person.name }}</strong>
                      <em v-html="person.character"></em>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-xs-center" v-else>
      <Loader />
    </div>

    <MovieGrid
      v-if="movie && movie.similar.results"
      block_title="You might also enjoy..."
      :static-movies="movie.similar.results"
      :limitResults="6"
      :cardsPerRow="6"
      :showMeta="false"
      :pagination="false"
    />
  </div>
</template>

<script>
import Spotify from "spotify-web-api-js";
import axios2 from "axios";
import isEmpty from "lodash.isempty";

export default {
  data() {
    return {
      movie: false,
      omdbData: false,
      spotify: false
    };
  },

  beforeMount() {
    this.getMovieDetails(this.$route.params.id);
  },

  computed: {
    movieBackdrop() {
      if (this.movie && this.movie.backdrop_path) {
        let image = this.backdrop(this.movie.backdrop_path);
        return `background-image: url(${image});`;
      } else {
        return "";
      }
    },

    director() {
      const director = this.getDirector(this.movie);
      return director.name;
    }
  },

  methods: {
    getMovieDetails(id) {
      this.movie = false;
      axios
        .get(`movie/${id}`, {
          params: {
            append_to_response:
              "credits,images,videos,alternative_titles,changes,external_ids,keywords,similar,reviews,lists"
          }
        })
        .then(result => {
          this.movie = result.data;
          // this.getIMDB(this.movie.imdb_id)
        });
    },

    getIMDB(id) {
      omdb
        .get(null, {
          params: {
            i: id
          }
        })
        .then(res => (this.omdbData = res.data));
    },

    getVideos(id) {}
  },

  beforeRouteUpdate(to, from, next) {
    this.getMovieDetails(to.params.id);
    next();
  },

  watch: {
    movie() {
      if (this.movie.imdb_id) {
        this.getIMDB(this.movie.imdb_id);
      }
    }
  },

  components: {
    MovieGrid: () => import("../components/MovieGrid.vue"),
    Loader: () => import("../components/Loader.vue"),
    Pills: () => import("../components/Utility/Pills.vue")
  }
};
</script>

<style lang="postcss">
@import "../assets/css/variables.css";

.movie {
  &__backdrop {
    background-size: cover;
    background-position: center center;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      background: linear-gradient(
        to bottom,
        rgba(29, 29, 38, 0.85) 0,
        rgba(29, 29, 38, 1) 90%
      );
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }
  }

  &__details {
    min-height: 80vh;
    position: relative;
    z-index: 1;

    max-width: 1200px;
    margin: 0 auto;
    padding-top: 10vh;

    section {
      margin: 2rem 0;
    }

    &--left {
      margin-right: 4rem;
    }

    &--right {
      flex: 1;
    }

    &__credits {
      min-width: 100%;
      flex: 1;
    }

    &__poster {
      box-shadow: 0 0 2rem rgba(#111, 0.5);
    }

    &__title {
      font-size: 4rem;
      line-height: 1;
    }

    &__director {
      font-weight: 200;
      margin: 1rem 0 2rem;
      font-style: italic;

      span {
        font-weight: 500;
        font-style: normal;
      }
    }
  }

  .row {
    display: flex;
  }

  .movie-grid {
    max-width: 1200px;
    margin: 4rem auto;
    position: relative;
    z-index: 2;

    &__movies {
      &__itemDetails__overview {
        display: none;
      }
    }
  }
}

.property-list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--font-size-small);

  & > li {
    display: flex;
    align-items: flex-start;
    padding: 1rem 1rem 0.5rem 1rem;
    border-radius: 1rem;
    min-height: 40px;

    & > *:first-child {
      margin-right: 1rem;
      min-width: 100px;
      text-align: right;
      line-height: 30px;
    }

    & > em {
      padding: 0.25rem 0 0 0;
    }

    &:nth-child(odd) {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .pills__item {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: capitalize;
    }
  }
}

.castList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "";
  grid-gap: 2rem;

  li {
    a {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 200;
      font-size: 0.8rem;
    }

    strong {
      display: block;
      margin-top: 0.3rem;
    }

    .img {
      border: 2px solid white;
      background-color: rgba(48, 48, 48, 1);
      background-color: #222;
      background-size: cover;
      background-position: center center;
      height: 70px;
      min-width: 70px;
      border-radius: 50%;
    }

    .details {
      padding-left: 0.75rem;
      flex: 1;
    }
  }

  &--stacked {
    display: flex;
    flex-direction: column;

    li {
      margin-bottom: 1rem;

      .img {
        height: 50px;
        min-width: 50px;
      }
    }
  }
}

.genres span:after {
  content: ", ";
}

.genres span:last-child:after {
  content: "";
}

.sectionHeader {
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 900;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.5rem;
  margin: 0 0 0.5rem;
  font-size: var(--font-size-smaller);
}
</style>

<style scoped>
.loader {
  position: fixed;
  left: 50%;
  top: 50%;
}
</style>