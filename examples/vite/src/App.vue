<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { KrdsFloatingButtonItem, KrdsResizeScale, MainMenuItem, SideNavItem } from '@krds.ui/vue'

  // 컴포넌트는 main.ts에서 플러그인으로 전역 등록했고, 템플릿 타입은 tsconfig의 @krds.ui/vue/global이 제공한다.
  // 구성은 KRDS 공식 누리집(https://www.krds.go.kr/html/site/index.html)의 기본 레이아웃을 따른다
  const language = ref('ko')
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English (영어)' }
  ]
  const size = ref<KrdsResizeScale>('md')
  const mobileMenuOpen = ref(false)

  const menu: MainMenuItem[] = [
    {
      text: '민원 안내',
      items: [
        { text: '민원 신청 방법', href: '#' },
        { text: '처리 기간', href: '#' }
      ]
    },
    {
      text: '민원 신청',
      items: [
        { text: '온라인 신청', href: '#' },
        { text: '신청 내역 조회', href: '#' }
      ]
    },
    { text: '알림', href: '#' }
  ]

  // 하위 페이지 왼쪽 사이드 메뉴 (v-model로 펼침 상태를 주고받음)
  const sideMenu = ref<SideNavItem[]>([
    {
      text: '민원 신청',
      expanded: true,
      subItems: [
        { text: '온라인 신청', href: '#' },
        { text: '신청 내역 조회', href: '#' }
      ]
    },
    {
      text: '민원 안내',
      subItems: [
        { text: '민원 신청 방법', href: '#' },
        { text: '처리 기간', href: '#' }
      ]
    }
  ])

  // 신청서: 신청하면 필수 항목을 검사하고, 통과하면 완료 모달을 띄운다 (예시라 실제로 전송하지 않음)
  const emptyForm = () => ({ name: '', phone: '', type: '', content: '', receive: 'online', agree: false })
  const form = ref(emptyForm())
  const types = [
    { value: 'certificate', label: '증명서 발급' },
    { value: 'report', label: '신고' },
    { value: 'proposal', label: '제안·건의' }
  ]
  const checked = ref(false)
  const errors = computed(() => ({
    name: checked.value && !form.value.name ? '이름을 입력해 주세요.' : '',
    type: checked.value && !form.value.type ? '신청 유형을 선택해 주세요.' : '',
    agree: checked.value && !form.value.agree ? '개인정보 수집·이용에 동의해 주세요.' : ''
  }))
  const submitted = ref(false)
  const submit = () => {
    checked.value = true
    if (!Object.values(errors.value).some(Boolean)) submitted.value = true
  }
  const reset = () => {
    form.value = emptyForm()
    checked.value = false
  }

  const faqs = [
    {
      id: 'faq-period',
      title: '처리 기간은 얼마나 걸리나요?',
      content: '신청 유형에 따라 다르며, 보통 접수일로부터 7일 이내에 처리됩니다.'
    },
    { id: 'faq-change', title: '신청 내용을 고칠 수 있나요?', content: '처리가 시작되기 전까지 신청 내역 조회에서 고칠 수 있습니다.' }
  ]
  const openFaq = ref<string>()

  const quickMenu: KrdsFloatingButtonItem[] = [
    { label: '자주 묻는 질문', icon: 'ico-faq' },
    { label: 'KRDS Vue 문서', icon: 'ico-go', href: 'https://krds.initializer.org/', external: true }
  ]
</script>

<template>
  <KrdsLayout>
    <KrdsSkipLink href="#container">본문 바로가기</KrdsSkipLink>
    <KrdsMasthead>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsMasthead>

    <KrdsHeader>
      <template #utility>
        <ul class="utility-list">
          <li>
            <KrdsLanguageSwitcher v-model="language" :language-list="languages">Language</KrdsLanguageSwitcher>
          </li>
          <li><KrdsResize v-model="size" /></li>
        </ul>
      </template>

      <template #branding>
        <h2 class="logo">
          <a href="/"><span class="sr-only">KRDS Vue 예제 누리집</span></a>
        </h2>
        <div class="header-actions">
          <button type="button" class="btn-navi sch">통합검색</button>
          <a href="#" class="btn-navi login">로그인</a>
          <button
            type="button"
            class="btn-navi all"
            aria-controls="mobile-nav"
            :aria-expanded="mobileMenuOpen"
            @click="mobileMenuOpen = true"
          >
            전체메뉴
          </button>
        </div>
      </template>

      <template #navigation>
        <KrdsMainMenu :items="menu" />
      </template>

      <template #mobileNavigation>
        <KrdsMainMenu v-model:open="mobileMenuOpen" variant="mobile" :items="menu" />
      </template>
    </KrdsHeader>

    <main id="container">
      <div class="inner in-between">
        <KrdsSideNavigation v-model="sideMenu" title="민원" aria-label="민원 메뉴" />

        <div class="contents example">
          <KrdsBreadcrumb :items="[{ text: '홈', href: '/' }, { text: '민원 신청', href: '#' }, { text: '온라인 신청' }]" />
          <h1 class="example-title">온라인 민원 신청</h1>
          <p>신청서를 작성하면 담당 부서에서 확인한 뒤 처리 결과를 알려 드립니다. 화면 크기: {{ size }}</p>

          <KrdsStepIndicator :model-value="0">
            <KrdsStep step="1단계" title="신청서 작성" />
            <KrdsStep step="2단계" title="서류 확인" />
            <KrdsStep step="3단계" title="처리 완료" />
          </KrdsStepIndicator>

          <form class="example-form" novalidate @submit.prevent="submit">
            <h2 class="example-section">신청서 작성</h2>

            <KrdsFormGroup>
              <KrdsFormLabel for="example-name">이름 (필수)</KrdsFormLabel>
              <KrdsInput id="example-name" v-model="form.name" placeholder="홍길동" :state="errors.name ? 'error' : 'default'" />
              <KrdsFormHint v-if="errors.name" type="error">{{ errors.name }}</KrdsFormHint>
            </KrdsFormGroup>

            <KrdsFormGroup>
              <KrdsFormLabel for="example-phone">연락처</KrdsFormLabel>
              <KrdsInput id="example-phone" v-model="form.phone" type="tel" placeholder="010-0000-0000" />
              <KrdsFormHint>처리 결과를 안내받을 번호를 입력해 주세요.</KrdsFormHint>
            </KrdsFormGroup>

            <KrdsFormGroup>
              <KrdsFormLabel for="example-type">신청 유형 (필수)</KrdsFormLabel>
              <KrdsSelect
                id="example-type"
                v-model="form.type"
                :options="types"
                placeholder="선택"
                :state="errors.type ? 'error' : 'default'"
              />
              <KrdsFormHint v-if="errors.type" type="error">{{ errors.type }}</KrdsFormHint>
            </KrdsFormGroup>

            <KrdsFormGroup>
              <KrdsFormLabel for="example-content">신청 내용</KrdsFormLabel>
              <KrdsTextarea
                id="example-content"
                v-model="form.content"
                placeholder="신청 내용을 입력해 주세요"
                :maxlength="500"
                show-count
              />
            </KrdsFormGroup>

            <fieldset>
              <legend class="example-legend">수령 방법</legend>
              <KrdsCheckArea>
                <KrdsRadio v-model="form.receive" value="online" name="example-receive">온라인</KrdsRadio>
                <KrdsRadio v-model="form.receive" value="post" name="example-receive">우편</KrdsRadio>
                <KrdsRadio v-model="form.receive" value="visit" name="example-receive">방문</KrdsRadio>
              </KrdsCheckArea>
            </fieldset>

            <div>
              <KrdsCheckbox v-model="form.agree">
                [필수] 개인정보 수집·이용에 동의합니다.
                <template #description>수집 항목: 이름, 연락처 · 보유 기간: 처리 완료 후 1년</template>
              </KrdsCheckbox>
              <KrdsFormHint v-if="errors.agree" type="error">{{ errors.agree }}</KrdsFormHint>
            </div>

            <div class="example-actions">
              <KrdsButton type="button" variant="secondary" size="large" @click="reset">다시 작성</KrdsButton>
              <KrdsButton type="submit" variant="primary" size="large">신청하기</KrdsButton>
            </div>
          </form>

          <section>
            <h2 class="example-section">자주 묻는 질문</h2>
            <KrdsAccordionGroup>
              <KrdsAccordionItem
                v-for="faq in faqs"
                :id="faq.id"
                :key="faq.id"
                :open-item="openFaq"
                :title="faq.title"
                :content="faq.content"
                @toggle="id => (openFaq = openFaq === id ? undefined : id)"
              />
            </KrdsAccordionGroup>
          </section>
        </div>
      </div>
    </main>

    <KrdsModal v-model="submitted" modal-id="example-done">
      <template #title>신청이 접수되었습니다</template>
      <p>{{ form.name }}님의 민원 신청이 접수되었습니다. (예시 화면이며 실제로 전송되지 않습니다.)</p>
      <template #footer>
        <KrdsButton size="medium" variant="primary" @click="submitted = false">확인</KrdsButton>
      </template>
    </KrdsModal>

    <!-- 푸터 내용은 예시 값이다 -->
    <KrdsFooter>
      <template #logo>
        <span class="sr-only">KRDS Vue 예제 누리집</span>
      </template>

      <template #content>
        <div class="f-info">
          <ul class="info-cs">
            <li><strong class="strong">대표전화 0000-0000</strong><span class="span">(평일 09:00 ~ 18:00)</span></li>
            <li><strong class="strong">대표이메일 help@example.go.kr</strong></li>
          </ul>
        </div>
        <div class="f-link">
          <div class="link-go">
            <a href="#" class="krds-btn medium text">문의 및 건의 <i class="svg-icon ico-angle right"></i></a>
            <a href="https://krds.initializer.org/" class="krds-btn medium text" target="_blank" rel="noopener" title="새 창 열림">
              KRDS Vue 문서 <i class="svg-icon ico-go"></i>
            </a>
          </div>
        </div>
      </template>

      <template #bottom>
        <div class="f-btm-text">
          <div class="f-menu">
            <a href="#" class="point">개인정보처리방침</a>
            <a href="#">이용약관</a>
            <a href="#">저작권정책</a>
          </div>
          <p class="f-copy">© 2026 KRDS Vue. All rights reserved.</p>
        </div>
        <KrdsIdentifier>이 누리집은 KRDS Vue 예제 누리집입니다.</KrdsIdentifier>
      </template>
    </KrdsFooter>

    <KrdsFloatingButton label="빠른 메뉴" :items="quickMenu" />
  </KrdsLayout>
</template>

<style>
  /* 예제 본문 간격 (KRDS 레이아웃 .in-between·.contents 안에서) */
  .example {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding-bottom: 8rem;
  }

  .example-title {
    margin-top: 1.6rem;
    font-size: 4rem;
    font-weight: 700;
  }

  .example-section {
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .example-form {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .example-legend {
    margin-bottom: 0.8rem;
    font-weight: 700;
  }

  .example-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
</style>
