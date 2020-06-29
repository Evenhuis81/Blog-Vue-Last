<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense>
      <v-divider></v-divider>

      <v-list-item-group color="primary">
        <v-list-item :to="{ name: 'dashboard' }">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <div v-if="userRole === 'author'" class="mt-6">
          <!-- <v-subheader class="mt-7">Blog Actions:</v-subheader> -->
          <v-list-item v-for="(item, i) in actions" :key="i" :to="{ name: item.route }">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-subheader class="mt-7">Category Actions:</v-subheader> -->
          <!-- <v-list-item
            v-for="(catItem, index) in categoryActions"
            :key="'A' + index"
            :to="{ name: catItem.route }"
          >
            <v-list-item-icon>
              <v-icon v-text="catItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="catItem.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </div>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      actions: [
        { text: "My Blogs", icon: "mdi-folder-multiple-outline", route: "myblogs" },
        // { text: "Create New Blog", icon: "mdi-plus", route: "createblog" },
        { text: "Manage Categories", icon: "mdi-dresser", route: "categories" },
        // { text: "Create New Category", icon: "mdi-plus", route: "createcategory" },
      ]
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      userRole: "auth/userRole",
      navigationDrawer: "layoutelements/getNavigationDrawer"
    })
  }
};
</script>
