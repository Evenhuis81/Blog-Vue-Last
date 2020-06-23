<template>
  <v-bottom-navigation app color="primary" :input-value="showNav">
    <v-btn v-for="(item, index) in items" :key="index" router :to="{ name: item.path }">
      <span>{{ item.name }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      activeBtn: 1,
      showNav: false,
      items: [
        { name: "Home", path: "index", icon: "mdi-home" },
        { name: "About", path: "about", icon: "mdi-information" }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.showNav = true;
    }, 500);
  }
};
</script>
