<template>
  <nav :id="id" class="krds-breadcrumb-wrap" :aria-label="ariaLabel">
    <ol class="breadcrumb">
      <li v-for="(item, index) in items" :key="`breadcrumb-${index}`" :class="{ home: index === 0 && showHomeIcon }">
        <a
          :href="item.href || '#'"
          class="txt"
          :aria-current="isCurrentPage(index) ? 'page' : undefined"
          @click="handleClick(item, $event)"
        >
          <span v-if="!(index === 0 && showHomeIcon)">{{ item.text }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  // ========================
  // 타입 정의
  // ========================

  /**
   * 브레드크럼 아이템 인터페이스
   */
  export interface BreadcrumbItem {
    /** 텍스트 */
    text: string
    /** 링크 URL */
    href?: string
    /** 클릭 핸들러 */
    onClick?: (event: MouseEvent) => void
  }

  /**
   * KRDS Breadcrumb 컴포넌트 속성
   */
  export interface KrdsBreadcrumbProps {
    /** 브레드크럼 아이템 배열 */
    items: BreadcrumbItem[]
    /** 엘리먼트 ID */
    id?: string
    /** 접근성 라벨 */
    ariaLabel?: string
    /** 홈 아이콘 표시 여부 */
    showHomeIcon?: boolean
  }

  /**
   * KRDS Breadcrumb 컴포넌트 이벤트
   */
  export interface KrdsBreadcrumbEmits {
    'item-click': [item: BreadcrumbItem, event: MouseEvent]
  }

  // ========================
  // Props & Emits
  // ========================

  const props = withDefaults(defineProps<KrdsBreadcrumbProps>(), {
    id: undefined,
    ariaLabel: '현재 경로',
    showHomeIcon: true
  })

  const emit = defineEmits<KrdsBreadcrumbEmits>()

  // ========================
  // Computed Properties
  // ========================

  /**
   * 현재 페이지 여부 확인
   */
  const isCurrentPage = computed(() => {
    return (index: number) => index === props.items.length - 1
  })

  // ========================
  // Event Handlers
  // ========================

  /**
   * 아이템 클릭 핸들러
   */
  const handleClick = (item: BreadcrumbItem, event: MouseEvent) => {
    // 커스텀 onClick 핸들러 실행
    if (item.onClick) {
      item.onClick(event)
    }

    // 상위로 이벤트 전달
    emit('item-click', item, event)
  }
</script>
