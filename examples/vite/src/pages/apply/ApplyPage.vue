<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { SideNavItem } from '@krds.ui/vue'

  defineProps<{ size: string }>()

  // 하위 페이지 왼쪽 사이드 메뉴 (v-model로 펼침 상태를 주고받음). 메인 메뉴의 서비스 패턴·기본 패턴과 같은 구성
  const sideMenu = ref<SideNavItem[]>([
    {
      text: '서비스 패턴',
      expanded: true,
      subItems: [
        { text: '방문', href: '#' },
        { text: '검색', href: '#' },
        { text: '로그인', href: '#' },
        { text: '신청', href: '#/apply' },
        { text: '정책 정보 확인', href: '#' }
      ]
    },
    {
      text: '기본 패턴',
      subItems: [
        { text: '입력 폼', href: '#' },
        { text: '동의', href: '#' },
        { text: '확인', href: '#' }
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
</script>

<template>
  <div class="inner in-between">
    <KrdsSideNavigation v-model="sideMenu" title="패턴" aria-label="패턴 메뉴" />

    <div class="contents example">
      <KrdsBreadcrumb :items="[{ text: '홈', href: '#/' }, { text: '서비스 패턴', href: '#' }, { text: '신청' }]" />
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
          <KrdsTextarea id="example-content" v-model="form.content" placeholder="신청 내용을 입력해 주세요" :maxlength="500" show-count />
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

  <KrdsModal v-model="submitted" modal-id="example-done">
    <template #title>신청이 접수되었습니다</template>
    <p>{{ form.name }}님의 민원 신청이 접수되었습니다. (예시 화면이며 실제로 전송되지 않습니다.)</p>
    <template #footer>
      <KrdsButton size="medium" variant="primary" @click="submitted = false">확인</KrdsButton>
    </template>
  </KrdsModal>
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
