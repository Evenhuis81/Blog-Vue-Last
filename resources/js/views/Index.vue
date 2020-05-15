<template>
  <div>
    <v-container>
      <!-- <v-card class="ma-3"> -->
      <v-row>
        <v-col v-for="(category, index) in fiveRandomCategories" :key="index">{{ category }}</v-col>
      </v-row>
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar size="125" tile>
          <v-img src="https://picsum.photos/200"></v-img>
        </v-avatar>
        <v-card-title></v-card-title>
      </div>
      <!-- </v-card> -->
    </v-container>
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
    ...mapGetters(["blogs", "categories", "fiveRandomCategories"])
    // how to combine array and object in map?
    // fiveRandomCategories() {
    //
    // }
  },
  mounted() {
    // this.getBlogs();
    // this.$store.dispatch("fetchCategories");
    // setTimeout(() => {
    this.$store.dispatch("getBlogs");
    this.$store.dispatch("getCategories");
    // }, 1000);
  }
};
</script>
