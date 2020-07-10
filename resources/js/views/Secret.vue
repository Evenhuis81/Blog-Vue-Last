<template>
  <div>
    <form @submit.prevent="postMail">
      <input v-model="email" type="text" />
      <button type="submit">Submit</button>
    </form>
    <div v-for="(error, i) in errors" :key="i" style="color: red;">
      <p v-for="(msg, i) in error" :key="'A' + i">{{ msg }}</p>
    </div>
    <p style="color: green">{{ response }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    errors: "",
    response: ""
  }),
  methods: {
    postMail() {
      this.errors = "";
      this.response = "";
      console.log("posted");
      console.log(this.email);
      this.$http
        .post("/api/mail", { email: this.email })
        .then(res => {
          this.email = "";
          this.response = res.data;
          //   console.log(res.data);
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>