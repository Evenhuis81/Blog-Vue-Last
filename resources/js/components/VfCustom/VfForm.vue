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
      ref="description"
      v-model="data.description"
      :rules="rules.description"
      label="Description"
      auto-grow
      rows="1"
      outlined
      required
    ></v-textarea>

    <!-- <span class="grey--text">Categories:</span> -->
    <v-subheader style="height: 20px" class="px-1">Categories</v-subheader>
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
      :disabled="!valid || !rules.category"
      color="primary"
      class="mr-4"
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
    form: {
      title: "",
      description: "",
      category_ids: [],
      premium: false
    },
    rules: {
      title: [],
      description: [],
      categories: []
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
      this.rules.categoriesinputRules = [
        v => {
          if (!v || v.length < 1) return "Input is required";
          else if (v.length > 0) {
            for (let i = 0; i < v.length; i++) {
              if (v[i].length > 9) return "Invalid Number";
            }
          } else return true;
        }
      ];
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
      // this.form.category_ids.length ? console.log("yes") : console.log("no");
      return;

      // let self = this;
      setTimeout(function() {
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
              }).bind(self);
            })
            .catch(error => {
              if (error.response.status === 429) {
                this.errors.submitForm = [[error.response.statusText]];
              } else if (error.response.status === 403) {
                this.snackbar({
                  text: error.response.data.message,
                  color: "error",
                  y: "bottom"
                });
              } else {
                this.errors.submitForm = error.response.data.errors;
              }
            })
            .finally(() => {
              this.setBtnLoad();
            });
        }
      });
    }
  },
  mounted() {
    this.$refs[this.config.focus].focus();
    this.$refs["title"].focus();
  }
};
</script>