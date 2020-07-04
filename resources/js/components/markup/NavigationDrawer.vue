<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense nav>
      <vf-list-item v-for="item in drawerItems.main" :key="item.title" :listItems="item"></vf-list-item>

      <!-- <div v-if="userRole === 'author'" class="mt-6">
        <vf-list-item-group :listItems="drawerItems.blogActions"></vf-list-item-group>
      </div> -->


<v-list-group
          no-action
          v-for="(items, index) in drawerItems.action"
          :key="index"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ index.replace(/([A-Z])/g, ' $1').trim() }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in items"
            :key="'A' + i"
             :to="item.route"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>


    </v-list>

    
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    actionTitles: [
      "Blog Actions",
      "Category Actions",
      "Comment Actions"
    ],
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
