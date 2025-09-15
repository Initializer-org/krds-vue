import { defineComponent, h } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * 알림 타입
 */
export type AlertType = 'danger' | 'ok' | 'info'

/**
 * KRDS Critical Alerts 컴포넌트 속성
 */
export interface KrdsCriticalAlertsProps extends BaseComponentProps {
  /** 알림 타입 */
  type: AlertType
  /** 알림 메시지 */
  message: string
  /** 링크 URL */
  linkHref?: string
  /** 링크 텍스트 */
  linkText?: string
}

/**
 * KRDS Critical Alerts 컴포넌트 이벤트
 */
export interface KrdsCriticalAlertsEmits {
  (e: 'link-click', event: MouseEvent): void
}

export default defineComponent<KrdsCriticalAlertsProps>({
  name: 'KrdsCriticalAlerts',
  props: {
    type: {
      type: String as () => AlertType,
      default: 'info'
    },
    message: {
      type: String,
      required: true
    },
    linkHref: {
      type: String,
      default: undefined
    },
    linkText: {
      type: String,
      default: '자세히 보기'
    }
  },
  emits: ['link-click'],
  setup(props, { emit }) {
    /**
     * 알림 타입에 따른 배지 텍스트 반환
     */
    const getBadgeText = (type: AlertType): string => {
      const badgeTextMap: Record<AlertType, string> = {
        danger: '긴급',
        ok: '안전',
        info: '안내'
      }
      return badgeTextMap[type]
    }

    /**
     * 링크 클릭 핸들러
     */
    const handleLinkClick = (event: MouseEvent) => {
      // 상위로 이벤트 전달
      emit('link-click', event)
    }

    return () =>
      h('ul', { class: 'krds-critical-alerts' }, [
        h('li', [
          h('div', { class: 'critical-ban' }, [
            // 배지
            h('span', { class: ['critical-badge', props.type] }, getBadgeText(props.type)),

            // 메시지
            h('p', { class: 'critical-txt' }, props.message),

            // 링크 (옵션)
            props.linkHref &&
              h(
                'a',
                {
                  href: props.linkHref,
                  class: 'krds-btn medium link basic',
                  onClick: handleLinkClick
                },
                [h('span', { class: 'm-hide' }, props.linkText), h('i', { class: 'svg-icon ico-angle right' })]
              )
          ])
        ])
      ])
  }
})
