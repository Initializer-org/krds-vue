import { defineComponent, h, computed } from 'vue'
import type { BaseComponentProps } from '@/types'
import { generateUid } from '@/utils'

/**
 * KRDS Disclosure 컴포넌트 속성
 */
export interface KrdsDisclosureProps extends BaseComponentProps {
  /** 디스클로저 제목 */
  title: string
  /** 확장 상태 (v-model) */
  modelValue?: boolean
}

/**
 * KRDS Disclosure 컴포넌트 이벤트
 */
export interface KrdsDisclosureEmits {
  (e: 'update:modelValue', value: boolean): void
}

export default defineComponent<KrdsDisclosureProps>({
  name: 'KrdsDisclosure',
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    /**
     * 컴포넌트 고유 ID
     */
    const uuid = generateUid()

    /**
     * 확장 상태 (computed로 props와 동기화)
     */
    const isExpanded = computed(() => props.modelValue)

    /**
     * 토글 핸들러
     */
    const handleToggle = () => {
      emit('update:modelValue', !props.modelValue)
    }

    return () =>
      h(
        'div',
        {
          class: ['krds-disclosure', 'conts-expand-area', isExpanded.value && 'active']
        },
        [
          // 토글 버튼
          h(
            'button',
            {
              type: 'button',
              class: 'btn-conts-expand',
              onClick: handleToggle,
              'aria-expanded': isExpanded.value,
              'aria-controls': `disclosure-${uuid}`
            },
            props.title
          ),
          // 확장 콘텐츠 영역
          h(
            'div',
            {
              id: `disclosure-${uuid}`,
              class: 'expand-wrap',
              inert: !isExpanded.value
            },
            [h('div', { class: 'expand-in' }, slots.default?.())]
          )
        ]
      )
  }
})
