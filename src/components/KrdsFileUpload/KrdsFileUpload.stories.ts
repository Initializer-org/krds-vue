import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor, within } from 'storybook/test'
import { ref } from 'vue'
import KrdsFileUpload from './KrdsFileUpload'
import type { FileInfo } from './KrdsFileUpload'

const meta: Meta<typeof KrdsFileUpload> = {
  title: 'Components/Input/KrdsFileUpload',
  component: KrdsFileUpload,
  parameters: {
    docs: {
      description: {
        component: '파일 업로드는 하나 이상의 디바이스의 로컬 파일을 선택하고 첨부하는 데 사용하는 입력 컴포넌트이다.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '파일 선택 버튼 크기'
    },
    accept: {
      control: 'text',
      description: '허용되는 파일 타입 (예: .jpg,.png,.pdf)'
    },
    maxFiles: {
      control: 'number',
      description: '최대 파일 개수'
    },
    maxFileSize: {
      control: 'number',
      description: '최대 파일 크기 (bytes)'
    },
    multiple: {
      control: 'boolean',
      description: '다중 파일 선택 여부'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    title: {
      control: 'text',
      description: '제목'
    },
    description: {
      control: 'text',
      description: '설명 텍스트'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    showDownload: {
      control: 'boolean',
      description: '다운로드 버튼 표시 여부'
    },
    showPreviewButton: {
      control: 'boolean',
      description: '바로보기 버튼 표시 여부'
    },
    showClearAll: {
      control: 'boolean',
      description: '전체 삭제 버튼 표시 여부'
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

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

// 1. 기본
export const Default: Story = {
  name: '기본',
  render: args => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([])
      return { args, files }
    },
    template: `
      <KrdsFileUpload v-bind="args" v-model="files" />
    `
  }),
  args: {
    title: '타이틀영역',
    description: '컨텐츠 영역'
  },
  play: async ({ canvas, canvasElement }) => {
    // 드래그 앤 드롭: dragover를 취소해 드롭을 허용하고, 드롭한 파일을 모두 추가
    const dropAllowed = dropFiles(canvasElement.querySelector('.file-upload')!, [
      new File(['a'], 'a.pdf', { type: 'application/pdf' }),
      new File(['bb'], 'b.hwp', { type: 'application/x-hwp' })
    ])
    await expect(dropAllowed).toBe(true)
    await expect(await canvas.findByText('a [pdf, 1B]')).toBeInTheDocument()
    await expect(canvas.getByText('b [hwp, 2B]')).toBeInTheDocument()
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('2개 / 10개')
  }
}

// 2. 파일 상태별 표시 (KRDS 원본 HTML 재현)
export const WithFiles: Story = {
  name: '파일 상태별 표시',
  render: args => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>(sampleFiles)
      return { args, files }
    },
    template: `
      <KrdsFileUpload v-bind="args" v-model="files" />
    `
  }),
  args: {
    title: '타이틀영역',
    description: '컨텐츠 영역'
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    // 상태별 표시: 업로드 중(status), 업로드 완료, 오류 안내
    await expect(canvas.getByRole('status')).toHaveTextContent('업로드 중')
    await expect(canvas.getByText('업로드 완료')).toBeInTheDocument()
    await expect(canvasElement.querySelector('li.is-error .file-hint-invalid')).toHaveTextContent('등록 가능한 파일 용량을 초과하였습니다.')

    // 유효 파일 수(오류 제외 4개)
    await expect(canvas.getByText('4개')).toBeInTheDocument()

    // downloadUrl이 있는 파일은 다운로드·바로보기 버튼 제공
    await userEvent.click(canvas.getByRole('button', { name: '다운로드' }))
    await userEvent.click(canvas.getByRole('button', { name: '바로보기' }))

    // 삭제 버튼은 대기·오류 파일에만 있음
    const deleteButtons = canvas.getAllByRole('button', { name: '삭제' })
    await expect(deleteButtons).toHaveLength(2)

    // 대기 파일 삭제 시 개수 감소
    await userEvent.click(deleteButtons[0])
    await waitFor(() => {
      expect(canvas.getByText('3개')).toBeInTheDocument()
    })

    // 전체 파일 삭제 시 목록 제거
    await userEvent.click(canvas.getByRole('button', { name: '전체 파일 삭제' }))
    await waitFor(() => {
      expect(canvas.queryByRole('button', { name: '전체 파일 삭제' })).not.toBeInTheDocument()
    })
  }
}

// 3. 파일 선택 동작
export const Interactive: Story = {
  name: '파일 선택 동작',
  render: args => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([])
      return { args, files }
    },
    template: `
      <div>
        <KrdsFileUpload
          v-bind="args"
          v-model="files"
        />
        <p style="margin-top: 1rem; color: #666;">선택된 파일 수: {{ files.length }}개</p>
      </div>
    `
  }),
  args: {
    title: '파일 업로드',
    description: '파일을 선택하거나 드래그하여 업로드하세요.',
    maxFileSize: 20 * 1024 * 1024
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]')!

    // 파일선택 버튼(클릭·Enter)은 숨겨진 input을 한 번씩만 연다 (파일 대화상자는 막음)
    let opened = 0
    const onOpen = (event: Event) => {
      opened++
      event.preventDefault()
    }
    input.addEventListener('click', onOpen)
    await userEvent.click(canvas.getByRole('button', { name: '파일선택' }))
    await expect(opened).toBe(1)
    await userEvent.keyboard('{Enter}')
    await expect(opened).toBe(2)
    input.removeEventListener('click', onOpen)

    // 다중 선택: "이름 [확장자, 크기]"로 표시되고 v-model에 반영
    const fileA = new File(['hello'], 'a.pdf', { type: 'application/pdf' })
    await userEvent.upload(input, [fileA, new File(['hi'], 'b.pdf', { type: 'application/pdf' })])
    await expect(canvas.getByText('a [pdf, 5B]')).toBeInTheDocument()
    await expect(canvas.getByText('b [pdf, 2B]')).toBeInTheDocument()
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('2개 / 10개')
    await expect(canvas.getByText('선택된 파일 수: 2개')).toBeInTheDocument()

    // 삭제하면 목록과 v-model에서 제거
    await userEvent.click(within(canvas.getByText('a [pdf, 5B]').closest('li')!).getByRole('button', { name: '삭제' }))
    await expect(canvas.queryByText('a [pdf, 5B]')).not.toBeInTheDocument()
    await expect(canvas.getByText('선택된 파일 수: 1개')).toBeInTheDocument()

    // input 값이 비워져 같은 파일을 다시 선택할 수 있음
    await userEvent.upload(input, fileA)
    await expect(canvas.getByText('a [pdf, 5B]')).toBeInTheDocument()

    // 최대 용량(20MB) 초과 파일은 오류 항목으로 표시되고 유효 개수에서 제외
    await userEvent.upload(input, new File([new Uint8Array(20 * 1024 * 1024 + 1)], 'big.pdf', { type: 'application/pdf' }))
    const bigItem = canvas.getByText(/^big \[pdf/).closest('li')!
    await expect(bigItem).toHaveClass('is-error')
    await expect(bigItem.querySelector('.file-hint-invalid')).toHaveTextContent(
      /등록 가능한 파일 용량을 초과하였습니다\..*미만의 파일만 등록할 수 있습니다\./
    )
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('2개 / 10개')
  }
}

// 4. 단일 파일
export const SingleFile: Story = {
  name: '단일 파일',
  render: args => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([])
      return { args, files }
    },
    template: '<KrdsFileUpload v-bind="args" v-model="files" />'
  }),
  args: {
    multiple: false,
    maxFiles: 1,
    title: '단일 파일 업로드',
    description: '하나의 파일만 업로드할 수 있습니다.'
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]')!
    await expect(input).not.toHaveAttribute('multiple')

    // 새로 선택한 파일이 기존 파일을 대체
    await userEvent.upload(input, new File(['a'], 'a.pdf', { type: 'application/pdf' }))
    await expect(canvas.getByText('a [pdf, 1B]')).toBeInTheDocument()
    await userEvent.upload(input, new File(['b'], 'b.pdf', { type: 'application/pdf' }))
    await expect(canvas.getByText('b [pdf, 1B]')).toBeInTheDocument()
    await expect(canvas.queryByText('a [pdf, 1B]')).not.toBeInTheDocument()

    // 여러 파일을 드롭해도 최대 1개만 남음
    dropFiles(canvasElement.querySelector('.file-upload')!, [
      new File(['c'], 'c.pdf', { type: 'application/pdf' }),
      new File(['d'], 'd.pdf', { type: 'application/pdf' })
    ])
    await expect(await canvas.findByText('c [pdf, 1B]')).toBeInTheDocument()
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1)
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('1개 / 1개')
  }
}

// 5. 이미지만 허용
export const ImageOnly: Story = {
  name: '이미지 파일만',
  render: args => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([])
      return { args, files }
    },
    template: '<KrdsFileUpload v-bind="args" v-model="files" />'
  }),
  args: {
    accept: '.jpg,.jpeg,.png,.gif',
    maxFiles: 5,
    title: '이미지 파일 업로드',
    description: 'JPG, PNG, GIF 파일만 업로드할 수 있습니다.'
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]')!
    await expect(input).toHaveAttribute('accept', '.jpg,.jpeg,.png,.gif')

    // 드롭은 accept 필터를 거치지 않으므로 컴포넌트가 형식을 검증
    dropFiles(canvasElement.querySelector('.file-upload')!, [
      new File(['a'], 'a.jpg', { type: 'image/jpeg' }),
      new File(['b'], 'b.pdf', { type: 'application/pdf' })
    ])
    const invalidItem = (await canvas.findByText('b [pdf, 1B]')).closest('li')!
    await expect(invalidItem).toHaveClass('is-error')
    await expect(invalidItem).toHaveTextContent('허용되지 않는 파일 형식입니다.')
    await expect(canvas.getByText('a [jpg, 1B]').closest('li')).not.toHaveClass('is-error')
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('1개 / 5개')

    // 오류 항목도 삭제 가능
    await userEvent.click(within(invalidItem).getByRole('button', { name: '삭제' }))
    await expect(canvas.queryByText('b [pdf, 1B]')).not.toBeInTheDocument()

    // 최대 개수(5개)를 넘는 파일은 추가되지 않음
    await userEvent.upload(
      input,
      ['c', 'd', 'e', 'f', 'g'].map(name => new File([name], `${name}.png`, { type: 'image/png' }))
    )
    await expect(canvas.getAllByRole('listitem')).toHaveLength(5)
    await expect(canvas.queryByText('g [png, 1B]')).not.toBeInTheDocument()
    await expect(canvasElement.querySelector('.total')).toHaveTextContent('5개 / 5개')
  }
}

// 6. 비활성화
export const Disabled: Story = {
  name: '비활성화',
  render: () => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([sampleFiles[2]])
      return { files }
    },
    template: `
      <KrdsFileUpload
        v-model="files"
        disabled
        title="비활성화 상태"
        description="파일 업로드가 비활성화된 상태입니다."
      />
    `
  }),
  play: async ({ canvas, canvasElement, userEvent }) => {
    // 모든 조작 버튼 비활성화
    await expect(canvas.getByRole('button', { name: '파일선택' })).toBeDisabled()
    await expect(canvas.getByRole('button', { name: '삭제' })).toBeDisabled()
    await expect(canvas.getByRole('button', { name: '전체 파일 삭제' })).toBeDisabled()

    // 드롭은 허용되지 않고(dragover 미취소), 드롭·input 선택 모두 무시
    const dropAllowed = dropFiles(canvasElement.querySelector('.file-upload')!, [new File(['a'], 'a.pdf', { type: 'application/pdf' })])
    await expect(dropAllowed).toBe(false)
    const input = canvasElement.querySelector<HTMLInputElement>('input[type="file"]')!
    await userEvent.upload(input, new File(['b'], 'b.pdf', { type: 'application/pdf' }))
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1)
  }
}

// 7. 읽기 전용
export const ReadOnly: Story = {
  name: '읽기 전용',
  render: () => ({
    components: { KrdsFileUpload },
    setup() {
      const files = ref<FileInfo[]>([sampleFiles[4]])
      return { files }
    },
    template: `
      <KrdsFileUpload
        v-model="files"
        readonly
        title="읽기 전용"
        description="업로드된 파일만 확인할 수 있습니다."
      />
    `
  }),
  play: async ({ canvas, canvasElement }) => {
    // 업로드 영역과 전체 삭제 없이 다운로드·바로보기만 제공
    await expect(canvasElement.querySelector('input[type="file"]')).toBeNull()
    await expect(canvas.queryByRole('button', { name: '파일선택' })).not.toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: '전체 파일 삭제' })).not.toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: '다운로드' })).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: '바로보기' })).toBeInTheDocument()
  }
}
