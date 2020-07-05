<template>
  <v-container>

    <vf-form></vf-form>

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
      // btnLoad: "btnLoad"
    })
  },
  methods: {
    ...mapActions({
      categoryId: "categories/categoryId",
      createBlog: "blogs/createBlog",
      setBtnLoad: "setBtnLoad",
      snackbar: "snackbars/snackbar"
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
        this.setBtnLoad();
        // this.form.category = this.categoryId(this.tempCategoryName)
        this.form.category_id =
          this.categoryNames.indexOf(this.tempCategoryName) + 1;
        this.createBlog(this.form)
          .then(response => {
            this.$router.push({ name: "dashboard" });
            this.snackbar({
              text: "Blog successfully created",
              color: "success"
            });
          })
          .catch(error => {
            if (error.response.status === 429) {
              this.errors.submitForm = [[error.response.statusText]];
            } else if (error.response.status === 403) {
              this.snackbar({
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
};
</script>
