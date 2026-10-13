<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { KrdsTabBar } from '@krds.ui/vue'

  const current = ref('home')
  // 라우터를 쓴다면 selected는 현재 경로로 정하고, 링크 이동은 router-link나 router.push로 처리한다
  const go = (key: string) => (event: MouseEvent) => {
    event.preventDefault()
    current.value = key
  }

  const items = computed(() => [
    { text: '홈', icon: 'ico-bread-home', href: '#home', selected: current.value === 'home', onClick: go('home') },
    { text: '내정보', icon: 'ico-my', href: '#my', selected: current.value === 'my', onClick: go('my') },
    { text: '즐겨찾기', icon: 'ico-scrap', href: '#bookmark', selected: current.value === 'bookmark', onClick: go('bookmark') },
    { text: '전체', icon: 'ico-all', selected: current.value === 'all', onClick: () => (current.value = 'all') }
  ])
</script>

<template>
  <KrdsTabBar :items="items" />
</template>
