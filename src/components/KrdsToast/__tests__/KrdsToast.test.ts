import { describe, expect, it, vi } from 'vitest'
import { useToast } from '@/composables'
import { expectNoA11yViolations, render, screen } from '@/test/utils'

describe('KrdsToast', () => {
  it('role=status 영역은 항상 있고, useToast().show()로 띄우면 메시지를 넣고 노출 시간 뒤 비운다', async () => {
    render({ template: `<KrdsToast />` })
    const status = screen.getByRole('status')
    expect(status).toBeEmptyDOMElement()

    useToast().show('저장되었습니다.', { duration: 50 })
    await vi.waitFor(() => expect(status).toHaveTextContent('저장되었습니다.'))
    expect(status).toHaveClass('active')
    await expectNoA11yViolations()
    await vi.waitFor(() => expect(status).toBeEmptyDOMElement())
  })

  it('기본 노출 시간은 info 3초, warning 4초, 0이면 닫지 않고, 다시 show()하면 시간을 다시 세고, hide()로 바로 닫는다', async () => {
    vi.useFakeTimers()
    try {
      render({ template: `<KrdsToast />` })
      const status = screen.getByRole('status')
      const toast = useToast()

      toast.show('정보')
      await vi.advanceTimersByTimeAsync(2999)
      expect(status).toHaveTextContent('정보')
      await vi.advanceTimersByTimeAsync(1)
      expect(status).toBeEmptyDOMElement()

      toast.warning('경고')
      await vi.advanceTimersByTimeAsync(3999)
      expect(status).toHaveTextContent('경고')
      await vi.advanceTimersByTimeAsync(1)
      expect(status).toBeEmptyDOMElement()

      // 떠 있는 동안 다시 띄우면 내용이 바뀌고 노출 시간을 처음부터 센다
      toast.show('첫 번째')
      await vi.advanceTimersByTimeAsync(2000)
      toast.show('두 번째')
      await vi.advanceTimersByTimeAsync(2000)
      expect(status).toHaveTextContent('두 번째')
      await vi.advanceTimersByTimeAsync(1000)
      expect(status).toBeEmptyDOMElement()

      toast.info('고정', 0)
      await vi.advanceTimersByTimeAsync(60000)
      expect(status).toHaveTextContent('고정')
      toast.hide()
      await vi.advanceTimersByTimeAsync(0)
      expect(status).toBeEmptyDOMElement()
    } finally {
      vi.useRealTimers()
    }
  })
})
