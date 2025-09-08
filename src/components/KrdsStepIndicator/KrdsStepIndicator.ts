import { defineComponent, provide, computed, ref, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS StepIndicator 컴포넌트 속성
 */
export interface KrdsStepIndicatorProps extends BaseComponentProps {
  /** 현재 활성 단계 인덱스 (0부터 시작) - v-model */
  modelValue?: number
}

/**
 * KRDS StepIndicator 컴포넌트 이벤트
 */
export interface KrdsStepIndicatorEmits {
  (e: 'update:modelValue', value: number): void
}

export default defineComponent<KrdsStepIndicatorProps>({
  name: 'KrdsStepIndicator',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots }) {
    /**
     * Stepper 클래스 계산
     */
    const stepperClasses = computed(() => {
      const classes = ['krds-step-wrap']

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 단계별 상태 계산
     */
    const getStepStatus = (index: number): 'done' | 'active' | 'pending' => {
      const currentStep = props.modelValue || 0
      if (index < currentStep) return 'done'
      if (index === currentStep) return 'active'
      return 'pending'
    }

    /**
     * 단계 인덱스 추적 (반응형)
     */
    const stepIndex = ref(0)
    const resetStepIndex = () => {
      stepIndex.value = 0
    }
    const getNextStepIndex = () => {
      return stepIndex.value++
    }

    /**
     * 컨텍스트 제공
     */
    provide('stepper', {
      activeStep: computed(() => props.modelValue || 0),
      getStepStatus,
      getNextStepIndex,
      resetStepIndex
    })

    return () => {
      // 슬롯 기반 렌더링
      resetStepIndex() // 렌더링 시작 전 인덱스 초기화
      return h(
        'ol',
        {
          class: stepperClasses.value
        },
        slots.default?.()
      )
    }
  }
})
