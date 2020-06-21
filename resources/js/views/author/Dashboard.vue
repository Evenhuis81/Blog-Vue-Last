<template>
    <v-container>
        <h2>Welcome Dashboard, useId = {{ id }}</h2>
        <!-- <v-btn :to="{ path: `/author/${id}/createblog` }" rounded color="primary" dark>Create Blog</v-btn> -->
            <v-card>
                <v-tabs
                v-model="tab"
                background-color="primary"
                dark
                >
                <v-tab
                    v-for="item in items"
                    :key="item.tab"
                >
                    {{ item.tab }}
                </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card flat>
                    <v-card-text>{{ item.content }}</v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        <router-view></router-view>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props: ['id'],
    data () {
      return {
        tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],
      }
    },
}
</script>
