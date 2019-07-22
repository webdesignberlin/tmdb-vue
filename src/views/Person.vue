<template>
  <div class="movie_backdrop">
    <v-container grid-list-md>
      <h1 v-if="person" v-html="person.name" class="mb-4 mt-4 display-3 font-weight-thin"></h1>
      <div row wrap v-if="person">
        <div>
          <img :src="helpers.poster(person.profile_path)" height="420px" />

          <div>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <!-- <v-btn icon>
                <v-icon>share</v-icon>
            </v-btn>-->
          </div>
        </div>

        <v-flex xs9 pl-5>
          {{ person.biography }}
          <v-divider class="mt-3 mb-3"></v-divider>
        </v-flex>
      </div>
      <movie-grid
        v-if="person"
        block_title="You might also enjoy..."
        :api_request="'person/' + person.id + '/combined_credits'"
        :limitResults="1000"
        :cardsPerRow="6"
        :showMeta="false"
        :pagination="false"
      />

      <div class="text-xs-center" v-else>
        <Loader />
      </div>
    </v-container>
  </div>
</template>

<script>
import MovieGrid from "../components/MovieGrid.vue";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      personId: 0,
      person: false,
      helpers
    };
  },

  beforeMount() {},

  mounted() {
    this.personId = this.$route.params.slug;
    this.getPerson();
  },

  methods: {
    getPerson() {
      axios
        .get(`person/${this.personId}`, {
          params: {
            append_to_response: "movie_credits,images,tagged_images"
          }
        })
        .then(response => {
          this.person = response.data;
        });
    }
  },

  components: {
    Loader,
    MovieGrid
  }
};
</script>