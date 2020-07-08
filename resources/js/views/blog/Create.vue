<template>
  <v-container>
    <vf-form v-model="blogData" :config="config"></vf-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    config: {
      title: true,
      description: true,
      categories: true,
      premium: true,
      imageInput: true,
      focus: "description"
    },
    blogData: {}
  })
};
</script>
