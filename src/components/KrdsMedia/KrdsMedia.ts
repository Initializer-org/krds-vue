import { defineComponent, Fragment, h, ref, warn } from 'vue'
import type { SlotsType, VNode } from 'vue'
import KrdsDisclosure from '@/components/KrdsDisclosure/KrdsDisclosure'

/**
 * KRDS Media 컴포넌트 속성
 */
export interface KrdsMediaProps {
  /** 미디어 파일 주소 (없으면 기본 슬롯의 재생기를 씀, 예: 유튜브 iframe) */
  src?: string
  /** 미디어 제목 (재생기 위에 표시, 화면낭독기가 미디어 영역 이름으로 읽음) */
  title: string
  /** 제목을 화면에서 숨김 (화면낭독기는 읽음) */
  hideTitle?: boolean
  /** 한국어 자막(WebVTT) 주소 */
  captions?: string
  /** 오디오 콘텐츠 (audio 요소로 재생) */
  audio?: boolean
}

/** 자막 트랙인지 (기본 슬롯으로 넣은 다른 언어 자막 포함, v-for·v-if로 묶인 Fragment 안도 보고 kind 생략은 subtitles) */
const isCaptionTrack = (vnode: VNode): boolean =>
  vnode.type === Fragment
    ? Array.isArray(vnode.children) && (vnode.children as VNode[]).some(isCaptionTrack)
    : vnode.type === 'track' && ['captions', 'subtitles'].includes(vnode.props?.kind ?? 'subtitles')

/**
 * KRDS Media 컴포넌트 (접근 가능한 미디어)
 *
 * 동영상·오디오에 자막과 원고(설명적 원고) 같은 대체 정보를 함께 제공합니다.
 * 재생기는 브라우저 기본 `<video controls>`·`<audio controls>`(키보드·화면낭독기·자막 켜기와 OS 자막 설정 지원)이고,
 * `src` 없이 기본 슬롯에 유튜브 iframe 등 외부 재생기를 넣으면 제목과 원고 영역만 붙입니다.
 * 앱 개발 모드에서 자막·원고가 모두 없거나(오디오는 원고가 없으면) 자동 재생(autoplay)이면 경고합니다.
 * class·style은 바깥 figure에, 나머지 속성(poster, width 등)은 video·audio에 붙습니다.
 *
 * @example
 * ```vue
 * <KrdsMedia src="/guide.mp4" title="민원 신청 안내 영상" captions="/guide.ko.vtt">
 *   <template #transcript><p>민원 신청은 세 단계로 진행됩니다. …</p></template>
 * </KrdsMedia>
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsMedia',
  inheritAttrs: false,
  props: {
    /** 미디어 파일 주소 (없으면 기본 슬롯의 재생기를 씀, 예: 유튜브 iframe) */
    src: {
      type: String,
      default: undefined
    },
    /** 미디어 제목 (재생기 위에 표시, 화면낭독기가 미디어 영역 이름으로 읽음) */
    title: {
      type: String,
      required: true
    },
    /** 제목을 화면에서 숨김 (화면낭독기는 읽음) */
    hideTitle: {
      type: Boolean,
      default: false
    },
    /** 한국어 자막(WebVTT) 주소 */
    captions: {
      type: String,
      default: undefined
    },
    /** 오디오 콘텐츠 (audio 요소로 재생) */
    audio: {
      type: Boolean,
      default: false
    }
  },
  /* eslint-disable @typescript-eslint/no-explicit-any -- Vue SlotsType requires `any` for h() children compatibility */
  slots: Object as SlotsType<{
    /** src가 있으면 video·audio 안에 넣을 source·track(다른 언어 자막 등), 없으면 재생기 자체(유튜브 iframe 등) */
    default?: () => any
    /** 원고(설명적 원고): 화면과 소리의 정보를 글로 옮긴 내용, '원고 보기'로 펼침 */
    transcript?: () => any
  }>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
  setup(props, { attrs, slots }) {
    const transcriptOpen = ref(false)
    let checked = false

    return () => {
      const { class: className, style, ...mediaAttrs } = attrs
      const extra: VNode[] = slots.default?.() ?? []

      // 대체 정보 확인은 첫 렌더에서 한 번만 (Vue warn은 앱이 Vue 개발 빌드일 때만 출력)
      if (!checked) {
        checked = true
        // 오디오는 자막이 화면에 보이지 않아 원고만 대체 정보가 된다
        if (!slots.transcript && (props.audio || (!props.captions && !extra.some(isCaptionTrack)))) {
          warn(
            props.audio
              ? `KrdsMedia: 오디오는 자막이 화면에 보이지 않으므로 원고(#transcript)를 제공합니다. (title="${props.title}")`
              : `KrdsMedia: 자막(captions)이나 원고(#transcript) 중 하나 이상을 제공합니다. 어렵다면 원고를 제공합니다. (title="${props.title}")`
          )
        }
        if (mediaAttrs.autoplay !== undefined && mediaAttrs.autoplay !== false) {
          warn(`KrdsMedia: 미디어를 자동 재생하지 않습니다. 사용자가 직접 재생하게 합니다. (title="${props.title}")`)
        }
      }

      const player = props.src
        ? h(props.audio ? 'audio' : 'video', { controls: true, preload: 'metadata', ...mediaAttrs, src: props.src }, [
            props.captions ? h('track', { kind: 'captions', src: props.captions, srclang: 'ko', label: '한국어', default: true }) : null,
            ...extra
          ])
        : extra

      // 외부 재생기(src 없음)는 속성을 붙일 요소가 없어 figure에 붙인다
      return h('figure', { ...(props.src ? {} : mediaAttrs), class: ['krds-media', className], style }, [
        h('figcaption', { class: props.hideTitle ? 'sr-only' : 'media-title' }, props.title),
        h('div', { class: 'media-player' }, player),
        slots.transcript
          ? h(
              KrdsDisclosure,
              {
                title: '원고 보기',
                modelValue: transcriptOpen.value,
                'onUpdate:modelValue': (open: boolean) => (transcriptOpen.value = open)
              },
              slots.transcript
            )
          : null
      ])
    }
  }
})
