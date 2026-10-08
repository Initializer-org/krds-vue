import { defineComponent, h } from 'vue'
import type { SlotsType, VNode } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * KRDS ButtonGroup 컴포넌트 속성
 */
export type KrdsButtonGroupProps = BaseComponentProps

/**
 * KRDS ButtonGroup 컴포넌트
 *
 * 입력 필드 안에 버튼을 여러 개 넣을 때 묶는 래퍼입니다 (KRDS `.btn-group`, 예: 내용 삭제 + 비밀번호 보기).
 * KRDS에는 일반 버튼 묶음 스타일이 없으므로 입력 필드 밖에서는 사용하지 않습니다.
 *
 * @example
 * ```vue
 * <KrdsInput id="pw" type="password" icon>
 *   <KrdsButtonGroup>
 *     <KrdsButton icon pure class="btn-delete-input"><span class="sr-only">내용 삭제</span><KrdsIcon name="ico-delete-fill" /></KrdsButton>
 *     <KrdsButton icon><span class="sr-only">입력한 비밀번호 보기</span><KrdsIcon name="ico-pw-visible" /></KrdsButton>
 *   </KrdsButtonGroup>
 * </KrdsInput>
 * ```
 */

export default /* @__PURE__ */ defineComponent({
  name: 'KrdsButtonGroup',
  props: {},
  slots: Object as SlotsType<{
    /** 입력 필드 안에 넣을 버튼들 */
    default?(): VNode[]
  }>,
  setup(_, { slots }) {
    return () =>
      h(
        'div',
        {
          class: 'btn-group'
        },
        slots.default?.()
      )
  }
})
