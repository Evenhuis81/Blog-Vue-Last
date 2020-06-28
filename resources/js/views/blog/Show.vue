<template>
  <v-container>
    <v-card v-if="blogs.length" class="mx-auto mt-7" max-width="1000">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ blog.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{ blog.category.name }}
        <v-btn icon v-if="userId == blog.owner_id">
          <v-icon color="primary" size="18">mdi-grease-pencil</v-icon>
        </v-btn>  
      </v-card-subtitle>
      
      <!-- <v-card-subtitle class="pb-2">{{ $route.params.id }}</v-card-subtitle> -->

      <v-card-text class="text--primary">
        <div class>by {{ blog.owner.name }}</div>
        <div>{{ underscore }}</div>
        <div>{{ blog.description }}</div>
      </v-card-text>

      <v-card-actions v-if="userId == blog.owner_id">
        <v-btn color="primary" text>Edit</v-btn>
        <v-btn text outlined class="ml-auto">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["id"],
  computed: {
    ...mapGetters({
      blogs: "blogs/blogs",
      getBlog: "blogs/blog",
      userId: 'auth/userId'
      }),
    blog() {
      return this.getBlog(this.id)
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
