<script setup lang="ts">
  import { withBase } from 'vitepress'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

  /**
   * 고정 위치·창 스크롤에 의존하는 예제를 별도 페이지(docs/frame, layout: false)로 띄운다.
   * width를 주면 그 폭의 화면으로 렌더한 뒤 문서 폭에 맞게 축소한다 (본문 폭에서는 모바일 레이아웃이 되는 예제용)
   */
  const props = withDefaults(defineProps<{ src: string; title: string; height?: number; width?: number }>(), { height: 480 })

  const box = ref<HTMLElement>()
  const boxWidth = ref(0)
  let observer: ResizeObserver | undefined

  onMounted(() => {
    observer = new ResizeObserver(([entry]) => (boxWidth.value = entry.contentRect.width))
    observer.observe(box.value!)
  })
  onBeforeUnmount(() => observer?.disconnect())

  const frameWidth = computed(() => (props.width && boxWidth.value ? Math.max(props.width, boxWidth.value) : 0))
  const scale = computed(() => (frameWidth.value ? boxWidth.value / frameWidth.value : 1))
  const frameStyle = computed(() =>
    frameWidth.value
      ? { width: `${frameWidth.value}px`, height: `${props.height / scale.value}px`, transform: `scale(${scale.value})` }
      : { width: '100%', height: `${props.height}px` }
  )
</script>

<template>
  <div class="demo-frame">
    <div ref="box" class="demo-frame-box" :style="{ height: `${height}px` }">
      <iframe :src="withBase(src)" :title="title" :style="frameStyle" loading="lazy"></iframe>
    </div>
    <a :href="withBase(src)" target="_blank" rel="noreferrer">새 창에서 보기</a>
  </div>
</template>
