import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { expectNoA11yViolations, render, screen, userEvent, waitFor, within } from '@/test/utils'
import type { FileInfo } from '../KrdsFileUpload'

// KRDS 원본 HTML과 동일한 샘플 데이터
const sampleFiles: FileInfo[] = [
  {
    id: '1',
    file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
    name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
    size: 17 * 1024,
    type: 'application/x-hwp',
    status: 'uploading'
  },
  {
    id: '2',
    file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
    name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
    size: 17 * 1024,
    type: 'application/x-hwp',
    status: 'completed'
  },
  {
    id: '3',
    file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
    name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
    size: 17 * 1024,
    type: 'application/x-hwp',
    status: 'pending'
  },
  {
    id: '4',
    file: new File([''], '전입재등록신고서 [주민등록법 시행령 별지서식 15, 15호의2호].hwp'),
    name: '전입재등록신고서 [주민등록법 시행령 별지서식 15, 15호의2호].hwp',
    size: 25 * 1024 * 1024,
    type: 'application/x-hwp',
    status: 'error',
    errorMessage: '등록 가능한 파일 용량을 초과하였습니다.\n20MB 미만의 파일만 등록할 수 있습니다.'
  },
  {
    id: '5',
    file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
    name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
    size: 17 * 1024,
    type: 'application/x-hwp',
    status: 'completed',
    downloadUrl: '/files/sample.hwp'
  }
]

// 드래그 앤 드롭 재현: dragover가 취소되어 드롭이 허용됐는지 반환
const dropFiles = (target: Element, files: File[]) => {
  const dataTransfer = new DataTransfer()
  files.forEach(file => dataTransfer.items.add(file))
  const dropAllowed = !target.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer }))
  target.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer }))
  return dropAllowed
}

const fileUpload = (args: Record<string, unknown>, initial: FileInfo[] = []) => ({
  setup: () => ({ args, files: ref<FileInfo[]>(initial) }),
  template: '<KrdsFileUpload v-bind="args" v-model="files" />'
})

describe('KrdsFileUpload', () => {
  it('기본: 드래그 강조, 드롭한 파일 추가', async () => {
    const { container } = render(fileUpload({ title: '타이틀영역', description: '컨텐츠 영역' }))
    const uploadArea = container.querySelector('.file-upload')!

    // 드래그 중에는 업로드 영역 강조(active), 벗어나면 해제
    uploadArea.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true }))
    await waitFor(() => expect(uploadArea).toHaveClass('active'))
    uploadArea.dispatchEvent(new DragEvent('dragleave', { bubbles: true }))
    await waitFor(() => expect(uploadArea).not.toHaveClass('active'))

    // 드래그 앤 드롭: dragover를 취소해 드롭을 허용하고, 드롭한 파일을 모두 추가(드롭 후 강조 해제)
    const dropAllowed = dropFiles(uploadArea, [
      new File(['a'], 'a.pdf', { type: 'application/pdf' }),
      new File(['bb'], 'b.hwp', { type: 'application/x-hwp' })
    ])
    expect(dropAllowed).toBe(true)
    expect(await screen.findByText('a [pdf, 1B]')).toBeInTheDocument()
    expect(screen.getByText('b [hwp, 2B]')).toBeInTheDocument()
    expect(container.querySelector('.total')).toHaveTextContent('2개 / 10개')
    expect(uploadArea).not.toHaveClass('active')
    await expectNoA11yViolations()
  })

  it('파일 상태별 표시: 상태 표시, 다운로드·바로보기, 삭제·전체 삭제', async () => {
    const { container } = render(fileUpload({ title: '타이틀영역', description: '컨텐츠 영역' }, sampleFiles))
    // 상태별 표시: 업로드 중(status), 업로드 완료, 오류 안내
    expect(screen.getByRole('status')).toHaveTextContent('업로드 중')
    expect(screen.getByText('업로드 완료')).toBeInTheDocument()
    expect(container.querySelector('li.is-error .file-hint-invalid')).toHaveTextContent('등록 가능한 파일 용량을 초과하였습니다.')

    // 유효 파일 수(오류 제외 4개)
    expect(screen.getByText('4개')).toBeInTheDocument()

    // downloadUrl이 있는 파일은 다운로드·바로보기 버튼 제공
    await userEvent.click(screen.getByRole('button', { name: '다운로드' }))
    await userEvent.click(screen.getByRole('button', { name: '바로보기' }))

    // 삭제 버튼은 대기·오류 파일에만 있음
    const deleteButtons = screen.getAllByRole('button', { name: '삭제' })
    expect(deleteButtons).toHaveLength(2)

    // 대기 파일 삭제 시 개수 감소
    await userEvent.click(deleteButtons[0])
    await waitFor(() => {
      expect(screen.getByText('3개')).toBeInTheDocument()
    })

    // 전체 파일 삭제 시 목록 제거
    await userEvent.click(screen.getByRole('button', { name: '전체 파일 삭제' }))
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: '전체 파일 삭제' })).not.toBeInTheDocument()
    })
    await expectNoA11yViolations()
  })

  it('파일 선택 동작: 파일선택 버튼, 다중 선택·삭제·재선택, 용량 초과 오류', async () => {
    const { container } = render({
      setup: () => ({
        args: { title: '파일 업로드', description: '파일을 선택하거나 드래그하여 업로드하세요.', maxFileSize: 20 * 1024 * 1024 },
        files: ref<FileInfo[]>([])
      }),
      template: `
        <div>
          <KrdsFileUpload
            v-bind="args"
            v-model="files"
          />
          <p style="margin-top: 1rem; color: #666;">선택된 파일 수: {{ files.length }}개</p>
        </div>
      `
    })
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!

    // 파일선택 버튼(클릭·Enter)은 숨겨진 input을 한 번씩만 연다 (파일 대화상자는 막음)
    let opened = 0
    const onOpen = (event: Event) => {
      opened++
      event.preventDefault()
    }
    input.addEventListener('click', onOpen)
    await userEvent.click(screen.getByRole('button', { name: '파일선택' }))
    expect(opened).toBe(1)
    await userEvent.keyboard('{Enter}')
    expect(opened).toBe(2)
    input.removeEventListener('click', onOpen)

    // 다중 선택: "이름 [확장자, 크기]"로 표시되고 v-model에 반영
    const fileA = new File(['hello'], 'a.pdf', { type: 'application/pdf' })
    await userEvent.upload(input, [fileA, new File(['hi'], 'b.pdf', { type: 'application/pdf' })])
    expect(screen.getByText('a [pdf, 5B]')).toBeInTheDocument()
    expect(screen.getByText('b [pdf, 2B]')).toBeInTheDocument()
    expect(container.querySelector('.total')).toHaveTextContent('2개 / 10개')
    expect(screen.getByText('선택된 파일 수: 2개')).toBeInTheDocument()

    // 삭제하면 목록과 v-model에서 제거
    await userEvent.click(within(screen.getByText('a [pdf, 5B]').closest('li')!).getByRole('button', { name: '삭제' }))
    expect(screen.queryByText('a [pdf, 5B]')).not.toBeInTheDocument()
    expect(screen.getByText('선택된 파일 수: 1개')).toBeInTheDocument()

    // input 값이 비워져 같은 파일을 다시 선택할 수 있음
    await userEvent.upload(input, fileA)
    expect(screen.getByText('a [pdf, 5B]')).toBeInTheDocument()

    // "20MB 미만"만 허용: 정확히 20MB인 파일도 오류 항목으로 표시되고 유효 개수에서 제외
    await userEvent.upload(input, new File([new Uint8Array(20 * 1024 * 1024)], 'big.pdf', { type: 'application/pdf' }))
    const bigItem = screen.getByText('big [pdf, 20MB]').closest('li')!
    expect(bigItem).toHaveClass('is-error')
    expect(bigItem.querySelector('.file-hint-invalid')).toHaveTextContent(
      '등록 가능한 파일 용량을 초과하였습니다.20MB 미만의 파일만 등록할 수 있습니다.'
    )
    expect(container.querySelector('.total')).toHaveTextContent('2개 / 10개')
    await expectNoA11yViolations()
  })

  it('단일 파일: 새 파일이 기존 파일을 대체, 드롭은 첫 파일만', async () => {
    const { container } = render(
      fileUpload({ multiple: false, title: '단일 파일 업로드', description: '하나의 파일만 업로드할 수 있습니다.' })
    )
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!
    expect(input).not.toHaveAttribute('multiple')

    // 새로 선택한 파일이 기존 파일을 대체
    await userEvent.upload(input, new File(['a'], 'a.pdf', { type: 'application/pdf' }))
    expect(screen.getByText('a [pdf, 1B]')).toBeInTheDocument()
    await userEvent.upload(input, new File(['b'], 'b.pdf', { type: 'application/pdf' }))
    expect(screen.getByText('b [pdf, 1B]')).toBeInTheDocument()
    expect(screen.queryByText('a [pdf, 1B]')).not.toBeInTheDocument()

    // 여러 파일을 드롭해도 첫 파일 1개만 남음 (maxFiles와 무관)
    dropFiles(container.querySelector('.file-upload')!, [
      new File(['c'], 'c.pdf', { type: 'application/pdf' }),
      new File(['d'], 'd.pdf', { type: 'application/pdf' })
    ])
    expect(await screen.findByText('c [pdf, 1B]')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(container.querySelector('.total')).toHaveTextContent('1개 / 10개')
    await expectNoA11yViolations()
  })

  it('이미지 파일만: 형식 검증, 최대 개수, 오류 항목 삭제', async () => {
    const { container } = render(
      fileUpload({
        accept: '.jpg,.jpeg,.png,.gif',
        maxFiles: 5,
        title: '이미지 파일 업로드',
        description: 'JPG, PNG, GIF 파일만 업로드할 수 있습니다.'
      })
    )
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!
    expect(input).toHaveAttribute('accept', '.jpg,.jpeg,.png,.gif')

    // 드롭은 accept 필터를 거치지 않으므로 컴포넌트가 형식을 검증
    dropFiles(container.querySelector('.file-upload')!, [
      new File(['a'], 'a.jpg', { type: 'image/jpeg' }),
      new File(['b'], 'b.pdf', { type: 'application/pdf' })
    ])
    const invalidItem = (await screen.findByText('b [pdf, 1B]')).closest('li')!
    expect(invalidItem).toHaveClass('is-error')
    expect(invalidItem).toHaveTextContent('허용되지 않는 파일 형식입니다.')
    expect(screen.getByText('a [jpg, 1B]').closest('li')).not.toHaveClass('is-error')
    expect(container.querySelector('.total')).toHaveTextContent('1개 / 5개')

    // 오류 항목은 개수를 차지하지 않아 f까지 추가되고, 최대 개수(5개)를 넘는 g는 추가되지 않음
    await userEvent.upload(
      input,
      ['c', 'd', 'e', 'f', 'g'].map(name => new File([name], `${name}.png`, { type: 'image/png' }))
    )
    expect(screen.getByText('f [png, 1B]').closest('li')).not.toHaveClass('is-error')
    expect(screen.queryByText('g [png, 1B]')).not.toBeInTheDocument()
    expect(container.querySelector('.total')).toHaveTextContent('5개 / 5개')

    // 오류 항목도 삭제 가능
    await userEvent.click(within(invalidItem).getByRole('button', { name: '삭제' }))
    expect(screen.queryByText('b [pdf, 1B]')).not.toBeInTheDocument()
    expect(container.querySelector('.total')).toHaveTextContent('5개 / 5개')
    await expectNoA11yViolations()
  })

  it('비활성화: 조작 버튼 비활성, 드롭·선택 무시', async () => {
    const { container } = render({
      setup: () => ({ files: ref<FileInfo[]>([sampleFiles[2]]) }),
      template: `
        <KrdsFileUpload
          v-model="files"
          disabled
          title="비활성화 상태"
          description="파일 업로드가 비활성화된 상태입니다."
        />
      `
    })
    // 모든 조작 버튼 비활성화
    expect(screen.getByRole('button', { name: '파일선택' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '삭제' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '전체 파일 삭제' })).toBeDisabled()

    // 드롭은 허용되지 않고(dragover 미취소), 드롭·input 선택 모두 무시
    const dropAllowed = dropFiles(container.querySelector('.file-upload')!, [new File(['a'], 'a.pdf', { type: 'application/pdf' })])
    expect(dropAllowed).toBe(false)
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, new File(['b'], 'b.pdf', { type: 'application/pdf' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    await expectNoA11yViolations()
  })

  it('읽기 전용: 다운로드·바로보기만 제공', async () => {
    const { container } = render({
      setup: () => ({ files: ref<FileInfo[]>([sampleFiles[4]]) }),
      template: `
        <KrdsFileUpload
          v-model="files"
          readonly
          title="읽기 전용"
          description="업로드된 파일만 확인할 수 있습니다."
        />
      `
    })
    // 업로드 영역과 전체 삭제 없이 다운로드·바로보기만 제공
    expect(container.querySelector('input[type="file"]')).toBeNull()
    expect(screen.queryByRole('button', { name: '파일선택' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '전체 파일 삭제' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '다운로드' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '바로보기' })).toBeInTheDocument()
    await expectNoA11yViolations()
  })
})
