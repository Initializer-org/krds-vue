import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'
import KrdsTts from '../KrdsTts'

// 재생 중인 음성은 cleanup 시 컴포넌트 언마운트(stopSpeech → speechSynthesis.cancel)로 정리된다
describe('KrdsTts', () => {
  it('기본: 클릭으로 재생 시작 후 다시 클릭해 정지', async () => {
    render(KrdsTts, {
      props: {
        text: '대한민국 정부 디자인 시스템 KRDS는 정부 서비스의 일관된 사용자 경험을 제공합니다.',
        label: '듣기',
        size: 'medium',
        icon: 'volume'
      }
    })
    const ttsBtn = screen.getByRole('button', { name: '듣기' })
    expect(ttsBtn).toBeInTheDocument()

    // 재생 시작
    await userEvent.click(ttsBtn)

    // 음성 합성이 시작될 때까지 잠시 대기
    await new Promise(r => setTimeout(r, 100))

    // 다시 눌러 정지
    await userEvent.click(ttsBtn)
    await expectNoA11yViolations()
  })

  it('아이콘만', async () => {
    render({
      template: `
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsTts text="볼륨 아이콘 타입입니다." icon="volume" aria-label="듣기" />
          <KrdsTts text="재생 아이콘 타입입니다." icon="play" aria-label="듣기" />
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('크기', async () => {
    render({
      template: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <KrdsTts text="xsmall 크기입니다." label="듣기" size="xsmall" />
            <KrdsTts text="small 크기입니다." label="듣기" size="small" />
            <KrdsTts text="medium 크기입니다." label="듣기" size="medium" />
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <KrdsTts text="xsmall 크기입니다." size="xsmall" aria-label="듣기" />
            <KrdsTts text="small 크기입니다." size="small" aria-label="듣기" />
            <KrdsTts text="medium 크기입니다." size="medium" aria-label="듣기" />
          </div>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('아이콘 타입', async () => {
    render({
      template: `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <KrdsTts text="볼륨 아이콘 타입입니다." label="듣기" icon="volume" />
            <KrdsTts text="재생 아이콘 타입입니다." label="듣기" icon="play" />
          </div>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('비활성화', async () => {
    render({
      template: `
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsTts text="비활성화 상태입니다." label="듣기" disabled />
          <KrdsTts text="비활성화 상태입니다." aria-label="듣기" disabled />
          <KrdsTts text="비활성화 상태입니다." label="듣기" icon="play" disabled />
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
