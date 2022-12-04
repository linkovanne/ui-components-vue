<template>
  <div class="ui-multiline-ellipsis"></div>
</template>

<script>
export default {
  name: 'UiMultilineEllipsis',
  props: {
    string: {type: String, required: true, default: ''},
  },
}
</script>

<style scoped>
.ui-multiline-ellipsis { }
</style>
