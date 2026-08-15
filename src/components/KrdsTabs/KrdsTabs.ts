import { computed, defineComponent, h, ref, useId } from 'vue'
import type { PropType } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS Tabs 탭 아이템
 */
export interface KrdsTabItem {
  /** 탭 고유 식별자 (패널 슬롯 이름으로 사용) */
  id: string
  /** 탭 버튼 레이블 */
  label: string
  /** 비활성화 여부 */
  disabled?: boolean
}

/**
 * 탭 스타일 변형 (line: 라인형, fill: 버튼형)
 */
export type KrdsTabsVariant = 'line' | 'fill'

/**
 * KRDS Tabs 컴포넌트 속성
 */
export interface KrdsTabsProps extends BaseComponentProps {
  /** 탭 아이템 목록 */
  tabs: KrdsTabItem[]
  /** 활성 탭 id (v-model) */
  modelValue?: string
  /** 탭 스타일 변형 */
  variant?: KrdsTabsVariant
  /** 풀사이즈 레이아웃 여부 */
  full?: boolean
  /** 선택된 탭의 스크린 리더 대체 텍스트 */
  selectedText?: string
}

/**
 * KRDS Tabs 컴포넌트 이벤트
 */
export interface KrdsTabsEmits {
  (e: 'update:modelValue', id: string): void
  (e: 'change', id: string): void
}

export default defineComponent({
  name: 'KrdsTabs',
  props: {
    /** 탭 아이템 목록 */
    tabs: {
      type: Array as PropType<KrdsTabItem[]>,
      required: true
    },
    /** 활성 탭 id (v-model) */
    modelValue: {
      type: String,
      default: undefined
    },
    /** 탭 스타일 변형 */
    variant: {
      type: String as PropType<KrdsTabsVariant>,
      default: 'line'
    },
    /** 풀사이즈 레이아웃 여부 */
    full: {
      type: Boolean,
      default: false
    },
    /** 선택된 탭의 스크린 리더 대체 텍스트 */
    selectedText: {
      type: String,
      default: '선택됨'
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:modelValue': (id: string) => true,
    change: (id: string) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    /**
     * 컴포넌트 고유 ID (탭-패널 ARIA 연결용)
     */
    const uid = useId()
    const tabId = (id: string): string => `tab-${uid}-${id}`
    const panelId = (id: string): string => `panel-${uid}-${id}`

    /**
     * 비제어 모드에서 사용하는 내부 활성 탭 상태
     */
    const internalActiveId = ref(props.tabs.find(tab => !tab.disabled)?.id)

    /**
     * 현재 활성 탭 id (modelValue 우선)
     */
    const activeId = computed(() => props.modelValue ?? internalActiveId.value)

    const selectTab = (tab: KrdsTabItem): void => {
      if (tab.disabled || tab.id === activeId.value) return
      internalActiveId.value = tab.id
      emit('update:modelValue', tab.id)
      emit('change', tab.id)
    }

    /**
     * 좌우 방향키로 탭 버튼 간 초점 이동 (원본 krds_tab 키보드 동작)
     */
    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const currentTab = event.currentTarget as HTMLElement
      const sibling = event.key === 'ArrowRight' ? currentTab.nextElementSibling : currentTab.previousElementSibling
      sibling?.querySelector('button')?.focus()
    }

    return () =>
      h('div', { class: ['krds-tab-area', 'layer', props.class] }, [
        // 탭 목록
        h('div', { class: ['tab', props.variant, { full: props.full }] }, [
          h(
            'ul',
            { role: 'tablist' },
            props.tabs.map(tab =>
              h(
                'li',
                {
                  key: tab.id,
                  id: tabId(tab.id),
                  role: 'tab',
                  'aria-selected': tab.id === activeId.value,
                  'aria-controls': panelId(tab.id),
                  class: { active: tab.id === activeId.value },
                  onKeydown: handleKeydown
                },
                [
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'btn-tab',
                      disabled: tab.disabled || undefined,
                      onClick: () => selectTab(tab)
                    },
                    [tab.label, tab.id === activeId.value ? h('i', { class: 'sr-only' }, ` ${props.selectedText}`) : null]
                  )
                ]
              )
            )
          )
        ]),
        // 탭 콘텐츠
        h(
          'div',
          { class: 'tab-conts-wrap' },
          props.tabs.map(tab =>
            h(
              'section',
              {
                key: tab.id,
                id: panelId(tab.id),
                role: 'tabpanel',
                'aria-labelledby': tabId(tab.id),
                class: ['tab-conts', { active: tab.id === activeId.value }]
              },
              slots[tab.id]?.()
            )
          )
        )
      ])
  }
})
