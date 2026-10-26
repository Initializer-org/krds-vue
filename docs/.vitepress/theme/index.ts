import type { Theme } from 'vitepress'
import { h } from 'vue'
// 문서 글꼴은 KRDS(Pretendard GOV)라 VitePress 기본 글꼴(Inter)은 받지 않는다
import DefaultTheme from 'vitepress/theme-without-fonts'
import '@/styles/main.scss'
import { vSrOnly } from '@/directives'
import ComponentApi from './ComponentApi.vue'
import ComponentList from './ComponentList.vue'
import DemoFrame from './DemoFrame.vue'
import DocTabs from './DocTabs.vue'
import FrameworkSwitch from './FrameworkSwitch.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  // KRDS Vue ↔ React 전환: 상단 메뉴 첫 항목(config.ts nav)이고, 메뉴가 햄버거로 접히는 모바일에서도 보이게 상단에 하나 더
  Layout: () => h(DefaultTheme.Layout, null, { 'nav-bar-content-before': () => h(FrameworkSwitch, { current: 'vue', mobile: true }) }),
  enhanceApp({ app }) {
    app.component('ComponentApi', ComponentApi)
    app.component('ComponentList', ComponentList)
    app.component('DemoFrame', DemoFrame)
    app.component('DocTabs', DocTabs)
    app.component('FrameworkSwitch', FrameworkSwitch)
    // 플러그인(app.use(KrdsVue))을 등록한 앱과 같도록 v-sr-only를 전역 등록 (패키지 엔트리에서는 export되지 않음)
    app.directive('sr-only', vSrOnly)
  }
} satisfies Theme
