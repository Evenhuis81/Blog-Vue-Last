<template>
  <!-- Mount Point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />
    <!-- Main Content Area -->
    <v-content class="grey lighten-5 ma-2">
      <!-- On Screen Popups -->
      <dialogs-snackbars />
      <!-- <login-dialog/> -->
      <!-- Content Loading Indicator On Top Of Page -->
      <v-progress-linear indeterminate :active="this.$store.state.contentLoading" absolute top></v-progress-linear>
      <!-- Routes -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout"
import DialogsSnackbars from "./components/DialogsSnackbars"
// import LoginDialog from "./components/LoginDialog"

export default {
  components: { Layout, DialogsSnackbars }
}
</script>
