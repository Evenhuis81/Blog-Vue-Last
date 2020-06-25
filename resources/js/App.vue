<template>
  <!-- Mount point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />

    <!-- Main Content Area -->
    <v-content class="grey lighten-5 ma-2">
      <!-- On Screen Popups -->
      <dialogs-snackbars />
      <!-- Back Button / General Navigation / Search -->
      <!-- <nav-search-bar /> -->
      <!-- Content Loading Line On Top of Page -->
      <v-progress-linear indeterminate :active="this.$store.state.contentLoading" absolute top></v-progress-linear>
      <!-- Routes -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout";
import DialogsSnackbars from "./components/DialogsSnackbars";
import NavSearchBar from "./components/NavSearchBar";

export default {
  components: { Layout, DialogsSnackbars }
};
</script>
