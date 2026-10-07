<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsHeader, KrdsMainMenu, type MainMenuItem } from '@krds.ui/vue'

  const menuItems: MainMenuItem[] = [
    {
      text: '1Depth',
      subItems: [
        {
          text: '2Depth-menu',
          items: [
            { text: '3Depth-menu', href: '#' },
            { text: '3Depth-menu', href: '#' }
          ]
        },
        {
          text: '2Depth-menu',
          items: [
            { text: '3Depth-menu', href: '#' },
            { text: '3Depth-menu', href: '#' }
          ]
        }
      ]
    },
    {
      text: '1Depth',
      subItems: [
        {
          text: '2Depth-menu',
          items: [
            { text: '3Depth-menu', href: '#' },
            { text: '3Depth-menu', href: '#' }
          ]
        }
      ]
    },
    { text: '링크(anchor)', href: '#' }
  ]

  const mobileOpen = ref(false)
</script>

<template>
  <KrdsHeader>
    <template #utility>
      <ul class="utility-list">
        <li>
          <a href="#" class="krds-btn small text" target="_blank" title="새 창 열기"> 메뉴명 <i class="svg-icon ico-go"></i> </a>
        </li>
        <li>
          <div class="krds-drop-wrap">
            <button type="button" class="krds-btn small text drop-btn">메뉴명 <i class="svg-icon ico-toggle"></i></button>
            <div class="drop-menu">
              <div class="drop-in">
                <ul class="drop-list">
                  <li><a href="#" class="item-link">메뉴명</a></li>
                  <li><a href="#" class="item-link">메뉴명</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template #branding>
      <h2 class="logo">
        <a href="#">
          <span class="sr-only">KRDS - Korea Design System</span>
        </a>
      </h2>
      <div class="header-actions">
        <button type="button" class="btn-navi sch" title="통합검색 레이어">통합검색</button>
        <a href="#" class="btn-navi login">로그인</a>
        <button type="button" class="btn-navi join">회원가입</button>
        <button
          type="button"
          class="btn-navi all"
          aria-controls="mobile-nav"
          :aria-expanded="String(mobileOpen)"
          @click="mobileOpen = true"
        >
          전체메뉴
        </button>
      </div>
    </template>

    <template #navigation>
      <KrdsMainMenu :items="menuItems" />
    </template>

    <template #mobileNavigation>
      <KrdsMainMenu v-model:open="mobileOpen" variant="mobile" :items="menuItems" />
    </template>
  </KrdsHeader>
</template>
