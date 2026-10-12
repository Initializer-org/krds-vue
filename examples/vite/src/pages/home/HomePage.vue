<script setup lang="ts">
  import { ref } from 'vue'
  import type { KrdsTabItem } from '@krds.ui/vue'
  import designerImage from './images/img_main_start_designer.png'
  import developerImage from './images/img_main_start_developer.png'
  import governmentImage from './images/img_main_start_government.png'
  import './home.css'

  // KRDS 공식 누리집 홈(https://www.krds.go.kr/html/site/index.html)을 KRDS Vue 컴포넌트로 옮긴 화면.
  // 문구는 원본을 따르고, 적용 사례 기관처럼 실제 기관을 가리키는 값만 예시로 바꿨다. 링크는 예제라 대부분 #이다
  const startTabs: KrdsTabItem[] = [
    { id: 'designer', label: '디자이너' },
    { id: 'developer', label: '개발자' },
    { id: 'government', label: '정부 관계자' }
  ]
  const startTab = ref('designer')

  const startGuides = {
    designer: {
      image: designerImage,
      items: [
        {
          badge: '튜토리얼',
          title: '디자인 프로세스를 쉽게 배우세요',
          desc: '단계별로 디자인 원칙을 익힐 수 있도록 안내합니다. 실제 사례를 통해 실용적인 노하우를 쌓아보세요.'
        },
        {
          badge: '리소스',
          title: '다양한 자료를 활용하세요',
          desc: '디자인에 필요한 다양한 자료와 도구를 제공합니다. 템플릿, 아이콘, 색상 팔레트 등, 프로젝트에 필요한 모든 자료를 손쉽게 찾고 활용할 수 있습니다.'
        },
        {
          badge: '디자인 토큰',
          title: '일관성 있는 디자인을 위한 필수 요소',
          desc: '디자인의 기본 요소를 코드로 정의하여 일관성을 유지할 수 있도록 돕습니다. 디자인 언어를 통일하고, 효율적인 스타일 가이드를 구축하세요.'
        }
      ]
    },
    developer: {
      image: developerImage,
      items: [
        {
          badge: '튜토리얼',
          title: '코드로 디자인을 구현하는 방법 배우기',
          desc: '디자인 원칙을 코드로 구현할 수 있도록 단계별로 안내합니다. 실습 중심의 자료를 통해 필요한 기술을 익히고, 프로젝트에 바로 적용해 보세요.'
        },
        {
          badge: '리소스',
          title: '다양한 자료를 활용하세요',
          desc: 'API 문서, 코드 샘플, 라이브러리와 같은 유용한 자료를 제공합니다. 효율적인 개발을 위해 필요한 모든 도구를 한 곳에서 찾아보세요.'
        }
      ]
    },
    government: {
      image: governmentImage,
      items: [
        {
          badge: '튜토리얼',
          title: '효율적인 활용 방법 배우기',
          desc: '시스템을 효과적으로 관리하고 최적화할 수 있도록 단계별로 안내합니다. 콘텐츠를 통해 운영 과정에서의 핵심 기술을 익혀보세요.'
        },
        {
          badge: '리소스',
          title: '필요한 자료를 제공받으세요',
          desc: '가이드 적용을 위한 체크리스트를 제공합니다. 자료를 통해 보다 체계적이고 효과적인 운영을 지원받으세요.'
        }
      ]
    }
  }

  const compositions = [
    { title: '디자인 원칙', desc: '디지털 정부서비스 UI/UX의 방향성과 설계 기준이 되는 상위 원칙' },
    { title: '디지털 포용', desc: '모든 국민이 동일한 서비스를 경험할 수 있도록 디지털 소외 계층을 위한 가이드를 제공' },
    { title: '스타일', desc: '컴포넌트, 기본 패턴을 시각적으로 일관성 있게 표현하기 위한 규칙' },
    { title: '컴포넌트', desc: '사용자 인터페이스의 가장 작은 단위로 일관성 있게 사용되는 공통 요소에 대한 가이드' },
    { title: '기본 패턴', desc: '핵심 과업을 수행하는데 반복적으로 사용되는 사용자 인터페이스 집합에 대한 가이드' },
    { title: '서비스 패턴', desc: '핵심 과업에 대한 사용자 여정 기반의 사용자 경험 설계 가이드' }
  ]

  // 원본은 실제 기관의 적용 사례라 예시 기관과 자리 표시 이미지로 바꿨다
  const cases = [
    { badge: '아이덴티티', title: '가나다부 디지털 정부서비스 UI/UX 가이드라인 적용 사례' },
    { badge: '서비스 패턴', title: '라마바시 청년정책 누리집 UI/UX 가이드라인 적용 사례' }
  ]
</script>

<template>
  <h1 class="sr-only">KRDS Vue 예제 누리집 홈</h1>
  <div class="contents main">
    <section class="visual-area">
      <div class="inner">
        <div class="banner">
          <h2 class="tit">모두를 위한 디지털 서비스 경험</h2>
          <p class="desc">국민 누구나 디지털 정부서비스 경험을<br />쉽게 누릴 수 있는 기준을 만들어갑니다.</p>
          <div class="btn-wrap">
            <a href="#" class="krds-btn xlarge primary">시작하기</a>
          </div>
        </div>
      </div>
    </section>

    <section class="start-area">
      <div class="inner">
        <h2 class="sec-tit">시작하기</h2>
        <p class="sec-desc">
          디자인 시스템 구축을 위한 모든 자료가 준비되어 있어요. 지금 바로 최신 정보를 확인하고, 프로젝트를 시작해 보세요.
        </p>
        <div class="g-conts-area">
          <KrdsTabs v-model="startTab" :tabs="startTabs">
            <template v-for="(guide, id) in startGuides" :key="id" #[id]>
              <div class="info-box" :class="id">
                <ul class="box-list">
                  <li v-for="item in guide.items" :key="item.title">
                    <a href="#">
                      <p class="tit">
                        <KrdsBadge type="outline" color="primary">{{ item.badge }}</KrdsBadge>
                        <strong
                          ><span>{{ item.title }}</span></strong
                        >
                      </p>
                      <p class="desc">{{ item.desc }}</p>
                    </a>
                  </li>
                </ul>
                <div class="img"><img :src="guide.image" alt="" /></div>
              </div>
            </template>
          </KrdsTabs>
        </div>
      </div>
    </section>

    <section class="composition-area">
      <div class="inner">
        <h2 class="sec-tit">주요 구성</h2>
        <p class="sec-desc">디자인 시스템의 뼈대를 이루는 구성 요소에 대해 알아볼까요?</p>
        <ul class="info-box">
          <li v-for="item in compositions" :key="item.title">
            <a href="#">
              <div class="txt">
                <p class="tit link">{{ item.title }}</p>
                <p class="desc">{{ item.desc }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="sample-area -design-case">
      <div class="inner">
        <h2 class="sec-tit">디자인 적용 사례</h2>
        <p class="sec-desc">실제로 디자인 시스템이 어떻게 적용되고 있는지 살펴보세요. 다양한 사례를 통해 확인하실 수 있어요.</p>
        <ul class="info-box">
          <li v-for="item in cases" :key="item.title">
            <a href="#">
              <div class="img"><span class="example-case-thumb" aria-hidden="true">예시 화면</span></div>
              <div class="txt">
                <KrdsBadge type="bg-light" color="primary">{{ item.badge }}</KrdsBadge>
                <p class="tit">{{ item.title }}</p>
                <span class="krds-btn small text">자세히 보기 <i class="svg-icon ico-angle right"></i></span>
              </div>
            </a>
          </li>
        </ul>
        <div class="btn-more">
          <a href="#" class="krds-btn medium text">
            <span class="sr-only">디자인 적용 사례</span>
            <span class="underline">더보기</span>
            <i class="svg-icon ico-angle right"></i>
          </a>
        </div>
      </div>
    </section>

    <section class="banner-area">
      <div class="inner">
        <h2 class="tit">여러분의 소중한 의견을 기다립니다</h2>
        <p class="desc">
          더 나은 서비스를 위해 여러분의 목소리를 들려주세요.<br />더 나은 서비스 제공과 사용자 중심의 정책 수립에 대해 기여할 수 있습니다.
        </p>
        <div class="btn-wrap">
          <a href="#/apply" class="krds-btn medium tertiary">지금 참여하기</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  /* 적용 사례 썸네일 자리 표시 (원본은 실제 기관 화면 캡처) */
  .example-case-thumb {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background-color: var(--krds-light-color-surface-secondary-subtler);
    color: var(--krds-light-color-text-subtle);
    font-size: 1.5rem;
  }
</style>
