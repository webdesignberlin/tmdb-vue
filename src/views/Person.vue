<template>
  <div class="movie_backdrop" >
    <v-container grid-list-md>
      <h1 v-if="person" v-html="person.name" class="mb-4 mt-4 display-3 font-weight-thin"></h1>
      <v-layout row wrap v-if="person">
        <v-flex xs3>
          <v-card>
            <v-tooltip top>
              <v-card-media
                slot="activator"
                :src="helpers.poster(person.profile_path)"
                height="420px"
              >

              </v-card-media>
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
          {{ person.biography }}


          <v-divider class="mt-3 mb-3"></v-divider>

        </v-flex>

      </v-layout>
      <!-- <movie-grid
        v-if="movie"
        block_title='You might also enjoy...'
        :api_request="'movie/' + movie.id + '/recommendations'"
        :limitResults="6"
        :cardsPerRow="6"
        :showMeta="false"
        :pagination="false" /> -->

      <div class="text-xs-center" v-if="!person">
        <Loader />
      </div>

    </v-container>
  </div>
</template>

<script>
import helpers from '../helpers.js';
import MovieGrid from '../components/MovieGrid.vue';
import Loader from '../components/Loader.vue';

export default {
  data() {
    return {
      personId: 0,
      person: false,
      helpers
    }
  },

  beforeMount() {

  },

  mounted() {
    this.personId = this.$route.params.slug;
    this.getPerson();
  },

  methods: {
    getPerson() {
      axios.get(`person/${this.personId}`, {
        params: {
          'append_to_response': 'movie_credits,images,tagged_images'
        }
      })
        .then(response => {
          this.person = response.data;
        });
    }
  },

  components: {
    Loader
  }
}
</script>