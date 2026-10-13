import { afterEach, describe, expect, it, vi } from 'vitest'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

const src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="20"/%3E'

describe('KrdsImage', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  afterEach(() => warn.mockClear())
  // 런타임 템플릿 컴파일러의 경고(decodeEntities)는 빼고 본다
  const warnings = () => warn.mock.calls.map(([message]) => String(message)).filter(message => !message.includes('decodeEntities'))

  it('기본: 대체 텍스트, 지연 로딩, 속성은 img에', async () => {
    render({ setup: () => ({ src }), template: `<KrdsImage :src="src" alt="정문 오른쪽 첫 번째 방이 민원실" width="40" class="map" />` })
    const img = screen.getByRole('img', { name: '정문 오른쪽 첫 번째 방이 민원실' })
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('width', '40')
    expect(img).toHaveClass('krds-image', 'map')
    expect(warnings()).toEqual([])
    await expectNoA11yViolations()
  })

  it('설명: figure·figcaption, class는 figure에 width는 img에', async () => {
    render({
      setup: () => ({ src }),
      template: `<KrdsImage :src="src" alt="정문 오른쪽 첫 번째 방이 민원실" caption="본관 1층 안내도" width="40" class="map" />`
    })
    const figure = screen.getByRole('figure')
    expect(figure).toHaveClass('krds-figure', 'map')
    expect(figure.querySelector('figcaption')).toHaveTextContent('본관 1층 안내도')
    expect(screen.getByRole('img')).toHaveAttribute('width', '40')
    await expectNoA11yViolations()
  })

  it('장식 이미지: alt=""', async () => {
    render({ setup: () => ({ src }), template: `<KrdsImage :src="src" alt="" />` })
    expect(document.querySelector('img')).toHaveAttribute('alt', '')
    expect(warnings()).toEqual([])
    await expectNoA11yViolations()
  })

  it('개발 모드 경고: alt 누락, 역할 중복, 설명과 같은 대체 텍스트', () => {
    render({ setup: () => ({ src }), template: `<KrdsImage :src="src" />` })
    expect(warnings()).toEqual([expect.stringContaining('Missing required prop: "alt"')])

    render({ setup: () => ({ src }), template: `<KrdsImage :src="src" alt="기관 로고 이미지" />` })
    expect(warnings().at(-1)).toContain('역할과 겹치는 말')

    render({ setup: () => ({ src }), template: `<KrdsImage :src="src" alt="그림책 표지" caption="그림책 표지" />` })
    expect(warnings()).toHaveLength(3)
    expect(warnings().at(-1)).toContain('설명(caption)과 같게')
  })
})
