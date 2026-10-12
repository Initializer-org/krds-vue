<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { KrdsButton, KrdsCheckArea, KrdsCheckbox, KrdsPagination, KrdsSelect, KrdsTable } from '@krds.ui/vue'

  const items = [
    {
      id: 1,
      type: '공지',
      title: '2026년 하반기 민원 서비스 개편 안내',
      summary: '민원 신청 화면이 새 디자인 시스템으로 바뀝니다.',
      date: '2026.10.02',
      views: 812
    },
    {
      id: 2,
      type: '보도자료',
      title: '디지털 정부 서비스 만족도 조사 결과',
      summary: '전년 대비 만족도가 4.2점 올랐습니다.',
      date: '2026.09.28',
      views: 1540
    },
    {
      id: 3,
      type: '고시',
      title: '전자문서 보존 기간 기준 개정 고시',
      summary: '보존 기간 산정 기준이 일부 바뀝니다.',
      date: '2026.09.15',
      views: 402
    },
    {
      id: 4,
      type: '공지',
      title: '추석 연휴 고객센터 운영 시간 안내',
      summary: '연휴 기간 전화 상담은 오전에만 운영합니다.',
      date: '2026.09.10',
      views: 2210
    },
    {
      id: 5,
      type: '보도자료',
      title: '공공 누리집 접근성 점검 결과 발표',
      summary: '점검 대상 누리집의 91%가 기준을 충족했습니다.',
      date: '2026.08.30',
      views: 967
    },
    {
      id: 6,
      type: '공지',
      title: '본인 인증 수단 추가 안내',
      summary: '간편 인증으로 민원을 신청할 수 있습니다.',
      date: '2026.08.21',
      views: 1325
    },
    {
      id: 7,
      type: '고시',
      title: '행정정보 공동이용 대상 정보 고시',
      summary: '공동이용 대상 정보 3종이 추가됩니다.',
      date: '2026.08.12',
      views: 288
    }
  ]

  const columns = [
    { name: 'select', label: '선택', headerStyle: 'width: 6%' },
    { name: 'type', label: '유형', field: 'type', headerStyle: 'width: 10%' },
    { name: 'title', label: '제목', field: 'title', headerStyle: 'width: 28%' },
    { name: 'summary', label: '내용', field: 'summary' },
    { name: 'download', label: '다운로드', headerStyle: 'width: 12%' },
    { name: 'date', label: '게시일', field: 'date', headerStyle: 'width: 12%' }
  ]
  const sortOptions = [
    { value: 'relevance', label: '관련도순' },
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' }
  ]
  const sizeOptions = [
    { value: 5, label: '5개' },
    { value: 10, label: '10개' }
  ]

  const sort = ref('relevance')
  const size = ref(5)
  const page = ref(1)
  const selected = ref<unknown[]>([])

  const sorted = computed(() => {
    if (sort.value === 'latest') return [...items].sort((a, b) => b.date.localeCompare(a.date))
    if (sort.value === 'popular') return [...items].sort((a, b) => b.views - a.views)
    return items
  })
  const maxPage = computed(() => Math.ceil(items.length / size.value))
  const rows = computed(() => sorted.value.slice((page.value - 1) * size.value, page.value * size.value))
  // 정렬·표시 개수를 바꾸면 첫 페이지로
  watch([sort, size], () => (page.value = 1))

  // 전체선택은 지금 페이지의 행 기준
  const allChecked = computed(() => rows.value.every(row => selected.value.includes(row.id)))
  const toggleAll = (checked: boolean) => {
    const ids: unknown[] = rows.value.map(row => row.id)
    selected.value = checked ? [...new Set([...selected.value, ...ids])] : selected.value.filter(id => !ids.includes(id))
  }
  const toggleRow = (id: unknown, checked: boolean) => {
    selected.value = checked ? [...selected.value, id] : selected.value.filter(item => item !== id)
  }
</script>

<template>
  <div class="krds-structured-list-table">
    <div class="search-list-top">
      <div class="sch-left">
        <KrdsCheckArea>
          <KrdsCheckbox id="list-chk-all" :model-value="allChecked" @update:model-value="toggleAll">전체선택</KrdsCheckbox>
        </KrdsCheckArea>
        <ul class="side-line-ul">
          <li>
            <KrdsButton text size="medium" :disabled="!selected.length"><i class="svg-icon ico-down"></i> 선택 다운로드</KrdsButton>
          </li>
          <li>
            <KrdsButton text size="medium"><i class="svg-icon ico-down"></i> 전체 다운로드</KrdsButton>
          </li>
        </ul>
      </div>
      <ul class="sch-sort">
        <li>
          <strong class="sort-label"><label for="list-size">목록 표시 개수</label></strong>
          <KrdsSelect id="list-size" v-model="size" sort :options="sizeOptions" />
        </li>
        <li>
          <strong class="sort-label"><label for="list-sort">정렬기준</label></strong>
          <!-- PC는 버튼, 모바일은 셀렉트로 정렬 기준을 고른다 -->
          <div class="w-sort-btn" role="group" aria-label="정렬기준">
            <button
              v-for="option in sortOptions"
              :key="option.value"
              type="button"
              :class="{ active: sort === option.value }"
              :aria-pressed="sort === option.value"
              @click="sort = option.value"
            >
              {{ option.label }}
            </button>
          </div>
          <div class="m-sort-btn">
            <KrdsSelect id="list-sort" v-model="sort" sort :options="sortOptions" />
          </div>
        </li>
      </ul>
    </div>

    <KrdsTable caption="게시물 목록: 선택, 유형, 제목, 내용, 다운로드, 게시일로 구성" class="col data" :columns="columns" :rows="rows">
      <template #cell-select="{ row }">
        <KrdsCheckbox
          :id="`list-chk-${row.id}`"
          :model-value="selected.includes(row.id)"
          @update:model-value="checked => toggleRow(row.id, checked)"
        >
          <span class="sr-only">{{ row.title }} 선택</span>
        </KrdsCheckbox>
      </template>
      <template #header-download><span class="sr-only">다운로드</span></template>
      <template #cell-download="{ row }">
        <KrdsButton text size="medium"
          ><i class="svg-icon ico-down"></i> 다운로드<span class="sr-only">: {{ row.title }}</span></KrdsButton
        >
      </template>
    </KrdsTable>

    <KrdsPagination v-model="page" :max="maxPage" aria-label="게시물 목록 페이지" />
  </div>
</template>
