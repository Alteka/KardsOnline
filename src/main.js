import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import './theme/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, {locale})

import VueResizeText from 'vue-resize-text'
Vue.use(VueResizeText)

import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
