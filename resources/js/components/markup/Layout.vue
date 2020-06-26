<template>
  <div>
    <!-- Layout Elements -->
    <application-bar />
    <navigation-drawer />
  </div>
</template>

<script>
import ApplicationBar from "./ApplicationBar.vue";
import NavigationDrawer from "./NavigationDrawer.vue";

export default {
  components: { ApplicationBar, NavigationDrawer }
};
</script>
