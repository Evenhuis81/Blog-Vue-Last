<template>
  <v-snackbar
    centered
    absolute
    v-model="snackbar"
    :color="color"
    :timeout="timeout"
  >
    {{ text }}
    <!-- <template v-slot:action="{ attrs }"> -->
    <v-btn dark text @click="snackbar = false">ose</v-btn>
    <!-- </template> -->
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("snackbar", [
      "getSnackbar",
      "centered",
      "color",
      "text",
      "timeout",
      "absolute",
      "x",
      "y"
    ]),
    snackbar: {
      get() {
        return this.getSnackbar;
      },
      set(value) {
        this.setSnackbar(value);
      }
    }
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbar"])
  }
};
</script>
