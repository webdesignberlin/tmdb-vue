<template>
  <div class="card card--person">
    <router-link :to="'/person/'+person.id" class="cardLink">
      <figure class="cardPoster" :style="`background-image: url(${poster(person.profile_path)});`" />
      <div class="cardDetails">
        <div class="cardDetails__pad">
          <h3 class="cardDetails__title">
            <span v-if="$store.state.mode === 'search'" class="cardDetails__type">[PEOPLE]</span>
            {{ person.name }}
          </h3>
          <ul v-if="person.known_for" class="cardDetails__knownFor">
            <li
              v-for="m in person.known_for.slice(0,3)"
              :key="m.id"
              class="cardDetails__knownFor__item"
            >{{ m.title ? m.title : m.name }}</li>
          </ul>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../assets/css/card.css";
</style>