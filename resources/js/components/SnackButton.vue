<template>
  <div justify="center">
    <v-btn @click="action">ACTION</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("snackbar", ["snackbar"]),
    action() {
      this.snackbar({ text: "Test", y: "top", color: "info" });
    }
  }
};
</script>
