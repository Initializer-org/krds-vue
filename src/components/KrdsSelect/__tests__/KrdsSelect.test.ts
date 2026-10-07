import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsSelect', () => {
  it('기본: 옵션 선택 시 값 변경', async () => {
    render({
      setup() {
        const args = { size: 'medium', state: 'default', placeholder: '선택', disabled: false, sort: false }
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
    const select = screen.getByLabelText('거주 지역')

    await userEvent.selectOptions(select, 'seoul')
    expect(select).toHaveValue('seoul')

    await userEvent.selectOptions(select, 'busan')
    expect(select).toHaveValue('busan')
    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({
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
          <KrdsFormGroup>
            <KrdsFormLabel for="select_size_large">레이블</KrdsFormLabel>
            <KrdsSelect id="select_size_large" v-model="selectedLarge" size="large" :options="options" title="선택" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>
          <KrdsFormGroup>
            <KrdsFormLabel for="select_size_medium">레이블</KrdsFormLabel>
            <KrdsSelect id="select_size_medium" v-model="selectedMedium" size="medium" :options="options" title="선택" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>
          <KrdsFormGroup>
            <KrdsFormLabel for="select_size_small">레이블</KrdsFormLabel>
            <KrdsSelect id="select_size_small" v-model="selectedSmall" size="small" :options="options" title="선택" />
            <KrdsFormHint>도움말</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('정렬 스타일', async () => {
    render({
      setup() {
        const selectedDefault = ref('')
        const selectedLarge = ref('item1')
        const selectedMedium = ref('item2')
        const selectedSmall = ref('item3')
        const options = [
          { value: 'item1', label: '항목1' },
          { value: 'item2', label: '항목2' },
          { value: 'item3', label: '항목3' },
          { value: 'item4', label: '항목4' }
        ]
        const optionsLarge = [
          { value: 'item1', label: '항목1' },
          { value: 'item2', label: '항목2' },
          { value: 'item3', label: '항목3' }
        ]
        return { selectedDefault, selectedLarge, selectedMedium, selectedSmall, options, optionsLarge }
      },
      template: `
        <div>
          <KrdsSelect id="select_sorting" v-model="selectedDefault" sort :options="options" title="선택" />
          <KrdsSelect id="select_sorting_large" v-model="selectedLarge" sort size="large" :options="optionsLarge" title="선택" />
          <KrdsSelect id="select_sorting_medium" v-model="selectedMedium" sort size="medium" :options="optionsLarge" title="선택" />
          <KrdsSelect id="select_sorting_small" v-model="selectedSmall" sort size="small" :options="optionsLarge" title="선택" />
        </div>
      `
    })
    // 원본 KRDS 정렬 셀렉트는 보이는 레이블 없이 title로만 이름을 제공한다
    await expectNoA11yViolations([{ id: 'label-title-only', selector: '*:not(.krds-form-select-sort)' }])
  })

  it('에러 상태', async () => {
    render({
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
            <KrdsSelect id="select_error" v-model="selected" state="error" :options="options" title="선택" />
            <KrdsFormHint type="error">도움말</KrdsFormHint>
          </KrdsFormGroup>
        </div>
      `
    })
    await expectNoA11yViolations()
  })
})
