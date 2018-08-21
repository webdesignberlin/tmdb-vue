<template>
  <div class="movie_backdrop" :style="movieBackdrop">
    <v-container grid-list-md>
      <h1 v-if="movie" v-html="movie.title + ' (' + movie.release_date.slice(0,4) + ')'" class="mb-4 mt-4 display-3 font-weight-thin"></h1>
      <v-layout row wrap v-if="movie">
        <v-flex xs3>
          <v-card :to="{ path:'/movie/' + movie.id }">
            <v-tooltip top>
              <v-card-media
                slot="activator"
                :src="helpers.poster(movie.poster_path)"
                height="420px"
              >

              </v-card-media>
              <span v-text="movie.title"></span>
            </v-tooltip>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <!-- <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs9 pl-5>
          {{ movie.overview }}

          <div class="genres mt-2">
            <span  v-for="genre in movie.genres" :key="genre.id">
              <router-link :to="'/genre/' + helpers.createSlug(genre.name)">{{ genre.name }}</router-link>
            </span>
          </div>

          <v-divider class="mt-3 mb-3"></v-divider>
          <strong>Release Date: </strong> {{ movie.release_date }}<br>
          <strong>Vote Average: </strong> {{ movie.vote_average }}<br>
          <strong>Vote Count: </strong> {{ movie.vote_count }}<br>

          <template v-if="movie.credits">
            <h3 class="mt-4 mb-2">Cast</h3>
            <ul class="classList">
              <li v-for="person in movie.credits.cast.slice(0, 5)" :key="person.id">
                <router-link :to="'/person/' + person.id">
                  <div class="img" :style="'background-image: url('+helpers.castImg(person.profile_path)+');'">&nbsp;</div>
                  <div class="details">
                    <strong>{{ person.name }}</strong>
                    <em v-html="person.character"></em>
                  </div>
                </router-link>
              </li>
            </ul>
          </template>
          <Loader v-else/>

        </v-flex>

      </v-layout>
      <movie-grid
        v-if="movie"
        block_title='You might also enjoy...'
        :api_request="'movie/' + movie.id + '/recommendations'"
        :limitResults="6"
        :cardsPerRow="6"
        :showMeta="false"
        :pagination="false" />

      <div class="text-xs-center" v-if="!movie">
        <Loader />
      </div>

    </v-container>
  </div>
</template>

<script>
import helpers from '../helpers.js';
import MovieGrid from '../components/MovieGrid.vue';
import Loader from '../components/Loader.vue';
import axios2 from 'axios';
import isEmpty from 'lodash.isempty';

export default {
  data() {
    return {
      movie: false,
      helpers
    }
  },

  beforeMount() {
    this.getMovieDetails(this.$route.params.id);
  },

  computed: {
    movieBackdrop() {
      if ( this.movie ) {
        let image = helpers.backdrop(this.movie.backdrop_path);
        return `background-image: url(${image});`;
      } else {
        return '';
      }
    }
  },

  methods: {
    getMovieDetails(id) {
      axios.get(`movie/${id}`, {
        params: {
          'append_to_response': 'credits,images,videos'
        }
      }).
        then((result) => {
          this.movie = result.data;
        })
    },
  },

  beforeRouteUpdate (to, from, next) {
    this.getMovieDetails(to.params.id);
  },

  components: {
    MovieGrid,
    Loader
  }
}
</script>

<style>
.movie_backdrop {
  background-size: cover;
  background-position: center center;
  position: relative;
}

.movie_backdrop > .container {
  position: relative;
  z-index: 1;
}

.movie_backdrop:before {
  content: "";
  position: absolute;
  background: linear-gradient(to bottom, rgba(48,48,48,0.85) 0, rgba(48,48,48,1) 100%);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}

.classList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.classList li {
  display: flex;
  align-items: stretch;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
}

.classList li strong {
  display: block;
}

.classList li div.img {
  border: 2px solid white;
  background-color: rgba(48,48,48,1);
  background-size: cover;
  background-position: center center;
  height: 55px;
  width: 55px;
  border-radius: 50%;
}

.classList li div.details {
  padding-left: 0.5rem;
}

.genres span:after {
  content: ", ";
}

.genres span:last-child:after {
  content: "";
}
</style>