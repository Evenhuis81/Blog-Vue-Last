<template>
  <v-navigation-drawer app clipped :value="navigationDrawer" v-if="authenticated">
    <v-col class="mt-5" align="center">
      <img src="/storage/navdrawerlogo_1833982-200.png" height="50" alt="avatar" />
    </v-col>

    <v-list dense nav>
      <!-- <v-divider></v-divider> -->

      <!-- <vf-list-item :title="routes.dashboard.title" :icon="routes.dashboard.icon" :route="routes.dashboard.route"></vf-list-item> -->

      <vf-list-item v-for="item in drawerItems.main" :key="item.title" :listItems="item"></vf-list-item>
      <!-- <vf-list-item :listItems="drawerItems.main.blogs"></vf-list-item> -->

      <!-- <v-divider></v-divider> -->

      <!-- <div v-if="userRole === 'author'" class="mt-6">
        <vf-list-item-group :listItems="drawerItems.blogActions"></vf-list-item-group>
      </div> -->


    <!-- <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(crud, i) in cruds"
            :key="i"
            :to="{ path: '/myblogs' }"
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list-group> -->

    </v-list>

    
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    cruds: [
      ['Create', 'mdi-plus'],
      ['Read', 'mdi-folder'],
      ['Update', 'update'],
      ['Delete', 'delete'],
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
