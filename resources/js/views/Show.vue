<template>
  <v-card
    class="mx-auto"
    max-width="1200"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <!-- <v-card-title>{{ getBlog(11).title }}</v-card-title> -->
      <v-card-title>Title</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
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

export default {
  data() {
    return {
      blog: null
      // routeid: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({getBlog: "blogs/getBlog"})
    // blog() {
      // return this.getBlog(this.$route.params.id);
    // }
  },
  methods: {
    setBlog() {
      console.log(this.$store.getters['blogs/getBlog'](11));
      this.blog = "yes";
    }
  },
  created() {
    // console.log(getBlog(2))
    // this.blog = getBlog(2);
    this.setBlog()

  }
}
</script>