<template>
    <v-form
        v-model="valid"
        ref="form"
        lazy-validation
        @submit.prevent="submitForm"
    >
        <v-text-field
            v-if="config.title"
            v-model="data.title"
            :rules="rules.title"
            ref="title"
            class="mb-4 mt-4"
            label="Title"
            required
        ></v-text-field>

        <v-textarea
            v-if="config.description"
            v-model="data.description"
            :rules="rules.description"
            label="Description"
            auto-grow
            rows="1"
            outlined
            required
        ></v-textarea>

        <v-subheader
            v-if="config.categories"
            style="height: 20px"
            class="px-1 mt-7"
            >Categories</v-subheader
        >
        <v-select
            v-if="config.categories"
            v-model="tempCategories"
            :rules="rules.categories"
            :items="categoryNames"
            :menu-props="{ maxHeight: '300' }"
            label="Select"
            multiple
            hint="Choose 1 - 3 Categories"
            persistent-hint
            required
        ></v-select>

        <v-checkbox
            v-if="config.premium"
            class="my-10"
            v-model="data.premium"
            label="Premium Content?"
        ></v-checkbox>

        <v-subheader style="height: 20px" class="px-1 mt-7"
            >Image Upload</v-subheader
        >
        <v-file-input
            v-model="tempImage"
            v-if="config.imageInput"
            accept="image/*"
            :rules="rules.image"
            label="Select"
            required
        ></v-file-input>

        <v-btn
            :disabled="!valid"
            color="primary"
            class="mt-5 mr-4"
            :loading="btnLoad"
            type="submit"
            >{{ config.type + " Blog" }}</v-btn
        >

        <p
            v-for="(error, index) in errors.submitForm"
            :key="index"
            class="red--text"
        >
            {{ error[0] }}
        </p>
    </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    model: {
        prop: "data",
        event: "update"
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        config: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        valid: true,
        tempCategories: [],
        tempImage: null,
        rules: {
            title: [],
            description: [],
            categories: [],
            image: []
        },
        errors: {
            submitForm: ""
        }
    }),
    computed: {
        ...mapGetters({
            btnLoad: "btnLoad",
            categories: "categories/categories",
            categoryNames: "categories/categoryNames"
        })
    },
    methods: {
        ...mapActions({
            createBlog: "blogs/createBlog",
            switchBtnLoad: "switchBtnLoad",
            snackbar: "snackbar/snackbar"
        }),
        submitForm() {
            this.activateRules();
            var vm = this;
            setTimeout(function() {
                if (vm.$refs.form.validate()) {
                    vm.switchBtnLoad();
                    // get ids for categorynames for syncing in backend
                    vm.data.category_ids = vm.categories
                        .filter(cat => vm.tempCategories.includes(cat.name))
                        .map(x => x.id);

                    // needed for sending/saving files
                    var formData = new FormData();
                    formData.append("props", JSON.stringify(vm.data));
                    formData.append("image", vm.tempImage);

                    // dynamic dispatch to create/edit blog
                    vm[vm.config.type + "Blog"](formData)
                        .then(res => {
                            if (vm.config.type == "create") {
                                // console.log(res.data.id);
                                vm.$router.push({
                                    name: "dashboard"
                                    // params: { id: res.data.id - 1 }
                                });
                                vm.snackbar({
                                    text: "Blog successfully created",
                                    color: "success"
                                });
                            }
                        })
                        .catch(err => {
                            if (err.response.status === 429) {
                                vm.errors.submitForm = [
                                    [err.response.statusText]
                                ];
                            } else if (err.response.status === 403) {
                                vm.snackbar({
                                    text: err.response.data.message,
                                    color: "error",
                                    y: "bottom"
                                });
                            } else {
                                vm.errors.submitForm = err.response.data.errors;
                            }
                        })
                        .finally(() => {
                            vm.switchBtnLoad();
                        });
                }
            });
        },
        activateRules() {
            this.errors.submitForm = "";
            this.rules.title = [
                v => !!v || "A title is required",
                v =>
                    (v && v.length >= 5) ||
                    "Title must be at least 5 characters"
            ];
            this.rules.description = [
                v => !!v || "A description is required",
                v =>
                    (v && v.length >= 10) ||
                    "Description must be at least 10 characters"
            ];
            this.rules.categories = [
                v => !!v.length || "At least 1 category is required",
                v => v.length < 4 || "Maximum number of categories is 3"
            ];
            this.rules.image = [
                v =>
                    !v ||
                    v.size < 2000000 ||
                    "Image size should be less than 2 MB!",
                v => !!v || "An image is required"
            ];
        }
    },
    mounted() {
        this.$refs[this.config.focus].focus();
    }
};
</script>
