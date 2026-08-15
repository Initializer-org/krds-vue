import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS FormLabel 컴포넌트 속성
 */
export interface KrdsFormLabelProps extends BaseComponentProps {
  /** label의 for 속성 */
  for?: string
}

/**
 * KRDS FormLabel 컴포넌트 이벤트
 */
export interface KrdsFormLabelEmits {
  (e: 'click', event: MouseEvent): void
}

export default defineComponent({
  name: 'KrdsFormLabel',
  props: {
    /** label의 for 속성 */
    for: {
      type: String,
      default: undefined
    },
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
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    click: (event: MouseEvent) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    /**
     * 클릭 핸들러
     */
    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return () =>
      h('div', { class: 'form-tit' }, [
        h(
          'label',
          {
            for: props.for,
            id: props.id,
            class: props.class,
            style: props.style,
            onClick: handleClick
          },
          slots.default?.()
        )
      ])
  }
})
