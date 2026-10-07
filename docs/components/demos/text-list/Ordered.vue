<script setup lang="ts">
  import { KrdsTextList } from '@krds.ui/vue'
</script>

<template>
  <KrdsTextList type="ol" variant="ordered">
    <li><span class="num">1. </span>텍스트 목록 레벨1</li>
    <li>
      <span class="num">2. </span>텍스트 목록 레벨1
      <KrdsTextList type="ol" variant="ordered">
        <li><span class="num">a. </span>텍스트 목록 레벨2</li>
        <li>
          <span class="num">b. </span>텍스트 목록 레벨2
          <KrdsTextList type="ol" variant="ordered">
            <li><span class="num">①</span>텍스트 목록 레벨3</li>
            <li><span class="num">②</span>텍스트 목록 레벨3</li>
          </KrdsTextList>
        </li>
        <li><span class="num">c. </span>텍스트 목록 레벨2</li>
      </KrdsTextList>
    </li>
    <li><span class="num">3. </span>텍스트 목록 레벨1</li>
  </KrdsTextList>
  <br />
  <KrdsTextList type="ul" variant="decimal">
    <li>
      텍스트 목록 레벨1
      <KrdsTextList type="ul" variant="dash">
        <li>
          텍스트 목록 레벨2
          <KrdsTextList type="ol" variant="ordered">
            <li><span class="num">①</span>텍스트 목록 레벨3</li>
            <li><span class="num">②</span>텍스트 목록 레벨3</li>
          </KrdsTextList>
        </li>
      </KrdsTextList>
    </li>
    <li>
      텍스트 목록 레벨1
      <KrdsTextList type="ol" variant="ordered">
        <li>
          <span class="num">a. </span>텍스트 목록 레벨2
          <KrdsTextList type="ul" variant="hollow">
            <li>텍스트 목록 레벨3</li>
            <li>텍스트 목록 레벨3</li>
          </KrdsTextList>
        </li>
      </KrdsTextList>
    </li>
  </KrdsTextList>
</template>
