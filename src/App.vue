<template>
  <div id="app">
    <div class="progress-bar">
      <UiProgressBar
          :current="currentValue"
          :max="maxValue"
      />
    </div>

    <div class="multiline-ellipsis">
      <UiMultilineEllipsis
          string="Компонент Multiline ellipsis. Реализовать компонент, который обрезает длинный текст до размеров блока и добавляет '...' на конце."
      />
    </div>
  </div>
</template>

<script>
import UiProgressBar from '@/components/ui/UiProgressBar.vue'
import UiMultilineEllipsis from '@/components/ui/UiMultilineEllipsis.vue'

export default {
  name: 'App',
  components: {UiProgressBar, UiMultilineEllipsis},
  data() {
    return {
      currentValue: 10,
      maxValue: 1000,
    }
  },
  created() {
    // this.recalcProgress();
  },
  methods: {
    recalcProgress() {
      setInterval(() => this.currentValue >= this.maxValue ? this.currentValue : this.currentValue += 20, 1000);
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20vh;
}

.progress-bar {
  max-width: 350px;
  margin: 0 auto;
}

.multiline-ellipsis {
  width: 50%;
  height: 10vh;
  margin: 100px auto 0;
}
</style>
