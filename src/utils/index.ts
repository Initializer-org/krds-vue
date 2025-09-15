/**
 * KRDS Vue 유틸리티
 */

let idCounter = 0

/**
 * 고유한 ID를 생성합니다.
 * Math.random()보다 성능이 좋고 예측 가능합니다.
 *
 * @param prefix - ID 접두사
 * @returns 고유한 ID 문자열
 */
export function generateId(prefix: string = 'krds'): string {
  return `${prefix}-${++idCounter}`
}

/**
 * 간단한 고유 ID를 생성합니다.
 * 브라우저와 Node.js 환경에서 모두 작동합니다.
 *
 * @returns 7자리 랜덤 문자열
 */
export function generateUid(): string {
  // 암호학적으로 안전한 난수가 필요한 경우가 아니라면
  // UI 컴포넌트 ID 생성에는 Math.random()이 충분합니다.
  // 더 안전한 방법이 필요하다면 crypto.randomUUID() 사용을 고려하세요.

  // 타임스탬프와 랜덤값을 조합하여 충돌 가능성을 줄입니다
  const timestamp = Date.now().toString(36).slice(-4)
  const random = Math.random().toString(36).substring(2, 5)
  return `${timestamp}${random}`
}

/**
 * 클래스명을 조합합니다.
 *
 * @param classes - 클래스명 배열 또는 객체
 * @returns 결합된 클래스명 문자열
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
