<template>
  <div id="app">
    <div class="progress-bar">
      <UiProgressBar
          :current="currentValue"
          :max="maxValue"
      />
    </div>
  </div>
</template>

<script>
import UiProgressBar from './components/ui/UiProgressBar.vue'

export default {
  name: 'App',
  components: {
    UiProgressBar
  },
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
  margin-top: 60px;
}

.progress-bar {
  max-width: 350px;
  margin: 0 auto;
}
</style>
