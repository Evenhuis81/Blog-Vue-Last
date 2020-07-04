<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <!-- <v-list dense>
      <v-divider></v-divider>

      <vf-list-item :title="routes.dashboard.title" :icon="routes.dashboard.icon" :route="routes.dashboard.route"></vf-list-item>

      <v-divider></v-divider>

      <div v-if="userRole === 'author'" class="mt-6">
        <vf-list-item-group :listItems="routes.blogActions"></vf-list-item-group>
      </div>

    </v-list> -->

    <v-list>
      <v-list-group
        v-model="routes.dashboard.active"
        :prepend-icon="routes.dashboard.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="routes.dashboard.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item :to="'/'" exact>
          <v-list-item-content>
            <v-list-item-title v-text="routes.blogActions[0].title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
        ],
    };
  },
  computed: {
    ...mapGetters({
      routes: "routes/routes",
      authenticated: "auth/authenticated",
      userRole: "auth/userRole",
      navigationDrawer: "layoutelements/getNavigationDrawer"
    })
  }
};
</script>
