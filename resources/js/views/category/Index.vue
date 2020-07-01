<template>
  <v-container>
    <h2 class="ml-3 mb-3">Categories:</h2>
    <v-row align="center">
      <v-expansion-panels
        popout
        focusable
        hover
      >
        <v-expansion-panel
          v-for="(category,i) in categories"
          :key="i"
        >
          <v-expansion-panel-header class="blue--text text--lighten-2">{{ category.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="mt-2">{{ category.subheader }}</p>
            <v-btn>PRESS</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row v-if="showCreate" justify="center" class="mt-10 mb-5" no-gutters>
      <v-col cols="10">
          <v-form ref="form" v-model="valid" class="d-flex align-center" @submit.prevent="submitCategory(form)">
            <h4 class="align-center mr-3">Create New Category:</h4>
              <v-textarea
                  hide-details="auto"
                  dense
                  outlined
                  auto-grow
                  label="Name"
                  v-model="form.name"
                  :rules="rules.name"
                  rows="1"
              ></v-textarea>
              <v-textarea
                  class="mx-2"
                  hide-details="auto"
                  dense
                  outlined
                  auto-grow
                  label="Subheader"
                  v-model="form.subheader"
                  :rules="rules.subheader"
                  rows="1"
              ></v-textarea>
              <v-btn
                  :disabled="!valid || (!form.subheader || !form.name)"
                  :loading="buttonLoading"
                  type="submit"
                    class="blue lighten-4" >Create</v-btn>
          </v-form>
      </v-col>
      <p v-for="(error, index) in errors" :key="index" class="red--text">{{ error[0] }}</p>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

  export default {
    data: () => ({
      showCreate: false,
      valid: true,
      form: {
        name: "",
        subheader: "",
      },
    rules: {
      name: [],
      subheader: []
    },
    errors: ""
    }),
    computed: {
      ...mapGetters("categories", ["categories"]),
      ...mapGetters(["buttonLoading"])
    },
    methods: {
      // ...mapActions(["setButtonLoading"]),
      ...mapActions({ createCategory: "categories/createCategory",
                      setButtonLoading: "setButtonLoading",
                      setSnackbar: "snackbar/setSnackbar"
      }),
      submitCategory(form) {
        this.errors = ""
        this.rules.name = []
        this.rules.subheader = []
        this.rules.name = [
          v => !!v || "A name is required"
        ];
        this.rules.subheader = [
          v => !!v || "A subheader is required",
          v => (v && v.length >= 8) || "Subheader must be at least 8 characters"
        ];
        let self = this
        setTimeout(function () {
          if (self.$refs.form.validate()){
            self.setButtonLoading();
            self.createCategory(form)
              .then(response => {
                self.setSnackbar("You have successfully created a category");
              })
              .catch(error => {
                if (error.response.status === 429) {
                  self.errors = [[error.response.statusText]];
                } else if (error.response.status === 403) {
                  self.setSnackbar(error.response.data.message);
                } else {
                  self.errors = error.response.data.errors;
                }
              })
              .finally(() => {
                self.setButtonLoading();
              });
          }  
        })
      }
    },
    created() {
      setTimeout(() => {
        this.showCreate = true
      }, 1000)
    }
  }
</script>