<template>
    <v-list-item-group color="primary">
        <vf-list-item v-for="(item, index) in listItems" :key="index" :listItems="item"></vf-list-item>
    </v-list-item-group>
</template>

<script>
export default {
    props: ['listItems']
}
</script>
