<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
        prepend-icon="local_movies"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Movies</v-list-tile-title>
        </v-list-tile>

          <v-list-group
            no-action
            sub-group
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Genres</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-if="genres"
              v-for="genre in genres"
              :key="genre.id"
              :to="'/genre/' + helpers.createSlug(genre.name)"
            >
              <v-list-tile-title v-text="genre.name"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" class="white--text" style="text-decoration: none;">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import helpers from './helpers.js';

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'list',
        title: 'Home',
        path: '/'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Movies',
      genres: false,
      helpers
    }
  },

  beforeMount() {
    this.getGenres();
  },

  methods: {
    getGenres() {
      axios.get(`genre/movie/list`).
        then((result) => {
          this.genres = result.data.genres;
          for(let i=0; i<this.genres.length; i++) {
            this.genres[i].slug = helpers.createSlug(this.genres[i].name);
          }
        })
    }
  },

  watch: {
    genres() {
      localStorage.setItem('genres', JSON.stringify(this.genres));
    }
  }
}
</script>
