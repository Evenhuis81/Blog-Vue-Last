<template>
  <div>
    <v-container v-if="blogs.length">
      <v-pagination v-model="page" :length="Math.ceil(blogs.length/perPage)"></v-pagination>
      <v-row justify="center" v-for="rowNr in Math.ceil((visibleBlogs.length/2))" :key="rowNr">
        <v-col cols="5" v-for="colNr in 2" :key="colNr">
          <v-card
            outlined
            :to="{ name: 'blog', params: { id: currentBlog(rowNr, colNr).id}}"
            class="blue lighten-5"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-row>
                  <v-col cols="6" class="py-0">
                    <div class="overline mb-4">by {{ currentBlog(rowNr, colNr).owner.name }}</div>
                  </v-col>
                  <v-col cols="6" class="py-0">
                    <div
                      class="overline mb-4 text-right"
                    >{{ blogCreatedFromNow(currentBlog(rowNr, colNr).created_at) }}</div>
                  </v-col>
                </v-row>
                <v-list-item-title class="headline mb-1">{{ currentBlog(rowNr, colNr).title }}</v-list-item-title>
                <v-list-item-subtitle>{{ currentBlog(rowNr, colNr).description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

    <script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      page: 1,
      perPage: 8
    };
  },
  computed: {
    ...mapGetters({ blogs: "blogs/blogs",
                    categories: "categories/categories"}),
    visibleBlogs() {
      if (this.page * this.perPage > this.blogs.length) {
        return this.blogs.slice(
          (this.page - 1) * this.perPage,
          this.blogs.length
        );
      }
      return this.blogs.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    }
  },
  methods: {
    blogCreatedFromNow(date) {
      return this.$moment(date).fromNow();
    },
    currentBlog(row, col) {
      return this.visibleBlogs[(row - 1) * 2 + (col - 1)];
    }
  },
};
</script>
