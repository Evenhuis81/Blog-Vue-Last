<template>
  <v-container>
    <div v-if="!authorBlogs.length">You don't have any blogs yet</div>
    <div v-else>
      <v-card
        v-for="(item, index) in authorBlogs"
        :key="index"
        class="mx-auto pb-0 my-10"
        max-width="900"
      >
        <v-hover v-slot:default="{ hover }">
          <v-system-bar :window="hover ? true : false" height="30" color="#BBDEFB">
            <v-icon @click="$router.push({ path: '/categories' })">mdi-circle-edit-outline</v-icon>
            <span>Categories</span>
            <v-spacer></v-spacer>
            <v-icon
              @click="$router.push({ name: 'editblog', params: { id: item.id } })"
            >mdi-square-edit-outline</v-icon>
            <span>Edit Blog</span>
            <v-spacer></v-spacer>
            <span class="mr-2">Delete Blog</span>
            <v-icon @click="blogDelete(item.id)">mdi-close-box-outline</v-icon>
          </v-system-bar>
        </v-hover>
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ item.created_at }}</v-card-subtitle>
        <v-card-subtitle class="pt-0">{{ blogCategories(item.id).toString() }}</v-card-subtitle>
        <v-card-text class="overflow-y-auto" style="max-height: 44px">{{ item.description }}</v-card-text>
        <v-card-actions>
          <v-btn
            @click="$router.push({ name: 'blog', params: { id: item.id } })"
            class="ml-auto"
            text
            outlined
          >Show Blog</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    window: false,
    height: 30,
    hidden: false
  }),
  computed: {
    ...mapGetters("blogs", ["authorBlogs", "blogCategories"])
  },
  methods: {
    ...mapActions({
      deleteBlog: "blogs/deleteBlog",
      lunchRoom: "snackbar/lunchRoom"
    }),
    blogDelete(blogId) {
      const answer = window.confirm("Do you really want to delete this blog?");
      if (answer) {
        // need to set some sort of load thing here
        this.deleteBlog(blogId)
          .then(() => {
            // this.$router.push({ name: "readblog" });
            this.lunchRoom({
              text: "Blog Deleted!",
              color: "error"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            //
          });
      }
    }
  }
};
</script>
