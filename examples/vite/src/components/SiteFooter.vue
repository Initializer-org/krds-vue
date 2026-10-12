<template>
  <!-- 푸터 내용은 예시 값이다 (원본의 대표전화·이메일·운영기관·웹 접근성 인증 마크는 쓰지 않는다) -->
  <KrdsFooter>
    <template #logo>
      <span class="example-logo">KRDS Vue <span>예제 누리집</span></span>
    </template>

    <template #content>
      <div class="f-info">
        <ul class="info-cs">
          <li>
            <strong class="key-info">대표전화 <span>0000-0000 평일 09:00 ~ 18:00 주말·공휴일·점심시간 휴무</span></strong>
          </li>
          <li>
            <strong class="key-info"
              >대표이메일 <span><a href="mailto:help@example.go.kr">help@example.go.kr</a></span></strong
            >
          </li>
        </ul>
      </div>
      <div class="f-link">
        <div class="link-go">
          <a href="#/apply" class="krds-btn medium text">문의 및 건의 <i class="svg-icon ico-page-next"></i></a>
          <a
            href="https://github.com/Initializer-org/krds-vue"
            class="krds-btn medium text"
            target="_blank"
            rel="noopener"
            title="새 창 열림"
          >
            GitHub <i class="svg-icon ico-go"></i>
          </a>
          <a href="https://krds.initializer.org/" class="krds-btn medium text" target="_blank" rel="noopener" title="새 창 열림">
            KRDS Vue 문서 <i class="svg-icon ico-go"></i>
          </a>
        </div>
      </div>
    </template>

    <template #bottom>
      <div class="f-btm-text">
        <div class="f-menu">
          <a href="#" class="krds-btn small text">KRDS Vue 소개</a>
          <a href="#" class="krds-btn small text">이용 안내</a>
          <a href="#" class="krds-btn small text">저작권정책</a>
        </div>
        <p class="f-copy">© 2026 KRDS Vue. 화면 구성과 이미지는 공공누리 제1유형으로 개방된 KRDS 누리집 자료를 이용했습니다.</p>
      </div>
      <KrdsIdentifier>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsIdentifier>
    </template>
  </KrdsFooter>
</template>

<style>
  /* 운영기관 식별자의 기본 로고(KRDS 로고)는 숨기고 안내 문구만 둔다 */
  .krds-identifier .logo {
    display: none;
  }
</style>
