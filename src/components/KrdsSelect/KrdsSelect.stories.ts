import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import KrdsSelect from './KrdsSelect'
import { KrdsFormGroup } from '../KrdsFormGroup'
import { KrdsFormLabel } from '../KrdsFormLabel'
import { KrdsFormHint } from '../KrdsFormHint'

const meta: Meta<typeof KrdsSelect> = {
  title: 'Components/Selection/KrdsSelect',
  component: KrdsSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: '선택된 값'
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: '선택 박스 크기'
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'information'],
      description: '선택 박스 상태'
    },
    title: {
      control: 'text',
      description: '선택 박스 타이틀'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    }
  },
  args: {
    size: 'medium',
    state: 'default',
    placeholder: '선택',
    disabled: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 기본 선택 박스 (FormGroup과 함께)
 */
export const Default: Story = {
  render: args => ({
    components: { KrdsSelect, KrdsFormGroup, KrdsFormLabel, KrdsFormHint },
    setup() {
      const selected = ref('')
      const options = [
        { value: 'seoul', label: '서울특별시' },
        { value: 'busan', label: '부산광역시' },
        { value: 'daegu', label: '대구광역시' },
        { value: 'incheon', label: '인천광역시' },
        { value: 'gwangju', label: '광주광역시' },
        { value: 'daejeon', label: '대전광역시' },
        { value: 'ulsan', label: '울산광역시' },
        { value: 'sejong', label: '세종특별자치시' }
      ]

      return { args, selected, options }
    },
    template: `
      <div style="max-width: 400px;">
        <KrdsFormGroup>
          <KrdsFormLabel for="city-select">거주 지역</KrdsFormLabel>
          <KrdsSelect 
            id="city-select"
            v-model="selected"
            v-bind="args"
            :options="options"
          />
          <KrdsFormHint>현재 거주하고 있는 지역을 선택해 주세요</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}

/**
 * 크기별 선택 박스
 */
export const Sizes: Story = {
  render: () => ({
    components: { KrdsSelect, KrdsFormGroup, KrdsFormLabel, KrdsFormHint },
    setup() {
      const selectedLarge = ref('large')
      const selectedMedium = ref('medium')
      const selectedSmall = ref('small')

      const options = [
        { value: 'large', label: 'large' },
        { value: 'medium', label: 'medium' },
        { value: 'small', label: 'small' }
      ]

      return { selectedLarge, selectedMedium, selectedSmall, options }
    },
    template: `
      <div class="fieldset" style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Large -->
        <KrdsFormGroup>
          <KrdsFormLabel for="select_size_large">레이블</KrdsFormLabel>
          <KrdsSelect 
            id="select_size_large"
            v-model="selectedLarge"
            size="large"
            :options="options"
            title="선택"
          />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
        
        <!-- Medium -->
        <KrdsFormGroup>
          <KrdsFormLabel for="select_size_medium">레이블</KrdsFormLabel>
          <KrdsSelect 
            id="select_size_medium"
            v-model="selectedMedium"
            size="medium"
            :options="options"
            title="선택"
          />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
        
        <!-- Small -->
        <KrdsFormGroup>
          <KrdsFormLabel for="select_size_small">레이블</KrdsFormLabel>
          <KrdsSelect 
            id="select_size_small"
            v-model="selectedSmall"
            size="small"
            :options="options"
            title="선택"
          />
          <KrdsFormHint>도움말</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}

/**
 * 에러 상태
 */
export const ErrorState: Story = {
  render: () => ({
    components: { KrdsSelect, KrdsFormGroup, KrdsFormLabel, KrdsFormHint },
    setup() {
      const selected = ref('')
      const options = [
        { value: 'item1', label: '항목1' },
        { value: 'item2', label: '항목2' },
        { value: 'item3', label: '항목3' },
        { value: 'item4', label: '항목4' }
      ]

      return { selected, options }
    },
    template: `
      <div class="fieldset" style="max-width: 400px;">
        <KrdsFormGroup>
          <KrdsFormLabel for="select_error">레이블</KrdsFormLabel>
          <KrdsSelect 
            id="select_error"
            v-model="selected"
            state="error"
            :options="options"
            title="선택"
          />
          <KrdsFormHint type="error">도움말</KrdsFormHint>
        </KrdsFormGroup>
      </div>
    `
  })
}
