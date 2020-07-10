<template>
  <v-container>
    <vf-form v-model="blogData" :config="config" v-on:success="showCreation"></vf-form>
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
      // default value, if no selection on form, there'd be no premium property
      premium: false
    }
  }),
  methods: {
    showCreation(id) {
      this.$router.push({ name: "blog", params: { id: id } });
    }
  }
};
</script>
