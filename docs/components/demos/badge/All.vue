<script setup lang="ts">
  import { KrdsBadge } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
      <KrdsBadge type="outline" color="primary" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="secondary" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="gray" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="point" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="danger" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="warning" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="success" size="large">label</KrdsBadge>
      <KrdsBadge type="outline" color="information" size="large">label</KrdsBadge>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
      <KrdsBadge type="bg" color="primary" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="secondary" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="gray" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="point" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="danger" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="warning" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="success" size="medium">label</KrdsBadge>
      <KrdsBadge type="bg" color="information" size="medium">label</KrdsBadge>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
      <KrdsBadge type="bg-light" color="primary" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="secondary" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="gray" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="point" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="danger" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="warning" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="success" size="small">label</KrdsBadge>
      <KrdsBadge type="bg-light" color="information" size="small">label</KrdsBadge>
    </div>
  </div>
</template>
