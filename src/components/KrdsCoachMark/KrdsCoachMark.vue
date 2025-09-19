<template>
  <!-- coach mark -->
  <div class="krds-coach-mark" :class="coachMarkClass" :style="style">
    <!-- 따라하기 말풍선 -->
    <div v-if="modelValue === activeStep && currentStepData" class="coach-balloon">
      <h5 class="sr-only">따라하기 가이드</h5>
      <h6 class="coach-tit">{{ activeStep }}단계 : {{ currentStepData.title }}</h6>
      <p class="desc">{{ currentStepData.description }}</p>
      <div class="coach-controls">
        <div class="num">
          <span class="sr-only">현재 단계</span>
          <strong>{{ activeStep }}</strong>
          <span class="sr-only">총 단계</span>
          <span>{{ stepsData.length }}</span>
        </div>
        <div class="btn-wrap">
          <button type="button" class="krds-btn small text" @click="closeCoachMark">그만보기</button>
          <button v-if="activeStep !== 1" type="button" class="krds-btn small text" @click="prevStep">이전으로</button>
          <button v-if="activeStep !== stepsData.length" type="button" class="krds-btn small tertiary" @click="nextStep">다음으로</button>
        </div>
      </div>
    </div>
    <!--// 따라하기 말풍선 -->

    <!-- 코치 마크 내용 -->
    <slot name="coach-mark-content" />
    <!-- //코치 마크 내용 -->
  </div>
  <!-- coach mark -->
</template>

<script setup lang="ts">
  import { BaseComponentProps } from '@/types'
  import { computed } from 'vue'

  type StepsData = { id: number; title: string; description: string }

  interface KrdsCoachMarkProps extends BaseComponentProps {
    coachMarkClass?: string | string[]
    stepsData: StepsData[]
    activeStep: number
    modelValue?: number | null
  }

  const props = withDefaults(defineProps<KrdsCoachMarkProps>(), {
    coachMarkClass: '',
    modelValue: null
  })

  const currentStepData = computed(() => {
    const index = props.activeStep - 1
    if (props.stepsData && index >= 0 && index < props.stepsData.length) {
      return props.stepsData[index]
    }
    return null
  })

  const emit = defineEmits<{
    'update:modelValue': [value: number | null]
    close: []
  }>()

  const prevStep = () => {
    if (props.activeStep > 1) {
      emit('update:modelValue', props.activeStep - 1)
    }
  }

  const nextStep = () => {
    if (props.activeStep < props.stepsData.length) {
      emit('update:modelValue', props.activeStep + 1)
    }
  }

  const closeCoachMark = () => {
    emit('close')
  }
</script>

<style scoped></style>
