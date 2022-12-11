<template>
  <div class="ui-progress-bar" ref="progressBar">
    <div class="ui-progress-bar__cursor" ref="progressBoat" :style="boatPositionStyle">
      <div class="ui-progress-bar__cursor-value">{{ current|numberFormat }}</div>
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
  filters: {
    numberFormat: function (value) {
      return new Intl.NumberFormat('en').format(value);
    }
  },
  props: {
    current: {type: Number, required: true},
    max: {type: Number, required: true},
  },
  data() {
    return {
      boatMovingStart: 0,
      currentPosition: 0,
    }
  },
  mounted() {
    setTimeout(() => this.handleSize(), 100);

    window.addEventListener('resize', this.handleSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleSize);
  },
  methods: {
    handleSize() {
      const {progressBoat, progressBar} = this.$refs;
      if (!progressBoat || !progressBar) {
        return;
      }

      const boatWidth = progressBoat.clientWidth;
      const barWidth = progressBar.clientWidth;

      this.boatMovingStart = Math.round((boatWidth / barWidth / 2) * 100);
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
@keyframes movingFlare {
  0% {
    left: -100px;
  }
  30% {
    left: 110%;
  }
  100% {
    left: 110%;
  }
}

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
  text-shadow: 0 0 15px #fff8e1;
  color: #ffcc99;
}

.ui-progress-bar__cursor-icon {
  display: block;
}

.ui-progress-bar__scale {
  position: relative;
  width: 100%;
  height: 16px;
  padding-top: 4px;
  padding-bottom: 2px;
  overflow: hidden;

  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: url('@/assets/wave.png') bottom left / contain repeat;
  }

  &:after {
    content: '';
    position: absolute;
    left: -40px;
    top: 0;
    z-index: 1;
    width: 100px;
    height: 15px;
    display: block;
    background: #fff;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5));
    animation: movingFlare 3s ease-in-out 0.05s infinite;
  }
}

.ui-progress-bar__scale-value {
  position: absolute;
  left: 0;
  bottom: 2px;
  height: 10px;
  background-image: linear-gradient(135deg, #ffb85e 0%, #ffd461 100%);

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 2px;
    height: 100%;
    background: #fef1e0;
    box-shadow: 0 1px 3px #ffd461;
  }
}
</style>
