<template>
    <v-container>
        <vf-form v-model="blogData" :config="config"></vf-form>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: ["id"],
    data: () => ({
        config: {
            type: "updateBlog",
            title: true,
            description: true,
            categories: true,
            premium: true,
            // TODO change Image File: complicated , name check, size check, etc.
            // imageInput: true,
            focus: "title"
        },
        blogData: null,
    }),
    computed: {
        ...mapGetters("blogs", ["updateFormData"])
    },
    created() {
        this.updateFormData = this.updateFormData(this.id);
    }
};
</script>
