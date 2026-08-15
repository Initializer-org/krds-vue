import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS FormGroup 컴포넌트 속성
 */
export type KrdsFormGroupProps = BaseComponentProps

export default defineComponent({
  name: 'KrdsFormGroup',
  props: {
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    },
    /** 인라인 스타일 */
    style: {
      type: [String, Object],
      default: undefined
    },
    /** HTML ID */
    id: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    /**
     * 클래스 계산
     */
    const classes = computed(() => {
      const classList = ['form-group']

      if (props.class) {
        classList.push(props.class)
      }

      return classList
    })

    return () =>
      h(
        'div',
        {
          id: props.id,
          class: classes.value,
          style: props.style
        },
        slots.default?.()
      )
  }
})
