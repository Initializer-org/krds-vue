import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsFileUpload from './KrdsFileUpload'
import type { FileInfo } from './KrdsFileUpload'

const meta: Meta<typeof KrdsFileUpload> = {
  title: 'Components/Input/KrdsFileUpload',
  component: KrdsFileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '파일 업로드는 하나 이상의 디바이스의 로컬 파일을 선택하고 첨부하는 데 사용하는 입력 컴포넌트이다.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기'
    },
    accept: {
      control: { type: 'text' },
      description: '허용되는 파일 타입 (예: .jpg,.png,.pdf)'
    },
    maxFiles: {
      control: { type: 'number' },
      description: '최대 파일 개수'
    },
    maxFileSize: {
      control: { type: 'number' },
      description: '최대 파일 크기 (bytes)'
    },
    multiple: {
      control: { type: 'boolean' },
      description: '다중 파일 선택 여부'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부'
    },
    dragAndDrop: {
      control: { type: 'boolean' },
      description: '드래그 앤 드롭 활성화 여부'
    },
    title: {
      control: { type: 'text' },
      description: '제목'
    },
    description: {
      control: { type: 'text' },
      description: '설명 텍스트'
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트'
    },
    showPreview: {
      control: { type: 'boolean' },
      description: '미리보기 표시 여부'
    },
    showDownload: {
      control: { type: 'boolean' },
      description: '다운로드 버튼 표시 여부'
    },
    showPreviewButton: {
      control: { type: 'boolean' },
      description: '바로보기 버튼 표시 여부'
    },
    showClearAll: {
      control: { type: 'boolean' },
      description: '전체 삭제 버튼 표시 여부'
    },
    name: {
      control: { type: 'text' },
      description: '폼 필드 이름'
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부'
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기 전용 여부'
    }
  },
  args: {
    size: 'medium',
    maxFiles: 10,
    maxFileSize: 20 * 1024 * 1024, // 20MB
    multiple: true,
    disabled: false,
    dragAndDrop: true,
    title: '타이틀영역',
    description: '컨텐츠 영역',
    placeholder: '첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해주세요.',
    showPreview: true,
    showDownload: true,
    showPreviewButton: true,
    showClearAll: true,
    required: false,
    readonly: false
  }
}

export default meta
type Story = StoryObj<typeof KrdsFileUpload>

// 샘플 파일 데이터
const sampleFiles: FileInfo[] = [
  {
    id: '1',
    file: new File([''], '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp'),
    name: '위임장(주민등록법 시행령 별지 제15호의2호서식).hwp',
    size: 17 * 1024, // 17KB
    type: 'application/x-hwp',
    status: 'uploading',
    progress: 75
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
    file: new File([''], '전입재등록신고서.hwp'),
    name: '전입재등록신고서 [주민등록법 시행령 : 별지서식 15, 15호의2호].hwp',
    size: 25 * 1024 * 1024, // 25MB (용량 초과)
    type: 'application/x-hwp',
    status: 'error',
    errorMessage: '등록 가능한 파일 용량을 초과하였습니다.\n20MB 미만의 파일만 등록할 수 있습니다.'
  }
]

export const Default: Story = {}

export const WithFiles: Story = {
  args: {
    modelValue: sampleFiles
  }
}

export const SingleFile: Story = {
  args: {
    multiple: false,
    maxFiles: 1,
    title: '단일 파일 업로드',
    description: '하나의 파일만 업로드할 수 있습니다.'
  }
}

export const ImageOnly: Story = {
  args: {
    accept: '.jpg,.jpeg,.png,.gif',
    maxFiles: 5,
    title: '이미지 파일 업로드',
    description: 'JPG, PNG, GIF 파일만 업로드할 수 있습니다.'
  }
}

export const SmallSize: Story = {
  args: {
    size: 'small',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    title: '작은 크기 업로드'
  }
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    maxFileSize: 100 * 1024 * 1024, // 100MB
    title: '큰 크기 업로드'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: [sampleFiles[1]], // 완료된 파일 하나만
    title: '비활성화 상태',
    description: '파일 업로드가 비활성화된 상태입니다.'
  }
}

export const ReadOnly: Story = {
  args: {
    readonly: true,
    modelValue: sampleFiles,
    title: '읽기 전용',
    description: '업로드된 파일만 확인할 수 있습니다.'
  }
}

export const NoDragAndDrop: Story = {
  args: {
    dragAndDrop: false,
    title: '드래그 앤 드롭 비활성화',
    description: '파일 선택 버튼을 통해서만 파일을 업로드할 수 있습니다.'
  }
}

export const MinimalFeatures: Story = {
  args: {
    showPreview: false,
    showDownload: false,
    showPreviewButton: false,
    showClearAll: false,
    title: '최소 기능',
    description: '기본적인 업로드 기능만 제공합니다.'
  }
}
