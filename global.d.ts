/**
 * app.use(KrdsVue)로 전역 등록되는 컴포넌트·디렉티브·전역 속성 타입
 *
 * 사용: tsconfig.json의 compilerOptions.types에 "@krds.ui/vue/global" 추가
 * 컴포넌트는 에디터(WebStorm 등)가 바로 인식하도록 하나씩 적는다 (목록이 실제 내보내기와 맞는지는 테스트가 확인)
 */
import type { Directive } from 'vue'

declare module 'vue' {
  export interface GlobalComponents {
    KrdsAccordionGroup: (typeof import('@krds.ui/vue'))['KrdsAccordionGroup']
    KrdsAccordionItem: (typeof import('@krds.ui/vue'))['KrdsAccordionItem']
    KrdsBadge: (typeof import('@krds.ui/vue'))['KrdsBadge']
    KrdsBreadcrumb: (typeof import('@krds.ui/vue'))['KrdsBreadcrumb']
    KrdsButton: (typeof import('@krds.ui/vue'))['KrdsButton']
    KrdsButtonGroup: (typeof import('@krds.ui/vue'))['KrdsButtonGroup']
    KrdsCarousel: (typeof import('@krds.ui/vue'))['KrdsCarousel']
    KrdsCheckArea: (typeof import('@krds.ui/vue'))['KrdsCheckArea']
    KrdsCheckbox: (typeof import('@krds.ui/vue'))['KrdsCheckbox']
    KrdsCoachMark: (typeof import('@krds.ui/vue'))['KrdsCoachMark']
    KrdsContextualHelp: (typeof import('@krds.ui/vue'))['KrdsContextualHelp']
    KrdsCriticalAlerts: (typeof import('@krds.ui/vue'))['KrdsCriticalAlerts']
    KrdsDateInput: (typeof import('@krds.ui/vue'))['KrdsDateInput']
    KrdsDisclosure: (typeof import('@krds.ui/vue'))['KrdsDisclosure']
    KrdsFileUpload: (typeof import('@krds.ui/vue'))['KrdsFileUpload']
    KrdsFloatingButton: (typeof import('@krds.ui/vue'))['KrdsFloatingButton']
    KrdsFooter: (typeof import('@krds.ui/vue'))['KrdsFooter']
    KrdsFormGroup: (typeof import('@krds.ui/vue'))['KrdsFormGroup']
    KrdsFormHint: (typeof import('@krds.ui/vue'))['KrdsFormHint']
    KrdsFormLabel: (typeof import('@krds.ui/vue'))['KrdsFormLabel']
    KrdsHeader: (typeof import('@krds.ui/vue'))['KrdsHeader']
    KrdsIcon: (typeof import('@krds.ui/vue'))['KrdsIcon']
    KrdsIdentifier: (typeof import('@krds.ui/vue'))['KrdsIdentifier']
    KrdsInPageNavigation: (typeof import('@krds.ui/vue'))['KrdsInPageNavigation']
    KrdsInput: (typeof import('@krds.ui/vue'))['KrdsInput']
    KrdsLanguageSwitcher: (typeof import('@krds.ui/vue'))['KrdsLanguageSwitcher']
    KrdsLayout: (typeof import('@krds.ui/vue'))['KrdsLayout']
    KrdsLink: (typeof import('@krds.ui/vue'))['KrdsLink']
    KrdsMainMenu: (typeof import('@krds.ui/vue'))['KrdsMainMenu']
    KrdsMasthead: (typeof import('@krds.ui/vue'))['KrdsMasthead']
    KrdsModal: (typeof import('@krds.ui/vue'))['KrdsModal']
    KrdsPagination: (typeof import('@krds.ui/vue'))['KrdsPagination']
    KrdsPanel: (typeof import('@krds.ui/vue'))['KrdsPanel']
    KrdsRadio: (typeof import('@krds.ui/vue'))['KrdsRadio']
    KrdsResize: (typeof import('@krds.ui/vue'))['KrdsResize']
    KrdsSelect: (typeof import('@krds.ui/vue'))['KrdsSelect']
    KrdsSideNavigation: (typeof import('@krds.ui/vue'))['KrdsSideNavigation']
    KrdsSkipLink: (typeof import('@krds.ui/vue'))['KrdsSkipLink']
    KrdsSpinner: (typeof import('@krds.ui/vue'))['KrdsSpinner']
    KrdsStep: (typeof import('@krds.ui/vue'))['KrdsStep']
    KrdsStepIndicator: (typeof import('@krds.ui/vue'))['KrdsStepIndicator']
    KrdsStructuredList: (typeof import('@krds.ui/vue'))['KrdsStructuredList']
    KrdsTable: (typeof import('@krds.ui/vue'))['KrdsTable']
    KrdsTabs: (typeof import('@krds.ui/vue'))['KrdsTabs']
    KrdsTag: (typeof import('@krds.ui/vue'))['KrdsTag']
    KrdsTagGroup: (typeof import('@krds.ui/vue'))['KrdsTagGroup']
    KrdsTextList: (typeof import('@krds.ui/vue'))['KrdsTextList']
    KrdsTextarea: (typeof import('@krds.ui/vue'))['KrdsTextarea']
    KrdsToggleSwitch: (typeof import('@krds.ui/vue'))['KrdsToggleSwitch']
    KrdsTooltip: (typeof import('@krds.ui/vue'))['KrdsTooltip']
    KrdsTts: (typeof import('@krds.ui/vue'))['KrdsTts']
  }

  export interface GlobalDirectives {
    /** 스크린 리더 전용 텍스트 (.sr-only 클래스 추가) */
    vSrOnly: Directive<HTMLElement, boolean | undefined>
  }

  export interface ComponentCustomProperties {
    $krds: { version: string }
  }
}

export {}
