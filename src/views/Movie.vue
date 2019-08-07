<template>
  <div class="movie">
    <div class="movie__backdrop image__backdrop" :style="movieBackdrop" v-if="movie"></div>
    <div v-if="movie">
      <div class="movie__details">
        <div class="row">
          <div class="movie__details--left">
            <img class="movie__details__poster" :src="poster(movie.poster_path)" />

            <div class="movie__actions">
              <AddToFavorites :movie="movie" />
              <AddToWatchlist :movie="movie" />
            </div>

            <MovieRating :movie="movie" />

            <section v-if="movie.credits.crew && movie.credits.crew.length > 0">
              <h3 class="sectionHeader">Crew</h3>
              <PersonList stacked :source="getConsolidatedCredits(movie.credits.crew)" :limit="5" />
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
            <h3 v-if="director" class="movie__details__director">
              Directed by
              <span>{{ director }}</span>
            </h3>
            <h2 class="movie__details__tagline">{{ movie.tagline }}</h2>

            <section class="movie__details__overview">{{ movie.overview }}</section>

            <tabs :options="{ useUrlFragment: false }">
              <tab name="Cast">
                <div
                  class="movie__details__credits"
                  v-if="movie.credits.cast && movie.credits.cast.length > 0"
                >
                  <PersonList :source="getConsolidatedCredits(movie.credits.cast)" />
                </div>
              </tab>
              <tab name="Crew">
                <PersonList :source="getConsolidatedCredits(movie.credits.crew)" />
              </tab>
              <tab name="Details">
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
                  <li>
                    <strong>Financials:</strong>
                    <div>
                      <div>
                        Budget:
                        <em>${{ numberWithCommas(movie.budget) }}</em>
                      </div>
                      <div>
                        Revenue:
                        <em>${{ numberWithCommas(movie.revenue) }}</em>
                      </div>
                      <div>
                        Profit:
                        <em>${{ numberWithCommas(movie.revenue - movie.budget) }}</em>
                      </div>
                    </div>
                  </li>
                  <li v-if="movie.alternative_titles.titles.length > 0">
                    <strong>Also Known As:</strong>
                    <ul class="alternative-titles">
                      <li
                        v-for="(t,i) in movie.alternative_titles.titles"
                        :key="`movie-title-${i}`"
                      >
                        {{ t.title }}
                        <em>{{ getIso(t.iso_3166_1) }}</em>
                      </li>
                    </ul>
                  </li>
                  <li v-if="movie.production_companies.length > 0">
                    <strong>Production Companies:</strong>
                    <ul class="alternative-titles">
                      <li
                        v-for="(t,i) in movie.production_companies"
                        :key="`movie-production-co-${i}`"
                      >{{ t.name }}</li>
                    </ul>
                  </li>
                </ul>
              </tab>
              <tab name="Reviews">
                <section v-if="nytimes">
                  <h3>New York Times</h3>
                  <ul>
                    <li v-for="(r, i) in nytimes.results" :key="`review-${i}`">
                      <strong>{{ r.headline }}</strong>
                      <em>{{ r.publication_date }}</em>
                      <p>{{ r.summary_short }}</p>
                    </li>
                  </ul>
                </section>
              </tab>
            </tabs>

            <section class="movie__videos" v-if="movie.videos.results">
              <h3 class="sectionHeader">Videos</h3>
              <silentbox-single
                v-for="(v, i) in movie.videos.results"
                :src="`https://www.youtube.com/watch?v=${v.key}`"
                :description="v.name"
                :key="'video-'+i"
              />
            </section>
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
      :staticMovies="movie.similar.results"
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
import iso from "iso-3166-1";

export default {
  data() {
    return {
      movie: false,
      omdbData: false,
      spotify: false,
      nytimes: false
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
      if (director && "name" in director) {
        return director.name;
      }
      return false;
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
          this.getNyTimes();
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

    getNyTimes() {
      nytimes
        .get(null, {
          params: {
            query: this.movie.title,
            "opening-date": this.movie.release_date
          }
        })
        .then(res => {
          console.log(res);
          this.nytimes = res.data;
        });
    },

    getIso(code) {
      const details = iso.whereAlpha2(code);
      return details.country;
    }
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
    Pills: () => import("../components/Utility/Pills.vue"),
    AddToFavorites: () => import("../components/Movie/AddToFavorites.vue"),
    AddToWatchlist: () => import("../components/Movie/AddToWatchlist.vue"),
    MovieRating: () => import("../components/Movie/Rating"),
    PersonList: () => import("../components/People/List")
  }
};
</script>

<style lang="postcss">
.movie {
  position: relative;

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
      width: 300px;
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
      font-size: 2.5rem;
      line-height: 1;
      letter-spacing: -0.15rem;
      margin: 0;
    }

    &__tagline {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      margin: 0;
      font-weight: 800;
    }

    &__director {
      font-weight: 200;
      margin: 0 0 2rem;
      font-style: italic;
      font-size: 0.8rem;

      span {
        font-weight: 500;
        font-style: normal;
      }
    }

    &__overview {
      font-weight: 300;
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }

  &__actions {
    display: flex;
    margin: 1rem 0;
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

.alternative-titles {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  li {
    display: flex;
    justify-content: space-between;
  }

  em {
    color: rgba(255, 255, 255, 0.2);
  }
}
</style>

<style scoped>
.loader {
  position: fixed;
  left: 50%;
  top: 50%;
}
</style>