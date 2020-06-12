<template>
  <v-container>
    <v-row>
      <v-col class="white" cols="8" offset="2">
        <v-form ref="form" v-model="valid" @submit.prevent="submitLogin">
          <v-row justify="center">
            <v-col cols="6">
              <p
                outlined
                v-show="just_registered"
                class="green--text"
              >You are now registered, please login</p>
              <v-text-field
                ref="email"
                v-model="form.email"
                :rules="rules.email"
                label="E-mail"
                required
              ></v-text-field>
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
              <v-row justify="space-between">
                <v-checkbox v-model="form.remember" label="Keep me logged in." required>
                </v-checkbox>
                                            <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" color="grey lighten-1">mdi-information</v-icon>
      </template>
      <span>If unchecked you will be logged out after an hour, you can change this behaviour in your profile settings</span>
    </v-tooltip>
              </v-row>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="4">
              <v-card-actions>
                <v-btn
                  text
                  outlined
                  :loading="buttonLoading"
                  :disabled="!valid"
                  color="primary"
                  type="submit"
                >Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="buttonLoading" text @click="resetLoginForm">CLEAR INPUT</v-btn>
              </v-card-actions>
              <p
                v-for="(error, index) in errors.loginForm"
                :key="index"
                class="red--text"
              >{{ error[0] }}</p>
            </v-col>
          </v-row>
        </v-form>
        <v-row v-show="!just_registered" justify="center" class="mt-12">
          <v-col cols="3" class="d-flex">
            <span>No account yet?</span>
            <v-btn to="/register" class="ml-auto" outlined text>Register</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data: () => ({
    just_registered: false,
    errors: {
      loginForm: ""
    },
    form: {
      email: "",
      password: "",
      remember: false
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
    ...mapGetters({ buttonLoading: "auth/buttonLoading", role: "auth/role" })
  },
  methods: {
    ...mapActions("auth", {
      login: "login",
      setButtonLoading: "setButtonLoading"
    }),
    ...mapActions("snackbar", {
      setSnackbar: "setSnackbar",
      setSnackbarText: "setSnackbarText"
    }),
    submitLogin() {
      this.errors.loginForm = "";
      if (this.$refs.form.validate()) {
        this.setButtonLoading();
        this.login(this.form)
          .then(role => {
            // if (role === 'admin') {
            this.$router.push({ name: role + "dashboard" });
            // } else if (role === 'author') {
            //   this.$router.push({ name: "authordashboard" });
            // } else {
            //   this.$router.push({ name: "readerdashboard" });
            // }

            this.setSnackbarText("You are now logged in");
            this.setSnackbar();
          })
          .catch(error => {
            if (error.response.status === 429) {
              this.errors.loginForm = [
                [
                  error.response.statusText +
                    " (wait 5 minutes before trying again)"
                ]
              ];
            } else if (error.response.status === 403) {
              this.setSnackbarText(error.response.data.message);
              this.setSnackbar();
              this.$router.push({ name: this.role + "dashboard" });
            } else {
              this.errors.loginForm = error.response.data.errors;
            }
          })
          .finally(() => {
            this.setButtonLoading();
          });
      } else {
        this.errors.loginForm = [["Something went wrong"]];
      }
    },
    resetLoginForm() {
      this.showPassword = false;
      this.errors.loginForm = "";
      this.form.email = "";
      this.form.password = "";
      this.$refs.form.resetValidation();
      this.$refs.email.focus();
    }
  },
  created() {
    if (this.$route.query.just_registered) {
      this.just_registered = true;
    }
  },
  mounted() {
    this.$refs.email.focus();
  }
};
</script>
