<template>
  <v-card v-if="blogs.length" class="mx-auto" max-width="1200">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ blog.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-2">{{ blog.category.name }}</v-card-subtitle>
    <!-- <v-card-subtitle class="pb-2">{{ $route.params.id }}</v-card-subtitle> -->

    <v-card-text class="text--primary">
      <div class>by {{ blog.owner.name }}</div>
      <div>{{ underscore }}</div>
      <div>{{ blog.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text>Share</v-btn>

      <v-btn color="orange" text>Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["id"],
  computed: {
    ...mapGetters({ blogs: "blogs/blogs" }),
    blog() {
      return this.blogs.find(x => x.id == this.id);
    },
    underscore() {
      let under = "";
      for (let i = 0; i < this.blog.owner.name.length; i++) {
        under += "--";
      }
      return under;
    }
  }
};
</script>
