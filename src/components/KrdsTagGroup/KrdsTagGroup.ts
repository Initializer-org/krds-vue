import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS TagGroup 크기 타입
 */
export type KrdsTagGroupSize = 'small' | 'medium' | 'large'

/**
 * KRDS TagGroup 컴포넌트 속성
 */
export interface KrdsTagGroupProps extends BaseComponentProps {
  /** 태그 그룹 크기 */
  size?: KrdsTagGroupSize
}

export default defineComponent<KrdsTagGroupProps>({
  name: 'KrdsTagGroup',
  props: {
    size: {
      type: String as () => KrdsTagGroupSize,
      default: 'medium'
    },
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    /**
     * 태그 그룹 클래스 계산
     */
    const tagGroupClasses = computed(() => {
      const classes = ['krds-tag-wrap']

      // 크기 클래스
      if (props.size) {
        classes.push(props.size)
      }

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    return () =>
      h(
        'div',
        {
          class: tagGroupClasses.value
        },
        slots.default?.()
      )
  }
})
