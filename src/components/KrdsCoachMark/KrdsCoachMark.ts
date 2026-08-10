import { computed, defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

type StepsData = { id: number; title: string; description: string }

/**
 * KRDS CoachMark 컴포넌트 속성
 */
export interface KrdsCoachMarkProps extends BaseComponentProps {
  /** 코치마크 래퍼에 추가할 클래스 */
  coachMarkClass?: string | string[]
  /** 전체 단계 데이터 */
  stepsData: StepsData[]
  /** 이 코치마크가 담당하는 단계 번호 */
  activeStep: number
  /** 현재 노출 중인 단계 (v-model) */
  modelValue?: number | null
}

/**
 * KRDS CoachMark 컴포넌트 이벤트
 */
export interface KrdsCoachMarkEmits {
  (e: 'update:modelValue', value: number | null): void
  (e: 'close'): void
}

export default defineComponent<KrdsCoachMarkProps>({
  name: 'KrdsCoachMark',
  props: {
    coachMarkClass: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    stepsData: {
      type: Array as () => StepsData[],
      required: true
    },
    activeStep: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      default: null
    },
    class: {
      type: String,
      default: undefined
    },
    style: {
      type: [String, Object] as PropType<string | Record<string, string | number>>,
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit, slots }) {
    const currentStepData = computed(() => {
      const index = props.activeStep - 1
      if (props.stepsData && index >= 0 && index < props.stepsData.length) {
        return props.stepsData[index]
      }
      return null
    })

    const prevStep = () => {
      if (props.activeStep > 1) {
        emit('update:modelValue', props.activeStep - 1)
      }
    }

    const nextStep = () => {
      if (props.activeStep < props.stepsData.length) {
        emit('update:modelValue', props.activeStep + 1)
      }
    }

    const closeCoachMark = () => {
      emit('close')
    }

    const renderBalloon = () => {
      const step = currentStepData.value
      if (props.modelValue !== props.activeStep || !step) {
        return null
      }

      return h('div', { class: 'coach-balloon' }, [
        h('h5', { class: 'sr-only' }, '따라하기 가이드'),
        h('h6', { class: 'coach-tit' }, `${props.activeStep}단계 : ${step.title}`),
        h('p', { class: 'desc' }, step.description),
        h('div', { class: 'coach-controls' }, [
          h('div', { class: 'num' }, [
            h('span', { class: 'sr-only' }, '현재 단계'),
            h('strong', null, String(props.activeStep)),
            h('span', { class: 'sr-only' }, '총 단계'),
            h('span', null, String(props.stepsData.length))
          ]),
          h('div', { class: 'btn-wrap' }, [
            h('button', { type: 'button', class: 'krds-btn small text', onClick: closeCoachMark }, '그만보기'),
            props.activeStep !== 1 ? h('button', { type: 'button', class: 'krds-btn small text', onClick: prevStep }, '이전으로') : null,
            props.activeStep !== props.stepsData.length
              ? h('button', { type: 'button', class: 'krds-btn small tertiary', onClick: nextStep }, '다음으로')
              : null
          ])
        ])
      ])
    }

    return () =>
      h('div', { class: ['krds-coach-mark', props.coachMarkClass], style: props.style }, [renderBalloon(), slots['coach-mark-content']?.()])
  }
})
