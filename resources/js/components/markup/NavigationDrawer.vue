<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense nav expand>
      <vf-list-item v-for="item in drawerItems.main" :key="item.title" :listItems="item"></vf-list-item>

      <div v-if="userRole === 'author'" class="mt-6">
        <vf-list-item-group :listItems="drawerItems.action"></vf-list-item-group>
      </div>

    </v-list>

    
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      drawerItems: "routes/routes",
      authenticated: "auth/authenticated",
      userRole: "auth/userRole",
      navigationDrawer: "layoutelements/getNavigationDrawer"
    })
  }
};
</script>
