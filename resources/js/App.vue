<template>
  <!-- Mount point Vuetify Components -->
  <v-app>
    <!-- Application Markup -->
    <layout />
    <!-- Main Content Area -->
    <v-content class="grey lighten-5">
      <!-- On Screen Popups, etc. -->
      <dialogs-snackbars />
      <!-- Routes -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Layout from "./components/markup/Layout";
import DialogsSnackbars from "./components/DialogsSnackbars";

export default {
  components: { Layout, DialogsSnackbars }
};
</script>
