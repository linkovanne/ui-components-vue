<template>
  <div id="app">
    <ul class="ui-components">
      <li class="ui-components__item">
        <div class="ui-components__item-example progress-bar">
          <UiProgressBar
              :current="currentValue"
              :max="maxValue"
          />
        </div>
        <div class="ui-components__item-code">
          <codemirror
              :value="progressBar"
              :options="options"
          ></codemirror>
        </div>
      </li>
      <li class="ui-components__item">
        <div class="ui-components__item-example multiline-ellipsis">
          <UiMultilineEllipsis>
            Компонент Multiline ellipsis. Реализовать компонент,
            который обрезает длинный текст до размеров блока и добавляет '...' на конце.
          </UiMultilineEllipsis>
        </div>
        <div class="ui-components__item-code">
          <codemirror
              :value="multilineEllipsis"
              :options="options"
          ></codemirror>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import UiProgressBar from '@/components/ui/UiProgressBar.vue'
import UiMultilineEllipsis from '@/components/ui/UiMultilineEllipsis.vue'
import {codemirror} from 'vue-codemirror-lite'

export default {
  name: 'App',
  components: {codemirror, UiProgressBar, UiMultilineEllipsis},
  data() {
    return {
      currentValue: 0,
      maxValue: 100,
      multilineEllipsis: `
      <UiMultilineEllipsis>
        Текст компонента Multiline ellipsis
      </UiMultilineEllipsis>
      `,
      progressBar: `
      <UiProgressBar
        :current="0"
        :max="100"
      />
      `,
      options: {
        mode: 'htmlmixed',
        readOnly: true,
        lineNumbers: false,
      }
    }
  },
  created() {
    this.recalcProgress();
  },
  methods: {
    recalcProgress() {
      setInterval(() => this.currentValue >= this.maxValue ? this.currentValue : this.currentValue += 10, 1000);
    }
  }
}
</script>

<style lang="scss">
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

.ui-components {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-components__item {
  display: flex;
  justify-content: center;
  align-items: center;

  & + .ui-components__item {
    margin-top: 20px;
  }

  .vue-codemirror-wrap {
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 12px;
  }

  .CodeMirror {
    height: auto !important;
  }
}


.ui-components__item-example {
  max-width: 350px;

  &.progress-bar {
    width: 100%;
  }

  &.multiline-ellipsis {
    height: 5vh;
  }
}

.ui-components__item-code {
  width: 100%;
  max-width: 450px;
  padding-left: 20px;
  text-align: left;
}
</style>
