<template>
  <div id="app">
    <Header />
    <SearchBar />
    <UserMenu />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {
    Header: () => import("./components/Header.vue"),
    SearchBar: () => import("./components/SearchBar.vue"),
    UserMenu: () => import("./components/User/Menu.vue")
  },

  data() {
    return {};
  }
};
</script>

<style lang="postcss">
@import "./assets/css/breakpoints.css";
@import "./assets/css/variables.css";
@import "./assets/css/forms.css";

html {
  background-color: var(--color-black);
  font-size: 18px;
  line-height: 21px;
  margin: 0;
  padding: 0;
  user-select: none;
}

body {
  overscroll-behavior-y: none;
  overscroll-behavior-x: none;
  font-size: 1rem;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2 {
  font-weight: 100;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

figure {
  margin: 0;
  padding: 0;
}

#app {
  main {
    position: fixed;
    left: var(--sidebar-width);
    top: var(--searchbar-height);
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: auto;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: var(--color-black);
    }

    &::-webkit-scrollbar {
      width: 4px;
      background-color: var(--color-black);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-primary);
      /* border: 2px solid var(--color-primary); */
    }
  }
}
</style>