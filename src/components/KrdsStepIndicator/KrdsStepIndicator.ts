import { computed, defineComponent, h, onBeforeUnmount, onMounted, onUpdated, provide, ref, shallowRef } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS StepIndicator 컴포넌트 속성
 */
export interface KrdsStepIndicatorProps extends BaseComponentProps {
  /** 현재 단계 인덱스 (0부터 시작). 앞 단계는 완료, 뒤 단계는 대기로 표시 */
  modelValue?: number
}

/**
 * KRDS StepIndicator 컴포넌트 이벤트
 * @deprecated 단계 표시기는 진행 상태만 보여 주므로 update:modelValue를 보내지 않습니다. 다음 주요 버전에서 제거합니다.
 */
export interface KrdsStepIndicatorEmits {
  (e: 'update:modelValue', value: number): void
}

/** KrdsStep에 주는 단계 표시기 컨텍스트 */
export interface StepIndicatorContext {
  /** 단계가 만들어진 순서 (첫 렌더·SSR에서 쓰는 위치) */
  register: () => number
  /** 마운트된 단계의 <li> 등록 (단계가 아닌 <li>는 순서에서 뺀다) */
  track: (el: Element) => void
  /** 사라지는 단계 등록 해제 (TransitionGroup의 leave 동안 남아 있는 <li>도 순서에서 뺀다) */
  untrack: (el: Element) => void
  /** 화면에 그려진 순서로 본 단계 위치 (아직 반영 전이면 fallback) */
  indexOf: (el: Element | null, fallback: number) => number
  /** 위치에 따른 상태 */
  statusAt: (index: number) => 'done' | 'active' | 'pending'
}

/**
 * KRDS StepIndicator 컴포넌트
 *
 * 진행 상태를 보여 주기만 하는 컴포넌트입니다 (KRDS 원본과 같이 단계를 눌러 이동하지 않음).
 * 단계 이동은 이전/다음 버튼 등에서 `model-value`를 바꿔 반영합니다.
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsStepIndicator',
  props: {
    /** 현재 단계 인덱스 (0부터 시작). 앞 단계는 완료, 뒤 단계는 대기로 표시 */
    modelValue: {
      type: Number,
      default: 0
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /**
     * 보내지 않음: 단계 표시기는 진행 상태만 보여 주므로 v-model 값이 바뀌지 않습니다 (기존 코드 호환용, 다음 주요 버전에서 제거)
     * @deprecated
     */
    'update:modelValue': (value: number) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { slots }) {
    const listRef = ref<HTMLOListElement | null>(null)
    const activeStep = computed(() => props.modelValue || 0)
    // 마운트 후에는 실제 <li> 순서로 위치를 정해, 단계가 추가·삭제·재정렬되거나 다른 컴포넌트로 감싸져도 맞게 표시한다
    const order = shallowRef<Element[] | null>(null)
    const steps = new WeakSet<Element>()
    const syncOrder = () => {
      order.value = listRef.value ? Array.from(listRef.value.children).filter(el => steps.has(el)) : null
    }
    let nextIndex = 0
    let observer: MutationObserver | undefined

    onMounted(() => {
      syncOrder()
      // 다른 컴포넌트로 감싼 단계가 따로 다시 그려질 때도 순서를 맞춘다
      observer = new MutationObserver(syncOrder)
      observer.observe(listRef.value!, { childList: true })
    })
    // 슬롯이 바뀐 같은 갱신 안에서 바로 맞춰 nextTick 뒤 DOM이 맞게 한다
    onUpdated(syncOrder)
    onBeforeUnmount(() => observer?.disconnect())

    provide<StepIndicatorContext>('stepIndicator', {
      register: () => nextIndex++,
      track: el => steps.add(el),
      untrack: el => {
        steps.delete(el)
        syncOrder()
      },
      indexOf: (el, fallback) => {
        const index = el && order.value ? order.value.indexOf(el) : -1
        return index >= 0 ? index : fallback
      },
      statusAt: index => (index < activeStep.value ? 'done' : index === activeStep.value ? 'active' : 'pending')
    })

    return () => {
      nextIndex = 0
      return h('ol', { ref: listRef, class: ['krds-step-wrap', props.class] }, slots.default?.())
    }
  }
})
