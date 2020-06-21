<template>
    <v-container>
        <div v-show="dashboardActive">
            <h2>Hello {{ userName }}</h2>
            <h3>What would you like to do?</h3>
            <v-btn outlined color="primary" dark>Create Blog</v-btn>
        </div>
        <router-view></router-view>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: ['id'],
    data () {
      return {
        // dashboardActive: true,
      }
    },
    computed: {
        ...mapGetters({ userName: 'auth/userName', dashboardActive: 'dashboardActive'})
    }
}
</script>
