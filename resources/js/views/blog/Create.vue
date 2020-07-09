<template>
    <v-container>
        <vf-form v-model="blogData" :config="config"></vf-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        config: {
            type: "createBlog",
            title: true,
            description: true,
            categories: true,
            premium: true,
            imageInput: true,
            focus: "title"
        },
        blogData: {
            premium: false
        }
    })
};
</script>
