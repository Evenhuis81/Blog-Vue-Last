<template>
    <div>{{ blog(id).title }}</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: ['id'],
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters({ blog: "blogs/blog" })
    }
}
</script>