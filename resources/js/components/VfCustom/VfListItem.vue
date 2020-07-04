<template>
    <div>
        <v-divider v-if="listItems.dividerTop"></v-divider>
        <v-list-item :class="listItems.spacing" color="primary" :to="listItems.route" exact>
            <v-list-item-icon v-if="listItems.icon">
                <v-icon v-text="listItems.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="listItems.title"></v-list-item-title>
        </v-list-item>
        <v-list-item-action v-if="listItems.actionIcon">
            <v-icon v-text="listItems.actionIcon"></v-icon>
        </v-list-item-action>
        <v-divider v-if="listItems.dividerBottom"></v-divider>
    </div>
</template>

<script>
export default {
    props: ['listItems']
}
</script>