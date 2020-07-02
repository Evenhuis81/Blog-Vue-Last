<template>
  <v-snackbar :value="snackbar" :timeout="5000" top>
    {{ snackText }}
    <v-btn color="blue" text @click="setSnackbar">X</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("snackbar", ["snackbar", "snackText"]),
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbar"])
  }
}
</script>
