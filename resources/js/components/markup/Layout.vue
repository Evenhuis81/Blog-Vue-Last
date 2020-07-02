<template>
  <div>
    <!-- Layout Elements -->
    <application-bar />
    <navigation-drawer />
    <!-- <snackbar /> -->
  </div>
</template>

<script>
import ApplicationBar from "./ApplicationBar.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
// import Snackbar from "../Snackbar";

export default {
  components: { ApplicationBar, NavigationDrawer }
  // components: { ApplicationBar, NavigationDrawer, Snackbar }
};
</script>
