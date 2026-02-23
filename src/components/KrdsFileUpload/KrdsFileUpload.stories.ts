import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, waitFor } from 'storybook/test'
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
  play: async ({ canvas, userEvent }) => {
    // Verify initial valid file count (4 valid: uploading, 2 completed, pending; 1 error excluded)
    await expect(canvas.getByText('4개')).toBeInTheDocument()

    // Click download button on file with downloadUrl
    const downloadBtn = canvas.getByRole('button', { name: '다운로드' })
    await userEvent.click(downloadBtn)

    // Click preview button
    const previewBtn = canvas.getByRole('button', { name: '바로보기' })
    await userEvent.click(previewBtn)

    // Delete first deletable file (pending file)
    const deleteButtons = canvas.getAllByRole('button', { name: '삭제' })
    await userEvent.click(deleteButtons[0])

    // Verify count decreased
    await waitFor(() => {
      expect(canvas.getByText('3개')).toBeInTheDocument()
    })

    // Clear all remaining files
    const clearAllBtn = canvas.getByRole('button', { name: '전체 파일 삭제' })
    await userEvent.click(clearAllBtn)

    // Verify file list removed
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
  play: async ({ canvasElement, canvas, userEvent }) => {
    // Click file select button (covers triggerFileSelect)
    const selectBtn = canvas.getByRole('button', { name: '파일선택' })
    await userEvent.click(selectBtn)

    // Upload file via hidden input
    const fileInput = canvasElement.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['test content'], 'test-file.txt', { type: 'text/plain' })
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)
    fileInput.files = dataTransfer.files
    fileInput.dispatchEvent(new Event('change', { bubbles: true }))

    // Verify file appears in the list
    await waitFor(() => {
      expect(canvas.getByText(/test-file/)).toBeInTheDocument()
    })

    // Delete the uploaded file
    const deleteBtn = canvas.getByRole('button', { name: '삭제' })
    await userEvent.click(deleteBtn)

    // Verify file removed
    await waitFor(() => {
      expect(canvas.queryByText(/test-file/)).not.toBeInTheDocument()
    })
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
  })
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
  })
}
