<template>
  <v-container>
    <v-row>
      <v-col class="white" cols="8" offset="2">
        <v-form ref="form" v-model="valid" @submit.prevent="submitRegisterForm">
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field
                ref="focuspoint"
                v-model="form.name"
                :rules="rules.name"
                label="Username"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-text-field v-model="form.email" :rules="rules.email" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4">
              <v-text-field
                v-model="form.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.password.required, rules.password.min]"
                type="password"
                label="Password"
                :hint="form.password.length >= 5 ? '' : 'At least 5 characters'"
                counter
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <span class="red--text">{{ errors.registerForm }}</span>
          <v-row justify="center">
            <v-col cols="3">
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
            </v-col>
          </v-row>

          <!-- <v-card-actions>
            <v-btn
              outlined
              :loading="loading"
              :disabled="!valid"
              color="primary"
              type="submit"
            >Register</v-btn>
          </v-card-actions>-->
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      errors: {
        registerForm: ""
      },
      form: {
        name: "",
        email: "",
        password: ""
      },
      rules: {
        name: [v => !!v || "Username is required"],
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
    };
  },
  computed: {
    ...mapGetters({ loginLoading: "auth/loginLoading" })
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
    resetRegisterForm() {
      this.showPassword = false;
      this.errors.registerForm = "";
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.$refs.form.resetValidation();
      this.$refs.focuspoint.focus();
    }
  },
  mounted() {
    this.$refs.focuspoint.focus();
  }
};
</script>