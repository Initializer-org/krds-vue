<script setup lang="ts">
  import { KrdsSpinner } from '@krds.ui/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 2rem">
    <div class="form-group">
      <div class="form-tit">
        <label for="loading_example1">Label</label>
      </div>
      <div class="form-conts">
        <div class="form-spinner">
          <input id="loading_example1" type="text" class="krds-input" placeholder="placeholder" />
          <KrdsSpinner />
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-tit">
        <label for="loading_example2">검증 중</label>
      </div>
      <div class="form-conts">
        <div class="form-spinner">
          <input id="loading_example2" type="text" class="krds-input" value="입력된 값" placeholder="placeholder" />
          <KrdsSpinner />
        </div>
      </div>
    </div>
  </div>
</template>
