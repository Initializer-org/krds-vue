import { defineComponent, computed, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Tag 컴포넌트 속성
 */
export interface KrdsTagProps extends BaseComponentProps {
  /** 링크 태그 여부 */
  link?: boolean
  /** 링크 URL (link가 true일 때 사용) */
  href?: string
  /** 링크 타겟 (link가 true일 때 사용) */
  target?: string
  /** 링크 관계 (link가 true일 때 사용) */
  rel?: string
}

/**
 * KRDS Tag 컴포넌트 이벤트
 */
export interface KrdsTagEmits {
  (e: 'remove', event: MouseEvent): void
}

export default defineComponent<KrdsTagProps>({
  name: 'KrdsTag',
  props: {
    link: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '#'
    },
    target: {
      type: String,
      default: undefined
    },
    rel: {
      type: String,
      default: undefined
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['remove'],
  setup(props, { emit, slots }) {
    /**
     * 태그 클래스 계산
     */
    const tagClasses = computed(() => {
      const classes = ['krds-btn-tag']

      // 링크 클래스
      if (props.link) {
        classes.push('link')
      }

      // 사용자 정의 클래스
      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 삭제 버튼 클릭 핸들러
     */
    const handleDelete = (event: MouseEvent) => {
      emit('remove', event)
    }

    /**
     * 삭제 버튼 렌더링
     */
    const renderDeleteButton = () => {
      return h(
        'button',
        {
          type: 'button',
          class: 'btn-delete',
          onClick: handleDelete
        },
        [h('span', { class: 'sr-only' }, '삭제')]
      )
    }

    return () => {
      const content = []

      // 슬롯 내용 추가
      const slotContent = slots.default?.()
      if (slotContent) {
        content.push(slotContent)
      }

      // 링크가 아닌 경우에만 삭제 버튼 추가
      if (!props.link) {
        content.push(renderDeleteButton())
      }

      // 링크인 경우 a 태그, 아닌 경우 span 태그
      if (props.link) {
        const linkAttrs: Record<string, unknown> = {
          href: props.href,
          class: tagClasses.value
        }

        // 선택적 a 태그 속성들
        if (props.target) linkAttrs.target = props.target
        if (props.rel) linkAttrs.rel = props.rel

        return h('a', linkAttrs, content)
      }

      return h(
        'span',
        {
          class: tagClasses.value
        },
        content
      )
    }
  }
})
