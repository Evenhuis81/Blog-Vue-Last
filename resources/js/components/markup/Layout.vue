<template>
  <div>
    <application-bar />
    <navigation-drawer />
    <snackbar />
  </div>
</template>

<script>
import ApplicationBar from "./ApplicationBar.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import Snackbar from "../Snackbar.vue";

export default {
  components: { ApplicationBar, NavigationDrawer, Snackbar }
};
</script>
