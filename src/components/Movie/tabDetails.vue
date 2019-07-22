<template>
  <v-layout row v-if="movie">
    <v-flex xs3>
      <v-card :to="{ path:'/movie/' + movie.id }">
        <v-tooltip top>
          <v-card-media slot="activator" :src="helpers.poster(movie.poster_path)" height="420px"></v-card-media>
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
          </v-btn>-->
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs9 pl-5>
      {{ movie.overview }}
      <div class="genres mt-2">
        <span v-for="genre in movie.genres" :key="genre.id">
          <router-link :to="'/genre/' + createSlug(genre.name)">{{ genre.name }}</router-link>
        </span>
      </div>

      <v-divider class="mt-3 mb-3"></v-divider>
      <strong>Release Date:</strong>
      {{ movie.release_date }}
      <br />
      <strong>Vote Average:</strong>
      {{ movie.vote_average }}
      <br />
      <strong>Vote Count:</strong>
      {{ movie.vote_count }}
      <br />

      <template v-if="movie.credits">
        <h3 class="mt-4 mb-2">Cast</h3>
        <ul class="classList">
          <li v-for="person in movie.credits.cast.slice(0, 5)" :key="person.id">
            <router-link :to="'/person/' + person.id">
              <div
                class="img"
                :style="'background-image: url('+helpers.castImg(person.profile_path)+');'"
              >&nbsp;</div>
              <div class="details">
                <strong>{{ person.name }}</strong>
                <em v-html="person.character"></em>
              </div>
            </router-link>
          </li>
        </ul>
      </template>
      <Loader v-else />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["movie"],
  data() {
    return {
      helpers
    };
  },
  mounted() {}
};
</script>