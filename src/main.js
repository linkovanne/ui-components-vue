import Vue from 'vue'
import App from './App.vue'
import VueCodeMirror from 'vue-codemirror-lite';

Vue.config.productionTip = false

new Vue({
  VueCodeMirror,
  render: h => h(App),
}).$mount('#app')
