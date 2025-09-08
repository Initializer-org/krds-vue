import { type Ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * 외부 클릭 감지 컴포저블 옵션
 */
interface ClickOutsideOptions {
  /** 클릭을 무시할 선택자 (예: '.modal, .dropdown') */
  ignore?: string
  /** 이벤트 타입 (기본: 'click') */
  event?: 'click' | 'mousedown' | 'mouseup'
}

/**
 * 외부 클릭 감지 컴포저블
 * @param targetRef 감지 대상 요소 ref
 * @param callback 외부 클릭 시 실행할 콜백
 * @param options 추가 옵션 또는 무시할 선택자 (하위 호환성)
 */
export function useClickOutside(targetRef: Ref<HTMLElement | undefined>, callback: () => void, options: ClickOutsideOptions | string = {}) {
  let globalClickHandler: ((event: Event) => void) | null = null

  // 하위 호환성을 위해 string을 지원
  const opts = typeof options === 'string' ? { ignore: options } : options
  const { ignore, event = 'click' } = opts

  const setupGlobalListeners = () => {
    globalClickHandler = (e: Event) => {
      const target = e.target as HTMLElement

      // targetRef 내부 클릭인지 확인
      if (targetRef.value?.contains(target)) {
        return
      }

      // ignore 선택자가 있으면 해당 요소 내부 클릭은 무시
      if (ignore && target.closest(ignore)) {
        return
      }

      callback()
    }
    document.addEventListener(event, globalClickHandler)
  }

  const removeGlobalListeners = () => {
    if (globalClickHandler) {
      const eventType = typeof options === 'string' ? 'click' : options.event || 'click'
      document.removeEventListener(eventType, globalClickHandler)
      globalClickHandler = null
    }
  }

  onMounted(() => {
    setupGlobalListeners()
  })

  onBeforeUnmount(() => {
    removeGlobalListeners()
  })

  return {
    setupGlobalListeners,
    removeGlobalListeners
  }
}
