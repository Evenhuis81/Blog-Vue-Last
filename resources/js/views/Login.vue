<template>
  <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="submitLoginForm">
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field v-model="form.email" :rules="rules.email" label="E-mail" required></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="5">
          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.password.required, rules.password.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :hint="form.password.length >= 5 ? '' : 'At least 5 characters'"
            counter
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <span class="red--text">{{ errors.loginForm }}</span>
      <v-row justify="center">
        <v-col cols="4">
          <v-card-actions>
            <v-btn
              text
              outlined
              :loading="loginLoading"
              :disabled="!valid"
              color="primary"
              type="submit"
            >Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="loginLoading" text @click="resetLoginForm">CLEAR INPUT</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    errors: {
      loginForm: ""
    },
    form: {
      email: "",
      password: ""
    },
    rules: {
      email: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: {
        required: value => !!value || "Password is required",
        min: v => v.length >= 5 || "Min 5 characters"
      }
    },
    showPassword: false,
    valid: true
  }),
  computed: {
    ...mapGetters({ loginLoading: "auth/loginLoading" })
  },
  methods: {
    // closeDialog() {
    //   this.resetLoginForm();
    //   this.$emit("close");
    // },
    ...mapActions({
      login: "auth/login"
      //   setLoginLoading: "auth/setLoginLoading",
      //   signedInDialog: "auth/openSignedInDialog"
    }),
    submitLoginForm() {
      if (this.$refs.form.validate()) {
        this.login(this.form);
      } else {
        this.errors.loginForm =
          "Something went wrong with validation, contact support!!";
      }
    },
    resetLoginForm() {
      this.showPassword = false;
      this.errors.loginForm = "";
      this.form.email = "";
      this.form.password = "";
      this.$refs.form.resetValidation();
    }
  }
};
</script>
