import { defineComponent, inject, computed, h } from 'vue'
import type { BaseComponentProps } from '@/types'
import type { ComputedRef } from 'vue'

/**
 * KRDS Step 컴포넌트 속성
 */
export interface KrdsStepProps extends BaseComponentProps {
  /** 단계 번호 */
  step: string | number
  /** 단계 제목 */
  title: string
  /** 단계 상태 강제 설정 (선택적) */
  status?: 'done' | 'active' | 'pending'
}

/**
 * KRDS Step 컴포넌트 이벤트
 */
export interface KrdsStepEmits {
  (e: 'click', event: MouseEvent, step: string | number): void
}

/**
 * Stepper 컨텍스트 타입
 */
interface StepIndicatorContext {
  activeStep: ComputedRef<number>
  getStepStatus: (index: number) => 'done' | 'active' | 'pending'
  getNextStepIndex: () => number
  resetStepIndex: () => void
}

export default defineComponent<KrdsStepProps>({
  name: 'KrdsStep',
  props: {
    step: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: String as () => 'done' | 'active' | 'pending',
      default: undefined
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    /**
     * StepIndicator 컨텍스트 주입 (선택적)
     */
    const stepIndicatorContext = inject<StepIndicatorContext | null>('stepIndicator')

    /**
     * 현재 단계의 인덱스 계산
     */
    const stepIndex = stepIndicatorContext ? stepIndicatorContext.getNextStepIndex() : -1

    /**
     * 단계 상태 계산
     */
    const stepStatus = computed(() => {
      // props로 상태가 직접 지정된 경우 우선 사용
      if (props.status) {
        return props.status
      }

      // StepIndicator 컨텍스트가 있으면 인덱스 기반으로 상태 계산
      if (stepIndicatorContext && stepIndex >= 0) {
        return stepIndicatorContext.getStepStatus(stepIndex)
      }

      // 기본값
      return 'pending'
    })

    /**
     * 단계 클래스 계산
     */
    const stepClasses = computed(() => {
      const classes: string[] = [stepStatus.value]

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      emit('click', event, props.step)
    }

    return () => {
      const isActive = stepStatus.value === 'active'

      return h(
        'li',
        {
          class: stepClasses.value,
          onClick: handleClick
        },
        [
          h('span', [
            // 현재 단계 표시 (활성 상태일 때만)
            isActive && h('em', { class: 'sr-only' }, '현재단계'),
            // 단계 번호
            h('i', { class: 'step' }, props.step),
            // 단계 제목
            h('span', { class: 'step-tit' }, props.title),
            // 슬롯 내용 (추가 콘텐츠가 있는 경우)
            slots.default?.()
          ])
        ]
      )
    }
  }
})
