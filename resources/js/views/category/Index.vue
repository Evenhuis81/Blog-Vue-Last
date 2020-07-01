<template>
  <v-container>
    <h2 class="ml-3 mb-3">Categories:</h2>
    <v-row align="center">
      <v-expansion-panels
        popout
        focusable
        hover
        v-model="panel"
      >
        <v-expansion-panel
          v-for="(category,i) in categories"
          :key="i"
        >
          <v-expansion-panel-header class="blue--text text--lighten-2">{{ category.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="mt-2">{{ category.subheader }}</p>


            <!-- <v-btn @click="updateCategory()" text outlined>Edit</v-btn> -->

            <v-row justify="space-between">
              <v-dialog v-model="dialog" persistent max-width="600px">
                
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  >
                  Edit
                  </v-btn>
                  <!-- <v-spacer></v-spacer> -->
                  <v-btn @click="deleteCategory(category.id)" text outlined>Delete</v-btn>
            
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Legal last name*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['0-17', '18-29', '30-54', '54+']"
                            label="Age*"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interests"
                            multiple
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row v-if="showCreate" justify="center" class="mt-10 mb-5" no-gutters>
      <v-col cols="10">
          <v-form ref="form" v-model="valid" class="d-flex align-center" @submit.prevent="submitCreateCategory(form)">
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
      dialog: false,
      panel: [],
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
                      deleteCategory: "categories/deleteCategory",
                      setButtonLoading: "setButtonLoading",
                      setSnackbar: "snackbar/setSnackbar"
      }),
      submitCreateCategory(form) {
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
      },
      categoryDelete(id) {
        const answer = window.confirm("Do you really want to delete this category?");
        if (answer) {
          console.log('sure')
          // need to set some sort of load thing here
          this.deleteCategory(id)
            .then(() => {
              // this.$router.push({ name: "readblog" });
              this.none()
              this.setSnackbar("Category Deleted!")
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              //
            });
        }
      },
      none() {
        this.panel= []
      }
    },
    created() {
      setTimeout(() => {
        this.showCreate = true
      }, 1000)
    }
  }
</script>