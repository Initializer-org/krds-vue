import { computed, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'

/**
 * KRDS Panel 컴포넌트 속성
 */
export interface KrdsPanelProps {
  /** 도움말 패널 펼침 상태 (v-model) */
  modelValue?: boolean
  /** 헤더 상단 영역 선택자 (기본값: '#krds-masthead') */
  headerTopSelector?: string
  /** 헤더 내부 영역 선택자 (기본값: '#krds-header .header-in') */
  headerInnerSelector?: string
}

/**
 * KRDS Panel 컴포넌트 이벤트
 */
export interface KrdsPanelEmits {
  (e: 'update:modelValue', value: boolean): void
}

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsPanel',
  props: {
    /** 도움말 패널 펼침 상태 (v-model) */
    modelValue: {
      type: Boolean,
      default: false
    },
    /** 헤더 상단 영역 선택자 (기본값: '#krds-masthead', KrdsInPageNavigation과 같음) */
    headerTopSelector: {
      type: String,
      default: '#krds-masthead'
    },
    /** 헤더 내부 영역 선택자 (기본값: '#krds-header .header-in', KrdsInPageNavigation과 같음) */
    headerInnerSelector: {
      type: String,
      default: '#krds-header .header-in'
    }
  },
  /* eslint-disable @typescript-eslint/no-unused-vars -- 검증 함수 시그니처는 이벤트 타입 문서화용 */
  emits: {
    'update:modelValue': (value: boolean) => true
  },
  /* eslint-enable @typescript-eslint/no-unused-vars */
  setup(props, { emit, slots }) {
    const open = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    const handleOpen = () => {
      open.value = true
    }
    const handleClose = () => {
      open.value = false
    }

    // 원본 ui-script(krds_helpPanel.setupPadding)처럼 보이는 공식 배너·헤더 높이만큼 버튼과 패널 내용을 내려 헤더에 가려지지 않게 한다
    const headerOffset = ref(0)
    const isPc = ref(false)
    let frame = 0
    const updateOffset = () => {
      cancelAnimationFrame(frame)
      // KrdsLayout이 같은 스크롤 이벤트에서 붙이는 scroll-down 클래스를 반영한 뒤 계산
      frame = requestAnimationFrame(() => {
        const masthead = document.querySelector<HTMLElement>(props.headerTopSelector)
        const header = document.querySelector<HTMLElement>(props.headerInnerSelector)
        const mastheadShown = !!masthead && masthead.getBoundingClientRect().bottom > 0
        const headerHidden = !!document.querySelector('#wrap.scroll-down')
        headerOffset.value = !header
          ? 0
          : mastheadShown
            ? masthead.offsetHeight + header.offsetHeight
            : headerHidden
              ? 0
              : header.offsetHeight
        isPc.value = window.innerWidth >= 1024
      })
    }

    onMounted(() => {
      updateOffset()
      window.addEventListener('scroll', updateOffset, { passive: true })
      window.addEventListener('resize', updateOffset)
    })

    onUnmounted(() => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateOffset)
    })

    return () =>
      h('div', { class: 'inner help-panel-flexible' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'krds-btn small tertiary btn-help-panel expand btn-help-exec',
            style: { marginTop: `${headerOffset.value}px` },
            onClick: handleOpen
          },
          [h('i', { class: 'svg-icon ico-fold' }), ' 도움말']
        ),
        h('div', { class: ['krds-help-panel', { expand: open.value }] }, [
          h('div', { class: 'help-panel-wrap', style: isPc.value ? { paddingTop: `${headerOffset.value}px` } : undefined }, [
            h('div', { class: 'help-conts-area' }, [
              slots.default?.(),
              h(
                'button',
                {
                  type: 'button',
                  class: 'krds-btn small tertiary btn-help-panel fold',
                  style: isPc.value ? { marginTop: `${headerOffset.value}px` } : undefined,
                  onClick: handleClose
                },
                [h('span', { class: 'sr-only' }, '도움말'), ' 접어두기 ', h('i', { class: 'svg-icon ico-angle right' })]
              )
            ])
          ])
        ])
      ])
  }
})
