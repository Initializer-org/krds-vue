<script setup lang="ts">
  import { ref } from 'vue'
  import { KrdsButton, KrdsSnackbar, useSnackbar } from '@krds.ui/vue'

  // 실제 앱에서는 <KrdsSnackbar />를 App.vue에 한 번만 두고, 각 화면에서 useSnackbar()로 띄웁니다
  const snackbar = useSnackbar()
  const sent = ref(0)

  const send = () => {
    sent.value++
    snackbar.show({
      title: '전송 완료',
      message: `신청서를 ${sent.value}건 보냈습니다.`,
      action: '목록으로',
      onAction: () => alert('목록으로 이동')
    })
  }
  const fail = () =>
    snackbar.show({
      icon: 'ico-error-fill',
      title: '전송 실패',
      message: '네트워크 오류로 보내지 못했습니다.',
      action: '다시 시도',
      onAction: send
    })
</script>

<template>
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
    <KrdsButton variant="primary" @click="send">신청서 보내기</KrdsButton>
    <KrdsButton variant="secondary" @click="fail">실패 상황</KrdsButton>
    <KrdsSnackbar />
  </div>
</template>
