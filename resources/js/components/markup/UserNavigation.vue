<template>
  <div>
    <div v-if="unverifiedToken">
      <v-btn icon>
        <v-icon>mdi-account-remove</v-icon>
      </v-btn>
    </div>
    <v-btn v-else-if="!authenticated" icon @click="$router.push('/login', () => {})">
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
    <v-menu offset-y v-else-if="authenticated">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="loggingOut">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters("auth", ["authenticated", "unverifiedToken"])
  },
  methods: {
    ...mapActions({
      logOut: "auth/logOut",
      setSnackbar: "snackbar/setSnackbar"
    }),
  loggingOut() {
    this.logOut()
      .then(() => {
        this.$router.push("/", () => {});
        this.setSnackbar("You are now logged out")
      })
      .catch(err => console.log(err))
      .finally(() => {
        //
      });
    }
  },
};
</script>
