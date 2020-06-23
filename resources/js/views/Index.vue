<template>
  <v-container v-if="blogs.length">
    <v-card outlined class="mb-5" v-for="blog in blogs" :key="blog.id">
      <v-card-text class="pa-0">
        <p class="display-1 text--primary text-center my-8">{{ blog.title }}</p>
        <p class="text-center">
          {{ blogCreatedFromNow(blog.created_at) }} in
          <a class="text-decoration-underline">{{ blog.category.name }}</a>
        </p>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle>{{ blog.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn :to="{ path: '/blog/' + blog.id }" text class="mb-5">READ MORE...</v-btn>
      </v-card-actions>
      <v-card-actions class="px-8">
        <v-list-item-content>
          <v-list-item-title>
            by
            <a>{{ blog.owner.name }}</a>
          </v-list-item-title>
        </v-list-item-content>
        <v-row align="center">
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">{{ randomnr() }}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">share</span>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // page: 1,
      // perPage: 8
    };
  },
  computed: {
    ...mapGetters({ blogs: "blogs/blogs" })
    // categories: "categories/categories"}),
    // visibleBlogs() {
    //   if (this.page * this.perPage > this.blogs.length) {
    //     return this.blogs.slice(
    //       (this.page - 1) * this.perPage,
    //       this.blogs.length
    //     );
    //   }
    //   return this.blogs.slice(
    //     (this.page - 1) * this.perPage,
    //     this.page * this.perPage
    //   );
    // }
  },
  methods: {
    randomnr() {
      return Math.floor(Math.random() * 255) + 1;
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    },
    blogCreatedFromNow(date) {
      return this.$moment(date).fromNow();
    }
    // currentBlog(row, col) {
    //   return this.visibleBlogs[(row - 1) * 2 + (col - 1)];
    // }
  }
};
</script>
