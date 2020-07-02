<template>
  <!-- Mount Point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />
    <!-- Main Content Area -->
    <v-content class="grey lighten-5 ma-2">
      <!-- On Screen Popups -->
      <snackbars />
      <!-- Dialogs -->
      <dialogs />
      <!-- Content Loading Indicator On Top Of Page -->
      <v-progress-linear indeterminate :active="this.$store.state.contentLoading" absolute top></v-progress-linear>
      <!-- Routes -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout"
import Snackbars from "./components/Snackbars"
import Dialogs from "./components/Dialogs"

export default {
  components: { Layout, Snackbars, Dialogs }
}
</script>
