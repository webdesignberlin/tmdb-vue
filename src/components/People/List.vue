<template>
  <ul
    class="people-list"
    v-bind:class="{
      'people-list--stacked': stacked === '',
      'people-list--typeMovie' : type === 'movie'
    }"
  >
    <li class="people-list__item" v-for="(person, i) in people" :key="`${person.id}-${i}`">
      <router-link class="people-list__item__a" :to="`/${ type }/${person.id}`">
        <div class="people-list__item__image" :style="'background-image: url('+image(person)+');'">
          <fa-icon
            class="people-list__imageIcon"
            :icon="['fal', 'popcorn']"
            v-show="!person.profile_path && type !== 'movie'"
          />
        </div>
        <div class="details">
          <strong v-html="name(person)"></strong>
          <em>
            <ul class="details__roles">
              <li
                class="details__roles__role"
                v-for="(role, i) in role(person)"
                :key="`role-${i}`"
              >{{ role }}</li>
            </ul>
          </em>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      required: true
    },
    stacked: {
      type: String,
      required: false
    },
    nameKey: {
      type: String,
      default: "name",
      required: false
    },
    type: {
      type: String,
      default: "person",
      required: false
    },
    limit: {
      type: Number,
      requird: false
    }
  },

  computed: {
    people() {
      return this.limit ? this.source.splice(0, this.limit) : this.source;
    }
  },

  methods: {
    role(person) {
      let roles = "character" in person ? person.character : person.job;
      return roles;
    },

    image(person) {
      if (!person) {
        return false;
      }
      return "profile_path" in person
        ? this.castImg(person.profile_path)
        : this.castImg(person.poster_path);
    },

    name(person) {
      return person[this.nameKey];
      return this.type === "movie"
        ? `${
            person[this.nameKey]
          } <span class="people-list__mediaType">[movie]</span>`
        : person[this.nameKey];
    }
  }
};
</script>

<style lang="postcss">
.people-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  &__item {
    width: 50%;
    margin-bottom: 1rem;

    &__a {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 200;
      font-size: 0.8rem;
    }

    &__image {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      background-color: rgba(48, 48, 48, 1);
      background-color: #222;
      background-size: cover;
      background-position: center center;
      height: 70px;
      min-width: 70px;
      border-radius: 50%;
      font-size: 1.5rem;
      text-align: center;
      color: rgba(255, 255, 255, 0.1);
    }

    strong {
      display: block;
      margin-top: 0.3rem;
    }

    .details {
      padding-left: 0.75rem;
      flex: 1;

      &__roles {
        list-style: none;
        margin: 0;
        padding: 0;
        line-height: inherit;

        &__role {
          width: auto;
          display: inline-flex;
          margin: 0;

          &:after {
            content: ", ";
            margin-right: 0.25rem;
          }

          &:last-child:after {
            content: "";
            margin-right: 0;
          }
        }
      }
    }
  }

  &__mediaType {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.2);
  }

  &--stacked {
    flex-direction: column;
    flex-wrap: nowrap;

    li {
      width: 100%;
      margin-bottom: 1rem;

      .img {
        height: 50px;
        min-width: 50px;
      }
    }
  }

  &--type {
    &Movie {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1.5rem;
      .people-list__item {
        width: 100%;

        .details {
          padding-left: 0;
        }
      }

      .people-list__item__a {
        flex-direction: column;
        align-items: flex-start;
      }

      .people-list__item__image {
        border-radius: 0;
        height: auto;
        width: 100%;
        border: 0;

        &:after {
          content: "";
          display: block;
          padding-bottom: 153%;
        }
      }
    }
  }
}
</style>