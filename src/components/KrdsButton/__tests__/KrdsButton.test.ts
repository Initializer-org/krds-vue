import { describe, it } from 'vitest'
import { expectNoA11yViolations, render } from '@/test/utils'
import KrdsButton from '../KrdsButton'

describe('KrdsButton', () => {
  it('기본', async () => {
    render(KrdsButton, { props: { variant: 'primary' }, slots: { default: '버튼' } })
    await expectNoA11yViolations()
  })

  it('계층', async () => {
    render({
      template: `
        <div>
          <KrdsButton variant="primary">버튼 : primary</KrdsButton>
          <KrdsButton variant="secondary">버튼 : secondary</KrdsButton>
          <KrdsButton variant="tertiary">버튼 : tertiary</KrdsButton>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('사이즈', async () => {
    render({
      template: `
        <div>
          <KrdsButton size="xsmall">x-small 버튼</KrdsButton>
          <KrdsButton size="small">small 버튼</KrdsButton>
          <KrdsButton size="medium">medium 버튼</KrdsButton>
          <KrdsButton size="large">large 버튼</KrdsButton>
          <KrdsButton size="xlarge">x-large 버튼</KrdsButton>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('기본 아이콘 버튼', async () => {
    render({
      template: `
        <div>
          <KrdsButton size="xsmall">x-small 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton size="small">small 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton size="medium">medium 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton size="large">large 버튼 <i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton size="xlarge"><i class="svg-icon ico-sch"></i> x-large 버튼</KrdsButton>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('텍스트', async () => {
    render({
      template: `
        <div>
          <KrdsButton size="small" text>텍스트 버튼</KrdsButton>
          <KrdsButton size="xsmall" text>찜하기 <i class="svg-icon ico-like"></i></KrdsButton>
          <KrdsButton size="small" text>주민등록표초본 <i class="svg-icon ico-angle right"></i></KrdsButton>
          <KrdsButton size="medium" text>검색 <i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton size="xlarge" text>자세히 보기 <i class="svg-icon ico-more"></i></KrdsButton>
          <KrdsButton text>파일다운로드 <i class="svg-icon ico-down"></i></KrdsButton>
          <KrdsButton text disabled>필터 <i class="svg-icon ico-filter"></i></KrdsButton>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('아이콘만 있는 버튼', async () => {
    render({
      template: `
        <div>
          <KrdsButton icon><span class="sr-only">검색</span><i class="svg-icon ico-sch"></i></KrdsButton>
          <KrdsButton icon size="medium"><span class="sr-only">입력한 비밀번호 보기</span><i class="svg-icon ico-pw-visible"></i></KrdsButton>
          <KrdsButton icon size="medium" class="btn-help-exec"><span class="sr-only">도움말</span><i class="svg-icon ico-help"></i></KrdsButton>
          <KrdsButton icon border size="large"><span class="sr-only">새로고침</span><i class="svg-icon ico-refresh"></i></KrdsButton>
          <KrdsButton icon border size="large" disabled><span class="sr-only">열기</span><i class="svg-icon ico-angle down"></i></KrdsButton>
        </div>
      `
    })
    await expectNoA11yViolations()
  })

  it('버튼 그룹', async () => {
    render({
      template: `
        <KrdsButtonGroup>
          <KrdsButton variant="secondary">취소</KrdsButton>
          <KrdsButton variant="primary">확인</KrdsButton>
        </KrdsButtonGroup>
      `
    })
    await expectNoA11yViolations()
  })
})
