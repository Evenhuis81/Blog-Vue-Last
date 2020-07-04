<template>
  <v-container>
    <h2>Update Blog</h2>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitUpdateBlog">
      <v-text-field
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

      <v-chip-group
        v-model="form.category_ids"
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

      <v-checkbox class="mb-4" v-model="form.premium" label="Premium Content?"></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        :loading="btnLoad"
        type="submit"
      >Save Blog</v-btn>

      <p
        v-for="(error, index) in errors.submitForm"
        :key="index"
        class="red--text mt-2"
      >{{ error[0] }}</p>
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
      category_ids: null,
      premium: null
    },
    rules: {
      title: [],
      description: []
    },
    errors: {
      submitForm: ""
    }
  }),
  computed: {
    ...mapGetters({
      getBlog: "blogs/blog",
      blogCategories: "blogs/blogCategories",
      // blogCategoriesIds: "blogs/blogCategoriesIds",
      categoryNames: "categories/categoryNames",
      categories: "categories/categories",
      btnLoad: "btnLoad",
      editFormData: "blogs/editFormData"
    }),
    blog() {
      return this.getBlog(this.id);
    }
  },
  methods: {
    ...mapActions({
      updateBlog: "blogs/updateBlog",
      lunchRoom: "snackbar/lunchRoom",
      setBtnLoad: "setBtnLoad"
    }),
    submitUpdateBlog() {
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
        // check if input has changed
        if (
          JSON.stringify(this.form) ===
          JSON.stringify(this.editFormData(this.id))
        ) {
          this.errors.submitForm = [["You haven't changed anything!"]];
          return;
        }
        this.setBtnLoad();
        this.updateBlog({ form: this.form, id: this.id })
          .then(response => {
            this.$router.push({ name: "blog", params: { id: this.id } });
            this.lunchRoom({
              text: "You have successfully edited your blog",
              color: "success"
            });
          })
          .catch(error => {
            if (error.response.status === 429) {
              this.errors.submitForm = [[error.response.statusText]];
            } else if (error.response.status === 403) {
              this.lunchRoom({
                text: error.response.data.message,
                color: "error"
              });
            } else {
              this.errors.submitForm = error.response.data.errors;
            }
          })
          .finally(() => {
            this.setBtnLoad();
          });
      }
    }
  },
  created() {
    this.form = this.editFormData(this.id);
  }
};
</script>