<template>
  <div>
    <v-row justify="center">
      <v-card-title class="headline">Create New Blog</v-card-title>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitCreateBlog">
      <v-text-field
        v-model="form.title"
        :rules="rules.title"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="form.description"
        :rules="[v => !!v || 'A description is required']"
        label="Description"
        auto-grow
        required
      ></v-textarea>

      <v-select
        v-model="form.category"
        :items="categories"
        :rules="[v => !!v || 'Category is required']"
        label="Category"
        required
      ></v-select>

      <v-checkbox v-model="form.premium" label="Premium Content?"></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        :loading="buttonLoading"
        type="submit"
      >Save Blog</v-btn>

      <p v-for="(error, index) in errors.submitForm" :key="index" class="red--text">{{ error[0] }}</p>

      <!-- <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn> -->

      <!-- <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn> -->
    </v-form>
  </div>
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
    form: {
      title: "",
      description: "",
      category: null,
      premium: false
    },
    rules: { 
      title: [],
    // description: "",
    // emailRules: [
    //   v => !!v || "E-mail is required",
    //   v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],
    // category: null
    // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    // checkbox: false
    },
  }),
  computed: {
    ...mapGetters({
      getCategories: "categories/categories",
      buttonLoading: "buttonLoading",
      role: "auth/role"
    }),
    categories() {
      return this.getCategories.map(cat => cat.name);
    }
  },
  methods: {
    ...mapActions({
        createBlog: "blogs/createBlog",
        setButtonLoading: "setButtonLoading"
      },
    ),
    submitCreateBlog() {
      this.errors.submitForm = ''
      this.rules.title = [
        v => !!v || "A title is required",
        v => (v && v.length >= 5) || "Title must be at least 5 characters"
      ]
      if (this.$refs.form.validate()) {
        this.setButtonLoading();
        this.createBlog(this.form)
          .then(() => {
            // this.$router.push({
            // name: "",
            // query: { just_registered: true }
            // });
          })
          .catch(error => {
            // if (error.response.status === 429) {
            //   this.errors.registerForm = [[error.response.statusText]];
            // } else if (error.response.status === 403) {
            //   this.setSnackbar(error.response.data.message);
            //   this.$router.push({ name: this.role + "dashboard" });
            // } else {
            //   this.errors.registerForm = error.response.data.errors;
            // }
          })
          .finally(() => {
            this.setButtonLoading();
          });
      } else {
        this.errors.submitForm = [["Something went wrong with validating."]];
      }
    }
  }
};
</script>

