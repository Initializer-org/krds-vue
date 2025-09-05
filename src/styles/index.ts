/**
 * KRDS Vue 스타일 진입점
 * 다양한 import 방식 지원
 */

// 전체 스타일 (모든 컴포넌트 스타일 포함)
import './main.scss'

// 개별 컴포넌트 스타일 export (Tree-shaking 지원)
export const styles = {
  // Core styles (항상 필요)
  core: () => import('./common/common.scss'),
  tokens: () => import('../tokens/krds_tokens.css'),
  
  // Component styles (개별 import 가능)
  button: () => import('./component/_button.scss'),
  input: () => import('./component/_input.scss'),
  select: () => import('./component/_select.scss'),
  textarea: () => import('./component/_input.scss'), // textarea는 input 스타일 공유
  formLayout: () => import('./component/_form_layout.scss'),
  formCheck: () => import('./component/_form_check.scss'),
  calendar: () => import('./component/_calendar.scss'),
  modal: () => import('./component/_modal.scss'),
  tooltip: () => import('./component/_tooltip.scss'),
  table: () => import('./component/_table.scss'),
  tab: () => import('./component/_tab.scss'),
  accordion: () => import('./component/_accordion.scss'),
  breadcrumb: () => import('./component/_breadcrumb.scss'),
  pagination: () => import('./component/_pagination.scss'),
  badge: () => import('./component/_badge.scss'),
  tag: () => import('./component/_tag.scss'),
  spinner: () => import('./component/_spinner.scss'),
  
  // Layout components
  header: () => import('./component/_header.scss'),
  footer: () => import('./component/_footer.scss'),
  sideNavigation: () => import('./component/_side_navigation.scss'),
  mainMenu: () => import('./component/_main_menu.scss'),
  
  // Utility styles
  dropdown: () => import('./common/_dropdown.scss'),
  icon: () => import('./common/_icon.scss'),
}

// 스타일 로더 유틸리티
export async function loadStyles(components: string[]): Promise<void> {
  // 항상 core 스타일 로드
  await styles.core()
  await styles.tokens()
  
  // 요청된 컴포넌트 스타일 로드
  for (const component of components) {
    const loader = styles[component as keyof typeof styles]
    if (loader && typeof loader === 'function') {
      await loader()
    }
  }
}

// 모든 스타일 로드
export async function loadAllStyles(): Promise<void> {
  const allComponents = Object.keys(styles).filter(key => key !== 'core' && key !== 'tokens')
  await loadStyles(allComponents)
}