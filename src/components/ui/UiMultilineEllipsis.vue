<template>
  <div class="ui-multiline-ellipsis">
    <span class="ui-multiline-ellipsis__to-check">M</span>
    <div class="ui-multiline-ellipsis__inner" :style="styles">{{ string }}</div>
  </div>
</template>

<script>
export default {
  name: 'UiMultilineEllipsis',
  props: {
    string: {type: String, required: true, default: ''},
  },
  data() {
    return {
      styles: {},
    }
  },
  mounted() {
    this.transformString();
    window.addEventListener('resize', this.transformString);
  },
  destroyed() {
    window.removeEventListener('resize', this.transformString);
  },
  methods: {
    transformString() {
      const char = document.querySelector('.ui-multiline-ellipsis__to-check');
      const input = document.querySelector('.ui-multiline-ellipsis');

      if (!char) {
        return '';
      }

      const charWidth = char.getBoundingClientRect().width;
      const charHeight = char.getBoundingClientRect().height;

      const inputStringCapacity = Math.floor(input.clientWidth / charWidth);
      const inputStringNumber = Math.floor(input.clientHeight / charHeight);
      const lettersNumber = inputStringCapacity * inputStringNumber;

      this.styles = this.string.length <= lettersNumber ? {'-webkit-line-clamp': inputStringNumber} : {}
    }
  },
}
</script>

<style scoped lang="scss">
.ui-multiline-ellipsis {
  position: relative;
  height: 100%;
  font-family: monospace;
  text-align: left;
  overflow: hidden;
}

.ui-multiline-ellipsis__to-check {
  position: absolute;
  left: 100%;
  padding: 0;
  white-space: nowrap;
  opacity: 0;
  border: 0;
}

.ui-multiline-ellipsis__inner {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
