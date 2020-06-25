<template>
  <v-app-bar app clipped-left color="primary" dark>
    <!-- Left: NavigationDrawer toggle icon & Logo with Home link -->
    <v-app-bar-nav-icon v-show="authenticated" @click="switchNavigationDrawer"></v-app-bar-nav-icon>
    <router-link :to="{ path: '/' }" exact class="d-flex align-center">
      <v-img src="/storage/logo_inverted.png" height="35" contain width="55"></v-img>
    </router-link>
    <!-- Center: App Title -->
    <v-spacer></v-spacer>
    <v-toolbar-title class="ml-4 white--text" v-text="spaTitle"></v-toolbar-title>
    <!-- Right: Login- register- & usericons/menus -->
    <v-spacer></v-spacer>
    <user-navigation></user-navigation>
    <v-progress-linear indeterminate :active="true" absolute bottom></v-progress-linear>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import UserNavigation from "../user/UserNavigation.vue";
import { SPA_TITLE } from "../../constants";

export default {
  components: { UserNavigation },
  data: () => ({
    spaTitle: SPA_TITLE
  }),
  computed: {
    ...mapGetters({
      // appBarNavIcon: "layoutelements/getAppBarNavIcon",
      authenticated: "auth/authenticated"
    })
  },
  methods: {
    ...mapActions({
      switchNavigationDrawer: "layoutelements/switchNavigationDrawer"
    })
  }
};
</script>
