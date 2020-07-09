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
      type: "create",
      title: true,
      description: true,
      categories: true,
      premium: true,
      imageInput: true,
      // buttonTxt: "Save Blog",
      focus: "title"
    },
    blogData: {
      title: "Example 1",
      description: "Eeexxxxample 1",
      premium: false
      // image: []
    }
  })
};
</script>
