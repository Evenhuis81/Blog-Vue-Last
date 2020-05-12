<template>
  <div>
    <!-- <div v-if="unverifiedToken">
      <v-btn icon>
        <v-icon>mdi-account-remove</v-icon>
      </v-btn>
    </div>
    <v-dialog :value="loginDialog" persistent max-width="600px" v-else-if="!authenticated">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="setLoginDialog">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </template>
      <v-tabs fixed-tabs v-model="loginDialogTab">
        <v-tab :disabled="registerLoading" @click="clearRegisterForm">Log In</v-tab>
        <v-tab :disabled="loginLoading" @click="clearLoginForm">Register</v-tab>
        <v-tab-item>
          <login-form ref="loginForm" @close="loginDialogAction" />
        </v-tab-item>
        <v-tab-item>
          <register-form ref="registerForm" @close="loginDialogAction" />
        </v-tab-item>
      </v-tabs>
    </v-dialog>

    <v-menu offset-y v-else-if="authenticated">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="toDashboard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>-->
  </div>
</template>

<script>
// import registerForm from "./RegisterForm.vue";
// import loginForm from "./LoginForm.vue";
// import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  //   components: { registerForm, loginForm },
  data() {
    return {
      //   loginDialogTab: null
    };
  },
  computed: {
    // ...mapGetters({
    //   loginDialog: "auth/loginDialog",
    //   loginLoading: "auth/loginLoading",
    //   registerLoading: "auth/registerLoading",
    //   authenticated: "auth/authenticated",
    //   unverifiedToken: "auth/unverifiedToken"
    // })
  },
  methods: {
    // ...mapActions({
    //   setLoadingDialog: "auth/setLoadingDialog",
    //   setLoginDialog: "auth/setLoginDialog",
    //   logOutAction: "auth/logOut",
    //   verifyToken: "auth/verifyToken",
    //   toDashboard: "routing/dashboard"
    // }),
    // logOut() {
    //   // this.setLoadingDialog();
    //   // setTimeout(() => {
    //   this.logOutAction()
    //     .then(() => {
    //       // this.setLoadingDialog();
    //       if (this.$route.path !== "/") {
    //         this.$router.push({ path: "/" });
    //       }
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    //   // }, 2000);
    // },
    // clearLoginForm() {
    //   this.tab === 1 ? "" : this.$refs.loginForm.resetLoginForm();
    // },
    // clearRegisterForm() {
    //   this.tab === 0 ? "" : this.$refs.registerForm.resetRegisterForm();
    // },
    // loginDialogAction() {
    //   this.setLoginDialog();
    //   this.dialogTab = null;
    // }
  },
  created() {
    // if (this.unverifiedToken) {
    //   this.verifyToken(this.unverifiedToken);
    // }
  }
  // watch: {
  //   dialog(val) {
  //     if (!val) return;

  //     setTimeout(() => (this.dialog = false), 4000);
  //   }
  // }
};
</script>