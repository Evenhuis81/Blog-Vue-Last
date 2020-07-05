<template>
    <div>
        <v-divider v-if="listItem.dividerTop"></v-divider>
        <v-list-item  :class="listItem.spacing" color="primary" :to="listItem.route" exact>
            <v-list-item-icon v-if="listItem.icon">
                <v-icon v-text="listItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="listItem.title"></v-list-item-title>
        </v-list-item>
        <v-list-item-action v-if="listItem.actionIcon">
            <v-icon v-text="listItem.actionIcon"></v-icon>
        </v-list-item-action>
        <v-divider v-if="listItem.dividerBottom"></v-divider>
    </div>
</template>

<script>
export default {
    props: ['listItem']
}
</script>