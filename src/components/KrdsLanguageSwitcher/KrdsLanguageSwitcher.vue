<template>
  <!-- language switcher -->
  <div
    ref="dropdownRef"
    class="krds-drop-wrap krds-language"
    :class="{
      active: isOpen,
      'drop-left': props.dropPosition === 'left',
      'drop-right': props.dropPosition === 'right'
    }"
    @focusout="handleFocusOut"
  >
    <button
      ref="buttonRef"
      type="button"
      class="krds-btn small text drop-btn"
      :class="{ active: isOpen }"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <i class="svg-icon ico-global"></i>
      <slot />
      <i class="svg-icon ico-toggle"></i>
    </button>
    <div class="drop-menu" :style="{ display: isOpen ? 'block' : 'none' }">
      <div class="drop-in">
        <div v-if="$slots['prev-item']" class="drop-top">
          <slot name="prev-item" />
        </div>
        <!-- 기본 타입 (언어 선택) -->
        <ul v-if="props.type === 'default'" class="drop-list">
          <li v-for="language in languageList" :key="language.code">
            <a
              href="#"
              class="item-link"
              :class="{ active: props.modelValue === language.code }"
              :lang="language.code"
              :aria-selected="props.modelValue === language.code"
              @click.prevent="selectLanguage(language.code)"
              @focus="handleItemFocus"
            >
              {{ language.name }}
              <span class="sr-only">{{ props.modelValue === language.code ? '선택됨' : '' }}</span>
            </a>
          </li>
        </ul>

        <!-- 외부 페이지 이동 타입 -->
        <ul v-else-if="props.type === 'external'" class="drop-list">
          <li v-for="language in languageList" :key="language.code">
            <a
              :href="language.url || '#'"
              class="item-link"
              :lang="language.code"
              target="_blank"
              title="새 창 열림"
              @focus="handleItemFocus"
            >
              {{ language.name }}
              <i class="svg-icon ico-go"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- //language switcher -->
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { BaseComponentProps } from '@/types'

  export type LanguageData = { code: string; name: string; url?: string }

  export type DropdownPosition = 'left' | 'center' | 'right'

  interface LanguageSwitcherProps extends BaseComponentProps {
    languageList: LanguageData[]
    modelValue?: string
    type?: 'default' | 'external'
    dropPosition?: DropdownPosition
  }

  const props = withDefaults(defineProps<LanguageSwitcherProps>(), {
    modelValue: '',
    type: 'default',
    dropPosition: 'center'
  })

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    close: []
  }>()

  const isOpen = ref(false)
  const dropdownRef = ref<HTMLElement>()
  const buttonRef = ref<HTMLElement>()

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value

    if (isOpen.value && dropdownRef.value) {
      positionDropdown()
    }
  }

  const closeDropdown = () => {
    isOpen.value = false
  }

  const selectLanguage = (languageCode: string) => {
    emit('update:modelValue', languageCode)
    closeDropdown()
    emit('close')
    buttonRef.value?.focus()
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

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped></style>
