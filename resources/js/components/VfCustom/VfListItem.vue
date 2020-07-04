<template>
    <v-list-item color="primary" :to="route" exact>
        <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
            <v-list-item-title v-text="title"></v-list-item-title>
    </v-list-item>
</template>

<script>
export default {
    props: ['title', 'icon', 'route']
}
</script>