<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Premium Blog!</v-card-title>

      <v-card-text v-if="authenticated">You can buy primary access at your dashboard</v-card-text>
      <v-card-text v-else>You need to be logged in and have premium access to visit this blog</v-card-text>

      <v-card-actions>
        <v-btn
          v-if="authenticated"
          color="green darken-1"
          text
          @click="goToDashboard"
        >Go to Dashboard</v-btn>
        <v-btn v-else color="blue lighten-2" text @click="goToLogin">Login</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="blue lighten-2" text @click="switchDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getDialog: "getDialog",
      authenticated: "auth/authenticated"
    }),
    dialog: {
      get() {
        return this.getDialog;
      },
      set(value) {
        console.log("dialog set");
        this.switchDialog();
      }
    }
  },
  methods: {
    ...mapActions({
      // setDialog: "setDialog",
      switchDialog: "switchDialog"
    }),
    goToDashboard() {
      this.switchDialog();
      this.$router.push({ name: "dashboard" });
    },
    goToLogin() {
      this.switchDialog();
      this.$router.push({ name: "login" });
    }
  }
};
</script>
