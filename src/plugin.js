import GTabs from './tabs/tabs'
import GTabsBody from './tabs/tabs-body'
import GTabsHead from './tabs/tabs-head'
import GTabsItem from './tabs/tabs-item'
import GTabsPane from './tabs/tabs-pane'
import button from './button/button.vue'
import buttonGroup from './button/buttonGroup.vue'
import GCollapse from './collapse/collapse'
import GCollapseItem from './collapse/collapse-item'
import icon from './icon/icon'
import GInput from './input/input'
import GPopover from './popover/popover'
import GCol from './col/col'
import GRow from './row/row'
import toast from './toast/toast.js'

const install = function (Vue, options = {}) {
  console.log(options)
  Vue.component('g-icon', icon)
  Vue.component('g-tabs', GTabs)
  Vue.component('g-tabs-body', GTabsBody)
  Vue.component('g-tabs-head', GTabsHead)
  Vue.component('g-tabs-item', GTabsItem)
  Vue.component('g-tabs-pane', GTabsPane)
  Vue.component('g-button', button)
  Vue.component('g-button-group', buttonGroup)
  Vue.component('g-collapse', GCollapse)
  Vue.component('g-collapse-item', GCollapseItem)
  Vue.component('g-input', GInput)
  Vue.component(GCol.name, GCol)
  Vue.component(GRow.name, GRow)
  Vue.component(GPopover.name, GPopover)
  Vue.use(toast)
}
export default install

if (typeof window !== 'undefined' && window.Vue) {
  console.log('html引入初始化')
  window.Vue.use(install)
}
