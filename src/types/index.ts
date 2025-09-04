/**
 * KRDS Vue 타입 정의
 */

import type { Component } from 'vue'

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
 * 정렬 타입
 */
export type Alignment = 'left' | 'center' | 'right' | 'justify'

/**
 * 방향 타입
 */
export type Direction = 'horizontal' | 'vertical'

/**
 * 위치 타입
 */
export type Position = 'top' | 'bottom' | 'left' | 'right'

/**
 * 컴포넌트 기본 속성
 */
export interface BaseComponentProps {
  /** CSS 클래스 */
  class?: string
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
  /** 폼 검증 오류 메시지 */
  error?: string
}

/**
 * 아이콘 속성
 */
export interface IconProps {
  /** 아이콘 이름 */
  name: string
  /** 아이콘 크기 */
  size?: Size | number
  /** 아이콘 색상 */
  color?: string
}

/**
 * 로딩 상태 속성
 */
export interface LoadingProps {
  /** 로딩 중 여부 */
  loading?: boolean
  /** 로딩 텍스트 */
  loadingText?: string
}

/**
 * 컴포넌트 슬롯 타입
 */
export interface ComponentSlots {
  default?: () => unknown
  [key: string]: ((...args: unknown[]) => unknown) | undefined
}

/**
 * KRDS 컴포넌트 타입
 */
export type KrdsComponent<Props = object, Slots = object, Emits = object> = Component & {
  __krdsComponent: true
  __krdsProps: Props
  __krdsSlots: Slots
  __krdsEmits: Emits
}

/**
 * 유틸리티 타입들
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

/**
 * CSS 변수 타입
 */
export type CSSCustomProperties = Record<`--${string}`, string | number>

/**
 * 반응형 값 타입
 */
export type ResponsiveValue<T> =
  | T
  | {
      mobile?: T
      tablet?: T
      desktop?: T
    }

/**
 * 컴포넌트 상태 타입
 */
export type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled'

/**
 * 입력 상태 타입
 */
export type InputState = ComponentState | 'error' | 'success'
