import { computed, defineComponent, h, onActivated, onMounted, onUnmounted, ref } from 'vue'

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

/** --krds-help-panel--button-bottom을 마지막으로 쓴 패널 (언마운트 때 다른 패널 값을 지우지 않게) */
let buttonBottomOwner: symbol | null = null

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

    // 원본 ui-script(krds_helpPanel.setupPadding)처럼 보이는 공식 배너·헤더 높이만큼 버튼과 패널 내용을 내려 헤더에 가려지지 않게 한다.
    // 값은 CSS 변수로만 넘기고, PC에서만 패널 내용을 내리는 분기는 _help_panel.scss의 중단점이 맡는다
    const headerOffset = ref(0)
    const expandRef = ref<HTMLButtonElement | null>(null)
    const owner = Symbol('KrdsPanel')
    let frame = 0
    const updateOffset = () => {
      cancelAnimationFrame(frame)
      // KrdsLayout이 같은 스크롤 이벤트에서 붙이는 scroll-down 클래스를 반영한 뒤 계산
      frame = requestAnimationFrame(() => {
        const masthead = document.querySelector<HTMLElement>(props.headerTopSelector)
        const header = document.querySelector<HTMLElement>(props.headerInnerSelector)
        const mastheadShown = !!masthead && masthead.getBoundingClientRect().bottom > 0
        // KrdsLayout 루트(.g-wrap, id는 바꿀 수 있음)에 붙는 헤더 숨김 클래스
        const headerHidden = !!document.querySelector('.g-wrap.scroll-down')
        headerOffset.value = !header
          ? 0
          : mastheadShown
            ? masthead.offsetHeight + header.offsetHeight
            : headerHidden
              ? 0
              : header.offsetHeight
        // 같은 오른쪽에 고정되는 콘텐츠 내 탐색이 버튼 아래에 서도록 버튼 아래쪽 끝 위치를 알린다 (_in_page_navigation.scss).
        // KeepAlive로 비활성화돼 문서에서 떨어진 패널은 쓰지 않는다
        const button = expandRef.value
        if (!button?.isConnected) return
        const bottom = parseFloat(getComputedStyle(button).top) + headerOffset.value + button.offsetHeight
        if (Number.isFinite(bottom)) {
          document.documentElement.style.setProperty('--krds-help-panel--button-bottom', `${bottom}px`)
          buttonBottomOwner = owner
        }
      })
    }

    onMounted(() => {
      updateOffset()
      window.addEventListener('scroll', updateOffset, { passive: true })
      window.addEventListener('resize', updateOffset)
    })
    onActivated(updateOffset)

    onUnmounted(() => {
      cancelAnimationFrame(frame)
      // 다른 패널이 쓴 값은 남겨 둔다
      if (buttonBottomOwner === owner) document.documentElement.style.removeProperty('--krds-help-panel--button-bottom')
      window.removeEventListener('scroll', updateOffset)
      window.removeEventListener('resize', updateOffset)
    })

    return () =>
      h('div', { class: 'inner help-panel-flexible', style: { '--krds-help-panel--header-offset': `${headerOffset.value}px` } }, [
        h(
          'button',
          {
            ref: expandRef,
            type: 'button',
            class: 'krds-btn small tertiary btn-help-panel expand btn-help-exec',
            // 화면 폭이 바뀌면 top이 transition으로 바뀌므로 끝난 뒤 버튼 아래쪽 끝을 다시 잰다
            onTransitionend: updateOffset,
            onClick: handleOpen
          },
          [h('i', { class: 'svg-icon ico-fold' }), ' 도움말']
        ),
        h('div', { class: ['krds-help-panel', { expand: open.value }] }, [
          h('div', { class: 'help-panel-wrap' }, [
            h('div', { class: 'help-conts-area' }, [
              slots.default?.(),
              h(
                'button',
                {
                  type: 'button',
                  class: 'krds-btn small tertiary btn-help-panel fold',
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
