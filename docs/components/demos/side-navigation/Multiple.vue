<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsSideNavigation, type SideNavItem } from '@krds.ui/vue'

  const createItems = (): SideNavItem[] => [
    {
      text: '2Depth-menu',
      expanded: true,
      subItems: [
        {
          text: '3Depth-menu',
          expanded: false,
          popupTitle: '3Depth-title',
          subItems: [
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' }
          ]
        },
        { text: '3Depth-link', href: '#' },
        { text: '3Depth-link', href: '#' }
      ]
    },
    {
      text: '2Depth-menu',
      expanded: false,
      subItems: [
        {
          text: '3Depth-menu',
          expanded: false,
          popupTitle: '3Depth-title',
          subItems: [
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' }
          ]
        },
        { text: '3Depth-link', href: '#' },
        { text: '3Depth-link', href: '#' }
      ]
    },
    {
      text: '2Depth-menu',
      expanded: false,
      subItems: [
        {
          text: '3Depth-menu',
          expanded: false,
          popupTitle: '3Depth-title',
          subItems: [
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' },
            { text: '4Depth', href: '#' }
          ]
        },
        { text: '3Depth-link', href: '#' },
        { text: '3Depth-link', href: '#' }
      ]
    }
  ]

  const first = ref(createItems())
  const second = ref(createItems())
</script>

<template>
  <div style="display: flex; gap: 2rem">
    <KrdsSideNavigation v-model="first" title="1Depth-title" aria-label="첫 번째 사이드 메뉴" style="flex: 1" />
    <KrdsSideNavigation v-model="second" title="1Depth-title" aria-label="두 번째 사이드 메뉴" style="flex: 1" />
  </div>
</template>
