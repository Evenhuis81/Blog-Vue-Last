<template>
  <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="submitForm">
    <v-text-field
      v-if="config.title"
      v-model="data.title"
      :rules="rules.title"
      ref="title"
      class="mb-4 mt-4"
      label="Title"
      required
    ></v-text-field>

    <v-textarea
      v-if="config.description"
      v-model="data.description"
      :rules="rules.description"
      label="Description"
      auto-grow
      rows="1"
      outlined
      required
    ></v-textarea>

    <v-subheader v-if="config.categories" style="height: 20px" class="px-1 mt-7">Categories</v-subheader>
    <v-select
      v-if="config.categories"
      v-model="data.categories"
      :rules="rules.categories"
      :items="categoryNames"
      :menu-props="{ maxHeight: '300' }"
      label="Select"
      multiple
      hint="Choose 1 - 3 Categories"
      persistent-hint
      required
    ></v-select>

    <v-checkbox v-if="config.premium" v-model="data.premium" class="my-10" label="Premium Content?"></v-checkbox>

    <v-subheader v-if="config.imageInput" style="height: 20px" class="px-1 mt-7">Image Upload</v-subheader>
    <v-file-input
      v-if="config.imageInput"
      v-model="data.imageInput"
      accept="image/*"
      :rules="rules.image"
      label="Select"
      required
    ></v-file-input>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mt-5 mr-4"
      :loading="btnLoad"
      type="submit"
    >{{ config.type }}</v-btn>

    <p v-for="(error, index) in errors" :key="index" class="red--text">{{ error[0] }}</p>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
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
    rules: {},
    errors: {}
  }),
  computed: {
    ...mapGetters({
      btnLoad: "btnLoad",
      getRules: "blogs/getRules",
      categoryNames: "categories/categoryNames"
    })
  },
  methods: {
    ...mapActions({
      createBlog: "blogs/createBlog",
      updateBlog: "blogs/updateBlog",
      switchBtnLoad: "switchBtnLoad",
      snackbar: "snackbar/snackbar"
    }),
    submitForm() {
      this.errors = "";
      this.rules = this.getRules;
      var vm = this;
      setTimeout(function() {
        if (vm.$refs.form.validate()) {
          vm.switchBtnLoad();

          // dynamic dispatch to create/edit blog
          vm[vm.config.type](vm.data)
            .then(res => {
              console.log(res);
              vm.$emit("success", res);
              vm.snackbar({
                text: vm.config.type + " successfull",
                color: "success"
              });
            })
            .catch(err => {
              console.log("catch");
              // vm.errors
            })
            .finally(() => {
              vm.switchBtnLoad();
            });
        }
      });
    }
  },
  mounted() {
    this.$refs[this.config.focus].focus();
    // TODO make (global?) function (dynamic)
    if (this.config.type === "update") {
      this.tempCategories = this.categories
        .filter(cat => this.data.category_ids.includes(cat.id))
        .map(x => x.name);
    }
  }
};
</script>
