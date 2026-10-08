import { defineComponent, computed, h } from 'vue'
import type { SlotsType, VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Masthead 컴포넌트 속성
 */

export type KrdsMastheadProps = BaseComponentProps

/**
 * KRDS Masthead 컴포넌트 이벤트
 */
export interface KrdsMastheadEmits {
  (e: 'click', event: MouseEvent): void
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsMasthead',
  props: {
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    /** 공식 배너를 클릭했을 때 */
    click: (event: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  slots: Object as SlotsType<{
    /** 공식 배너 문구 */
    default?(): VNode[]
  }>,
  setup(props, { emit, slots }) {
    /**
     * 배지 클래스 계산
     */
    const mastheadClasses = computed(() => {
      const classes = ['']

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
          id: 'krds-masthead',
          class: mastheadClasses.value,
          onClick: handleClick
        },
        [
          h('div', { class: 'toggle-wrap' }, [
            h('div', { class: 'toggle-head' }, [h('div', { class: 'inner' }, [h('span', { class: 'nuri-txt' }, slots.default?.())])])
          ])
        ]
      )
  }
})
