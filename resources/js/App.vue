<template>
  <v-app>
    <Navbar />
    <v-content>
      <!-- <loading-dialog /> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
// import LoadingDialog from "./components/LoadingDialog";

export default {
  components: { Navbar }
};
</script>
