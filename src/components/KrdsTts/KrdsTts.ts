import { defineComponent, ref, computed, h, onBeforeUnmount } from 'vue'
import type { BaseComponentProps } from '@/types'

/**
 * TTS 사이즈 타입
 */
export type TtsSize = 'xsmall' | 'small' | 'medium'

/**
 * TTS 아이콘 타입
 */
export type TtsIcon = 'volume' | 'play'

/**
 * KRDS TTS 컴포넌트 속성
 */
export interface KrdsTtsProps extends BaseComponentProps {
  /** 읽어줄 텍스트 */
  text: string
  /** 레이블 텍스트 (미지정 시 아이콘만 표시) */
  label?: string
  /** 버튼 크기 */
  size?: TtsSize
  /** 아이콘 타입 */
  icon?: TtsIcon
  /** 비활성화 여부 */
  disabled?: boolean
}

/**
 * KRDS TTS 컴포넌트 이벤트
 */
export interface KrdsTtsEmits {
  (e: 'play', text: string): void
  (e: 'pause'): void
  (e: 'end'): void
  (e: 'error', error: Error): void
}

export default defineComponent<KrdsTtsProps>({
  name: 'KrdsTts',
  props: {
    text: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    size: {
      type: String as () => TtsSize,
      default: 'medium'
    },
    icon: {
      type: String as () => TtsIcon,
      default: 'volume'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: undefined
    }
  },
  emits: ['play', 'pause', 'end', 'error'],
  setup(props, { emit }) {
    const isPlaying = ref(false)
    let utterance: SpeechSynthesisUtterance | null = null

    const stopSpeech = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      isPlaying.value = false
      utterance = null
    }

    const toggleTts = () => {
      if (props.disabled) return

      if (isPlaying.value) {
        stopSpeech()
        emit('pause')
        return
      }

      if (typeof window === 'undefined' || !window.speechSynthesis) {
        emit('error', new Error('SpeechSynthesis API is not supported'))
        return
      }

      // 기존 재생 중지
      window.speechSynthesis.cancel()

      utterance = new SpeechSynthesisUtterance(props.text)
      utterance.lang = 'ko-KR'

      utterance.onstart = () => {
        isPlaying.value = true
      }

      utterance.onend = () => {
        isPlaying.value = false
        utterance = null
        emit('end')
      }

      utterance.onerror = event => {
        isPlaying.value = false
        utterance = null
        if (event.error !== 'canceled') {
          emit('error', new Error(event.error))
        }
      }

      window.speechSynthesis.speak(utterance)
      emit('play', props.text)
    }

    const buttonClasses = computed(() => {
      const classes = ['krds-tts']

      if (props.size) {
        classes.push(props.size)
      }

      if (isPlaying.value) {
        classes.push('pause')
      } else if (props.icon === 'play') {
        classes.push('play')
      }

      if (props.class) {
        classes.push(props.class)
      }

      return classes
    })

    const currentIcon = computed(() => {
      if (isPlaying.value) return 'ico-stop'
      return props.icon === 'play' ? 'ico-play' : 'ico-volume'
    })

    onBeforeUnmount(() => {
      stopSpeech()
    })

    return () => {
      const children = [h('span', { class: 'krds-tts-icon', 'aria-hidden': 'true' }, [h('i', { class: `svg-icon ${currentIcon.value}` })])]

      if (props.label) {
        children.push(h('span', { class: 'krds-tts-text' }, props.label))
      }

      return h(
        'button',
        {
          type: 'button',
          class: buttonClasses.value,
          disabled: props.disabled || undefined,
          onClick: toggleTts
        },
        children
      )
    }
  }
})
