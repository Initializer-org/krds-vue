<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

  /**
   * 컴포넌트 문서의 "개요 / API 레퍼런스" 탭.
   * 두 패널을 모두 렌더해(검색엔진이 API 표까지 수집) 비활성 패널만 숨기고, 선택한 탭은 ?tab=api로 주소에 남긴다
   */
  const tabs = [
    { key: 'overview', label: '개요' },
    { key: 'api', label: 'API 레퍼런스' }
  ] as const
  type TabKey = (typeof tabs)[number]['key']

  const id = useId()
  const active = ref<TabKey>('overview')
  const tabRefs = ref<HTMLButtonElement[]>([])
  const overviewPanel = ref<HTMLElement>()

  const select = (key: TabKey, focus = false) => {
    active.value = key
    if (focus) nextTick(() => tabRefs.value[tabs.findIndex(tab => tab.key === key)]?.focus())
  }

  const onKeydown = (event: KeyboardEvent, index: number) => {
    const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    const target = offset ? (index + offset + tabs.length) % tabs.length : { Home: 0, End: tabs.length - 1 }[event.key]
    if (target === undefined) return
    event.preventDefault()
    select(tabs[target].key, true)
  }

  watch(active, key => {
    const url = new URL(location.href)
    if (key === 'api') url.searchParams.set('tab', 'api')
    else url.searchParams.delete('tab')
    history.replaceState(history.state, '', url)
    // 목차는 개요 패널의 제목만 가리키므로 API 탭에서는 숨긴다
    document.documentElement.toggleAttribute('data-doc-tab-api', key === 'api')
  })

  onMounted(() => {
    // 개요 패널 안의 제목으로 바로 들어온 경우(#heading)는 개요를 우선한다
    // VitePress 제목 id는 NFKD로 정규화되므로 직접 입력한 주소(NFC)도 찾을 수 있게 둘 다 확인
    const hash = decodeURIComponent(location.hash.slice(1))
    const hashTarget = hash && (document.getElementById(hash) ?? document.getElementById(hash.normalize('NFKD')))
    const wantsApi = new URLSearchParams(location.search).get('tab') === 'api'
    if (wantsApi && !(hashTarget && overviewPanel.value?.contains(hashTarget))) select('api')
  })
  onBeforeUnmount(() => document.documentElement.removeAttribute('data-doc-tab-api'))
</script>

<template>
  <div class="doc-tabs">
    <div class="doc-tabs-list" role="tablist" aria-label="문서 구분">
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-tab-${tab.key}`"
        :key="tab.key"
        ref="tabRefs"
        type="button"
        role="tab"
        class="doc-tabs-tab"
        :aria-selected="active === tab.key"
        :aria-controls="`${id}-panel-${tab.key}`"
        :tabindex="active === tab.key ? 0 : -1"
        @click="select(tab.key)"
        @keydown="onKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      :id="`${id}-panel-overview`"
      ref="overviewPanel"
      v-show="active === 'overview'"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-overview`"
    >
      <slot name="overview" />
    </div>
    <div v-show="active === 'api'" :id="`${id}-panel-api`" role="tabpanel" :aria-labelledby="`${id}-tab-api`">
      <slot name="api" />
    </div>
  </div>
</template>
