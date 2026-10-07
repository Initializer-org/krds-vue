import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

const accordionSetup = () => {
  const openItem = ref<string | undefined>(undefined)
  const handleToggle = (id: string) => {
    openItem.value = openItem.value === id ? undefined : id
  }
  return { openItem, handleToggle }
}

describe('KrdsAccordion', () => {
  it('기본: 펼치고 접기', async () => {
    const { container } = render({
      setup: accordionSetup,
      template: `
        <KrdsAccordionGroup class="custom-accordion">
          <KrdsAccordionItem id="1" :open-item="openItem" title="title1" content="content1" @toggle="handleToggle" />
          <KrdsAccordionItem id="2" :open-item="openItem" title="title2" content="content2" @toggle="handleToggle" />
        </KrdsAccordionGroup>`
    })
    const button = screen.getByRole('button', { name: 'title1' })
    const panel = container.querySelector(`#${button.getAttribute('aria-controls')}`)

    expect(panel).toHaveAttribute('role', 'region')
    expect(panel).toHaveAttribute('aria-labelledby', button.id)

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).not.toHaveClass('active')

    // 펼침 상태 스타일(화살표 회전, 열림 배경색)은 .btn-accordion.active 에 걸려 있으므로
    // 버튼 자체에 active 가 붙어야 한다
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveClass('active')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).not.toHaveClass('active')
    await expectNoA11yViolations()
  })

  it('라인', async () => {
    render({
      setup: accordionSetup,
      template: `
        <KrdsAccordionGroup type-line>
          <KrdsAccordionItem id="1" :open-item="openItem" @toggle="handleToggle">
            <template #title>title1</template>
            <template #content>content1</template>
          </KrdsAccordionItem>
          <KrdsAccordionItem id="2" :open-item="openItem" @toggle="handleToggle">
            <template #title>title2</template>
            <template #content>content2</template>
          </KrdsAccordionItem>
        </KrdsAccordionGroup>`
    })
    await expectNoA11yViolations()
  })
})
