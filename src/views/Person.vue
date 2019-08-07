<template>
  <div class="person">
    <div class="person__backdrop image__backdrop" :style="personBackdrop" v-if="person"></div>
    <div v-if="person">
      <div class="person__details">
        <div class="row">
          <div class="person__details--left">
            <img class="person__details__poster" :src="poster(person.profile_path)" />

            <div class="person__actions">
              <!-- <AddToFavorites :movie="movie" />
              <AddToWatchlist :movie="movie" />-->
            </div>
          </div>

          <div class="person__details--right">
            <h1 class="person__details__title">{{ person.name }}</h1>

            <h3 v-if="getPrimaryRole(person)" class="person__details__role">
              <span>{{ getPrimaryRole(person) }}</span>
            </h3>

            <section class="person__details__overview">{{ person.biography }}</section>

            <tabs :options="{ useUrlFragment: false }">
              <tab name="Cast Credits" v-if="person.movie_credits.cast.length > 0">
                <PersonList
                  :source="getConsolidatedCredits(person.movie_credits.cast)"
                  type="movie"
                  nameKey="title"
                />
              </tab>
              <tab name="Crew Credits" v-if="person.movie_credits.crew.length > 0">
                <PersonList
                  :source="getConsolidatedCredits(person.movie_credits.crew)"
                  type="movie"
                  nameKey="title"
                />
              </tab>
              <tab name="Images">
                <silentbox-group>
                  <silentbox-item
                    v-for="(image, i) in [...person.images.profiles, ...person.tagged_images.results]"
                    :src="poster(image.file_path)"
                    description="Sunken dreams II. by Arbebuk"
                    :key="`image-${i}`"
                  >
                    <img :src="poster(image.file_path)" width="200px" style="height: auto;" />
                  </silentbox-item>
                </silentbox-group>
              </tab>
              <tab name="Other">
                <ul class="property-list">
                  <li>
                    <strong>Birthday</strong>
                    <em>{{ person.birthday }}</em>
                  </li>
                  <li>
                    <strong>Birthplace</strong>
                    <em>{{ person.place_of_birth }}</em>
                  </li>
                  <li>
                    <strong>Also Known As</strong>
                    <ul class="alternative-titles">
                      <li v-for="(t,i) in person.also_known_as" :key="`aka-${i}`">{{ t }}</li>
                    </ul>
                  </li>
                </ul>
              </tab>
            </tabs>

            <!-- <section class="person__videos" v-if="movie.videos.results">
              <h3 class="sectionHeader">Videos</h3>
              <silentbox-single
                v-for="(v, i) in movie.videos.results"
                :src="`https://www.youtube.com/watch?v=${v.key}`"
                :description="v.name"
                :key="'video-'+i"
              />
            </section>-->
          </div>
        </div>
      </div>
    </div>
    <div class="text-xs-center" v-else>
      <Loader />
    </div>

    <!-- <MovieGrid
      v-if="movie && movie.similar.results"
      block_title="You might also enjoy..."
      :staticMovies="movie.similar.results"
      :limitResults="6"
      :cardsPerRow="6"
      :showMeta="false"
      :pagination="false"
    />-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      personId: 0,
      person: false,
      omdbData: false
    };
  },

  beforeMount() {},

  mounted() {
    this.personId = this.$route.params.slug;
    this.getPerson();
  },

  computed: {
    personBackdrop() {
      if (this.person && this.person.tagged_images.results.length > 0) {
        let image = this.backdrop(
          this.person.tagged_images.results[0].file_path
        );
        return `background-image: url(${image});`;
      } else {
        return "";
      }
    }
  },

  methods: {
    getPerson() {
      axios
        .get(`person/${this.personId}`, {
          params: {
            append_to_response:
              "movie_credits,images,tagged_images,combined_credits"
          }
        })
        .then(response => {
          this.person = response.data;
        });
    }
  },

  components: {
    Loader: () => import("../components/Loader.vue"),
    MovieGrid: () => import("../components/MovieGrid.vue"),
    PersonList: () => import("../components/People/List")
  }
};
</script>

<style lang="postcss" scoped>
.person {
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

    &__poster {
      box-shadow: 0 0 2rem rgba(#111, 0.5);
    }

    &__title {
      font-size: 2.5rem;
      line-height: 1;
      letter-spacing: -0.15rem;
      margin: 0;
    }

    &__overview {
      font-weight: 300;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-top: 1rem;
    }

    &__role {
      font-weight: 200;
      margin: 0 0 2rem;
      font-style: italic;
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.1rem;
      font-style: normal;
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
</style>

<style scoped>
.loader {
  position: fixed;
  left: 50%;
  top: 50%;
}
</style>