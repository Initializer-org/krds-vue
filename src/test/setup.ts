/**
 * 컴포넌트 테스트 공통 설정 (vitest 브라우저 모드)
 */
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/vue'
import { afterEach } from 'vitest'
import { page } from 'vitest/browser'
import '@/styles/main.scss'

document.documentElement.setAttribute('data-krds-mode', 'light')

// 같은 파일의 테스트끼리 페이지를 공유하므로 렌더 결과·스크롤·뷰포트를 매번 되돌린다
afterEach(async () => {
  cleanup()
  window.scrollTo({ top: 0, behavior: 'instant' })
  await page.viewport(1200, 900)
})
