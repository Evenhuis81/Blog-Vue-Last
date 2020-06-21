<template>
    <div>
        <h2>Author Dashboard, userId = {{ id }}</h2>
        <!-- <v-btn :to="{ path: `/user/${userId}/createblog` }" rounded color="primary" dark>Create Blog></v-btn> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: ['id'],
    // data: {
        // return: {
            //
        // }
    // },
    computed: {
        ...mapGetters({
            userId: "auth/userId",
        })
    }
}
</script>
