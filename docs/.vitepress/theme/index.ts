import type { Theme } from 'vitepress'
// 문서 글꼴은 KRDS(Pretendard GOV)라 VitePress 기본 글꼴(Inter)은 받지 않는다
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@/styles/main.scss'
import { vSrOnly } from '@/directives'
import ComponentApi from './ComponentApi.vue'
import ComponentList from './ComponentList.vue'
import DemoFrame from './DemoFrame.vue'
import DocTabs from './DocTabs.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentApi', ComponentApi)
    app.component('ComponentList', ComponentList)
    app.component('DemoFrame', DemoFrame)
    app.component('DocTabs', DocTabs)
    // 플러그인(app.use(KrdsVue))을 등록한 앱과 같도록 v-sr-only를 전역 등록 (패키지 엔트리에서는 export되지 않음)
    app.directive('sr-only', vSrOnly)
  }
} satisfies Theme
