<template>
    <div>
        <v-row justify="center" class="mt-10 mb-5" no-gutters>
            <v-col v-if="authenticated" cols="8">
                <v-form class="d-flex align-center" @submit.prevent="submitComment">
                    <v-textarea
                        append-icon="mdi-card-text-outline"
                        hide-details="auto"
                        dense
                        outlined
                        auto-grow
                        label="Write a comment..."
                        v-model="form.description"
                        rows="1"
                    ></v-textarea>
                    <v-btn
                        :disabled="!form.description"
                        :loading="buttonLoading"
                        type="submit"
                         class="blue lighten-4" >Send</v-btn>
                </v-form>
            </v-col>
            <p v-else>Log in to write a comment</p>
            <p v-for="(error, index) in errors" :key="index" class="red--text">{{ error[0] }}</p>
        </v-row>
        <!-- <v-card class="mx-auto" max-width="800"> -->
            <!-- <div  class="mt-3"> -->
                <v-card
                    v-for="(item, index) in blog($route.params.id).comments"
                    :key="index"
                    flat
                    class="mx-auto my-2"
                    max-width="800"
                    >
                    <v-system-bar v-if="item.owner_id == userId" color="blue lighten-2" dark>
                        <v-spacer></v-spacer>
                        <v-icon @click="confirmDelete(item.id)">mdi-close</v-icon>
                    </v-system-bar>
                    <v-card-subtitle class="pt-3 pb-1">
                        <span class="blue--text">{{ item.owner_id }}</span>
                        <span class="ml-3">{{ item.created_at }}</span>
                    </v-card-subtitle>
                    <v-card-text class="overflow-y-auto ml-2" style="max-height: 66px">{{ item.description }}</v-card-text>
                    <v-divider></v-divider>
                </v-card>
            <!-- </div> -->
        <!-- </v-card> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"

export default {
    props: ['id'],
    data: () => ({
        form: {
            description: '',
            owner_id: null,
            blog_id: null
        },
        errors: ""
    }),
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            userId: 'auth/userId',
            blog: 'blogs/blog',
            buttonLoading: 'buttonLoading'
         })
    },
    methods: {
        ...mapActions({
            createComment: "comments/createComment",
            deleteComment: "comments/deleteComment",
            setButtonLoading: "setButtonLoading",
            setSnackbar: "snackbar/setSnackbar"
        }),
        confirmDelete(commentId) {
            const answer = window.confirm('Do you really want to delete this comment?')
            if (answer) {
                // need to set some sort of load thing here
                this.deleteComment(commentId).then(() => {
                    this.setSnackbar('Comment Deleted!')
                })
            }
        },
        submitComment() {
            this.setButtonLoading()
            this.form.blog_id = parseInt(this.$route.params.id)
            this.form.owner_id = this.userId
            this.createComment(this.form)
            .then(response => {
                this.form.description = ''
                this.setSnackbar("You have successfully created a comment")
            })
            .catch(error => {
                if (error.response.status === 429) {
                this.errors = [[error.response.statusText]]
                } else if (error.response.status === 403) {
                this.setSnackbar(error.response.data.message)
                } else {
                this.errors = error.response.data.errors
                }
            })
            .finally(() => {
                this.setButtonLoading()
            });
        }
    }
}
</script>