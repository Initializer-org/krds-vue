<script setup lang="ts">
  import { KrdsBadge, KrdsButton, KrdsIcon, KrdsStructuredList } from '@krds.ui/vue'
</script>

<template>
  <KrdsStructuredList>
    <template #cardTop>
      <KrdsBadge type="bg-light" color="primary">뱃지</KrdsBadge>
    </template>
    <template #cardBody>
      <a href="#" class="c-text">
        <p class="c-tit"><span class="span">타이틀 영역</span></p>
        <p class="c-txt">
          간단한 설명이 들어가는 영역입니다. 최대 3줄까지 작성합니다. 간단한 설명이 들어가는 영역입니다. 간단한 설명이 들어가는 영역입니다.
        </p>
        <p class="c-date">
          <strong class="key">신청 기간</strong>
          <span class="value">2023.00.00-2024.00.00</span>
        </p>
      </a>
      <div class="c-btn">
        <KrdsButton variant="secondary" size="medium">신청하기</KrdsButton>
      </div>
    </template>
    <template #cardBtm>
      <span class="tag">태그</span>
      <span class="tag">태그</span>
    </template>
    <template #cardBtn>
      <KrdsButton variant="tertiary" size="medium" class="text"> <KrdsIcon name="ico-share" /> 공유하기 </KrdsButton>
      <KrdsButton variant="tertiary" size="medium" class="text"> <KrdsIcon name="ico-like" /> 찜하기 </KrdsButton>
    </template>
  </KrdsStructuredList>
</template>
