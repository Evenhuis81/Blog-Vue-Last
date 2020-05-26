<template>
  <v-snackbar :value="snackbar" :timeout="2000" top>
    {{ snackText }}
    <v-btn color="blue" text @click="setSnackbar">X</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      snackbar: "snackbar/snackbar",
      snackText: "snackbar/snackText"
    })
  },
  methods: {
    ...mapActions({
      setSnackbar: "snackbar/setSnackbar"
    })
  }
};
</script>