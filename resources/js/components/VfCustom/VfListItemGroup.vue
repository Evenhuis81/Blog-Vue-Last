<template>
    <div>
        <v-list-group
            no-action
            v-for="(items, index) in listItems"
            :key="index"
        >
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>{{ index.replace(/([A-Z])/g, ' $1').trim() }}</v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list-item
                v-for="(item, i) in items"
                :key="'A' + i"
                :to="item.route"
            >
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-action v-if="item.actionIcon">
                <v-icon v-text="item.actionIcon"></v-icon>
            </v-list-item-action>
            </v-list-item>
        </v-list-group>
    </div>
</template>

<script>
export default {
    props: ['listItems']
}
</script>
