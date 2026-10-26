<script setup lang="ts">
  import { useRoute } from 'vitepress'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

  /**
   * 로고 옆 프레임워크 전환 (KRDS Vue ↔ KRDS React 문서). 보던 경로를 그대로 들고 상대 사이트로 간다.
   * 고르는 순간 이동하는 <select>는 키보드로 항목을 훑기만 해도 페이지가 바뀌므로(WCAG 3.2.2) 버튼 + 링크 목록으로 만든다
   */
  const props = defineProps<{ current: 'vue' | 'react' }>()

  const frameworks = [
    { key: 'vue', text: 'Vue', url: 'https://krds.initializer.org' },
    { key: 'react', text: 'React', url: 'https://react.krds.initializer.org' }
  ] as const

  const route = useRoute()
  const open = ref(false)
  const root = ref<HTMLElement>()
  const button = ref<HTMLButtonElement>()

  const currentText = computed(() => frameworks.find(framework => framework.key === props.current)!.text)
  /** cleanUrls 경로 그대로 (/components/button), 해시는 사이트마다 제목 id가 달라 버린다 */
  const hrefOf = (framework: (typeof frameworks)[number]) =>
    framework.key === props.current ? route.path : `${framework.url}${route.path.replace(/\.html$/, '')}`

  const close = (focusButton = false) => {
    open.value = false
    if (focusButton) button.value?.focus()
  }
  const onDocumentClick = (event: MouseEvent) => {
    if (open.value && !root.value?.contains(event.target as Node)) close()
  }
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open.value) close(true)
  }
  /** Tab으로 목록 밖으로 나가면 닫는다 */
  const onFocusout = (event: FocusEvent) => {
    if (!root.value?.contains(event.relatedTarget as Node | null)) close()
  }

  onMounted(() => document.addEventListener('click', onDocumentClick))
  onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
  watch(
    () => route.path,
    () => close()
  )
</script>

<template>
  <div ref="root" class="framework-switch" @keydown="onKeydown" @focusout="onFocusout">
    <button
      ref="button"
      type="button"
      class="framework-switch-button"
      :aria-expanded="open"
      aria-controls="framework-switch-menu"
      @click="open = !open"
    >
      <span class="sr-only">프레임워크 선택: </span>{{ currentText }}
      <span class="vpi-chevron-down framework-switch-icon" aria-hidden="true"></span>
    </button>
    <ul v-show="open" id="framework-switch-menu" class="framework-switch-menu">
      <li v-for="framework in frameworks" :key="framework.key">
        <a :href="hrefOf(framework)" :aria-current="framework.key === current ? 'page' : undefined"> KRDS {{ framework.text }} </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .framework-switch {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 12px;
  }
  .framework-switch-button {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    transition: border-color 0.25s;
  }
  .framework-switch-button:hover,
  .framework-switch-button[aria-expanded='true'] {
    border-color: var(--vp-c-brand-1);
  }
  .framework-switch-icon {
    width: 14px;
    height: 14px;
  }
  /* VitePress의 아래 화살표는 오른쪽 화살표를 90도 돌린 것이라, 위를 가리키려면 -90도 */
  .framework-switch-button[aria-expanded='true'] .framework-switch-icon {
    transform: rotate(-90deg);
  }
  .framework-switch-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 100;
    min-width: 160px;
    margin: 0;
    padding: 6px;
    list-style: none;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    background: var(--vp-c-bg-elv);
    box-shadow: var(--vp-shadow-3);
  }
  .framework-switch-menu a {
    display: block;
    padding: 0 12px;
    border-radius: 6px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    white-space: nowrap;
    transition: background-color 0.25s;
  }
  .framework-switch-menu a:hover {
    background: var(--vp-c-default-soft);
  }
  .framework-switch-menu a[aria-current='page'] {
    color: var(--vp-c-brand-1);
  }
</style>
