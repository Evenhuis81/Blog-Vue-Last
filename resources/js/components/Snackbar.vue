<template>
  <v-snackbar
    :absolute="absolute"
    :centered="centered"
    v-model="snackbar"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
  >
    {{ text }}
    <!-- <template v-slot:action="{ attrs }"> -->
    <v-btn dark text @click="snackbar = false">Close</v-btn>
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
