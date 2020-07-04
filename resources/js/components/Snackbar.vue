<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :timeout="timeout"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'"
    :absolute="absolute"
    centered
    app
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("snackbar", [
      "getSnackbar",
      // "centered",
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
