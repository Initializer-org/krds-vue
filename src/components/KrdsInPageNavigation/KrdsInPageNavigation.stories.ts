import type { Meta, StoryObj } from '@storybook/vue3'
import KrdsInPageNavigation from './KrdsInPageNavigation'
import type { NavigationItem } from './KrdsInPageNavigation'

const meta: Meta<typeof KrdsInPageNavigation> = {
  title: 'Components/Navigation/InPageNavigation',
  component: KrdsInPageNavigation,
  parameters: {
    docs: {
      description: {
        component: `
        콘텐츠 내 탐색은 사용자가 본문의 구조를 훑어보고 원하는 콘텐츠로 빠르게 이동할 수 있도록 하는 탐색 수단입니다. 
        화면을 스크롤 할 때 특정 위치에 고정되어 콘텐츠의 목차 역할을 하는 동시에 사용자가 페이지 내 탐색에서 특정 항목을 클릭하면 연결된 섹션으로 스크롤 됩니다.
        
        window event를 통해 active를 활성화하는데 스토리북에서는 이슈가 있음
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: '네비게이션 제목'
    },
    caption: {
      control: 'text',
      description: '네비게이션 캐션'
    },
    items: {
      control: 'object',
      description: '네비게이션 아이템 목록'
    },
    autoActive: {
      control: 'boolean',
      description: '스크롤에 따른 자동 활성화 여부'
    }
  }
}

export default meta
type Story = StoryObj<typeof KrdsInPageNavigation>

// 기본 네비게이션 아이템
const defaultItems: NavigationItem[] = [
  { href: '#section_01', text: '서비스 개요' },
  { href: '#section_02', text: '서비스 상세' },
  { href: '#section_03', text: '신청 방법 및 절차' },
  { href: '#section_04', text: '제출 서류' },
  { href: '#section_05', text: '함께 신청할 수 있는 서비스' },
  { href: '#section_06', text: '부가정보' },
  { href: '#section_07', text: '정보 변경 내역' }
]

export const Default: Story = {
  args: {
    title: '장애아동수당',
    caption: '이 페이지의 구성',
    items: defaultItems
  },
  render: args => ({
    components: { KrdsInPageNavigation },
    setup() {
      const handleActionClick = () => {
        alert('온라인 신청 페이지로 이동')
      }
      return { args, handleActionClick }
    },
    template: `
      <div style="height: 100vh; overflow-y: auto;">
        <div id="wrap" class="g-wrap scroll-up">
          <div class="krds-in-page-navigation-type" id="container">
            <div class="inner in-between">
              <div class="contents">
                <KrdsInPageNavigation v-bind="args">
                  <template #action>
                    <button type="button" class="krds-btn medium" @click="handleActionClick">
                      온라인 신청하기
                    </button>
                    <p class="quick-info">장애아동수당 외 <strong>1건</strong></p>
                  </template>
                </KrdsInPageNavigation>
  
                <div style="padding: 2rem; margin-right: 17rem;">
                    <div id="section_01"
                         style="min-height: 600px; background: #f8f9fa; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>서비스 개요</h2>
                      <p>장애아동수당은 장애로 인한 추가비용을 보전하여 장애아동 가정의 경제적 부담을 완화하고 생활안정을 지원하는 서비스입니다.</p>
                      <ul>
                        <li>지급대상: 만 18세 미만 등록 장애아동</li>
                        <li>지급액: 중증 월 20만원, 경증 월 10만원</li>
                        <li>지급방법: 매월 20일 계좌 입금</li>
                      </ul>
                    </div>
    
                    <div id="section_02"
                         style="min-height: 700px; background: #e9ecef; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>서비스 상세</h2>
                      <h3>지급 기준</h3>
                      <p>장애아동수당은 장애 정도와 소득 수준에 따라 차등 지급됩니다.</p>
                      <h4>중증 장애아동 (월 20만원)</h4>
                      <ul>
                        <li>장애의 정도가 심한 장애아동</li>
                        <li>기초생활수급자, 차상위계층</li>
                      </ul>
                      <h4>경증 장애아동 (월 10만원)</h4>
                      <ul>
                        <li>장애의 정도가 심하지 않은 장애아동</li>
                        <li>소득 기준을 충족하는 가구</li>
                      </ul>
                    </div>
    
                    <div id="section_03"
                         style="min-height: 650px; background: #dee2e6; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>신청 방법 및 절차</h2>
                      <h3>신청 방법</h3>
                      <ol>
                        <li>온라인 신청: 복지로 홈페이지 또는 모바일 앱</li>
                        <li>방문 신청: 주민센터, 시·군·구청 사회복지과</li>
                        <li>우편 신청: 신청서류를 우편으로 제출</li>
                      </ol>
                      <h3>처리 절차</h3>
                      <ol>
                        <li>신청서 접수 (1일)</li>
                        <li>자격 조사 및 심사 (14일)</li>
                        <li>결정 통지 (3일)</li>
                        <li>급여 지급 (매월 20일)</li>
                      </ol>
                    </div>
    
                    <div id="section_04"
                         style="min-height: 500px; background: #ced4da; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>제출 서류</h2>
                      <h3>필수 서류</h3>
                      <ul>
                        <li>장애아동수당 신청서</li>
                        <li>주민등록등본</li>
                        <li>장애인등록증 사본</li>
                        <li>통장 사본</li>
                      </ul>
                      <h3>소득 관련 서류</h3>
                      <ul>
                        <li>소득·재산 신고서</li>
                        <li>급여명세서 또는 소득 증빙서류</li>
                        <li>재산 관련 증빙서류</li>
                      </ul>
                    </div>
    
                    <div id="section_05"
                         style="min-height: 550px; background: #adb5bd; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>함께 신청할 수 있는 서비스</h2>
                      <h3>장애인 관련 급여</h3>
                      <ul>
                        <li>장애인연금</li>
                        <li>장애수당</li>
                        <li>장애인 의료비 지원</li>
                      </ul>
                      <h3>아동 관련 지원</h3>
                      <ul>
                        <li>아동수당</li>
                        <li>한부모가족 지원</li>
                        <li>보육료 지원</li>
                      </ul>
                      <p><strong>※ 동시 신청 시 처리 기간이 단축될 수 있습니다.</strong></p>
                    </div>
    
                    <div id="section_06"
                         style="min-height: 450px; background: #6c757d; color: white; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>부가정보</h2>
                      <h3>문의처</h3>
                      <ul>
                        <li>보건복지상담센터: 129</li>
                        <li>온라인 문의: 복지로 홈페이지</li>
                        <li>방문 상담: 거주지 주민센터</li>
                      </ul>
                      <h3>관련 법령</h3>
                      <ul>
                        <li>장애인복지법 제49조</li>
                        <li>장애인복지법 시행령 제20조</li>
                        <li>장애아동수당 지급 조례</li>
                      </ul>
                    </div>
    
                    <div id="section_07"
                         style="min-height: 400px; background: #495057; color: white; padding: 2rem; margin-bottom: 2rem; border-radius: 8px;">
                      <h2>정보 변경 내역</h2>
                      <h3>최근 변경사항</h3>
                      <ul>
                        <li>2024.01.01: 지급액 인상 (중증 20만원, 경증 10만원)</li>
                        <li>2023.07.01: 온라인 신청 시스템 개편</li>
                        <li>2023.01.01: 소득 기준 완화</li>
                      </ul>
                      <h3>예정 변경사항</h3>
                      <ul>
                        <li>2024.07.01: 모바일 앱 신청 기능 추가 예정</li>
                        <li>2024.12.01: 지급 주기 단축 검토 중</li>
                      </ul>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
