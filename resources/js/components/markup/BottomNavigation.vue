<template>
  <v-bottom-navigation app color="primary">
    <!-- <v-btn v-for="(item, index) in items" :key="index" :to="{ name: item.pathname }" exact>
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn> -->

    <v-btn to="/" exact>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
      items: [
        { name: "Home", pathname: "index", icon: "mdi-home" },
        { name: "About", pathname: "about", icon: "mdi-information" }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.showNav = true;
    }, 1000);
  }
};
</script>
