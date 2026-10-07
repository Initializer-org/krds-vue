import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsStructuredList from './KrdsStructuredList'
import KrdsBadge from '../KrdsBadge/KrdsBadge'
import KrdsButton from '../KrdsButton/KrdsButton'
import KrdsIcon from '../KrdsIcon/KrdsIcon'

const meta: Meta<typeof KrdsStructuredList> = {
  title: 'Components/Layout/KrdsStructuredList',
  component: KrdsStructuredList,
  parameters: {
    docs: {
      description: {
        component: `구조화 목록은 유사하거나 관련된 콘텐츠 집합을 표현하기 위한 형식으로 목록에 제공된 데이터에 대한 상세 정보 탐색 수단 또는 관련 기능 실행 수단으로 활용된다. 사용자가 콘텐츠를 효율적으로 탐색하고 다음 행동을 빠르게 결정할 수 있도록 목록 내 정보는 상세 페이지에서 제공되는 복잡한 콘텐츠 중 핵심적이거나 흥미를 끌 수 있는 정보를 논리적 흐름에 따라 조직화하여 명확한 위계 구조를 반영해 제공해야 한다.`
      }
    }
  },
  argTypes: {
    full: {
      control: 'boolean',
      description: '전체 타입 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 구조
export const Default: Story = {
  name: '기본',
  args: {
    full: true
  },
  render: args => ({
    components: { KrdsStructuredList, KrdsBadge, KrdsButton, KrdsIcon },
    setup() {
      return { args }
    },
    template: `
      <KrdsStructuredList v-bind="args">
        <template #cardTop>
          <KrdsBadge type="bg-light" color="primary">뱃지</KrdsBadge>
        </template>
        <template #cardBody>
          <a href="#" class="c-text">
            <p class="c-tit"><span class="span">타이틀 영역</span></p>
            <p class="c-txt">
              간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다. 간단한 설명이 들어가는 영역입니다.
            </p>
            <p class="c-date">
              <strong class="key">신청 기간</strong>
              <span class="value">2023.00.00-2024.00.00</span>
            </p>
          </a>
          <div class="c-btn">
            <KrdsButton variant="secondary" size="medium">신청하기</KrdsButton>
          </div>
        </template>
        <template #cardBtm>
          <span class="tag">태그</span>
          <span class="tag">태그</span>
        </template>
        <template #cardBtn>
          <KrdsButton variant="tertiary" size="medium" class="text">
            <KrdsIcon name="ico-share" /> 공유하기
          </KrdsButton>
          <KrdsButton variant="tertiary" size="medium" class="text">
            <KrdsIcon name="ico-like" /> 찜하기
          </KrdsButton>
        </template>
      </KrdsStructuredList>
    `
  })
}

// 2. 뱃지만 있는 간단한 구조
export const SimpleBadge: Story = {
  name: '뱃지만 있는 구조',
  args: {
    full: true
  },
  render: args => ({
    components: { KrdsStructuredList, KrdsBadge },
    setup() {
      return { args }
    },
    template: `
      <KrdsStructuredList v-bind="args">
        <template #cardTop>
          <KrdsBadge type="bg-light" color="success">성공</KrdsBadge>
        </template>
        <template #cardBody>
          <div class="c-text">
            <p class="c-tit"><span class="span">간단한 제목</span></p>
          </div>
        </template>
      </KrdsStructuredList>
    `
  })
}
