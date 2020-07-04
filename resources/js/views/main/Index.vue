<template>
  <v-container v-if="blogs.length">
    <v-card outlined class="mb-5" v-for="blog in blogs" :key="blog.id">
      <v-card-text class="display-1 text--primary text-center my-8">
        {{ blog.title }}
        <p class="text-center">
          {{ blogCreatedFromNow(blog.created_at) }} in
          <a
            class="text-decoration-underline"
          >{{ blogCategories(blog.id).toString() }}</a>
        </p>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle>{{ blog.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          @click="blog.premium ? switchLoginDialog() : $router.push({ path: '/blogs/' + blog.id + '/show' })"
          text
          class="mb-5"
        >READ MORE...</v-btn>
        <!-- <v-btn @click.stop="gotoBlog(blog.premium, blog.id)" text class="mb-5">READ MORE...</v-btn> -->
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("blogs", ["blogs", "blogCategories"]),
    ...mapGetters("auth", ["authenticated", "userPremium"])
  },
  methods: {
    ...mapActions(["switchLoginDialog"]),
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
  }
};
</script>
