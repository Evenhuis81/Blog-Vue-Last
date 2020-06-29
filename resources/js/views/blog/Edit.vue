<template>
  <v-container>
    <h2>Edit Blog</h2>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitEditBlog">
      <v-text-field
        ref="title"
        class="mb-4 mt-4"
        v-model="form.title"
        :rules="rules.title"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="form.description"
        :rules="rules.description"
        label="Description"
        auto-grow
        rows="1"
        outlined
        required
      ></v-textarea>

      <v-select v-model="tempCategoryName" :items="categoryNames" label="Category" required></v-select>

      <v-checkbox class="mb-4" v-model="form.premium" label="Premium Content?"></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        :loading="buttonLoading"
        type="submit"
      >Save Blog</v-btn>

      <p v-for="(error, index) in errors.submitForm" :key="index" class="red--text">{{ error[0] }}</p>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  props: ["id"],
  data: () => ({
    valid: true,
    form: {
      title: "",
      description: "",
      category_id: null,
      premium: null
    },
    rules: {
      title: [],
      description: []
    },
    tempCategoryName: "",
    errors: {
      submitForm: ""
    }
  }),
  computed: {
    ...mapGetters({
      getBlog: "blogs/blog",
      categoryNames: "categories/categoryNames",
      categories: "categories/categories",
      buttonLoading: "buttonLoading",
      editFormData: "blogs/editFormData"
    }),
    blog() {
      return this.getBlog(this.id);
    }
  },
  methods: {
    ...mapActions({
      editBlog: "blogs/editBlog",
      setSnackbar: "snackbar/setSnackbar",
      setButtonLoading: "setButtonLoading"
    }),
    submitEditBlog() {
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
      if (this.$refs.form.validate()) {
        this.setButtonLoading();
        this.form.category_id = this.categories.find(
          cat => cat.name === this.tempCategoryName
        ).id;
        // check if input has changed
        if (
          JSON.stringify(this.form) ===
          JSON.stringify(this.editFormData(this.id))
        ) {
          this.errors.submitForm = [["You haven't changed anything!"]];
          this.setButtonLoading();
          return;
        }
        this.editBlog({ form: this.form, id: this.id })
          .then(response => {
            this.$router.push({ name: "blog", params: { id: this.id } });
            this.setSnackbar("You have successfully edited your blog");
          })
          .catch(error => {
            if (error.response.status === 429) {
              this.errors.submitForm = [[error.response.statusText]];
            } else if (error.response.status === 403) {
              this.setSnackbar(error.response.data.message);
            } else {
              this.errors.submitForm = error.response.data.errors;
            }
          })
          .finally(() => {
            this.setButtonLoading();
          });
      }
    }
  },
  created() {
    this.form = this.editFormData(this.id);
    this.tempCategoryName = this.getBlog(this.id).category.name;
  }
};
</script>