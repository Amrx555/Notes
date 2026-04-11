<template>
  <div id="app">
    <NavBar />
    <router-view :search-text="searchText" @search-notes="searchNotes" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    isNotesPage() {
      return this.$route.path === "/list";
    },
  },
  methods: {
    searchNotes(text) {
      this.searchText = text;
    },
  },
};
</script>

<style>
/* إعدادات عامة للمشروع */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  background: #f4f4f4;
  direction: rtl;
}

a {
  text-decoration: none;
}

#app {
  min-height: 80vh;
}
</style>
