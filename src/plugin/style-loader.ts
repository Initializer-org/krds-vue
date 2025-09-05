/**
 * KRDS Vue 스타일 로더 플러그인
 * 컴포넌트와 관련 스타일을 자동으로 매칭
 */

import type { App, Component } from 'vue'

// 컴포넌트와 스타일 매핑
const componentStyleMap: Record<string, string[]> = {
  KrdsButton: ['button'],
  KrdsLink: ['button'], // Link는 button 스타일 활용
  KrdsFormInput: ['input', 'formLayout'],
  KrdsFormLabel: ['formLayout'],
  KrdsFormHint: ['formLayout'],
  KrdsFormGroup: ['formLayout'],
  KrdsDateInput: ['input', 'calendar', 'dropdown'],
  KrdsFormTextarea: ['input', 'formLayout'],
  KrdsSelect: ['select', 'dropdown'],
  KrdsCheckbox: ['formCheck'],
  KrdsRadio: ['formCheck'],
  KrdsModal: ['modal'],
  KrdsTooltip: ['tooltip'],
  KrdsTable: ['table'],
  KrdsTabs: ['tab'],
  KrdsAccordion: ['accordion'],
  KrdsBreadcrumb: ['breadcrumb'],
  KrdsPagination: ['pagination'],
  KrdsBadge: ['badge'],
  KrdsTag: ['tag'],
  KrdsSpinner: ['spinner'],
  KrdsHeader: ['header', 'mainMenu'],
  KrdsFooter: ['footer'],
  KrdsSideNav: ['sideNavigation'],
}

// 스타일 로딩 상태 추적
const loadedStyles = new Set<string>()

/**
 * 컴포넌트에 필요한 스타일 자동 로드
 */
export function autoLoadComponentStyles(app: App, componentNames: string[]): void {
  const requiredStyles = new Set<string>()
  
  // 필요한 스타일 수집
  componentNames.forEach(name => {
    const styles = componentStyleMap[name]
    if (styles) {
      styles.forEach(style => requiredStyles.add(style))
    }
  })
  
  // 개발 모드에서 정보 로깅
  if (process.env.NODE_ENV !== 'production') {
    console.log('[KRDS Vue] 자동 로드할 스타일:', Array.from(requiredStyles))
  }
  
  // Vue 인스턴스에 스타일 정보 제공
  app.provide('krds:styles', {
    required: Array.from(requiredStyles),
    loaded: Array.from(loadedStyles)
  })
}

/**
 * 스타일 로드 여부 확인
 */
export function isStyleLoaded(styleName: string): boolean {
  return loadedStyles.has(styleName)
}

/**
 * 스타일 로드 완료 표시
 */
export function markStyleLoaded(styleName: string): void {
  loadedStyles.add(styleName)
}

/**
 * 컴포넌트의 필요 스타일 목록 가져오기
 */
export function getComponentStyles(componentName: string): string[] {
  return componentStyleMap[componentName] || []
}

/**
 * 스타일 의존성 분석
 */
export function analyzeStyleDependencies(components: Component[]): {
  required: string[]
  optional: string[]
} {
  const required = new Set<string>(['core', 'tokens']) // 항상 필요한 스타일
  const optional = new Set<string>()
  
  components.forEach(component => {
    const name = (component as any).name || component.name
    if (name && componentStyleMap[name]) {
      componentStyleMap[name].forEach(style => optional.add(style))
    }
  })
  
  return {
    required: Array.from(required),
    optional: Array.from(optional)
  }
}