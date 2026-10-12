import { describe, expect, it, vi } from 'vitest'
import { useSnackbar } from '@/composables'
import { expectNoA11yViolations, render, screen, userEvent } from '@/test/utils'

describe('KrdsSnackbar', () => {
  it('useSnackbar().show()로 제목·본문·아이콘·작업 버튼·닫기 버튼을 그리고, 작업 버튼은 onAction 호출 뒤 닫는다', async () => {
    const onAction = vi.fn()
    const { container } = render({ template: `<KrdsSnackbar />` })
    const status = screen.getByRole('status')
    expect(status).toBeEmptyDOMElement()

    useSnackbar().show({ icon: 'ico-success-fill', title: '삭제 완료', message: '항목을 삭제했습니다.', action: '되돌리기', onAction })
    await vi.waitFor(() => expect(status).toHaveTextContent('삭제 완료'))
    expect(status).toHaveTextContent('항목을 삭제했습니다.')
    expect(container.querySelector('.snackbar-icon')).toHaveClass('ico-success-fill')
    await expectNoA11yViolations()

    await userEvent.click(screen.getByRole('button', { name: '되돌리기' }))
    expect(onAction).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(status).toBeEmptyDOMElement())
  })

  it('아이콘·본문·작업 버튼은 지정할 때만 그리고, 닫기 버튼과 hide()로 닫는다', async () => {
    const { container } = render({ template: `<KrdsSnackbar />` })
    const status = screen.getByRole('status')
    const snackbar = useSnackbar()

    snackbar.show({ title: '알림' })
    await vi.waitFor(() => expect(status).toHaveTextContent('알림'))
    expect(container.querySelector('.snackbar-icon')).toBeNull()
    expect(container.querySelector('.snackbar-text')).toBeNull()
    expect(screen.getAllByRole('button')).toHaveLength(1)
    await userEvent.click(screen.getByRole('button', { name: '닫기' }))
    await vi.waitFor(() => expect(status).toBeEmptyDOMElement())

    snackbar.show({ title: '다시' })
    await vi.waitFor(() => expect(status).toHaveTextContent('다시'))
    snackbar.hide()
    await vi.waitFor(() => expect(status).toBeEmptyDOMElement())
  })

  it('duration을 주면 노출 시간 뒤 자동으로 닫힌다', async () => {
    render({ template: `<KrdsSnackbar />` })
    const status = screen.getByRole('status')
    useSnackbar().show({ title: '자동 닫힘', duration: 50 })
    await vi.waitFor(() => expect(status).toHaveTextContent('자동 닫힘'))
    await vi.waitFor(() => expect(status).toBeEmptyDOMElement())
  })
})
