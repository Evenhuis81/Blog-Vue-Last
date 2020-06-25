<template>
  <v-container>
    <div>
      <h2>Hello {{ userName }}</h2>
    </div>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  props: ["id"],
  data() {
    return {
      // dashboardActive: true,
    };
  },
  computed: {
    ...mapGetters({
      userName: "auth/userName"
      // dashboard: "dashboard"
    })
  },
  methods: {
    // ...mapActions(["setDashboard"]),
    // createBlog() {
    //   this.setDashboard(false);
    //   this.$router.push({ path: `/author/${this.id}/createblog` });
    // }
  },
  created() {
    if (this.$route.query.new_blog) {
      // this.just_registered = true;
    }
  }
};
</script>
