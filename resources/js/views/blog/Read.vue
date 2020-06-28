<template>
    <v-container>
        <div v-if="!authorBlogs.length">You don't have any blogs yet</div>
        <div v-else>
            <v-card
                v-for="(item, index) in authorBlogs"
                :key="index"
                class="mx-auto my-2"
                max-width="900"
                >
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-subtitle>{{ item.created_at }}</v-card-subtitle>
                <v-card-subtitle>{{ item.category.name }}</v-card-subtitle>
                <v-card-text class="overflow-y-auto" style="max-height: 132px">{{ item.description }}</v-card-text>
                <!-- <v-card-subtitle class="pt-3 pb-1"> -->
                    <!-- <span class="blue--text"></span> -->
                    <!-- <span class="ml-3">{{ item.created_at }}</span> -->
                <!-- </v-card-subtitle> -->
                <!-- <v-card-text class="overflow-y-auto ml-2" style="max-height: 66px">{{ item.description }}</v-card-text> -->
                <v-divider></v-divider>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters({ authorBlogs: "blogs/authorBlogs" })
    }
}
</script>
