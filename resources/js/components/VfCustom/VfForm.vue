<template>
  <v-form ref="form" lazy-validation @submit.prevent="submitForm">
    <v-text-field
      v-if="config.title"
      ref="title"
      class="mb-4 mt-4"
      v-model="data.title"
      :rules="rules.title"
      label="Title"
      required
    ></v-text-field>

    <v-textarea
      v-if="config.description"
      ref="description"
      v-model="data.description"
      :rules="rules.description"
      label="Description"
      auto-grow
      rows="1"
      outlined
      required
    ></v-textarea>

    <v-subheader v-if="config.categories" style="height: 20px" class="px-2">Categories</v-subheader>
    <v-chip-group
      v-if="config.categories"
      v-model="data.category_ids"
      :rules="rules.categories"
      column
      multiple
      active-class="blue--text text--accent-4"
    >
      <v-chip
        v-for="(category, index) in categories"
        :key="index"
        :value="category.id"
        filter
        outlined
      >{{ category.name }}</v-chip>
    </v-chip-group>

    <v-checkbox v-if="config.premium" class="mb-4" v-model="data.premium" label="Premium Content?"></v-checkbox>

    <v-subheader style="height: 20px" class="px-2">Image Upload</v-subheader>
    <v-file-input
      v-model="data.image"
      v-if="config.imageInput"
      accept="image/*"
      :rules="rules.image"
      label="Choose an Image"
    ></v-file-input>

    <v-btn
      :disabled="!valid || !rules.categories"
      color="primary"
      class="mt-5 mr-4"
      :loading="btnLoad"
      type="submit"
    >Save Blog</v-btn>

    <p v-for="(error, index) in errors.submitForm" :key="index" class="red--text">{{ error[0] }}</p>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // props: ["formType"],
  model: {
    prop: "data",
    event: "update"
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    valid: true,
    rules: {
      title: [],
      description: [],
      categories: [],
      image: [
        value =>
          !value ||
          value.size < 5000000 ||
          "Image size should be less than 5 MB!"
      ]
    },
    errors: {
      submitForm: ""
    }
  }),
  computed: {
    ...mapGetters({ btnLoad: "btnLoad", categories: "categories/categories" })
  },
  methods: {
    submitForm() {
      // this.rules.categoriesinputRules = [
      //   v => {
      //     if (!v || v.length < 1) return "Input is required";
      //     else if (v.length > 0) {
      //       for (let i = 0; i < v.length; i++) {
      //         if (v[i].length > 9) return "Invalid Number";
      //       }
      //     } else return true;
      //   }
      // ];
      this.errors.submitForm = "";
      this.rules.title = [
        v => !!v || "A title is required",
        v => (v && v.length >= 5) || "Title must be at least 5 characters"
      ];
      this.rules.description = [
        v => !!v || "A description is required",
        v =>
          (v && v.length >= 10) || "Description must be at least 10 characters"
      ];
      this.rules.categories = [v => !!v || "a cat is req"];
      // this.form.category_ids.length ? console.log("yes") : console.log("no");
      // return;

      console.log(this.data);

      // let self = this;
      // setTimeout(function() {
      // if (self.$refs.form.validate()) {
      //   console.log("ey");
      //   this.setBtnLoad();
      //   // this.form.category = this.categoryId(this.tempCategoryName)
      //   this.data.category_id =
      //     this.categoryNames.indexOf(this.tempCategoryName) + 1;
      //   this.createBlog(this.form)
      //     .then(response => {
      //       this.$router.push({ name: "dashboard" });
      //       this.snackbar({
      //         text: "Blog successfully created",
      //         color: "success"
      //       }).bind(self);
      //     })
      //     .catch(error => {
      //       if (error.response.status === 429) {
      //         this.errors.submitForm = [[error.response.statusText]];
      //       } else if (error.response.status === 403) {
      //         this.snackbar({
      //           text: error.response.data.message,
      //           color: "error",
      //           y: "bottom"
      //         });
      //       } else {
      //         this.errors.submitForm = error.response.data.errors;
      //       }
      //     })
      //     .finally(() => {
      //       this.setBtnLoad();
      //     });
      // }
      // });
    }
  },
  mounted() {
    this.$refs[this.config.focus].focus();
    this.$refs["title"].focus();
  }
};
</script>