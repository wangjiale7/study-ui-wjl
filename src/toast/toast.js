import Toast from './toast.vue'
export default {
  install(Vue) {
    console.log(Vue)
    Vue.prototype.$toast = function (message, propsData) {
      // 让组件生成vue实例组件，
      let Profile = Vue.extend(Toast)
      // 创建 Profile 实例，且生成Dom到 $el
      let toast = new Profile({ propsData })
      // 添加插槽
      toast.$slots.default = message
      toast.$mount()
      //挂载到body后面
      document.body.appendChild(toast.$el)
    }
  },
}
