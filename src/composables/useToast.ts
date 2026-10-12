import { reactive } from 'vue'
import type { KrdsToastType } from '@/components/KrdsToast/KrdsToast'

/** useToast().show() 옵션 */
export interface KrdsToastOptions {
  /** 메시지 유형. 기본 노출 시간을 정한다 (`info` 3초, `warning` 4초) */
  type?: KrdsToastType
  /** 노출 시간(ms). 0이면 자동으로 닫지 않는다 */
  duration?: number
}

/** 전역 토스트 상태. KrdsToast가 읽는다 (내부용) */
export const toastState = reactive({
  visible: false,
  /** show()마다 증가. 떠 있는 동안 다시 띄워도 노출 시간을 다시 센다 */
  id: 0,
  message: '',
  type: 'info' as KrdsToastType,
  duration: undefined as number | undefined
})

/**
 * 어디서든 토스트를 띄우는 컴포저블. App에 `<KrdsToast />`를 한 번 두고 쓴다
 *
 * @example
 * ```ts
 * const toast = useToast()
 * toast.show('저장되었습니다.')
 * toast.warning('임시 저장에 실패했습니다.')
 * ```
 */
export function useToast() {
  const show = (message: string, options: KrdsToastOptions = {}) => {
    Object.assign(toastState, { message, type: options.type ?? 'info', duration: options.duration, visible: true, id: toastState.id + 1 })
  }
  return {
    /** 토스트 표시 */
    show,
    /** 정보형 토스트 (3초): 인증·저장·업로드 완료 등 */
    info: (message: string, duration?: number) => show(message, { type: 'info', duration }),
    /** 주의·경고형 토스트 (4초): 인증·저장·업로드 실패 등 */
    warning: (message: string, duration?: number) => show(message, { type: 'warning', duration }),
    /** 토스트 닫기 */
    hide: () => (toastState.visible = false)
  }
}
