<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense>
      <v-divider></v-divider>

      <v-list-item-group color="primary">
        <v-list-item :to="{ path: '/author/' + userId + '/profile' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Your Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class></v-divider>

        <v-subheader class="mt-7">Blog Actions:</v-subheader>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="mt-8">Blog Actions:</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->

        <!-- <v-title class="black--text ml-5">Blog Actions:</v-title> -->

        <v-list-item
          v-for="(item, i) in blogActions"
          :key="i"
          router
          :to="{ name: item.path, params: { id: userId } }"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- <v-list dense>
      <v-checkbox v-model="all" label="ALL" value="all" :disabled="true" hide-details></v-checkbox>
      <v-divider></v-divider>
      <v-checkbox dense v-model="selected" label="John" value="John" hide-details></v-checkbox>
      <v-checkbox dense v-model="selected" label="Jacob" value="Jacob" hide-details></v-checkbox>
    </v-list>-->
    <!-- <v-col class="mt-5 ml-5 pb-0">
      <v-title>Blog Actions:</v-title>
    </v-col>-->
    <!-- <v-divider></v-divider> -->
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  data() {
    return {
      // selected: [],
      // all: ["all"]
      // drawer: false
      // item: 1,
      blogActions: [
        {
          text: "Create",
          icon: "mdi-plus",
          path: "createblog"
        },
        {
          text: "Read",
          icon: "mdi-file",
          path: "readblogindex"
        },
        {
          text: "Update",
          icon: "mdi-update",
          path: "editblogindex"
        },
        {
          text: "Delete",
          icon: "mdi-delete",
          path: "deleteblogindex"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      //   { userVerified: "auth/userVerified",
      authenticated: "auth/authenticated",
      userId: "auth/userId",
      navigationDrawer: "layoutelements/getNavigationDrawer",
      categories: "categories/categories"
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
