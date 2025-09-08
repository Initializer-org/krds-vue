import { defineComponent, computed, h } from 'vue'
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

export default defineComponent<KrdsMastheadProps>({
  name: 'KrdsMasthead',
  props: {
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
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
