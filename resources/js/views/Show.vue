<template>
  <v-card v-if="blogs.length"
    class="mx-auto"
    max-width="1200"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <!-- <v-card-title>{{ getBlog(11).title }}</v-card-title> -->
      <v-card-title>{{ blog.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ blog.category.name }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>by {{ blog.owner.name }}</div>

      <div>{{ blog.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
  props: ['id'],
  data() {
    return {
      // blog: null
      // routeid: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({ blogs: "blogs/blogs" }),
    blog() {
      return this.blogs[this.id];
    }
  },
  methods: {
    // ...mapActions({setBlog: "blogs/setBlog"})
    // setBlog() {
      // console.log(this.$store.getters['blogs/getBlog'](11));
      // this.blog = "yes";
      // console.log(this.blog)
      // this.blog = this.getBlog(25);

    // }
  },
  created() {
    // console.log(getBlog(2))
    // this.blog = getBlog(2);
    // conmsoslethis.id
    

  },
  mounted() {
    // console.log(this.id);
    // this.setBlog(this.id);
  }
}
</script>