<template>
    <div>{{ blog.title }}</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: ['id'],
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters({ getBlog: "blogs/blog" }),
        blog() {
            return this.getBlog(this.id)
        }
    },
}
</script>