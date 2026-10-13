<script setup>
import Basic from './demos/image/Basic.vue'
import Caption from './demos/image/Caption.vue'
import Decorative from './demos/image/Decorative.vue'
</script>

# 이미지 Image

이미지는 콘텐츠 양식 중 하나로 단일 이미지 또는 이미지 시퀀스로 표현될 수 있다. 이미지를 적절하게 사용하게 되면 사용자는 텍스트보다 효과적으로 정보를 인지할 수 있으며, 텍스트로 표현하기 어려운 정보를 전달할 수 있다.

## 기본

`alt`(대체 텍스트)는 필수입니다. 빠뜨리면 타입 검사(`vue-tsc`)에서 오류가 나고 개발 모드에서 경고가 뜹니다. 이미지가 전하는 정보를 구체적이고 간결하게 씁니다. 기본으로 `loading="lazy"`가 붙어 화면에 가까워질 때 불러오고, `width`·`height` 등 나머지 속성은 `<img>`에 그대로 전달됩니다. 화면 폭보다 크면 비율을 유지한 채 줄어듭니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/image/Basic.vue

## 설명

`caption`을 주면 `<figure>`와 `<figcaption>`으로 감싸 이미지 아래에 설명을 표시합니다. 출처 링크처럼 마크업이 필요하면 `#caption` 슬롯을 씁니다. 촬영자·출처 정보는 대체 텍스트가 아니라 설명에 넣습니다.

<div class="demo vp-raw"><Caption /></div>

<<< ./demos/image/Caption.vue

## 장식 이미지

정보 없이 꾸밈용인 이미지는 `alt=""`로 비워 화면낭독기가 건너뛰게 합니다.

<div class="demo vp-raw"><Decorative /></div>

<<< ./demos/image/Decorative.vue

## 접근성

- 앱이 개발 모드일 때 KRDS 이미지 접근성 가이드에 어긋나는 대체 텍스트를 콘솔에 경고합니다(Vue 경고, 배포 빌드에서는 출력하지 않음).
  - `'로고 이미지'`, `'강아지 사진'`처럼 끝에 이미지·사진·그림·그래픽 등 역할과 겹치는 말을 붙인 경우
  - 대체 텍스트가 `caption`과 같은 경우
- 컴포넌트는 내용이 적절한지까지 확인하지 못합니다. 이미지와 인접한 글과 같은 내용, 이미지에 없는 정보는 넣지 않습니다.
- 글자를 이미지로 만들지 말고 마크업 텍스트로 제공합니다.
- `KrdsImage` 대신 `<img>`를 직접 쓰는 곳까지 검사하려면 eslint-plugin-vuejs-accessibility의 [`alt-text` 규칙](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html)을 함께 씁니다.

## API

## KrdsImage

<ComponentApi name="KrdsImage" />
