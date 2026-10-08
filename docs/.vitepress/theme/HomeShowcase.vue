<script setup lang="ts">
  import { computed, ref } from 'vue'
  import {
    KrdsBadge,
    KrdsButton,
    KrdsCheckArea,
    KrdsCheckbox,
    KrdsDateInput,
    KrdsFileUpload,
    KrdsFormGroup,
    KrdsFormLabel,
    KrdsIcon,
    KrdsInput,
    KrdsRadio,
    KrdsSelect,
    KrdsStep,
    KrdsStepIndicator,
    KrdsTag,
    KrdsTagGroup,
    KrdsToggleSwitch
  } from '@krds.ui/vue'
  import type { FileInfo } from '@krds.ui/vue'

  /** 홈 "컴포넌트 미리보기": 공공 서비스 화면을 KRDS Vue 컴포넌트로 조합한 예시 */

  const applicant = ref('')
  const purpose = ref('')
  const purposes = [
    { value: 'bank', label: '금융기관 제출용' },
    { value: 'office', label: '관공서 제출용' },
    { value: 'etc', label: '기타' }
  ]
  const receiveDate = ref('')

  const authMethod = ref('phone')

  const terms = ref({ privacy: false, identifier: false, notice: false })
  const allAgreed = computed({
    get: () => Object.values(terms.value).every(Boolean),
    set: (value: boolean) => (terms.value = { privacy: value, identifier: value, notice: value })
  })

  const notify = ref({ sms: true, email: false, night: false })

  const files = ref<FileInfo[]>([])

  const keyword = ref('')
  const popularKeywords = ['주민등록등본', '건강보험', '여권 발급', '전입신고']

  const requests = [
    { title: '주민등록표 등본 발급', date: '2026.10.02', status: '완료', color: 'success' },
    { title: '전입신고', date: '2026.10.05', status: '처리 중', color: 'information' },
    { title: '여권 재발급', date: '2026.10.07', status: '접수', color: 'gray' }
  ] as const
</script>

<template>
  <div class="showcase vp-raw">
    <div class="showcase-column">
      <section class="showcase-card" aria-labelledby="showcase-apply">
        <h3 id="showcase-apply">주민등록표 등본 발급</h3>
        <p class="showcase-desc">신청 정보를 입력해 주세요.</p>
        <div class="showcase-form">
          <KrdsFormGroup>
            <KrdsFormLabel for="showcase-name">신청인 이름</KrdsFormLabel>
            <KrdsInput id="showcase-name" v-model="applicant" placeholder="홍길동" />
          </KrdsFormGroup>
          <KrdsFormGroup>
            <KrdsFormLabel for="showcase-purpose">발급 용도</KrdsFormLabel>
            <KrdsSelect id="showcase-purpose" v-model="purpose" :options="purposes" placeholder="선택" />
          </KrdsFormGroup>
          <KrdsFormGroup>
            <KrdsFormLabel for="showcase-date">희망 수령일</KrdsFormLabel>
            <KrdsDateInput id="showcase-date" v-model="receiveDate" />
          </KrdsFormGroup>
          <KrdsButton variant="primary" size="large">신청하기</KrdsButton>
        </div>
        <p class="showcase-links">
          <a href="/components/input">텍스트 입력 필드</a> · <a href="/components/select">셀렉트</a> ·
          <a href="/components/date-input">날짜 입력 필드</a> · <a href="/components/button">버튼</a>
        </p>
      </section>

      <section class="showcase-card" aria-labelledby="showcase-terms">
        <h3 id="showcase-terms">약관 동의</h3>
        <p class="showcase-desc">서비스 이용을 위해 약관에 동의해 주세요.</p>
        <KrdsCheckArea column>
          <KrdsCheckbox v-model="allAgreed">전체 동의</KrdsCheckbox>
          <KrdsCheckbox v-model="terms.privacy">[필수] 개인정보 수집·이용 동의</KrdsCheckbox>
          <KrdsCheckbox v-model="terms.identifier">[필수] 고유식별정보 처리 동의</KrdsCheckbox>
          <KrdsCheckbox v-model="terms.notice">
            [선택] 처리 결과 알림 수신 동의
            <template #description>신청 처리 결과를 문자로 안내합니다.</template>
          </KrdsCheckbox>
        </KrdsCheckArea>
        <p class="showcase-links"><a href="/components/checkbox">체크박스</a></p>
      </section>

      <section class="showcase-card" aria-labelledby="showcase-search">
        <h3 id="showcase-search">통합 검색</h3>
        <KrdsFormGroup>
          <KrdsFormLabel for="showcase-keyword" class="sr-only">검색어</KrdsFormLabel>
          <KrdsInput id="showcase-keyword" v-model="keyword" placeholder="찾으시는 서비스를 입력하세요" icon>
            <KrdsButton type="button" size="medium" icon>
              <span class="sr-only">검색</span>
              <KrdsIcon name="ico-sch" />
            </KrdsButton>
          </KrdsInput>
        </KrdsFormGroup>
        <p class="showcase-subtitle">많이 찾는 서비스</p>
        <KrdsTagGroup size="small">
          <KrdsTag v-for="item in popularKeywords" :key="item" link href="#" @click.prevent="keyword = item">
            {{ item }}
          </KrdsTag>
        </KrdsTagGroup>
        <p class="showcase-links"><a href="/components/input">텍스트 입력 필드</a> · <a href="/components/tag">태그</a></p>
      </section>
    </div>

    <div class="showcase-column">
      <section class="showcase-card" aria-labelledby="showcase-progress">
        <div class="showcase-title-row">
          <h3 id="showcase-progress">신청 진행 상황</h3>
          <KrdsBadge type="bg-light" color="information" size="small">처리 중</KrdsBadge>
        </div>
        <p class="showcase-desc">전입신고 · 접수번호 2026-1005-0142</p>
        <KrdsStepIndicator :model-value="2">
          <KrdsStep step="1단계" title="신청" />
          <KrdsStep step="2단계" title="서류 검토" />
          <KrdsStep step="3단계" title="처리" />
          <KrdsStep step="4단계" title="완료" />
        </KrdsStepIndicator>
        <p class="showcase-links"><a href="/components/step-indicator">단계 표시기</a> · <a href="/components/badge">배지</a></p>
      </section>

      <section class="showcase-card" aria-labelledby="showcase-files">
        <h3 id="showcase-files">증빙 서류 첨부</h3>
        <KrdsFileUpload
          v-model="files"
          title="가족관계증명서"
          description="PDF, JPG, PNG · 10MB 이하"
          accept=".pdf,.jpg,.png"
          :max-file-size="10 * 1024 * 1024"
        />
        <p class="showcase-links"><a href="/components/file-upload">파일 업로드</a></p>
      </section>
    </div>

    <div class="showcase-column">
      <section class="showcase-card" aria-labelledby="showcase-auth">
        <h3 id="showcase-auth">본인 인증</h3>
        <p class="showcase-desc">본인 확인 방법을 선택해 주세요.</p>
        <KrdsCheckArea column>
          <KrdsRadio v-model="authMethod" value="phone" name="showcase-auth">
            휴대폰 인증
            <template #description>본인 명의 휴대폰으로 인증합니다.</template>
          </KrdsRadio>
          <KrdsRadio v-model="authMethod" value="certificate" name="showcase-auth">
            공동인증서
            <template #description>금융·공공기관 인증서로 인증합니다.</template>
          </KrdsRadio>
          <KrdsRadio v-model="authMethod" value="simple" name="showcase-auth">
            간편인증
            <template #description>민간 인증서 앱으로 인증합니다.</template>
          </KrdsRadio>
        </KrdsCheckArea>
        <div class="showcase-actions">
          <KrdsButton variant="secondary" size="medium">취소</KrdsButton>
          <KrdsButton variant="primary" size="medium">다음</KrdsButton>
        </div>
        <p class="showcase-links"><a href="/components/radio">라디오 버튼</a> · <a href="/components/button">버튼</a></p>
      </section>

      <section class="showcase-card" aria-labelledby="showcase-notify">
        <h3 id="showcase-notify">알림 설정</h3>
        <p class="showcase-desc">처리 결과를 받을 방법을 선택하세요.</p>
        <div class="showcase-toggles">
          <KrdsToggleSwitch v-model="notify.sms" label="문자 알림" />
          <KrdsToggleSwitch v-model="notify.email" label="이메일 알림" />
          <KrdsToggleSwitch v-model="notify.night" label="야간(21시~08시) 알림" />
        </div>
        <p class="showcase-links"><a href="/components/toggle-switch">토글 스위치</a></p>
      </section>

      <section class="showcase-card" aria-labelledby="showcase-requests">
        <h3 id="showcase-requests">나의 민원 처리 현황</h3>
        <ul class="showcase-requests">
          <li v-for="request in requests" :key="request.title">
            <div>
              <strong>{{ request.title }}</strong>
              <span>{{ request.date }} 신청</span>
            </div>
            <KrdsBadge type="bg-light" :color="request.color" size="small">{{ request.status }}</KrdsBadge>
          </li>
        </ul>
        <p class="showcase-links"><a href="/components/badge">배지</a></p>
      </section>
    </div>
  </div>
</template>
