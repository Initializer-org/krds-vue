import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@/styles/main.scss'
import { vSrOnly } from '@/directives'
import ComponentApi from './ComponentApi.vue'
import ComponentList from './ComponentList.vue'
import DemoFrame from './DemoFrame.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentApi', ComponentApi)
    app.component('ComponentList', ComponentList)
    app.component('DemoFrame', DemoFrame)
    // 플러그인(app.use(KrdsVue))을 등록한 앱과 같도록 v-sr-only를 전역 등록 (패키지 엔트리에서는 export되지 않음)
    app.directive('sr-only', vSrOnly)
  }
} satisfies Theme
