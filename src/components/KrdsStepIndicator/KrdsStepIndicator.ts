import { Fragment, cloneVNode, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import type { BaseComponentProps } from '@/types'
import KrdsStep from '../KrdsStep/KrdsStep'

/**
 * KRDS StepIndicator 컴포넌트 속성
 */
export interface KrdsStepIndicatorProps extends BaseComponentProps {
  /** 현재 단계 인덱스 (0부터 시작). 앞 단계는 완료, 뒤 단계는 대기로 표시 */
  modelValue?: number
}

/** v-for 등으로 생긴 Fragment를 펼쳐 단계를 순서대로 센다 */
const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap(node => (node.type === Fragment && Array.isArray(node.children) ? flatten(node.children as VNode[]) : [node]))

/**
 * KRDS StepIndicator 컴포넌트
 *
 * 진행 상태를 보여 주기만 하는 컴포넌트입니다 (KRDS 원본과 같이 단계를 눌러 이동하지 않음).
 * 단계 이동은 이전/다음 버튼 등에서 `model-value`를 바꿔 반영합니다.
 */
export default /* @__PURE__ */ defineComponent({
  name: 'KrdsStepIndicator',
  props: {
    /** 현재 단계 인덱스 (0부터 시작). 앞 단계는 완료, 뒤 단계는 대기로 표시 */
    modelValue: {
      type: Number,
      default: 0
    },
    /** CSS 클래스 */
    class: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    // 렌더할 때마다 단계 순서로 상태를 정해 단계가 추가·삭제·재정렬돼도 맞게 표시한다
    return () => {
      let index = 0
      const steps = flatten(slots.default?.() ?? []).map(node => {
        if (node.type !== KrdsStep) return node
        const current = index++
        if (node.props?.status) return node
        const status = current < props.modelValue ? 'done' : current === props.modelValue ? 'active' : 'pending'
        return cloneVNode(node, { status })
      })

      return h('ol', { class: ['krds-step-wrap', props.class] }, steps)
    }
  }
})
