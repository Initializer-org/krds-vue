import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

/** 비주얼 배너형 슬라이드 마크업 (원본 carousel.html) */
const visualSlides = [1, 2, 3, 4]
  .map(
    index => `
      <div class="in">
        <div class="text">
          <p class="tit">타이틀 영역 ${index}</p>
          <p class="txt">컨텐츠 영역 컨텐츠 영역 ${index}</p>
          <a href="#" class="krds-btn primary">버튼 영역</a>
        </div>
        <div class="im">
          <svg width="243" height="178" viewBox="0 0 243 178" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="예시">
            <rect width="243" height="178" fill="#E6E8EA" />
          </svg>
        </div>
      </div>`
  )
  .join('')

/** 배너형 슬라이드 마크업 (원본 carousel_banner.html) */
const bannerSlides = [1, 2, 3]
  .map(
    index => `
      <div class="in">
        <div class="text">
          <p class="cate">서브타이틀 ${index}</p>
          <p class="tit">타이틀 ${index}</p>
        </div>
        <div class="im">
          <svg width="243" height="178" viewBox="0 0 243 178" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="예시">
            <rect width="243" height="178" fill="#E6E8EA" />
          </svg>
        </div>
      </div>`
  )
  .join('')

const renderVisual = (args: Record<string, unknown>) =>
  render({
    setup: () => ({ args }),
    template: `<div style="background-color: #d8e4f2"><KrdsCarousel v-bind="args">${visualSlides}</KrdsCarousel></div>`
  })

const renderBanner = (args: Record<string, unknown>) =>
  render({ setup: () => ({ args }), template: `<KrdsCarousel v-bind="args">${bannerSlides}</KrdsCarousel>` })

describe('KrdsCarousel', () => {
  it('기본 (비주얼 배너형): 마크업 구조, 이전/다음·불릿 이동', async () => {
    const { container } = renderVisual({ variant: 'visual', ariaLabel: '주요 서비스 안내', moreHref: '#' })

    // SCSS가 기대하는 마크업 구조 (.swiper > ul.swiper-wrapper > li.swiper-slide)
    expect(container.querySelectorAll('.swiper > ul.swiper-wrapper > li.swiper-slide')).toHaveLength(4)
    expect(container.querySelector('.swiper-indicator')).toHaveClass('text-center')

    // 첫 번째 슬라이드가 활성 상태로 시작하고, 나머지는 보조기기에서 감춰진다
    expect(container.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '1 / 4')
    expect(container.querySelectorAll('.swiper-slide[aria-hidden="true"]')).toHaveLength(3)

    // 다음 버튼으로 두 번째 슬라이드로 이동
    await userEvent.click(screen.getByRole('button', { name: '다음' }))
    await waitFor(() => {
      expect(container.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '2 / 4')
    })

    // 현재 위치가 페이지네이션 불릿에도 반영된다
    const bullets = screen.getAllByRole('button', { name: /슬라이드로 이동$/ })
    expect(bullets[1]).toHaveAttribute('aria-current', 'true')

    // 불릿 클릭으로 마지막 슬라이드로 이동
    await userEvent.click(bullets[3])
    await waitFor(() => {
      expect(container.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '4 / 4')
    })

    // 이전 버튼으로 되돌아온다
    await userEvent.click(screen.getByRole('button', { name: '이전' }))
    await waitFor(() => {
      expect(container.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '3 / 4')
    })

    await expectNoA11yViolations()
  })

  it('배너형: 인디케이터 안 분수형 페이지네이션·내비게이션, 다음 버튼으로 분수 갱신', async () => {
    const { container } = renderBanner({ variant: 'banner', moreHref: '#' })

    // 인디케이터 안에 분수형 페이지네이션과 내비게이션이 함께 배치된다
    const fraction = container.querySelector('.swiper-indicator .swiper-pagination.swiper-pagination-fraction')
    expect(fraction?.querySelector('.swiper-pagination-current')).toHaveTextContent('1')
    expect(fraction?.querySelector('.swiper-pagination-total')).toHaveTextContent('3')
    expect(container.querySelectorAll('.swiper-indicator .swiper-navigation > .swiper-button-prev')).toHaveLength(1)
    expect(container.querySelectorAll('.swiper-indicator .swiper-navigation > .swiper-button-more')).toHaveLength(1)

    // 다음 버튼 클릭 시 분수 표기가 갱신된다
    await userEvent.click(screen.getByRole('button', { name: '다음' }))
    await waitFor(() => {
      expect(fraction?.querySelector('.swiper-pagination-current')).toHaveTextContent('2')
    })

    await expectNoA11yViolations()
  })

  it('자동 재생: 정지 버튼 클릭 시 재생 버튼으로 전환', async () => {
    renderBanner({ variant: 'banner', autoplay: true, autoplayDelay: 3000, moreHref: '#' })

    // 재생 중에는 정지 버튼만 노출된다 (재생은 마운트 후 시작되므로 다음 렌더를 기다린다)
    const stopButton = await screen.findByRole('button', { name: '슬라이드 멈춤' })
    await userEvent.click(stopButton)

    // 정지 후에는 재생 버튼으로 전환된다
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '슬라이드 재생' })).toBeInTheDocument()
    })

    await expectNoA11yViolations()
  })

  it('순환 없음', async () => {
    renderVisual({ variant: 'visual', loop: false })
    await expectNoA11yViolations()
  })

  it('분수형 페이지네이션', async () => {
    renderVisual({ variant: 'visual', pagination: 'fraction' })
    await expectNoA11yViolations()
  })
})
