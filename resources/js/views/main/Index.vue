<template>
  <v-container v-if="blogsNewOld.length">
    <v-row>
      <v-col cols="2">
        <v-card>
          <v-container fluid>
            <!-- <p>{{ categoryNames[0] }}</p> -->
            <!-- <v-checkbox
              :input-value="selected.length === categories.length"
              :indeterminate="categories.length > selected.length && !!selected.length"
              label="All Categories"
            ></v-checkbox>
            <v-divider></v-divider>-->
            <v-checkbox
              v-for="category in categories"
              :key="category.id"
              v-model="selected"
              :label="category.name"
              :value="category.name"
            ></v-checkbox>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="10">
        <div v-for="blog in blogsNewOld" :key="blog.id">
          <v-card v-if="selectedBlog(blog)" outlined class="mb-5">
            <v-card-text class="display-1 text--primary text-center my-8">
              {{ blog.title }}
              <p class="text-center">
                {{ blogCreatedFromNow(blog.created_at) }} in
                <span
                  class="text-decoration-underline"
                >{{ blogCategories(blog.id).toString() }}</span>
              </p>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-subtitle>{{ blog.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                @click="blog.premium ? switchDialog() : $router.push({ path: '/blogs/' + blog.id + '/show' })"
                text
                class="mb-5"
              >READ MORE...</v-btn>
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

              <v-list-item-action v-if="blog.premium">
                <!-- <v-btn icon> -->
                <v-icon color="#FFD700">mdi-lumx</v-icon>
                <!-- </v-btn> -->
              </v-list-item-action>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selected: []
    };
  },
  computed: {
    ...mapGetters("blogs", ["blogsNewOld", "blogCategories"]),
    ...mapGetters("auth", ["authenticated", "userPremium"]),
    ...mapGetters("categories", ["categories", "categoryNames"]),
    selectedBlog(blog) {
      // const blogCat = blog.categories.map(x => x).includes(y)
      // this.selected.map()
    }
  },
  methods: {
    ...mapActions(["switchDialog"]),
    // ...mapActions("categories", ["getCategories"]),
    // asdf(dsf) {
    //   console.log(dsf);
    // },
    randomnr() {
      return Math.floor(Math.random() * 255) + 1;
    },
    blogCreatedFromNow(date) {
      return this.$moment(date).fromNow();
    },
    gotoBlog(premium, id) {
      this.authenticated ? console.log("yes") : console.log("no");
      console.log(premium);
      this.userPremium ? console.log("yes") : console.log("no");
      this.$router.push({ path: "/blog/" + id });
    }
  },
  created() {
    // this.getCategories().then(() => {
    this.selected = this.categoryNames;
    // console.log(this.blogsNewOld)
    // });
  }
};
</script>
