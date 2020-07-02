<template>
  <v-dialog v-model="loginDialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="switchLoginDialog()">Close(Disagree)</v-btn>

        <v-btn color="green darken-1" text>Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getLoginDialog: "loginDialog"
    }),
    loginDialog: {
      get() {
        return this.getLoginDialog;
      },
      set(value) {
        console.log("set");
        // this.setLoginDialog(value);
        this.switchLoginDialog();
      }
    }
  },
  methods: {
    ...mapActions({
      setLoginDialog: "setLoginDialog",
      switchLoginDialog: "switchLoginDialog"
    })
  }
};
</script>
