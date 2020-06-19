<template>
  <v-navigation-drawer app clipped :value="navigationDrawer">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <!-- <v-col class="mt-5" align="center" v-else-if="authenticated">
      <img src="/storage/2786494-200.png" height="50" alt="avatar" />
      <p class="title mt-1">{{ user.name }}</p>
    </v-col>-->

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group class="mt-2" color="primary">
        <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item router to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  data() {
    return {
      // drawer: false
    };
  },
  computed: {
    ...mapGetters({
      //   { userVerified: "auth/userVerified",
      //     authenticated: "auth/authenticated",
      // userid: "auth/userid",
      navigationDrawer: "layoutelements/getNavigationDrawer"
    })
    // navigationDrawerModel: {
    //   get() {
    //     return this.navigationDrawer;
    //   },
    //   set(newValue) {
    //     if (newValue === false) {
    //       this.setNavigationDrawer();
    //     }
    //   }
    // }
  },
  methods: {
    // ...mapActions({ setNavigationDrawer: "layoutelements/setNavigationDrawer" })
  }
};
</script>
