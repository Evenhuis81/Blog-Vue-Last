<template>
  <v-container>
    <v-card v-if="blogs.length" class="mx-auto mt-7" max-width="1000">
      <v-img
        class="white--text align-end"
        height="400px"
        :src="blog.imagepath ? '/storage/' + blog.imagepath : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
      >
        <v-card-title>
          {{ blog.title }}
          <span
            style="color: #FFD700"
          >{{ blog.premium ? "&nbsp; (premium article)" : "" }}</span>
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-2">
        {{ blogCategories(blog.id).toString() }}
        <v-btn icon v-if="userId == blog.owner_id" :to="{ path: '/categories' }">
          <v-icon color="primary" size="18">mdi-grease-pencil</v-icon>
        </v-btn>
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div class>by {{ blog.owner.name }}</div>
        <div>{{ underscore }}</div>
        <div>{{ blog.description }}</div>
      </v-card-text>

      <v-card-actions v-if="userId == blog.owner_id">
        <v-btn
          @click="
              $router.push({
                  name: 'updateblog',
                  params: { id: blog.id }
              })
          "
          color="primary"
          text
        >Edit</v-btn>
        <v-btn :loading="btnLoad" @click="blogDelete(blog.id)" text outlined class="ml-auto">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["id"],
  computed: {
    ...mapGetters({
      blogs: "blogs/blogs",
      getBlog: "blogs/blog",
      blogCategories: "blogs/blogCategories",
      userId: "auth/userId",
      btnLoad: "btnLoad"
    }),
    blogImage() {
      return "https://cdn.vuetifyjs.com/images/cards/docks.jpg";
    },
    blog() {
      return this.getBlog(this.id);
    },
    underscore() {
      let under = "";
      for (let i = 0; i < this.blog.owner.name.length; i++) {
        under += "--";
      }
      return under;
    }
  },
  methods: {
    ...mapActions({
      deleteBlog: "blogs/deleteBlog",
      switchBtnLoad: "switchBtnLoad",
      snackbar: "snackbar/snackbar"
    }),
    blogDelete(blogId) {
      const answer = window.confirm("Do you really want to delete this blog?");
      if (answer) {
        this.switchBtnLoad;
        // need to set some sort of load thing here
        this.deleteBlog(blogId)
          .then(() => {
            this.$router.push({ name: "myblogs" });
            this.snackbar({
              text: "Blog Deleted!",
              color: "warning",
              y: "bottom"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.switchBtnLoad();
          });
      }
    }
  }
};
</script>
