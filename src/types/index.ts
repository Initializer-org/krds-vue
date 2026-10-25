/**
 * KRDS Vue 타입 정의
 */

/**
 * 기본 크기 타입 (KRDS 실제 규격)
 */
export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

/**
 * 입력 타입
 */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'

/**
 * 색상 변형 타입
 */
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

/**
 * 버튼 변형 타입
 */
export type Variant = 'primary' | 'secondary' | 'tertiary'

/**
 * class 값: 문자열, 배열, 객체(`{ active: isActive }`)를 섞어 쓸 수 있다 (Vue의 :class와 같음)
 */
export type KrdsClassValue = string | Record<string, unknown> | KrdsClassValue[] | false | null | undefined

/**
 * 컴포넌트 기본 속성
 */
export interface BaseComponentProps {
  /** CSS 클래스 (문자열·배열·객체) */
  class?: KrdsClassValue
  /** 인라인 스타일 */
  style?: string | Record<string, string | number>
  /** HTML ID */
  id?: string
}

/**
 * 폼 컴포넌트 기본 속성
 */
export interface BaseFormProps extends BaseComponentProps {
  /** 폼 필드 이름 */
  name?: string
  /** 필수 입력 여부 */
  required?: boolean
  /** 읽기 전용 여부 */
  readonly?: boolean
}
