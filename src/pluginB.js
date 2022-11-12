/**
 * 第二种插件引入方式无法接受参数（缺点）
 */
import GTabs from './tabs/tabs'
import GTabsBody from './tabs/tabs-body'
import GTabsHead from './tabs/tabs-head'
import GTabsItem from './tabs/tabs-item'
import GTabsPane from './tabs/tabs-pane'
import GButton from './button/button.vue'
import GButtonGroup from './button/buttonGroup.vue'
import toast from './toast/toast.js'
import Vue from 'vue'

Vue.component('g-tabs', GTabs)
Vue.component('g-tabs-body', GTabsBody)
Vue.component('g-tabs-head', GTabsHead)
Vue.component('g-tabs-item', GTabsItem)
Vue.component('g-tabs-pane', GTabsPane)
Vue.component('g-button', GButton)
Vue.component('g-button-group', GButtonGroup)

Vue.use(toast)
