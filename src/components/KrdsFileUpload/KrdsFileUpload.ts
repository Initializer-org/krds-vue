import { defineComponent, computed, ref, h, type VNode } from 'vue'
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

let uid = 0

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
  setup(props, { emit }) {
    const isDragOver = ref(false)
    const inputRef = ref<HTMLInputElement | null>(null)
    const inputId = props.id ? `${props.id}-input` : `krds-file-upload-${++uid}`

    // --- helpers ---

    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes}B`
      if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
    }

    const getFileExtension = (name: string): string => {
      const parts = name.split('.')
      return parts.length > 1 ? parts.pop()!.toLowerCase() : ''
    }

    const formatFileName = (file: FileInfo): string => {
      const ext = getFileExtension(file.name)
      const nameWithoutExt = ext ? file.name.slice(0, -(ext.length + 1)) : file.name
      return ext ? `${nameWithoutExt} [${ext}, ${formatFileSize(file.size)}]` : `${file.name} [${formatFileSize(file.size)}]`
    }

    const generateId = (): string => {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const validateFile = (file: File): string | null => {
      if (props.maxFileSize && file.size > props.maxFileSize) {
        return `등록 가능한 파일 용량을 초과하였습니다.\n${formatFileSize(props.maxFileSize)} 미만의 파일만 등록할 수 있습니다.`
      }
      if (props.accept) {
        const accepted = props.accept.split(',').map(t => t.trim().toLowerCase())
        const ext = `.${getFileExtension(file.name)}`
        const mime = file.type
        if (
          !accepted.some(t => {
            if (t.startsWith('.')) return ext === t
            if (t.endsWith('/*')) return mime.startsWith(t.replace('/*', '/'))
            return mime === t
          })
        ) {
          return '허용되지 않는 파일 형식입니다.'
        }
      }
      return null
    }

    // --- event handlers ---

    const addFiles = (fileList: FileList) => {
      if (props.disabled || props.readonly) return

      // 단일 파일 모드: 기존 파일 교체
      let currentFiles = [...(props.modelValue || [])]
      if (!props.multiple && currentFiles.length > 0) {
        currentFiles = []
      }

      const newFiles: FileInfo[] = []

      for (let i = 0; i < fileList.length; i++) {
        if (currentFiles.length + newFiles.length >= props.maxFiles) break

        const file = fileList[i]
        const error = validateFile(file)
        const fileInfo: FileInfo = {
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: error ? 'error' : 'pending',
          errorMessage: error || undefined
        }
        newFiles.push(fileInfo)

        if (error) {
          emit('file-error', fileInfo, error)
        } else {
          emit('file-added', fileInfo)
        }
      }

      if (newFiles.length > 0) {
        emit('update:modelValue', [...currentFiles, ...newFiles])
      }
    }

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.files?.length) {
        addFiles(input.files)
        input.value = ''
      }
    }

    const onDragOver = (event: DragEvent) => {
      if (props.disabled || props.readonly || !props.dragAndDrop) return
      event.preventDefault()
      isDragOver.value = true
    }

    const onDragLeave = () => {
      isDragOver.value = false
    }

    const onDrop = (event: DragEvent) => {
      event.preventDefault()
      isDragOver.value = false
      if (props.disabled || props.readonly || !props.dragAndDrop) return
      if (event.dataTransfer?.files) {
        addFiles(event.dataTransfer.files)
      }
    }

    const triggerFileSelect = () => {
      if (props.disabled || props.readonly) return
      inputRef.value?.click()
    }

    const removeFile = (fileId: string) => {
      if (props.disabled || props.readonly) return
      emit(
        'update:modelValue',
        (props.modelValue || []).filter(f => f.id !== fileId)
      )
      emit('file-removed', fileId)
    }

    const clearAll = () => {
      if (props.disabled || props.readonly) return
      emit('update:modelValue', [])
      emit('clear-all')
    }

    // --- computed ---

    const rootClasses = computed(() => {
      const classes = ['krds-file-upload', 'line']
      if (props.class) classes.push(props.class)
      return classes
    })

    // --- render helpers ---

    const renderFileHead = (): VNode =>
      h('div', { class: 'file-head' }, [h('h3', { class: 'tit' }, props.title), h('div', null, [h('p', null, props.description)])])

    const renderUploadArea = (): VNode =>
      h(
        'div',
        {
          class: 'file-upload',
          onDragover: onDragOver,
          onDragleave: onDragLeave,
          onDrop: onDrop
        },
        [
          h('p', { class: 'txt' }, props.placeholder),
          h('div', { class: 'file-upload-btn-wrap' }, [
            h('input', {
              ref: inputRef,
              type: 'file',
              name: props.name || 'myFile',
              id: inputId,
              hidden: true,
              accept: props.accept || undefined,
              multiple: props.multiple,
              onChange: onFileChange
            }),
            h('label', { for: inputId }, [
              h(
                'button',
                {
                  type: 'button',
                  class: ['krds-btn', props.size],
                  disabled: props.disabled || undefined,
                  onClick: triggerFileSelect
                },
                [h('i', { class: 'svg-icon ico-upload' }), '파일선택']
              )
            ])
          ])
        ]
      )

    const renderBtnWrap = (file: FileInfo): VNode[] => {
      const children: VNode[] = []

      if (file.status === 'uploading') {
        children.push(h('span', { class: 'krds-spinner', role: 'status' }, [h('span', { class: 'sr-only' }, '업로드 중')]))
      } else if (file.downloadUrl) {
        if (props.showDownload) {
          children.push(
            h(
              'button',
              {
                type: 'button',
                class: 'krds-btn medium text',
                onClick: () => emit('download', file)
              },
              ['다운로드 ', h('i', { class: 'svg-icon ico-down' })]
            )
          )
        }
        if (props.showPreviewButton) {
          children.push(
            h(
              'button',
              {
                type: 'button',
                class: 'krds-btn medium text',
                onClick: () => emit('preview', file)
              },
              ['바로보기 ', h('i', { class: 'svg-icon ico-angle right' })]
            )
          )
        }
      } else if (file.status === 'completed') {
        children.push(h('span', { class: 'ico-invalid complete' }, [h('em', { class: 'sr-only' }, '업로드 완료')]))
      } else if (!props.readonly) {
        children.push(
          h(
            'button',
            {
              type: 'button',
              class: 'krds-btn medium text',
              disabled: props.disabled || undefined,
              onClick: () => removeFile(file.id)
            },
            ['삭제 ', h('i', { class: 'svg-icon ico-delete-fill' })]
          )
        )
      }

      return children
    }

    const renderFileItem = (file: FileInfo): VNode => {
      const liChildren: VNode[] = [
        h(
          'div',
          {
            class: file.downloadUrl ? 'file-info m-column' : 'file-info'
          },
          [h('div', { class: 'file-name' }, formatFileName(file)), h('div', { class: 'btn-wrap' }, renderBtnWrap(file))]
        )
      ]

      if (file.status === 'error' && file.errorMessage) {
        const parts = file.errorMessage.split('\n')
        const hintContent: (string | VNode)[] = []
        parts.forEach((part, i) => {
          if (i > 0) hintContent.push(h('br'))
          hintContent.push(part)
        })
        liChildren.push(h('p', { class: 'file-hint-invalid' }, hintContent))
      }

      return h(
        'li',
        {
          key: file.id,
          class: file.status === 'error' ? 'is-error' : undefined
        },
        liChildren
      )
    }

    const renderFileList = (files: FileInfo[]): VNode => {
      const validCount = files.filter(f => f.status !== 'error').length
      const children: VNode[] = [
        h('div', { class: 'total' }, [h('span', { class: 'current' }, `${validCount}개`), ` / ${props.maxFiles}개`]),
        h('ul', { class: 'upload-list' }, files.map(renderFileItem))
      ]

      if (props.showClearAll && !props.readonly) {
        children.push(
          h('div', { class: 'upload-delete-btn' }, [
            h(
              'button',
              {
                type: 'button',
                class: 'krds-btn xsmall tertiary',
                disabled: props.disabled || undefined,
                onClick: clearAll
              },
              ['전체 파일 삭제', h('i', { class: 'svg-icon ico-angle right' })]
            )
          ])
        )
      }

      return h('div', { class: 'file-list' }, children)
    }

    // --- main render ---

    return () => {
      const children: VNode[] = [renderFileHead()]

      if (!props.readonly) {
        children.push(renderUploadArea())
      }

      const files = props.modelValue || []
      if (files.length > 0) {
        children.push(renderFileList(files))
      }

      return h(
        'div',
        {
          class: rootClasses.value,
          style: props.style || undefined
        },
        children
      )
    }
  }
})
