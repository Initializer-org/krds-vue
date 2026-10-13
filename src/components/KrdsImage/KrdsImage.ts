import { defineComponent, h, warn, watch } from 'vue'
import type { SlotsType } from 'vue'

/**
 * KRDS Image 컴포넌트 속성
 */
export interface KrdsImageProps {
  /** 이미지 주소 */
  src: string
  /** 대체 텍스트 (필수, 장식용 이미지는 빈 문자열 '') */
  alt: string
  /** 이미지 설명 (있으면 figure와 figcaption으로 감쌈) */
  caption?: string
}

/** 대체 텍스트 끝의 역할 중복 표현 (예: '로고 이미지', '강아지 사진') */
const roleWords = /(이미지|사진|그림|그래픽|image|photo|picture)[\s.]*$/i

/**
 * KRDS Image 컴포넌트
 *
 * `alt`가 필수라 정보 이미지인지 장식 이미지(`alt=""`)인지 반드시 정하게 합니다.
 * 앱이 개발 모드일 때 KRDS 이미지 접근성 가이드에 어긋나는 대체 텍스트(역할 중복, 설명과 같은 내용)를 경고합니다.
 * class·style은 바깥 요소(figure 또는 img)에, 나머지 속성(width, height, srcset, loading 등)은 img에 붙습니다.
 *
 * @example
 * ```vue
 * <KrdsImage src="/map.png" alt="정문으로 들어와 오른쪽 첫 번째 방이 민원실" caption="본관 1층 안내도" />
 * <KrdsImage src="/pattern.svg" alt="" />
 * ```
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsImage',
  inheritAttrs: false,
  props: {
    /** 이미지 주소 */
    src: {
      type: String,
      required: true
    },
    /** 대체 텍스트 (필수, 장식용 이미지는 빈 문자열 '') */
    alt: {
      type: String,
      required: true
    },
    /** 이미지 설명 (있으면 figure와 figcaption으로 감쌈) */
    caption: {
      type: String,
      default: undefined
    }
  },
  /* eslint-disable @typescript-eslint/no-explicit-any -- Vue SlotsType requires `any` for h() children compatibility */
  slots: Object as SlotsType<{
    /** 이미지 설명 (출처 링크 등 마크업이 필요할 때, caption 대신) */
    caption?: () => any
  }>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
  setup(props, { attrs, slots }) {
    // Vue warn은 앱이 Vue 개발 빌드일 때만 출력된다 (배포 빌드에서는 아무것도 하지 않음)
    watch(
      () => [props.alt, props.caption],
      () => {
        const alt = props.alt?.trim()
        if (!alt) return
        if (roleWords.test(alt)) warn(`KrdsImage: 대체 텍스트에 '이미지'·'사진'처럼 역할과 겹치는 말을 넣지 않습니다. (alt="${alt}")`)
        if (alt === props.caption?.trim()) warn(`KrdsImage: 대체 텍스트를 옆 설명(caption)과 같게 쓰지 않습니다. (alt="${alt}")`)
      },
      { immediate: true }
    )

    return () => {
      const { class: className, style, ...imgAttrs } = attrs
      const img = (extra: Record<string, unknown>) =>
        h('img', { loading: 'lazy', ...extra, class: ['krds-image', extra.class], src: props.src, alt: props.alt })

      if (!props.caption && !slots.caption) return img(attrs)
      return h('figure', { class: ['krds-figure', className], style }, [
        img(imgAttrs),
        h('figcaption', slots.caption ? slots.caption() : props.caption)
      ])
    }
  }
})
