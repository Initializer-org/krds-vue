<script setup lang="ts">
  import { useRoute } from 'vitepress'
  import { nextTick, onMounted, ref, watch } from 'vue'

  /**
   * 컴포넌트 문서의 "개요 / API 레퍼런스" 탭 목록.
   * 탭 패널은 마크다운 규칙(config.ts docTabs)이 '## API' 경계로 만든 일반 HTML(.doc-tab-panel)이고, 여기서는 탭 목록과 선택만 다룬다.
   * 두 패널을 모두 렌더해(검색엔진이 API 표까지 수집) 비활성 패널은 바깥 틀의 data-active로 숨기고(style.css), 선택한 탭은 ?tab=api로 주소에 남긴다
   */
  const tabs = [
    { key: 'overview', label: '개요' },
    { key: 'api', label: 'API 레퍼런스' }
  ] as const
  type TabKey = (typeof tabs)[number]['key']

  const route = useRoute()
  const active = ref<TabKey>('overview')
  const listRef = ref<HTMLElement>()
  const tabRefs = ref<HTMLButtonElement[]>([])

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

  /** 주소의 #제목 요소. VitePress 제목 id는 NFKD로 정규화되므로 직접 입력한 주소(NFC)도 찾을 수 있게 둘 다 확인 */
  const hashTarget = () => {
    const hash = decodeURIComponent(location.hash.slice(1))
    return hash ? (document.getElementById(hash) ?? document.getElementById(hash.normalize('NFKD'))) : null
  }
  const panelOf = (el: HTMLElement | null) => (el?.closest<HTMLElement>('.doc-tab-panel')?.dataset.tab as TabKey | undefined) ?? null

  watch(active, key => {
    listRef.value?.closest('.doc-tabs')?.setAttribute('data-active', key)
    const url = new URL(location.href)
    if (key === 'api') url.searchParams.set('tab', 'api')
    else url.searchParams.delete('tab')
    // 다른 탭의 제목을 가리키는 해시는 지운다 (새로고침하거나 같은 검색 결과를 다시 눌러도 탭이 어긋나지 않게)
    const target = hashTarget()
    if (target && panelOf(target) !== key) url.hash = ''
    // 브라우저 기본 해시 이동으로 생긴 기록은 state가 null이라 VitePress가 앞으로·뒤로 가기를 무시하므로 빈 객체로 둔다
    history.replaceState(history.state ?? {}, '', url)
    // VitePress 경로 정보도 맞춰 둬야 다음 같은 페이지 이동에서 바뀜을 알아챈다
    route.query = url.search
    route.hash = decodeURIComponent(url.hash)
  })

  /**
   * 주소의 #제목이 든 패널을 연다 (검색 결과·공유 링크가 API 제목을 가리키는 경우). 해시가 없으면 ?tab=api를 따른다.
   * 숨어 있던 패널의 제목이면 브라우저가 스크롤하지 못했으므로 패널을 연 뒤 직접 스크롤한다
   */
  const syncFromLocation = () => {
    const target = hashTarget()
    const panel = panelOf(target)
    const switched = panel && panel !== active.value
    select(panel ?? (new URLSearchParams(location.search).get('tab') === 'api' ? 'api' : 'overview'))
    if (switched) nextTick(() => target?.scrollIntoView())
  }

  onMounted(syncFromLocation)
  // VitePress는 같은 페이지 안 이동(해시·쿼리 변경, 뒤로·앞으로)에서 페이지를 다시 만들지 않고 이 값만 바꾼다
  watch(() => [route.query, route.hash], syncFromLocation)
</script>

<template>
  <div ref="listRef" class="doc-tabs-list" role="tablist" aria-label="문서 구분">
    <button
      v-for="(tab, index) in tabs"
      :id="`doc-tab-${tab.key}`"
      :key="tab.key"
      ref="tabRefs"
      type="button"
      role="tab"
      class="doc-tabs-tab"
      :aria-selected="active === tab.key"
      :aria-controls="`doc-panel-${tab.key}`"
      :tabindex="active === tab.key ? 0 : -1"
      @click="select(tab.key)"
      @keydown="onKeydown($event, index)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
