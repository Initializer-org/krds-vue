import type { PropType } from 'vue'
import type { KrdsClassValue } from '@/types'

/**
 * 컴포넌트가 직접 받아 안쪽 요소에 붙이는 class 속성.
 * Vue가 배열·객체 class를 속성에 넘기기 전에 문자열로 바꾸므로(createVNode) 런타임 검사는 String이고,
 * 타입만 :class처럼 문자열·배열·객체를 받게 넓힌다
 */
export const classProp = {
  type: String as PropType<KrdsClassValue>,
  default: undefined
}
