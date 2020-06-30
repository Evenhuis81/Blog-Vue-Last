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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

  export default {
    data: () => ({
      //
    }),
    computed: {
      ...mapGetters("categories", ["categories"])
    }
  }
</script>