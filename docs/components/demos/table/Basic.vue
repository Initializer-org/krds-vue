<script setup lang="ts">
  import { KrdsTable } from '@krds.ui/vue'

  const columns = [
    { name: 'title', label: '제목1', field: 'title', headerStyle: 'width: 30%' },
    { name: 'content', label: '제목2', field: 'content' }
  ]
  const rows = [
    {
      title: '제목1-1',
      content:
        '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.'
    },
    { title: '제목1-2', content: '내용이 들어갑니다.' },
    { title: '제목1-3', content: '내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다. 내용이 들어갑니다.' }
  ]
</script>

<template>
  <KrdsTable
    caption="000에 대한 표로 제목1,제목2에 대한 내용으로 구성되어 있으며 제목1은 제목1-1,제목1-2,제목1-3으로 구성되어있다."
    class="col data"
    :columns="columns"
    :rows="rows"
  />
</template>
