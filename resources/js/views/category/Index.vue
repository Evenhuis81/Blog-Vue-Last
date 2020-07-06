<template>
  <v-container>
    <h2 class="ml-3 mb-3">Categories:</h2>
    <v-row align="center">
      <v-expansion-panels popout focusable hover v-model="panel">
        <v-expansion-panel v-for="(category,i) in categories" :key="i">
          <v-expansion-panel-header class="blue--text text--lighten-2">{{ category.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="mt-2">{{ category.subheader }}</p>

            <!-- <v-btn @click="updateCategory()" text outlined>Edit</v-btn> -->

            <v-row justify="space-between">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text outlined v-bind="attrs" v-on="on" @click="fillForm(category.id)">Edit</v-btn>
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn @click="categoryDelete(category.id)" text outlined>Delete</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Edit Category</span>
                    <v-spacer></v-spacer>
                    <v-icon
                      @click="() => {
                              form2.name = ''
                              form2.subheader = ''
                              dialog = false
                    }"
                    >mdi-close</v-icon>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form
                        ref="form2"
                        v-model="valid2"
                        lazy-validation
                        @submit.prevent="submitUpdateCategory(category.id, form2)"
                      >
                        <v-text-field
                          class="mb-4 mt-4"
                          v-model="form2.name"
                          :rules="rules2.name"
                          label="Name"
                          required
                        ></v-text-field>

                        <v-textarea
                          v-model="form2.subheader"
                          :rules="rules2.subheader"
                          label="Subheader"
                          auto-grow
                          rows="1"
                          outlined
                          required
                        ></v-textarea>
                        <v-btn type="submit" color="blue darken-1" text>Save</v-btn>
                      </v-form>
                      <p
                        v-for="(error, index) in errors2"
                        :key="index"
                        class="red--text"
                      >{{ error[0] }}</p>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row v-if="showCreate" justify="center" class="mt-10 mb-5" no-gutters>
      <v-col cols="10">
        <v-form
          ref="form"
          v-model="valid"
          class="d-flex align-center"
          @submit.prevent="submitCreateCategory(form)"
        >
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
            :disabled="!valid2 || (!form.subheader || !form.name)"
            :loading="btnLoad"
            type="submit"
            class="blue lighten-4"
          >Create</v-btn>
        </v-form>
      </v-col>
      <p v-for="(error, index) in errors" :key="index" class="red--text">{{ error[0] }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    panel: [],
    showCreate: false,
    valid: true,
    valid2: true,
    form: {
      name: "",
      subheader: ""
    },
    rules: {
      name: [],
      subheader: []
    },
    errors: "",
    errors2: "",
    form2: {
      name: "",
      subheader: ""
    },
    rules2: {
      name: [],
      subheader: []
    }
  }),
  computed: {
    ...mapGetters("categories", ["categories", "editCategoryData"]),
    ...mapGetters(["btnLoad"])
  },
  methods: {
    ...mapActions({
      createCategory: "categories/createCategory",
      updateCategory: "categories/updateCategory",
      deleteCategory: "categories/deleteCategory",
      setBtnLoad: "setBtnLoad",
      snackbar: "snackbar/snackbar"
    }),
    submitCreateCategory(form) {
      this.errors = "";
      this.rules.name = [];
      this.rules.subheader = [];
      this.rules.name = [v => !!v || "A name is required"];
      this.rules.subheader = [
        v => !!v || "A subheader is required",
        v => (v && v.length >= 8) || "Subheader must be at least 8 characters"
      ];
      let self = this;
      setTimeout(function() {
        if (self.$refs.form.validate()) {
          self.setBtnLoad();
          self
            .createCategory(form)
            .then(response => {
              self.snackbar({
                text: "You have successfully created a category",
                color: "success"
              });
              self.dialog = false;
            })
            .catch(error => {
              if (error.response.status === 429) {
                self.errors = [[error.response.statusText]];
              } else if (error.response.status === 403) {
                self.snackbar({
                  text: error.response.data.message,
                  color: "error"
                });
              } else {
                self.errors = error.response.data.errors;
              }
            })
            .finally(() => {
              self.setBtnLoad();
            });
        }
      });
    },
    fillForm(categoryId) {
      this.form2 = this.editCategoryData(categoryId);
    },
    submitUpdateCategory(categoryId, form2) {
      this.errors2 = "";
      if (
        JSON.stringify(this.form2) ===
        JSON.stringify(this.editCategoryData(categoryId))
      ) {
        this.errors2 = [["You haven't changed anything!"]];
        return;
      }
      this.rules2.title = [v => !!v || "A title is required"];
      this.rules2.subheader = [
        v => !!v || "A subheader is required",
        v =>
          (v && v.length >= 8) ||
          "SubheaderDescription must be at least 8 characters"
      ];
      // console.log(this.$refs.form2[0])
      // return
      let self = this;
      setTimeout(function() {
        if (self.$refs.form2[0].validate()) {
          self.setBtnLoad();
          self
            .updateCategory({ form: form2, id: categoryId })
            .then(response => {
              self.snackbar({
                text: "You have successfully updated a category",
                color: "info"
              });
              self.dialog = false;
            })
            .catch(error => {
              if (error.response.status === 429) {
                self.errors = [[error.response.statusText]];
              } else if (error.response.status === 403) {
                self.snackbar({
                  text: error.response.data.message,
                  color: "error"
                });
              } else {
                self.errors = error.response.data.errors;
              }
            })
            .finally(() => {
              self.setBtnLoad();
            });
        }
      });
    },
    categoryDelete(id) {
      const answer = window.confirm(
        "Do you really want to delete this category?"
      );
      if (answer) {
        // need to set some sort of load thing here
        this.deleteCategory(id)
          .then(() => {
            this.none();
            this.snackbar({
              text: "Category Deleted!",
              color: "error",
              y: "bottom"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            //
          });
      }
    },
    none() {
      this.panel = [];
    }
  },
  created() {
    setTimeout(() => {
      this.showCreate = true;
    }, 1000);
  }
};
</script>