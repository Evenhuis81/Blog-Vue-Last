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
      <v-col cols="8">
          <v-form class="d-flex align-center" @submit.prevent="submitCategory">
              <v-textarea
                  hide-details="auto"
                  dense
                  outlined
                  auto-grow
                  label="Title"
                  v-model="form.description"
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
                  rows="2"
              ></v-textarea>
              <v-btn
                  :disabled="!form.description || !form.subheader"
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

  export default {
    data: () => ({
      showCreate: false,
      form: {
        title: '',
        subheader: ''
      },
      errors: ''
    }),
    computed: {
      ...mapGetters("categories", ["categories"]),
      ...mapGetters(["buttonLoading"])
    },
    created() {
      setTimeout(() => {
        this.showCreate = true
      }, 1000)
    }
  }
</script>