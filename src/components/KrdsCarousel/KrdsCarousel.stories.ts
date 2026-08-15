import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
import KrdsCarousel from './KrdsCarousel'

const meta: Meta<typeof KrdsCarousel> = {
  title: 'Components/Layout/KrdsCarousel',
  component: KrdsCarousel,
  parameters: {
    docs: {
      description: {
        component:
          '캐러셀은 하나의 영역에서 여러 개의 콘텐츠를 순차적으로 번갈아 보여주는 컴포넌트이다. 한정된 공간에 여러 콘텐츠를 노출할 수 있으나 첫 번째 슬라이드 외에는 주목도가 크게 떨어지므로, 중요한 정보는 캐러셀에만 담지 않는 것이 좋다. 슬라이드는 기본 슬롯으로 전달하며 최상위 노드 하나가 슬라이드 한 장이 된다. 자동 재생 시에는 사용자가 즉시 정지할 수 있도록 재생/정지 버튼을 함께 노출한다.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['visual', 'banner'],
      description: '캐러셀 형태 (visual: 비주얼 배너형, banner: 배너형)'
    },
    activeIndex: {
      control: 'number',
      description: '현재 슬라이드 인덱스 (v-model:activeIndex)'
    },
    loop: {
      control: 'boolean',
      description: '처음/마지막 슬라이드에서 순환 이동 여부'
    },
    autoplay: {
      control: 'boolean',
      description: '자동 재생 여부 (재생/정지 버튼 노출 및 즉시 재생)'
    },
    autoplayDelay: {
      control: 'number',
      description: '자동 재생 간격 (ms)'
    },
    pauseOnHover: {
      control: 'boolean',
      description: '마우스 오버 시 자동 재생 일시 정지 여부'
    },
    speed: {
      control: 'number',
      description: '슬라이드 전환 속도 (ms)'
    },
    spaceBetween: {
      control: 'number',
      description: '슬라이드 사이 간격 (px)'
    },
    pagination: {
      control: 'select',
      options: ['bullets', 'fraction', 'none'],
      description: '페이지네이션 표시 방식'
    },
    navigation: {
      control: 'boolean',
      description: '이전/다음 버튼 표시 여부'
    },
    moreHref: {
      control: 'text',
      description: '더 보기 링크 URL (지정 시 더 보기 버튼 표시)'
    },
    ariaLabel: {
      control: 'text',
      description: '캐러셀 영역 접근성 라벨'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

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

/** 원본 예제 페이지(carousel.html)의 .main-vban-wrap.bg 배경 밴드 — 라이브러리 스타일이 아닌 페이지 전용 스타일이라 스토리에서만 재현한다 */
const VISUAL_WRAPPER_STYLE = 'background-color: #d8e4f2'

const createRender = (slides: string, wrapperStyle?: string) => (args: unknown) => ({
  components: { KrdsCarousel },
  setup: () => ({ args }),
  template: wrapperStyle
    ? `<div style="${wrapperStyle}"><KrdsCarousel v-bind="args">${slides}</KrdsCarousel></div>`
    : `<KrdsCarousel v-bind="args">${slides}</KrdsCarousel>`
})

const renderVisual = createRender(visualSlides, VISUAL_WRAPPER_STYLE)
const renderBanner = createRender(bannerSlides)

export const Default: Story = {
  name: '기본 (비주얼 배너형)',
  args: {
    variant: 'visual',
    ariaLabel: '주요 서비스 안내',
    moreHref: '#'
  },
  render: renderVisual,
  play: async ({ canvas, canvasElement, userEvent }) => {
    // SCSS가 기대하는 마크업 구조 (.swiper > ul.swiper-wrapper > li.swiper-slide)
    await expect(canvasElement.querySelectorAll('.swiper > ul.swiper-wrapper > li.swiper-slide')).toHaveLength(4)
    await expect(canvasElement.querySelector('.swiper-indicator')).toHaveClass('text-center')

    // 첫 번째 슬라이드가 활성 상태로 시작하고, 나머지는 보조기기에서 감춰진다
    await expect(canvasElement.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '1 / 4')
    await expect(canvasElement.querySelectorAll('.swiper-slide[aria-hidden="true"]')).toHaveLength(3)

    // 다음 버튼으로 두 번째 슬라이드로 이동
    await userEvent.click(canvas.getByRole('button', { name: '다음' }))
    await waitFor(() => {
      expect(canvasElement.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '2 / 4')
    })

    // 현재 위치가 페이지네이션 불릿에도 반영된다
    const bullets = canvas.getAllByRole('button', { name: /슬라이드로 이동$/ })
    await expect(bullets[1]).toHaveAttribute('aria-current', 'true')

    // 불릿 클릭으로 마지막 슬라이드로 이동
    await userEvent.click(bullets[3])
    await waitFor(() => {
      expect(canvasElement.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '4 / 4')
    })

    // 이전 버튼으로 되돌아온다
    await userEvent.click(canvas.getByRole('button', { name: '이전' }))
    await waitFor(() => {
      expect(canvasElement.querySelector('.swiper-slide-active')).toHaveAttribute('aria-label', '3 / 4')
    })
  }
}

export const Banner: Story = {
  name: '배너형',
  args: {
    variant: 'banner',
    moreHref: '#'
  },
  render: renderBanner,
  parameters: {
    docs: {
      description: {
        story: '배너형은 인디케이터 안에 분수형 페이지네이션과 이전/다음·더 보기 버튼을 배치한다.'
      }
    }
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    // 인디케이터 안에 분수형 페이지네이션과 내비게이션이 함께 배치된다
    const fraction = canvasElement.querySelector('.swiper-indicator .swiper-pagination.swiper-pagination-fraction')
    await expect(fraction?.querySelector('.swiper-pagination-current')).toHaveTextContent('1')
    await expect(fraction?.querySelector('.swiper-pagination-total')).toHaveTextContent('3')
    await expect(canvasElement.querySelectorAll('.swiper-indicator .swiper-navigation > .swiper-button-prev')).toHaveLength(1)
    await expect(canvasElement.querySelectorAll('.swiper-indicator .swiper-navigation > .swiper-button-more')).toHaveLength(1)

    // 다음 버튼 클릭 시 분수 표기가 갱신된다
    await userEvent.click(canvas.getByRole('button', { name: '다음' }))
    await waitFor(() => {
      expect(fraction?.querySelector('.swiper-pagination-current')).toHaveTextContent('2')
    })
  }
}

export const Autoplay: Story = {
  name: '자동 재생',
  args: {
    variant: 'banner',
    autoplay: true,
    autoplayDelay: 3000,
    moreHref: '#'
  },
  render: renderBanner,
  parameters: {
    docs: {
      description: {
        story:
          '자동 재생 중에는 정지 버튼이 노출되며, 정지하면 재생 버튼으로 바뀐다. 마우스 오버나 키보드 포커스가 캐러셀 안에 있는 동안에는 자동 재생이 멈춘다.'
      }
    }
  },
  play: async ({ canvas, userEvent }) => {
    // 재생 중에는 정지 버튼만 노출된다
    const stopButton = canvas.getByRole('button', { name: '슬라이드 멈춤' })
    await userEvent.click(stopButton)

    // 정지 후에는 재생 버튼으로 전환된다
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: '슬라이드 재생' })).toBeInTheDocument()
    })
  }
}

export const NoLoop: Story = {
  name: '순환 없음',
  args: {
    variant: 'visual',
    loop: false
  },
  render: renderVisual,
  parameters: {
    docs: {
      description: {
        story: '`loop`를 끄면 처음과 마지막 슬라이드에서 이전/다음 버튼이 비활성화된다.'
      }
    }
  }
}

export const Fraction: Story = {
  name: '분수형 페이지네이션',
  args: {
    variant: 'visual',
    pagination: 'fraction'
  },
  render: renderVisual,
  parameters: {
    docs: {
      description: {
        story: '페이지네이션 방식은 형태와 무관하게 `pagination` 속성으로 바꿀 수 있다.'
      }
    }
  }
}
