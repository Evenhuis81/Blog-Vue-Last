<template>
  <v-container>
    <h2>Dashboard</h2>
    <h3>Id: {{ userId }}</h3>
    <h4>Role: {{ userRole }}</h4>
    <h5>Name: {{ userName }}</h5>
    <h6>Premium: {{ userPremium }}</h6>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["userId", "userRole", "userName", "userPremium"])
  }
};
</script>
