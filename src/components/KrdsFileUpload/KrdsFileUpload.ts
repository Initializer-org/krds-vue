import { defineComponent, computed, ref } from 'vue'
import type { Size, BaseFormProps } from '@/types'

/**
 * 파일 정보 인터페이스
 */
export interface FileInfo {
  /** 파일 ID */
  id: string
  /** 파일 객체 */
  file: File
  /** 파일명 */
  name: string
  /** 파일 크기 (bytes) */
  size: number
  /** 파일 타입 */
  type: string
  /** 업로드 상태 */
  status: 'pending' | 'uploading' | 'completed' | 'error'
  /** 업로드 진행률 (0-100) */
  progress?: number
  /** 에러 메시지 */
  errorMessage?: string
  /** 다운로드 URL */
  downloadUrl?: string
}

/**
 * KRDS FileUpload 컴포넌트 속성
 */
export interface KrdsFileUploadProps extends BaseFormProps {
  /** 파일 목록 */
  modelValue?: FileInfo[]
  /** 입력 크기 */
  size?: Size
  /** 허용되는 파일 타입 (예: '.jpg,.png,.pdf') */
  accept?: string
  /** 최대 파일 개수 */
  maxFiles?: number
  /** 최대 파일 크기 (bytes) */
  maxFileSize?: number
  /** 다중 파일 선택 여부 */
  multiple?: boolean
  /** 비활성화 여부 */
  disabled?: boolean
  /** 드래그 앤 드롭 활성화 여부 */
  dragAndDrop?: boolean
  /** 제목 */
  title?: string
  /** 설명 텍스트 */
  description?: string
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 미리보기 표시 여부 */
  showPreview?: boolean
  /** 다운로드 버튼 표시 여부 */
  showDownload?: boolean
  /** 바로보기 버튼 표시 여부 */
  showPreviewButton?: boolean
  /** 전체 삭제 버튼 표시 여부 */
  showClearAll?: boolean
}

/**
 * KRDS FileUpload 컴포넌트 이벤트
 */
export interface KrdsFileUploadEmits {
  'update:modelValue': [files: FileInfo[]]
  'file-added': [file: FileInfo]
  'file-removed': [fileId: string]
  'file-error': [file: FileInfo, error: string]
  'upload-start': [file: FileInfo]
  'upload-progress': [file: FileInfo, progress: number]
  'upload-complete': [file: FileInfo]
  'upload-error': [file: FileInfo, error: string]
  'clear-all': []
  download: [file: FileInfo]
  preview: [file: FileInfo]
}

export default defineComponent({
  name: 'KrdsFileUpload',
  props: {
    modelValue: {
      type: Array as () => FileInfo[],
      default: () => []
    },
    size: {
      type: String as () => Size,
      default: 'medium'
    },
    accept: {
      type: String,
      default: undefined
    },
    maxFiles: {
      type: Number,
      default: 10
    },
    maxFileSize: {
      type: Number,
      default: 20 * 1024 * 1024 // 20MB
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dragAndDrop: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '타이틀영역'
    },
    description: {
      type: String,
      default: '컨텐츠 영역'
    },
    placeholder: {
      type: String,
      default: '첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 눌러 파일을 직접 선택해주세요.'
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    showDownload: {
      type: Boolean,
      default: true
    },
    showPreviewButton: {
      type: Boolean,
      default: true
    },
    showClearAll: {
      type: Boolean,
      default: true
    },
    // BaseFormProps에서 상속
    name: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: undefined
    },
    style: {
      type: [String, Object],
      default: undefined
    },
    id: {
      type: String,
      default: undefined
    }
  },
  emits: [
    'update:modelValue',
    'file-added',
    'file-removed',
    'file-error',
    'upload-start',
    'upload-progress',
    'upload-complete',
    'upload-error',
    'clear-all',
    'download',
    'preview'
  ],
  setup(props, { emit: _emit }) {
    const _isDragOver = ref(false)

    /**
     * 파일 업로드 클래스 계산
     */
    const _fileUploadClasses = computed(() => {
      const classes = ['krds-file-upload', 'line']

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    /**
     * 현재 파일 개수 계산
     */
    const currentFileCount = computed(() => {
      return props.modelValue?.length || 0
    })

    /**
     * 파일 추가 가능 여부
     */
    const _canAddFiles = computed(() => {
      return !props.disabled && currentFileCount.value < props.maxFiles
    })

    // TODO: 실제 구현 로직 추가
    // - 파일 선택 핸들러
    // - 드래그 앤 드롭 핸들러
    // - 파일 업로드 로직
    // - 파일 삭제 로직
    // - 파일 다운로드 로직
    // - 파일 미리보기 로직

    return () => {
      // TODO: 실제 렌더 함수 구현
      return null
    }
  }
})
