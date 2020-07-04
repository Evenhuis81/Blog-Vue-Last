<template>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
      <v-text-field
        ref="title"
        class="mb-4 mt-4"
        v-model="form.title"
        :rules="rules.title"
        label="Title"
        required
      ></v-text-field>

      <!-- <v-textarea
        v-model="form.description"
        :rules="rules.description"
        label="Description"
        auto-grow
        rows="1"
        outlined
        required
      ></v-textarea> -->

      <!-- <v-select
        v-model="tempCategoryName"
        :items="categoryNames"
        :rules="rules.category"
        label="Category"
        required
      ></v-select> -->

      <!-- <v-checkbox class="mb-4" v-model="form.premium" label="Premium Content?"></v-checkbox> -->

      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        :loading="btnLoad"
        type="submit"
      >Save Blog</v-btn>

      <!-- <p v-for="(error, index) in errors.submitForm" :key="index" class="red--text">{{ error[0] }}</p> -->
    </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        valid: true,
        form: {
            title: "",
        },
        rules: {
            title: []
        }
    }),
    computed: {
        ...mapGetters(["btnLoad"])
    },
    mounted() {
        this.$refs.title.focus();
    }
}
</script>