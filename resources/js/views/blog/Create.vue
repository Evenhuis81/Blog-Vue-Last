<template>
  <v-container>
    <!-- <v-row justify="center"> -->
    <!-- </v-row> -->
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitCreateBlog">
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

      <v-select
        v-model="tempCategoryName"
        :items="categoryNames"
        :rules="rules.category"
        label="Category"
        required
      ></v-select>

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
  data: () => ({
    valid: true,
    errors: {
      submitForm: ""
    },
    tempCategoryName: "",
    form: {
      title: "",
      description: "",
      category_id: null,
      premium: false
    },
    rules: {
      title: [],
      description: [],
      category: []
    }
  }),
  computed: {
    ...mapGetters({
      categoryNames: "categories/categoryNames",
      buttonLoading: "buttonLoading"
    })
  },
  methods: {
    ...mapActions({
      categoryId: "categories/categoryId",
      createBlog: "blogs/createBlog",
      setButtonLoading: "setButtonLoading",
      lunchRoom: "snackbar/lunchRoom"
    }),
    submitCreateBlog() {
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
      this.rules.category = [v => !!v || "A category is required"];
      if (this.$refs.form.validate()) {
        this.setButtonLoading();
        // this.form.category = this.categoryId(this.tempCategoryName)
        this.form.category_id =
          this.categoryNames.indexOf(this.tempCategoryName) + 1;
        this.createBlog(this.form)
          .then(response => {
            this.$router.push({ name: "dashboard" });
            this.lunchRoom({
              text: "Blog successfully created",
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
            this.setButtonLoading();
          });
      }
    }
  },
  mounted() {
    this.$refs.title.focus();
  }
};
</script>
