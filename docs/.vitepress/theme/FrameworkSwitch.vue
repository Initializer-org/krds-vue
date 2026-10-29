<script setup lang="ts">
  import { useRoute } from 'vitepress'
  import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

  /**
   * KRDS Vue · React · Angular 문서 전환. 보던 경로를 그대로 들고 상대 사이트로 간다.
   * 고르는 순간 이동하는 <select>는 키보드로 항목을 훑기만 해도 페이지가 바뀌므로(WCAG 3.2.2) 버튼 + 링크 목록으로 만든다.
   *
   * 상단 메뉴 첫 항목(config.ts nav)으로 넣어 화면 순서와 Tab 순서가 같고, 모든 페이지에서 같은 자리에 있다. VitePress가 넘기는 props에 따라
   * - 기본: 상단 메뉴의 드롭다운
   * - menu(메뉴가 넘쳐 ⋯ 패널로 접힘)·screenMenu(모바일 햄버거 화면): 링크 목록
   * - mobile(theme/index.ts의 nav-bar-content-before): 메뉴가 햄버거로 접히는 768px 미만에서만 상단에 보이는 드롭다운
   */
  const props = defineProps<{ current: 'vue' | 'react' | 'angular'; menu?: boolean; screenMenu?: boolean; mobile?: boolean }>()

  const frameworks = [
    { key: 'vue', text: 'Vue', url: 'https://krds.initializer.org' },
    { key: 'react', text: 'React', url: 'https://react.krds.initializer.org' },
    { key: 'angular', text: 'Angular', url: 'https://angular.krds.initializer.org' }
  ] as const

  const route = useRoute()
  const menuId = useId()
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
  <div v-if="menu || screenMenu" class="framework-switch-group" :class="{ screen: screenMenu }">
    <p class="framework-switch-title">프레임워크</p>
    <a
      v-for="framework in frameworks"
      :key="framework.key"
      class="framework-switch-link"
      :href="hrefOf(framework)"
      :aria-current="framework.key === current ? 'page' : undefined"
    >
      KRDS {{ framework.text }}
    </a>
  </div>
  <div v-else ref="root" class="framework-switch" :class="{ mobile }" @keydown="onKeydown" @focusout="onFocusout">
    <button ref="button" type="button" class="framework-switch-button" :aria-expanded="open" :aria-controls="menuId" @click="open = !open">
      <span class="sr-only">프레임워크 선택: </span>{{ currentText }}
      <span class="vpi-chevron-down framework-switch-icon" aria-hidden="true"></span>
    </button>
    <ul v-show="open" :id="menuId" class="framework-switch-menu">
      <li v-for="framework in frameworks" :key="framework.key">
        <a :href="hrefOf(framework)" :aria-current="framework.key === current ? 'page' : undefined">KRDS {{ framework.text }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  /* 상단 메뉴 줄 높이에 맞춰 세로 가운데 */
  .framework-switch {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--vp-nav-height);
    margin-right: 12px;
  }
  /* 상단 메뉴는 768px(48rem)부터 보이므로, 상단 고정 버튼은 그보다 좁을 때만 */
  .framework-switch.mobile {
    margin: 0 4px 0 0;
  }
  @media (min-width: 48rem) {
    .framework-switch.mobile {
      display: none;
    }
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
    top: calc(50% + 22px);
    right: 0;
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
  .framework-switch-menu a,
  .framework-switch-link {
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
  .framework-switch-menu a:hover,
  .framework-switch-link:hover {
    background: var(--vp-c-default-soft);
  }
  .framework-switch-menu a[aria-current='page'],
  .framework-switch-link[aria-current='page'] {
    color: var(--vp-c-brand-1);
  }
  .framework-switch-group {
    padding: 4px 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .framework-switch-title {
    padding: 0 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 700;
    color: var(--vp-c-text-2);
  }
  /* 햄버거 화면은 VitePress 화면 메뉴처럼 넓은 줄 */
  .framework-switch-group.screen .framework-switch-title,
  .framework-switch-group.screen .framework-switch-link {
    padding: 0;
    line-height: 48px;
  }
</style>
