<template>
  <div class="ui-progress-bar" ref="progressBar">
    <div class="ui-progress-bar__cursor" ref="progressBoat" :style="boatPositionStyle">
      <div class="ui-progress-bar__cursor-value">{{ current }}</div>
      <img class="ui-progress-bar__cursor-icon" ref="progressBoatImg" src="@/assets/boat.svg" alt="sailboat">
    </div>
    <div class="ui-progress-bar__scale">
      <div class="ui-progress-bar__scale-value" :style="{width: `${progressPosition}%`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiProgressBar',
  props: {
    current: {type: Number, required: true, default: 0},
    max: {type: Number, required: true, default: 0},
  },
  data() {
    return {
      boatMovingStart: 0,
      currentPosition: 0,
    }
  },
  mounted() {
    this.handleSize();
    window.addEventListener('resize', this.handleSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleSize);
  },
  methods: {
    handleSize() {
      const boatWidth = 16;
      const barWidth = this.$refs?.progressBar?.clientWidth;

      this.boatMovingStart = Math.round((boatWidth / barWidth) * 100);
    }
  },
  computed: {
    progressPosition() {
      return this.current < 0 || this.max < 0
          ? 0
          : this.current > this.max
              ? 100
              : (this.current / this.max) * 100;
    },
    transformValue() {
      const currentPercentPos = (this.current / this.max) * 100;

      return currentPercentPos < this.boatMovingStart
          ? 0
          : currentPercentPos > (100 - this.boatMovingStart)
              ? 100
              : 50;
    },
    boatPositionStyle() {
      return this.transformValue === 0
          ? {left: `0%`, transform: `translateX(0%)`}
          : this.transformValue === 100
              ? {left: `100%`, transform: `translateX(-100%)`}
              : {left: `${this.progressPosition}%`, transform: `translateX(-${this.transformValue}%)`}
    },
  }
}
</script>

<style scoped lang="scss">
.ui-progress-bar {
  position: relative;
  padding-top: 44px;
}

.ui-progress-bar__cursor {
  position: absolute;
  bottom: 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.ui-progress-bar__cursor-value {
  font-size: 12px;
}

.ui-progress-bar__cursor-icon {
  display: inline-block;
}

.ui-progress-bar__scale {
  position: relative;
  width: 100%;
  height: 15px;
  padding-top: 5px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: url('@/assets/wave.png') bottom left / contain repeat;
  }
}

.ui-progress-bar__scale-value {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 10px;
  background-image: linear-gradient(135deg, #008cbf 0%, #00bbff 100%);
}
</style>
