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
 *
 * @returns 7자리 랜덤 문자열
 */
export function generateUid(): string {
  return Math.random().toString(36).substring(2, 9)
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
