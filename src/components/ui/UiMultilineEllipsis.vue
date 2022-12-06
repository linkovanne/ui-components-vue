<template>
  <div class="ui-multiline-ellipsis">
    <span class="ui-multiline-ellipsis__to-check">M</span>
    <div class="ui-multiline-ellipsis__inner">{{ visibleText }}</div>
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
      visibleText: ''
    }
  },
  mounted() {
    this.transformString();
    window.addEventListener('resize', this.handleSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleSize);
  },
  methods: {
    transformString() {
      let char = document.querySelector('.ui-multiline-ellipsis__to-check');
      let input = document.querySelector('.ui-multiline-ellipsis');

      if (!char) {
        return '';
      }

      let charWidth = char.getBoundingClientRect().width;
      let charHeight = char.getBoundingClientRect().height;

      let inputLettersCapacity = Math.floor(input.clientWidth / charWidth);
      let inputLettersStrings = Math.floor(input.clientHeight / charHeight);

      let lettersNumber = inputLettersCapacity * inputLettersStrings;


      this.visibleText = this.string.length <= lettersNumber
          ? this.string
          : `${this.string.slice(0, lettersNumber - 3)}...`;
    }
  }
}
</script>

<style scoped>
.ui-multiline-ellipsis {
  width: 100%;
  height: 100%;
}

.ui-multiline-ellipsis__to-check {
  position: absolute;
  left: -9999px;
  padding: 0;
  white-space: nowrap;
  font-family: monospace;
  border: 0;
  opacity: 0;
}

.ui-multiline-ellipsis__inner {
  text-align: left;
  font-family: monospace;
  word-break: break-all;
}
</style>
