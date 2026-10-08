<script setup>
import Basic from './demos/file-upload/Basic.vue'
import WithFiles from './demos/file-upload/WithFiles.vue'
import Interactive from './demos/file-upload/Interactive.vue'
import SingleFile from './demos/file-upload/SingleFile.vue'
import ImageOnly from './demos/file-upload/ImageOnly.vue'
import Disabled from './demos/file-upload/Disabled.vue'
import ReadOnly from './demos/file-upload/ReadOnly.vue'
</script>

# 파일 업로드 File upload

파일 업로드는 하나 이상의 디바이스의 로컬 파일을 선택하고 첨부하는 데 사용하는 입력 컴포넌트이다.

<DocTabs>
<template #overview>

## 기본

`v-model`에 파일 목록(`FileInfo[]`)을 바인딩합니다. 컴포넌트는 파일을 서버로 보내지 않습니다. 추가된 파일은 `pending` 상태로 목록에 들어가므로 실제 업로드와 상태 변경은 직접 처리합니다.

<div class="demo vp-raw"><Basic /></div>

<<< ./demos/file-upload/Basic.vue

## 파일 상태별 표시

`FileInfo`의 `status`에 따라 표시가 달라집니다. `uploading`은 스피너, `completed`는 완료 아이콘, `pending`은 삭제 버튼, `error`는 `errorMessage`를 표시합니다. `downloadUrl`이 있으면 다운로드·바로보기 버튼이 표시되고, 누르면 `download`·`preview` 이벤트가 발생합니다.

<div class="demo vp-raw"><WithFiles /></div>

<<< ./demos/file-upload/WithFiles.vue

## 파일 선택 동작

**파일선택** 버튼이나 업로드 영역으로 끌어다 놓아 파일을 추가합니다. `maxFileSize`(기본 20MB) 이상인 파일은 `error` 상태로 추가되고 개수에서 빠집니다. `maxFiles`(기본 10개)에 이르면 더 추가되지 않습니다.

<div class="demo vp-raw"><Interactive /></div>

<<< ./demos/file-upload/Interactive.vue

## 단일 파일

`multiple`을 `false`로 지정하면 새로 선택한 파일이 기존 파일을 대신합니다.

<div class="demo vp-raw"><SingleFile /></div>

<<< ./demos/file-upload/SingleFile.vue

## 이미지 파일만

`accept`에 허용할 확장자나 MIME 타입을 지정합니다. 끌어다 놓은 파일이 형식에 맞지 않으면 `error` 상태로 추가됩니다.

<div class="demo vp-raw"><ImageOnly /></div>

<<< ./demos/file-upload/ImageOnly.vue

## 비활성화

<div class="demo vp-raw"><Disabled /></div>

<<< ./demos/file-upload/Disabled.vue

## 읽기 전용

업로드 영역과 삭제 버튼 없이 파일 목록만 표시합니다.

<div class="demo vp-raw"><ReadOnly /></div>

<<< ./demos/file-upload/ReadOnly.vue

</template>
<template #api>

### KrdsFileUpload

<ComponentApi name="KrdsFileUpload" />

</template>
</DocTabs>
