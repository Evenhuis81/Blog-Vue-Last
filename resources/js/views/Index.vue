<template>
  <div>
    <v-container v-if="blogs.length">
      <!-- <v-card class="ma-3"> -->
      <!-- <v-row>
        <v-col v-for="(category, index) in fiveRandomCategories" :key="index">{{ category }}</v-col>
      </v-row>-->
      <v-row justify="center" v-for="rowNr in 2" :key="rowNr">
        <v-col cols="4" v-for="columnNr in 2" :key="columnNr">
          <v-card
            outlined
            :to="{ name: 'blog', params: { id: visibleBlogs[(rowNr - 1) * 2 + (columnNr - 1)].id}}"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div
                  class="overline mb-4"
                >{{ visibleBlogs[(rowNr - 1) * 2 + (columnNr - 1)].title }}</div>
                <!-- <div v-text="n-1"></div>
                <div v-text="o-1"></div>-->
                <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <!-- <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar size="125" tile>
          <v-img src="https://picsum.photos/200"></v-img>
        </v-avatar>
        <v-card-title></v-card-title>
      </div>-->

      <!-- </v-card> -->
      <!-- <div v-for="(blog, index) in visiblePages" :key="index">{{ blog.id }}</div> -->

      <v-pagination v-model="page" :length="Math.ceil(blogs.length/perPage)"></v-pagination>
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
      page: 1,
      perPage: 4
      // pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
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
    bloggy(n, o) {
      return (n - 1) * 2 + (o - 1);
    }
    // ...mapMutations({ closeSnackbar: "auth/closeSnackbar" }),
    // blogCreatedFromNow(date) {
    //   return moment(date).fromNow();
    // }
    // deleteBlog(blog) {
    //   this.$store.dispatch("deleteBlog", blog);
    // }
  },
  computed: {
    ...mapGetters(["blogs", "categories", "fiveRandomCategories"]),
    visibleBlogs() {
      return this.blogs.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    }
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
