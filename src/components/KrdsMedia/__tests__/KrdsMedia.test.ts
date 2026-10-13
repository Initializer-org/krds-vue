import { afterEach, describe, expect, it, vi } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsMedia', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  afterEach(() => warn.mockClear())
  // 런타임 템플릿 컴파일러의 경고(decodeEntities)는 빼고 본다
  const warnings = () => warn.mock.calls.map(([message]) => String(message)).filter(message => !message.includes('decodeEntities'))

  it('동영상: 제목이 미디어 영역 이름, 한국어 자막 트랙, 원고 펼치기', async () => {
    const { container } = render({
      template: `
        <KrdsMedia src="/demo.mp4" title="단계 안내 영상" captions="/demo.ko.vtt" poster="/demo.jpg" class="intro">
          <template #transcript><p>세 칸이 차례로 채워집니다.</p></template>
        </KrdsMedia>`
    })
    const figure = screen.getByRole('figure')
    expect(figure).toHaveClass('krds-media', 'intro')
    expect(figure.querySelector('figcaption')).toHaveTextContent('단계 안내 영상')

    const video = container.querySelector('video')!
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('poster', '/demo.jpg')
    expect(video.querySelector('track')).toMatchObject({ kind: 'captions', srclang: 'ko', label: '한국어', default: true })

    const toggle = screen.getByRole('button', { name: '원고 보기' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('세 칸이 차례로 채워집니다.')).toBeVisible()
    expect(warnings()).toEqual([])
    await expectNoA11yViolations()
  })

  it('오디오, 외부 재생기(src 없이 iframe)', async () => {
    const { container } = render({
      template: `
        <div>
          <KrdsMedia src="/demo.m4a" title="안내 음성" audio>
            <template #transcript><p>원고</p></template>
          </KrdsMedia>
          <KrdsMedia title="유튜브 안내 영상" id="yt">
            <iframe src="about:blank" title="유튜브 안내 영상"></iframe>
            <template #transcript><p>원고</p></template>
          </KrdsMedia>
        </div>`
    })
    expect(container.querySelector('.krds-media audio')).toHaveAttribute('controls')
    expect(container.querySelector('#yt.krds-media .media-player > iframe')).not.toBeNull()
    expect(warnings()).toEqual([])
    await expectNoA11yViolations()
  })

  it('개발 모드 경고: 자막·원고 없음, 자동 재생 (다른 언어 자막 트랙만 있으면 경고 안 함)', () => {
    render({ template: `<KrdsMedia src="/demo.mp4" title="대체 정보 없는 영상" />` })
    expect(warnings().at(-1)).toContain('자막(captions)이나 원고(#transcript)')

    render({ template: `<KrdsMedia src="/demo.mp4" title="자동 재생 영상" captions="/demo.ko.vtt" autoplay muted />` })
    expect(warnings().at(-1)).toContain('자동 재생하지 않습니다')

    render({
      template: `<KrdsMedia src="/demo.mp4" title="영어 자막 영상"><track kind="subtitles" src="/demo.en.vtt" srclang="en" label="English" /></KrdsMedia>`
    })
    expect(warnings()).toHaveLength(2)

    // v-for로 넣은 kind 생략 트랙(subtitles)도 자막으로 본다
    render({
      template: `<KrdsMedia src="/demo.mp4" title="자막 목록 영상"><track v-for="l in ['en']" :key="l" :src="'/demo.' + l + '.vtt'" :srclang="l" /></KrdsMedia>`
    })
    expect(warnings()).toHaveLength(2)

    // 오디오는 자막이 보이지 않아 원고가 없으면 경고
    render({ template: `<KrdsMedia src="/demo.m4a" title="자막만 있는 음성" audio captions="/demo.ko.vtt" />` })
    expect(warnings().at(-1)).toContain('오디오는 자막이 화면에 보이지 않으므로')
  })
})
