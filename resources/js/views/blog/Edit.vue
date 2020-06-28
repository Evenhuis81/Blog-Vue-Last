<template>
    <v-container>
    <!-- <v-row justify="center"> -->
      <h2>Create New Blog</h2>
    <!-- </v-row> -->
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitEditBlog">
      <v-text-field
        ref="title"
        class="mb-4 mt-4"
        v-model="form.title"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="form.description"
        label="Description"
        auto-grow
        rows="1"
        outlined
        required
      ></v-textarea>

      <v-select
        v-model="tempCategoryName"
        :items="categoryNames"
        label="Category"
        required
      ></v-select>

      <v-checkbox class="mb-4" v-model="form.premium" label="Premium Content?"></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="mr-4"
        :loading="buttonLoading"
        type="submit"
      >Save Blog</v-btn>

      <p v-for="(error, index) in errors.submitForm" :key="index" class="red--text">{{ error[0] }}</p>

    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
    props: ['id'],
    data: () => ({
        valid: true,
        form: {
            title: '',
            description: '',
            category_id: null,
            premium: null
        },
        tempCategoryName: '',
        errors: {
            submitForm: ''
        }
    }),
    computed: {
        ...mapGetters({
            getBlog: "blogs/blog",
            categoryNames: "categories/categoryNames",
            buttonLoading: 'buttonLoading'
        }),
        blog() {
            return this.getBlog(this.id)
        }
    },
    methods: {
        ...mapActions({
            setSnackbar: "snackbar/setSnackbar"
        }),
        submitEditBlog() {
            this.errors.submitForm = ''
            if (this.$refs.form.validate()) {
                this.setButtonLoading()
                // this.form.category = this.categoryId(this.tempCategoryName)
                this.form.category_id = this.categoryNames.indexOf(this.tempCategoryName)+1
                this.createBlog(this.form)
                .then(response => {
                    this.$router.push({ name: "dashboard"})
                    this.setSnackbar("You have successfully created " + this.form.title)
                })
                .catch(error => {
                    if (error.response.status === 429) {
                    this.errors.submitForm = [[error.response.statusText]]
                    } else if (error.response.status === 403) {
                    this.setSnackbar(error.response.data.message)
                    } else {
                    this.errors.submitForm = error.response.data.errors
                    }
                })
                .finally(() => {
                    this.setButtonLoading()
                });
            }
        }
    },
    created() {
        this.form.title = this.getBlog(this.id).title
        this.form.description = this.getBlog(this.id).description
        this.form.category_id = this.getBlog(this.id).category_id
        this.form.premium = this.getBlog(this.id).premium
        this.tempCategoryName = this.getBlog(this.id).category.name
    }
}
</script>