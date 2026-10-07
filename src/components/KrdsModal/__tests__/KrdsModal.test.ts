import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor } from '@/test/utils'

interface ModalFixture {
  buttonText: string
  modalId: string
  title: string
  content: string
  footer?: string
  modalProps?: string
}

const modal = (config: ModalFixture) => ({
  setup: () => ({ isOpen: ref(false) }),
  template: `
    <div>
      <button type="button" class="krds-btn large" @click="isOpen = true">${config.buttonText}</button>
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

const openModal = async (buttonName: string) => {
  await userEvent.click(screen.getByRole('button', { name: buttonName }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
}

const expectClosed = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())

describe('KrdsModal', () => {
  it('기본: Tab 포커스 트랩, Escape·배경 클릭으로 닫힘', async () => {
    render(
      modal({
        buttonText: '모달 열기',
        modalId: 'modal_sample_01',
        title: '모달 제목',
        content: '대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.',
        footer: `<template #footer>
          <button type="button" class="krds-btn medium tertiary" @click="isOpen = false">아니요</button>
          <button type="button" class="krds-btn medium primary" @click="isOpen = false">예</button>
        </template>`
      })
    )
    await openModal('모달 열기')
    await userEvent.keyboard('{Tab}')
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    await userEvent.keyboard('{Escape}')
    await expectClosed()

    await openModal('모달 열기')
    await userEvent.click(document.querySelector<HTMLElement>('.modal-back')!)
    await expectClosed()
    await expectNoA11yViolations()
  })

  it('배경 없음', async () => {
    render(
      modal({
        buttonText: '배경 없는 모달 열기',
        modalId: 'modal_no_backdrop',
        modalProps: ':backdrop="false"',
        title: '배경 없는 모달',
        content: '배경 딤 처리 없이 모달만 표시됩니다.'
      })
    )
    await expectNoA11yViolations()
  })

  it('Small', async () => {
    render(
      modal({
        buttonText: 'Small 모달 열기',
        modalId: 'modal_small',
        modalProps: 'size="small"',
        title: 'Small 모달',
        content: '작은 크기의 모달입니다.'
      })
    )
    await expectNoA11yViolations()
  })

  it('Large', async () => {
    render(
      modal({
        buttonText: 'Large 모달 열기',
        modalId: 'modal_large',
        modalProps: 'size="large"',
        title: 'Large 모달',
        content: '큰 크기의 모달입니다.'
      })
    )
    await expectNoA11yViolations()
  })

  it('풀팝업', async () => {
    render(
      modal({
        buttonText: '풀팝업 열기',
        modalId: 'modal_full',
        modalProps: 'full',
        title: '풀팝업',
        content: '전체 화면을 차지하는 풀팝업입니다.'
      })
    )
    await openModal('풀팝업 열기')
    expect(screen.getByRole('dialog')).toHaveAttribute('data-type', 'full')
    await userEvent.click(screen.getByRole('button', { name: '닫기' }))
    await expectClosed()
    await expectNoA11yViolations()
  })

  it('바텀시트', async () => {
    render(
      modal({
        buttonText: '바텀시트 열기',
        modalId: 'modal_bottom_sheet',
        modalProps: 'bottom-sheet',
        title: '바텀시트',
        content: '하단에서 올라오는 바텀시트입니다.'
      })
    )
    await openModal('바텀시트 열기')
    expect(screen.getByRole('dialog')).toHaveAttribute('data-type', 'bottom-sheet')
    await userEvent.click(screen.getByRole('button', { name: '닫기' }))
    await expectClosed()
    await expectNoA11yViolations()
  })

  it('Persistent: 배경 클릭·Escape로 닫히지 않음', async () => {
    render(
      modal({
        buttonText: 'Persistent 모달 열기',
        modalId: 'modal_persistent',
        modalProps: 'persistent',
        title: 'Persistent 모달',
        content: '배경을 클릭해도 닫히지 않습니다. 버튼으로만 닫을 수 있습니다.'
      })
    )
    await openModal('Persistent 모달 열기')
    await userEvent.click(document.querySelector<HTMLElement>('.modal-back')!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: '닫기' }))
    await expectClosed()
    await expectNoA11yViolations()
  })

  it('닫힌 모달을 마운트해도 body overflow를 덮어쓰지 않음', async () => {
    render({
      setup: () => ({ show: ref(false) }),
      template: `<div><button @click="show = true">mount</button><KrdsModal v-if="show" :model-value="false" title="t">x</KrdsModal></div>`
    })
    document.body.style.overflow = 'hidden'
    await userEvent.click(screen.getByRole('button', { name: 'mount' }))
    const overflow = document.body.style.overflow
    document.body.style.overflow = ''
    expect(overflow).toBe('hidden')
  })
})
