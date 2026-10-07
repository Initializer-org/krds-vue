<script setup>
import Basic from './demos/icon/Basic.vue'
import Gallery from './demos/icon/Gallery.vue'
</script>

# 아이콘 Icon

KRDS SVG 아이콘을 표시하는 컴포넌트이다. name 속성에 아이콘 클래스명(ico-\*)을 지정하며, 실제 그래픽은 스타일 시트의 svg-icon 마스크로 렌더링된다.

## 기본

`<i class="svg-icon ico-help">`로 렌더링됩니다. 아이콘에는 대체 텍스트가 없으므로 아이콘만으로 의미를 전달할 때는 `sr-only` 텍스트를 함께 제공합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/icon/Basic.vue

## 아이콘 목록

<div class="demo vp-raw"><Gallery /></div>

<<< ./demos/icon/Gallery.vue

## API

### KrdsIcon

<ComponentApi name="KrdsIcon" />
