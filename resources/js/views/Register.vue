<template>
  <div>
    <v-row justify="center">
      <v-card-title class="headline">Registration Form</v-card-title>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-form ref="form" v-model="valid" @submit.prevent="submitRegisterForm">
          <v-text-field
            ref="name"
            v-model="form.name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            type="password"
            label="Password"
            :hint="form.password.length >= 5 ? '' : 'At least 5 characters'"
            counter
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.verifypassword"
            :rules="[(form.password === form.verifypassword) || 'Password must match']"
            type="password"
            label="Type password again"
            required
          ></v-text-field>

          <v-checkbox v-model="form.checkbox" label="Keep me logged in." required></v-checkbox>

          <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>-->
          <span class="red--text">{{ errors.registerForm }}</span>
          <!-- <v-row justify="center"> -->
          <!-- <v-col cols> -->
          <v-card-actions>
            <v-btn
              text
              outlined
              :loading="loginLoading"
              :disabled="!valid"
              color="primary"
              type="submit"
            >Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="loginLoading" text @click="resetRegisterForm">CLEAR INPUT</v-btn>
          </v-card-actions>
          <!-- </v-col> -->
          <!-- </v-row> -->
        </v-form>
      </v-col>
    </v-row>
  </div>
  <!-- </v-card> -->
  <!-- </v-container> -->
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    errors: {
      registerForm: ""
    },
    form: {
      name: "",
      email: "",
      password: "",
      verifypassword: "",
      checkbox: false
    },
    valid: true,
    showPassword: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    passwordRules: {
      required: value => !!value || "Password is required",
      min: v => v.length >= 5 || "Min 5 characters",
      match: v => v === this.form.password || "Password must match"
    }
  }),
  computed: {
    ...mapGetters({ loginLoading: "auth/loginLoading" })
    // passwordConfirmationRule() {
    //   return this.password === this.rePassword || "Password must match";
    // }
  },
  methods: {
    ...mapActions({
      register: "auth/register",
      setLoginLoading: "auth/setLoginLoading",
      setSnackbar: "snackbar/setSnackbar",
      setSnackbarText: "snackbar/setSnackbarText"
    }),
    submitRegisterForm() {
      if (this.$refs.form.validate()) {
        // this.errors.registerForm = "Validated!";
        this.setLoginLoading();
        this.register(this.form)
          .then(res => {
            this.$router.go(-1);
            this.setSnackbarText("You are now registered");
            this.setSnackbar();
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.setLoginLoading();
          });
      } else {
        this.errors.registerForm =
          "Something went wrong with validation, contact support!!";
      }
    },
    // validate() {
    //   this.$refs.form.validate();
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
    resetRegisterForm() {
      this.showPassword = false;
      this.errors.registerForm = "";
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.verifypassword = "";
      this.$refs.form.resetValidation();
      this.$refs.name.focus();
    }
  },
  mounted() {
    this.$refs.name.focus();
  }
};
</script>
