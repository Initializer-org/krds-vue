import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

describe('KrdsFooter', () => {
  it('기본: 슬롯이 KRDS 구조에 맞게 배치', async () => {
    render({
      template: `
        <KrdsFooter id="krds-footer">
          <template #top>
            <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
            <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
            <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
            <button type="button" class="link" title="관련 사이트 레이어">related_site</button>
          </template>

          <template #logo>
            <span class="sr-only">KRDS - Korea Design System</span>
          </template>

          <template #content>
            <div class="f-info">
              <p class="info-addr">(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단</p>
              <ul class="info-cs">
                <li><strong class="strong">대표전화 1577-1000</strong><span class="span">(유료, 평일 09시~18시)</span></li>
                <li><strong class="strong">해외이용 82-33-811-2001</strong><span class="span">(유료, 평일 09시~18시)</span></li>
              </ul>
            </div>

            <div class="f-link">
              <div class="link-go">
                <KrdsButton text size="medium">찾아오시는 길 <i class="svg-icon ico-angle right"></i></KrdsButton>
                <KrdsButton text size="medium">이용안내 <i class="svg-icon ico-angle right"></i></KrdsButton>
                <KrdsButton text size="medium">직원검색 <i class="svg-icon ico-angle right"></i></KrdsButton>
              </div>
              <div class="link-sns">
                <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                  <span class="sr-only">인스타그램</span>
                  <i class="svg-icon ico-instagram"></i>
                </a>
                <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                  <span class="sr-only">유튜브</span>
                  <i class="svg-icon ico-youtube"></i>
                </a>
                <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                  <span class="sr-only">X</span>
                  <i class="svg-icon ico-sns-x"></i>
                </a>
                <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                  <span class="sr-only">페이스북</span>
                  <i class="svg-icon ico-facebook"></i>
                </a>
                <a href="#" class="krds-btn xlarge icon border" target="_blank" title="새 창 열기">
                  <span class="sr-only">블로그</span>
                  <i class="svg-icon ico-blog"></i>
                </a>
              </div>
            </div>
          </template>

          <template #bottom>
            <div class="f-btm-text">
              <div class="f-menu">
                <a href="#" class="point">개인정보처리방침</a>
                <a href="#">저작권 정책</a>
                <a href="#">웹 접근성 품질인증 마크 획득</a>
              </div>
              <p class="f-copy">© 2023 National Health Insurance Service. All rights reserved.</p>
            </div>
            <KrdsIdentifier>이 누리집은 보건복지부 누리집입니다.</KrdsIdentifier>
          </template>
        </KrdsFooter>
      `
    })
    // contentinfo 랜드마크 + 기본 id
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveAttribute('id', 'krds-footer')

    // top 슬롯은 foot-quick > inner로 감싸짐
    expect(footer.querySelectorAll(':scope > .foot-quick > .inner > button.link')).toHaveLength(4)

    // logo·content·bottom 슬롯은 inner 안에 순서대로 배치
    const inner = footer.querySelector(':scope > .inner')!
    expect(Array.from(inner.children, el => el.className)).toEqual(['f-logo', 'f-cnt', 'f-btm'])
    expect(inner.querySelector('.f-cnt > .f-info')).toBeInTheDocument()
    expect(inner.querySelector('.f-btm > .krds-identifier')).toBeInTheDocument()
    await expectNoA11yViolations()
  })
})
