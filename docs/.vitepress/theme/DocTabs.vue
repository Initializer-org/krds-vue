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
  const apiPanel = ref<HTMLElement>()

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
  })

  /**
   * 주소의 #제목이 든 패널을 연다 (검색 결과·공유 링크가 API 제목을 가리키는 경우). 해시가 없으면 ?tab=api를 따른다.
   * VitePress 제목 id는 NFKD로 정규화되므로 직접 입력한 주소(NFC)도 찾을 수 있게 둘 다 확인
   */
  const syncFromLocation = () => {
    const hash = decodeURIComponent(location.hash.slice(1))
    const target = hash ? (document.getElementById(hash) ?? document.getElementById(hash.normalize('NFKD'))) : null
    const panel = target && apiPanel.value?.contains(target) ? 'api' : target && overviewPanel.value?.contains(target) ? 'overview' : null
    select(panel ?? (new URLSearchParams(location.search).get('tab') === 'api' ? 'api' : 'overview'))
    return panel === 'api' ? target : null
  }

  onMounted(() => {
    // 처음 열 때는 숨은 API 패널 안 제목으로 브라우저가 스크롤하지 못하므로, 패널을 연 뒤 직접 스크롤
    const apiTarget = syncFromLocation()
    if (apiTarget) nextTick(() => apiTarget.scrollIntoView())
    // 같은 페이지 안 이동은 VitePress가 hashchange 뒤에 스크롤하므로 패널만 바꾼다
    window.addEventListener('hashchange', syncFromLocation)
  })
  onBeforeUnmount(() => window.removeEventListener('hashchange', syncFromLocation))
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
    <div :id="`${id}-panel-api`" ref="apiPanel" v-show="active === 'api'" role="tabpanel" :aria-labelledby="`${id}-tab-api`">
      <slot name="api" />
    </div>
  </div>
</template>
