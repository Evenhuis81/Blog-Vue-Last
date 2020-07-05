<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense nav expand>
      <div v-for="item in drawerItems.main" :key="item.title">
        <vf-list-item v-if="itemAuth(item)" :listItem="item"></vf-list-item>
      </div>
      

      <!-- <div v-if="userRole === 'author'" class="mt-6">
        <vf-list-item-group :listItems="drawerItems.action"></vf-list-item-group>
      </div> -->

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
  },
  methods: {
    itemAuth(item) {
      let route = this.$router.options.routes.filter(x => x.name === item.route.name)
      let trueFalse = route.meta.scopes.map(y => y === userRole + '_access')
      console.log(trueFalse)
    }
  },
  mounted() {
    console.log(this.$router.options)
  }
};
</script>
