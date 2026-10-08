import { defineComponent, computed, h } from 'vue'
import type { SlotsType, VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Identifier 컴포넌트 속성
 */

export interface KrdsIdentifierProps extends BaseComponentProps {
  logoLabel?: string
}

/**
 * KRDS Identifier 컴포넌트 이벤트
 */
export interface KrdsIdentifierEmits {
  (e: 'click', event: MouseEvent): void
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsIdentifier',
  props: {
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    },
    /** 로고 스크린리더 텍스트 */
    logoLabel: {
      type: String,
      default: 'KRDS - Korea Design System'
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 운영기관 식별자를 클릭했을 때 */
    click: (event: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    /** 운영기관 안내 문구 */
    default?(): VNode[]
  }>,
  setup(props, { emit, slots }) {
    /**
     * 배지 클래스 계산
     */
    const identifierClasses = computed(() => {
      const classes = ['krds-identifier']

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
      emit('click', event)
    }

    return () =>
      h(
        'div',
        {
          class: identifierClasses.value,
          onClick: handleClick
        },
        [
          h('span', { class: 'logo' }, [h('span', { class: 'sr-only' }, props.logoLabel)]),
          h('span', { class: 'ban-txt' }, slots.default?.())
        ]
      )
  }
})
