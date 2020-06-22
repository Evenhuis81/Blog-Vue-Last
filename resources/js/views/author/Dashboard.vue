<template>
    <v-container>

        <v-tabs fixed-tabs>
            <v-tab to="createblog">Create Blog</v-tab>
            <v-tab to="/">Edit Blog</v-tab>
        </v-tabs>


        <!-- <div v-show="dashboard">
            <h2>Hello {{ userName }}</h2>
            <h3>What would you like to do?</h3>
            <v-btn @click="createBlog()" outlined color="primary">Create Blog</v-btn>
        </div> -->
        <router-view></router-view>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
    props: ['id'],
    data () {
      return {
        // dashboardActive: true,
      }
    },
    computed: {
        ...mapGetters({ userName: 'auth/userName', dashboard: 'dashboard'})
    },
    methods: {
        ...mapActions(['setDashboard']),
        createBlog() {
            this.setDashboard(false)
            this.$router.push({ path: `/author/${this.id}/createblog` })
        }
    }
}
</script>
