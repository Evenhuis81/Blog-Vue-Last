<template>
    <v-card
        outlined
        :to="{ name: 'blog', params: { id: currentBlog(rowNr, colNr).id}}"
        class="blue lighten-5"
        >
        <v-list-item three-line>
        <v-list-item-content>
            <v-row>
            <v-col cols="6" class="py-0">
                <div class="overline mb-4">by {{ currentBlog(rowNr, colNr).owner.name }}</div>
            </v-col>
            <v-col cols="6" class="py-0">
                <div
                class="overline mb-4 text-right"
                >{{ blogCreatedFromNow(currentBlog(rowNr, colNr).created_at) }}</div>
            </v-col>
            </v-row>
            <v-list-item-title class="headline mb-1">{{ currentBlog(rowNr, colNr).title }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentBlog(rowNr, colNr).description }}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
    </v-card>
</template>