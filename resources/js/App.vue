<template>
  <!-- Mount Point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />
    <!-- Main Content Area -->
    <v-main class="grey lighten-5 ma-2">
      <!-- Dialogs -->
      <dialogs />
      <!-- Content Loading Indicator On Top Of Page -->
      <v-progress-linear indeterminate :active="this.$store.state.contentLoad" absolute top></v-progress-linear>
      <!-- Routes -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout";
import Dialogs from "./components/Dialogs";

export default {
  components: { Layout, Dialogs }
};
</script>
