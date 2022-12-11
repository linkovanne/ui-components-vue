<template>
  <div class="ui-multiline-ellipsis" ref="multilineEllipsis">
    <span class="ui-multiline-ellipsis__to-check" ref="multilineEllipsisToCheck">M</span>
    <div class="ui-multiline-ellipsis__inner" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiMultilineEllipsis',
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
      const char = this.$refs?.multilineEllipsisToCheck;
      const text = this.$slots.default[0].text;
      const input = this.$refs?.multilineEllipsis;

      if (!char) {
        return '';
      }

      const charWidth = char.getBoundingClientRect().width;
      const charHeight = char.getBoundingClientRect().height;

      const inputStringCapacity = Math.floor(input.clientWidth / charWidth);
      const inputStringNumber = Math.floor(input.clientHeight / charHeight);
      const lettersNumber = inputStringCapacity * inputStringNumber;

      this.styles = text.length > lettersNumber ? {'-webkit-line-clamp': inputStringNumber} : {}
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
