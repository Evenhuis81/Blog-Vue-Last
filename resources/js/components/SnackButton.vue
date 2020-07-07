<template>
  <div>
    <v-checkbox
      @change="onTest($event, 1, 2)"
      v-model="item_1.checked"
      :indeterminate="item_1.indeterminate"
    ></v-checkbox>
    <v-checkbox
      @change="onTest($event, 2, 1)"
      v-model="item_2.checked"
      :indeterminate="item_2.indeterminate"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  methods: {
    onTest(event, value, next) {
      if (event) {
        this[`item_${next}`].checked = false;
        this[`item_${next}`].indeterminate = true;
      } else {
        this[`item_${value}`].checked = false;
        this[`item_${value}`].indeterminate = true;
      }
    }
  },
  data: () => ({
    item_1: {
      name: "test 1",
      checked: true,
      indeterminate: false
    },
    item_2: {
      name: "test 2",
      checked: false,
      indeterminate: true
    }
  })
};
</script>
