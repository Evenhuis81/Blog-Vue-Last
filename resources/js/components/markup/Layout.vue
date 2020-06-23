<template>
  <div>
    <!-- Layout Elements -->
    <application-bar />
    <navigation-drawer />
    <bottom-navigation />
  </div>
</template>

<script>
import ApplicationBar from "./ApplicationBar.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import BottomNavigation from "./BottomNavigation.vue";

export default {
  components: { ApplicationBar, NavigationDrawer, BottomNavigation }
};
</script>
