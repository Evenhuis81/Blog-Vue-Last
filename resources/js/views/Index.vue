<template>
  <div>
    <v-card>
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-img src="https://picsum.photos/200" max-height="200" contain></v-img>
      </div>
    </v-card>
  </div>
</template>

    <script>
import { mapGetters } from "vuex";
// import { mapMutations } from "vuex";
// import * as moment from "moment";

export default {
  data() {
    return {
      //     timeout: 2000
      // blogs: null,
      // pagination: {
      //   current: 1,
      //   total: 0
      // }
    };
  },
  // name: "Blogs",
  methods: {
    // ...mapMutations({ closeSnackbar: "auth/closeSnackbar" }),
    // blogCreatedFromNow(date) {
    //   return moment(date).fromNow();
    // }
    // deleteBlog(blog) {
    //   this.$store.dispatch("deleteBlog", blog);
    // }
  },
  computed: {
    ...mapGetters({ blogs: "blogs" })
    // how to combine array and object in map?
  },
  mounted() {
    // this.getBlogs();
    // this.$store.dispatch("fetchCategories");
    // setTimeout(() => {
    this.$store.dispatch("getBlogs");
    // }, 1000);
  }
};
</script>
