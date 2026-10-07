<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsSideNavigation, type SideNavItem } from '@krds.ui/vue'

  const menuItems = ref<SideNavItem[]>([
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
  ])
</script>

<template>
  <KrdsSideNavigation v-model="menuItems" title="1Depth-title" />
</template>
