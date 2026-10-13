<script setup>
import Video from './demos/media/Video.vue'
import Audio from './demos/media/Audio.vue'
</script>

# 접근 가능한 미디어 Accessible multimedia

미디어 콘텐츠에 설명이 필요한 경우에 사용하는 컴포넌트이다. 정지된 이미지에 설명을 제공할 때에는 숨김 콘텐츠를, 오디오/비디오/멀티미디어 콘텐츠에 설명을 제공할 때는 접근 가능한 미디어 컴포넌트를 사용한다.

## 동영상

`src`·`title`(필수)을 주면 브라우저 기본 재생기(`<video controls>`)로 재생합니다. `captions`에 WebVTT 자막 주소를 주면 한국어 자막이 기본으로 켜지고, `#transcript` 슬롯에 원고를 넣으면 재생기 아래 **원고 보기**로 펼칠 수 있습니다. `poster`·`width` 등 나머지 속성은 `<video>`에 그대로 전달되고, 다른 언어 자막은 기본 슬롯에 `<track>`으로 넣습니다.

<div class="demo vp-raw"><Video /></div>

<<< ./demos/media/Video.vue

## 오디오

`audio`를 주면 `<audio controls>`로 재생합니다. 오디오는 자막이 화면에 보이지 않으므로 원고를 제공합니다.

<div class="demo vp-raw"><Audio /></div>

<<< ./demos/media/Audio.vue

## 외부 재생기

유튜브처럼 외부 재생기를 쓸 때는 `src` 없이 기본 슬롯에 `<iframe>`을 넣습니다. 제목과 원고 영역이 붙고, `<iframe>`은 폭에 맞춰 16:9로 표시됩니다. 자막은 외부 재생기에서 관리하고, `<iframe>`에는 `title`을 꼭 답니다.

```vue
<KrdsMedia title="민원 신청 안내 영상">
  <iframe src="https://www.youtube-nocookie.com/embed/영상ID" title="민원 신청 안내 영상" allowfullscreen></iframe>
  <template #transcript>
    <p>민원 신청은 세 단계로 진행됩니다. …</p>
  </template>
</KrdsMedia>
```

## 사용 지침

- 미디어를 만들 때 대체 정보(자막·원고·화면 해설·수어)를 함께 계획합니다. 녹화용 대본을 활용하면 원고를 만들기 쉽습니다.
- 여러 대체 정보를 제공하기 어렵다면 가장 많은 사용자가 쓸 수 있는 원고(설명적 원고)를 제공합니다.
- 대체 정보에는 미디어의 모든 정보를 담습니다. 화면에 보이는 배열·움직임과, 화면에 없는 박수 소리 같은 효과음도 적습니다.
- 자막은 오디오와 시간을 맞추고(WebVTT), 영상 속 중요한 시각 요소와 겹치지 않게 합니다.
- 영상 속 정보를 전하는 글자·도형은 배경과 4.5:1 이상의 명도 대비를 갖게 합니다.
- 화면 해설 버전이나 수어 영상이 있으면 원고 안에 링크로 안내합니다.
- 미디어를 바꾸면 대체 정보도 함께 고칩니다.

## 접근성

- 브라우저 기본 재생기라 재생·탐색·음량·전체 화면·자막 켜기를 키보드와 화면낭독기로 조작하고, 자막은 운영체제의 자막 크기·색 설정을 따릅니다. 자막 기본 모양은 KRDS 가이드대로 반투명 검은 배경에 흰 글자입니다.
- 제목은 미디어 영역(`figure`)의 이름이 됩니다. 화면에서 숨겨야 하면 `hide-title`을 지정합니다.
- 앱이 개발 모드일 때 자막과 원고가 모두 없거나(오디오는 원고가 없으면), 자동 재생(`autoplay`)을 켜면 콘솔에 경고합니다(Vue 경고, 배포 빌드에서는 출력하지 않음).

## API

## KrdsMedia

<ComponentApi name="KrdsMedia" />
