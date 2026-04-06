import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect } from 'storybook/test'
import KrdsTts from './KrdsTts'

const meta: Meta<typeof KrdsTts> = {
  title: 'Components/Feedback/KrdsTts',
  component: KrdsTts,
  parameters: {
    docs: {
      description: {
        component:
          'TTS(Text-to-Speech)는 텍스트를 음성으로 변환하여 읽어주는 기능을 제공하는 버튼 컴포넌트이다. Web Speech API를 사용하며, 볼륨 아이콘과 재생 아이콘 두 가지 타입을 지원한다.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: '읽어줄 텍스트'
    },
    label: {
      control: 'text',
      description: '버튼 레이블 텍스트 (미지정 시 아이콘만 표시)'
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
      description: '버튼 크기'
    },
    icon: {
      control: 'select',
      options: ['volume', 'play'],
      description: '아이콘 타입'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 1. 기본 (레이블 포함)
export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsTts },
    setup() {
      return { args }
    },
    template: '<KrdsTts v-bind="args" />'
  }),
  args: {
    text: '대한민국 정부 디자인 시스템 KRDS는 정부 서비스의 일관된 사용자 경험을 제공합니다.',
    label: '듣기',
    size: 'medium',
    icon: 'volume'
  },
  play: async ({ canvas, userEvent }) => {
    const ttsBtn = canvas.getByRole('button', { name: '듣기' })
    await expect(ttsBtn).toBeInTheDocument()

    // Click to start TTS
    await userEvent.click(ttsBtn)

    // Wait briefly for speech synthesis to start
    await new Promise(r => setTimeout(r, 100))

    // Click again to stop
    await userEvent.click(ttsBtn)
  }
}

// 2. 아이콘만 (레이블 없음)
export const IconOnly: Story = {
  name: '아이콘만',
  render: () => ({
    components: { KrdsTts },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsTts
          text="볼륨 아이콘 타입입니다."
          icon="volume"
        />
        <KrdsTts
          text="재생 아이콘 타입입니다."
          icon="play"
        />
      </div>
    `
  })
}

// 3. 크기
export const Sizes: Story = {
  name: '크기',
  render: () => ({
    components: { KrdsTts },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsTts text="xsmall 크기입니다." label="듣기" size="xsmall" />
          <KrdsTts text="small 크기입니다." label="듣기" size="small" />
          <KrdsTts text="medium 크기입니다." label="듣기" size="medium" />
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsTts text="xsmall 크기입니다." size="xsmall" />
          <KrdsTts text="small 크기입니다." size="small" />
          <KrdsTts text="medium 크기입니다." size="medium" />
        </div>
      </div>
    `
  })
}

// 4. 아이콘 타입
export const IconTypes: Story = {
  name: '아이콘 타입',
  render: () => ({
    components: { KrdsTts },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <KrdsTts text="볼륨 아이콘 타입입니다." label="듣기" icon="volume" />
          <KrdsTts text="재생 아이콘 타입입니다." label="듣기" icon="play" />
        </div>
      </div>
    `
  })
}

// 5. 비활성화
export const Disabled: Story = {
  name: '비활성화',
  render: () => ({
    components: { KrdsTts },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <KrdsTts text="비활성화 상태입니다." label="듣기" disabled />
        <KrdsTts text="비활성화 상태입니다." disabled />
        <KrdsTts text="비활성화 상태입니다." label="듣기" icon="play" disabled />
      </div>
    `
  })
}
