import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { KrdsStep } from '@/components'
import { expectNoA11yViolations, render } from '@/test/utils'

describe('KrdsStepIndicator', () => {
  it('기본', async () => {
    render({
      template: `
        <KrdsStepIndicator :model-value="3">
          <KrdsStep step="1단계" title="단계 레이블" />
          <KrdsStep step="2단계" title="단계 레이블" />
          <KrdsStep step="3단계" title="단계 레이블" />
          <KrdsStep step="4단계" title="단계 레이블" />
          <KrdsStep step="5단계" title="단계 레이블" />
        </KrdsStepIndicator>
      `
    })
    await expectNoA11yViolations()
  })

  it('상태 지정: status 속성이 단계 클래스와 현재단계 텍스트를 결정', async () => {
    const { container } = render({
      template: `
        <KrdsStepIndicator>
          <KrdsStep step="1단계" title="약관 동의" status="done" />
          <KrdsStep step="2단계" title="정보 입력" status="active" />
          <KrdsStep step="3단계" title="신청 완료" status="pending" />
        </KrdsStepIndicator>
      `
    })
    const [done, active, pending] = Array.from(container.querySelectorAll('.krds-step-wrap > li'))

    expect(done).toHaveClass('done')
    expect(active).toHaveClass('active')
    expect(pending).toHaveClass('pending')

    // 활성 단계에는 스크린 리더용 현재단계 텍스트가 붙는다
    expect(active.querySelector('.sr-only')).toHaveTextContent('현재단계')
    expect(done.querySelector('.sr-only')).toBeNull()
    await expectNoA11yViolations()
  })

  it('페이지 타이틀과 함께', async () => {
    render({
      template: `
        <div class="page-title-wrap between">
          <h2 class="h-tit">타이틀</h2>
          <KrdsStepIndicator :model-value="2">
            <KrdsStep step="1단계" title="유의 사항 확인" />
            <KrdsStep step="2단계" title="신청인 정보" />
            <KrdsStep step="3단계" title="이사 전 살던 곳" />
            <KrdsStep step="4단계" title="이사 온 곳" />
          </KrdsStepIndicator>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  const statuses = (container: Element) =>
    Array.from(container.querySelectorAll('.krds-step-wrap > li'), li => `${li.className}:${li.querySelector('.step-tit')?.textContent}`)

  it('현재 단계 변경·단계 추가와 순서 변경을 반영', async () => {
    const current = ref(0)
    const steps = ref(['약관 동의', '정보 입력'])
    const { container } = render({
      template: `
        <KrdsStepIndicator :model-value="current">
          <KrdsStep v-for="(title, index) in steps" :key="title" :step="index + 1 + '단계'" :title="title" />
        </KrdsStepIndicator>
      `,
      setup: () => ({ current, steps })
    })

    current.value = 1
    await vi.waitFor(() => expect(statuses(container)).toEqual(['done:약관 동의', 'active:정보 입력']))

    steps.value = [...steps.value, '서류 첨부', '신청 완료']
    await vi.waitFor(() =>
      expect(statuses(container)).toEqual(['done:약관 동의', 'active:정보 입력', 'pending:서류 첨부', 'pending:신청 완료'])
    )

    steps.value = ['본인 확인', ...steps.value]
    await vi.waitFor(() =>
      expect(statuses(container)).toEqual([
        'done:본인 확인',
        'active:약관 동의',
        'pending:정보 입력',
        'pending:서류 첨부',
        'pending:신청 완료'
      ])
    )
  })

  it('v-if 단계와 index key v-for 단계를 섞어도 단계가 중복되지 않음', async () => {
    const loggedIn = ref(false)
    const { container } = render({
      template: `
        <KrdsStepIndicator :model-value="0">
          <KrdsStep v-if="!loggedIn" step="1단계" title="로그인" />
          <KrdsStep v-for="(title, i) in (loggedIn ? ['신청서 작성', '제출'] : ['약관 동의', '신청서 작성', '제출'])" :key="i" :step="i" :title="title" />
        </KrdsStepIndicator>
      `,
      setup: () => ({ loggedIn })
    })

    loggedIn.value = true
    await vi.waitFor(() => expect(statuses(container)).toEqual(['active:신청서 작성', 'pending:제출']))
    loggedIn.value = false
    await vi.waitFor(() =>
      expect(statuses(container)).toEqual(['active:로그인', 'pending:약관 동의', 'pending:신청서 작성', 'pending:제출'])
    )
  })

  it('KrdsStep을 감싼 컴포넌트도 순서대로 상태를 받음', () => {
    const AppStep = defineComponent({
      props: { title: { type: String, required: true } },
      setup: props => () => h(KrdsStep, { step: '단계', title: props.title })
    })
    const { container } = render({
      components: { AppStep },
      template: `<KrdsStepIndicator :model-value="1"><AppStep title="a" /><KrdsStep step="단계" title="b" /><AppStep title="c" /></KrdsStepIndicator>`
    })
    expect(statuses(container)).toEqual(['done:a', 'active:b', 'pending:c'])
  })

  it('model-value가 null이나 NaN이면 첫 단계를 현재 단계로', () => {
    const { container } = render({
      template: `<KrdsStepIndicator :model-value="value"><KrdsStep step="1" title="a" /><KrdsStep step="2" title="b" /></KrdsStepIndicator>`,
      setup: () => ({ value: Number.NaN })
    })
    expect(statuses(container)).toEqual(['active:a', 'pending:b'])
  })
})
