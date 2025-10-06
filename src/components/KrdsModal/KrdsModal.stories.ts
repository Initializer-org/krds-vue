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

// 1. 기본 모달
export const Default: Story = {
  name: '기본',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          모달 열기
        </button>
        <KrdsModal v-model="isOpen" modalId="modal_sample_01">
          <template #title>모달 제목</template>
          <p>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium tertiary" @click="isOpen = false">아니요</button>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">예</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 2. 배경 없음
export const NoBackdrop: Story = {
  name: '배경 없음',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          배경 없는 모달 열기
        </button>
        <KrdsModal v-model="isOpen" :backdrop="false" modalId="modal_no_backdrop">
          <template #title>배경 없는 모달</template>
          <p>배경 딤 처리 없이 모달만 표시됩니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 3. Small 사이즈
export const SmallSize: Story = {
  name: 'Small',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          Small 모달 열기
        </button>
        <KrdsModal v-model="isOpen" size="small" modalId="modal_small">
          <template #title>Small 모달</template>
          <p>작은 크기의 모달입니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 4. Large 사이즈
export const LargeSize: Story = {
  name: 'Large',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          Large 모달 열기
        </button>
        <KrdsModal v-model="isOpen" size="large" modalId="modal_large">
          <template #title>Large 모달</template>
          <p>큰 크기의 모달입니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 5. 풀팝업
export const FullPopup: Story = {
  name: '풀팝업',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          풀팝업 열기
        </button>
        <KrdsModal v-model="isOpen" full modalId="modal_full">
          <template #title>풀팝업</template>
          <p>전체 화면을 차지하는 풀팝업입니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 6. 바텀시트
export const BottomSheet: Story = {
  name: '바텀시트',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          바텀시트 열기
        </button>
        <KrdsModal v-model="isOpen" bottom-sheet modalId="modal_bottom_sheet">
          <template #title>바텀시트</template>
          <p>하단에서 올라오는 바텀시트입니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}

// 7. Persistent
export const Persistent: Story = {
  name: 'Persistent',
  args: {},
  render: () => ({
    components: { KrdsModal },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <button type="button" class="krds-btn large" @click="isOpen = true">
          Persistent 모달 열기
        </button>
        <KrdsModal v-model="isOpen" persistent modalId="modal_persistent">
          <template #title>Persistent 모달</template>
          <p>배경을 클릭해도 닫히지 않습니다. 버튼으로만 닫을 수 있습니다.</p>
          <template #footer>
            <button type="button" class="krds-btn medium primary" @click="isOpen = false">확인</button>
          </template>
        </KrdsModal>
      </div>
    `
  })
}
