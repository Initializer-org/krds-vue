import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KrdsModal from './KrdsModal'
import { ref } from 'vue'

const meta: Meta<typeof KrdsModal> = {
  title: 'Components/Layout/KrdsModal',
  component: KrdsModal,
  parameters: {
    docs: {
      description: {
        component:
          '모달은 대화창의 한 종류로 기본 창에 종속된 요소이다. 기본 창과 겹쳐져 가장 상단에 표시되며, 이때 기본 창은 비활성 상태로 전환되어 상호작용이 불가능하므로 사용자는 모달에서의 단일한 과업 또는 메시지에 집중할 수 있다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '모달 열림 상태 (v-model)'
    },
    modalId: {
      control: 'text',
      description: '모달 ID'
    },
    backdrop: {
      control: 'boolean',
      description: '배경 딤 표시 여부'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '모달 크기'
    },
    full: {
      control: 'boolean',
      description: '풀팝업 여부'
    },
    bottomSheet: {
      control: 'boolean',
      description: '바텀시트 여부'
    },
    persistent: {
      control: 'boolean',
      description: '배경 클릭으로 닫기 방지'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

interface ModalStoryConfig {
  buttonText: string
  modalId: string
  title: string
  content: string
  footer?: string
  modalProps?: string
}

const createModalStory = (config: ModalStoryConfig) => ({
  components: { KrdsModal },
  setup() {
    const isOpen = ref(false)
    return { isOpen }
  },
  template: `
    <div>
      <button type="button" class="krds-btn large" @click="isOpen = true">
        ${config.buttonText}
      </button>
      <KrdsModal v-model="isOpen" ${config.modalProps || ''} modalId="${config.modalId}">
        <template #title>${config.title}</template>
        <p>${config.content}</p>
        ${
          config.footer ||
          `<template #footer>
          <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
        </template>`
        }
      </KrdsModal>
    </div>
  `
})

export const Default: Story = {
  name: '기본',
  render: () =>
    createModalStory({
      buttonText: '모달 열기',
      modalId: 'modal_sample_01',
      title: '모달 제목',
      content: '대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.',
      footer: `<template #footer>
        <button type="button" class="krds-btn medium tertiary" @click="isOpen = false">아니요</button>
        <button type="button" class="krds-btn medium primary" @click="isOpen = false">예</button>
      </template>`
    })
}

export const NoBackdrop: Story = {
  name: '배경 없음',
  render: () =>
    createModalStory({
      buttonText: '배경 없는 모달 열기',
      modalId: 'modal_no_backdrop',
      modalProps: ':backdrop="false"',
      title: '배경 없는 모달',
      content: '배경 딤 처리 없이 모달만 표시됩니다.'
    })
}

export const SmallSize: Story = {
  name: 'Small',
  render: () =>
    createModalStory({
      buttonText: 'Small 모달 열기',
      modalId: 'modal_small',
      modalProps: 'size="small"',
      title: 'Small 모달',
      content: '작은 크기의 모달입니다.'
    })
}

export const LargeSize: Story = {
  name: 'Large',
  render: () =>
    createModalStory({
      buttonText: 'Large 모달 열기',
      modalId: 'modal_large',
      modalProps: 'size="large"',
      title: 'Large 모달',
      content: '큰 크기의 모달입니다.'
    })
}

export const FullPopup: Story = {
  name: '풀팝업',
  render: () =>
    createModalStory({
      buttonText: '풀팝업 열기',
      modalId: 'modal_full',
      modalProps: 'full',
      title: '풀팝업',
      content: '전체 화면을 차지하는 풀팝업입니다.'
    })
}

export const BottomSheet: Story = {
  name: '바텀시트',
  render: () =>
    createModalStory({
      buttonText: '바텀시트 열기',
      modalId: 'modal_bottom_sheet',
      modalProps: 'bottom-sheet',
      title: '바텀시트',
      content: '하단에서 올라오는 바텀시트입니다.'
    })
}

export const Persistent: Story = {
  name: 'Persistent',
  render: () =>
    createModalStory({
      buttonText: 'Persistent 모달 열기',
      modalId: 'modal_persistent',
      modalProps: 'persistent',
      title: 'Persistent 모달',
      content: '배경을 클릭해도 닫히지 않습니다. 버튼으로만 닫을 수 있습니다.'
    })
}
