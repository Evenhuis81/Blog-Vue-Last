<template>
  <!-- Mount point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />
    
    <!-- Main Content Area -->
    <v-content class="grey lighten-5 ma-2">
      <!-- On Screen Popups, etc. -->
      <dialogs-snackbars />
      <v-progress-linear indeterminate :active="this.$store.state.loading" absolute top></v-progress-linear>
      <!-- Routes -->
        <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout";
import DialogsSnackbars from "./components/DialogsSnackbars";

export default {
  components: { Layout, DialogsSnackbars },
  created() {
    this.$store.dispatch("blogs/getBlogs")
    this.$store.dispatch("categories/getCategories")
  },
};
</script>
