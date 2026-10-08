import { defineComponent, computed, h, inject, ref } from 'vue'
import type { BaseComponentProps } from '@/types'
import type { StepIndicatorContext } from '../KrdsStepIndicator/KrdsStepIndicator'

/**
 * KRDS Step 컴포넌트 속성
 */
export interface KrdsStepProps extends BaseComponentProps {
  /** 단계 번호 */
  step: string | number
  /** 단계 제목 */
  title: string
  /** 단계 상태 (지정하지 않으면 KrdsStepIndicator가 순서에 따라 정함) */
  status?: 'done' | 'active' | 'pending'
}

/**
 * KRDS Step 컴포넌트 이벤트
 */
export interface KrdsStepEmits {
  (e: 'click', event: MouseEvent, step: string | number): void
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsStep',
  props: {
    /** 단계 번호 */
    step: {
      type: [String, Number],
      required: true
    },
    /** 단계 제목 */
    title: {
      type: String,
      required: true
    },
    /** 단계 상태 (지정하지 않으면 KrdsStepIndicator가 순서에 따라 정함) */
    status: {
      type: String as () => 'done' | 'active' | 'pending',
      default: undefined
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    click: (event: MouseEvent, step: string | number) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    /** 단계 상태: status가 없으면 KrdsStepIndicator 안의 위치로 정한다 */
    const stepIndicator = inject<StepIndicatorContext | null>('stepIndicator', null)
    const createdIndex = stepIndicator ? stepIndicator.register() : -1
    const elRef = ref<HTMLElement | null>(null)
    const stepStatus = computed(
      () => props.status ?? (stepIndicator ? stepIndicator.statusAt(stepIndicator.indexOf(elRef.value, createdIndex)) : 'pending')
    )

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
          ref: elRef,
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
