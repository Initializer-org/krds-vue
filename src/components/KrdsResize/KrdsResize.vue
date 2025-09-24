<template>
  <!-- resize -->
  <div ref="dropdownRef" class="krds-drop-wrap krds-resize" data-adjust="scale" @focusout="handleFocusOut">
    <button ref="buttonRef" type="button" class="krds-btn small text drop-btn" @click="toggleDropdown">
      화면크기
      <i class="svg-icon ico-toggle"></i>
    </button>
    <div class="drop-menu" :style="{ display: isOpen ? 'block' : 'none' }">
      <div class="drop-in">
        <ul class="drop-list">
          <li v-for="scale in scaleList" :key="scale.key">
            <button
              type="button"
              class="item-link"
              :class="[scale.key, scale.key === selectedSize ? 'active' : '']"
              :data-adjust-scale="scale.key"
              @click.prevent="selectSize(scale)"
              @focus="handleItemFocus"
            >
              {{ scale.label }}
            </button>
          </li>
        </ul>
        <div class="drop-bottom">
          <button type="button" class="krds-btn medium text" data-adjust-scale="md" @click.prevent="resetSize" @focus="handleItemFocus">
            <i class="svg-icon ico-reset"></i>
            초기화
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- //resize -->
</template>

<script setup lang="ts">
  import { onUnmounted, ref, watch } from 'vue'

  export interface KrdsResizeEmits {
    'update:modelValue': [value: string]
    close: []
  }

  interface ScaleProps {
    key: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg'
    label: string
    zoom: string
  }

  const emit = defineEmits<KrdsResizeEmits>()

  const isOpen = ref(false)
  const dropdownRef = ref<HTMLElement>()
  const buttonRef = ref<HTMLElement>()
  const selectedSize = ref('md')

  const scaleList: ScaleProps[] = [
    { key: 'sm', label: '작게', zoom: '0.9' },
    { key: 'md', label: '보통', zoom: '1' },
    { key: 'lg', label: '조금 크게', zoom: '1.1' },
    { key: 'xlg', label: '크게', zoom: '1.3' },
    { key: 'xxlg', label: '가장 크게', zoom: '1.5' }
  ]

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value

    if (isOpen.value && dropdownRef.value) {
      positionDropdown()
    }
  }

  const closeDropdown = () => {
    isOpen.value = false
  }

  const selectSize = (scale: ScaleProps) => {
    closeDropdown()
    emit('close')
    buttonRef.value?.focus()
    selectedSize.value = scale.key
    document.body.style.zoom = scale?.zoom
  }

  const resetSize = () => {
    const defaultScale = scaleList.find(scale => scale.key === 'md')
    if (defaultScale) {
      selectSize(defaultScale)
    }
  }

  const positionDropdown = () => {
    if (!dropdownRef.value) return

    const menu = dropdownRef.value.querySelector('.drop-menu') as HTMLElement
    if (!menu) return

    const menuRect = menu.getBoundingClientRect()
    const windowWidth = window.innerWidth

    dropdownRef.value.classList.remove('drop-left', 'drop-right')

    if (menuRect.left < 0) {
      dropdownRef.value.classList.add('drop-left')
    } else if (windowWidth < menuRect.left + menuRect.width) {
      dropdownRef.value.classList.add('drop-right')
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeDropdown()
      buttonRef.value?.focus()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (!dropdownRef.value?.contains(event.target as Node)) {
      closeDropdown()
    }
  }

  const handleFocusOut = (event: FocusEvent) => {
    if (!dropdownRef.value?.contains(event.relatedTarget as Node)) {
      closeDropdown()
    }
  }

  const handleItemFocus = (event: FocusEvent) => {
    if (!dropdownRef.value) return

    const items = dropdownRef.value.querySelectorAll('.drop-list .item-link') as NodeListOf<HTMLElement>
    items.forEach(item => {
      item.style.position = 'relative'
      item.style.zIndex = '0'
    })

    const currentItem = event.target as HTMLElement
    currentItem.style.zIndex = '1'
  }

  watch(isOpen, isDropdownOpen => {
    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeydown)
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleClickOutside)
    }
  })

  onUnmounted(() => {
    // 컴포넌트가 제거될 때 리스너가 남아있지 않도록 보장합니다.
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped></style>
