import Vue from 'vue'
import App from './App'
import plugin from './plugin'

Vue.use(plugin, { size: 'small' })

new Vue({
  render: (h) => h(App),
}).$mount('#app')
