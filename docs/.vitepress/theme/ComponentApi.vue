<script setup lang="ts">
  import { computed } from 'vue'
  import { data } from './component-meta.data'

  const props = defineProps<{ name: string }>()
  const api = computed(() => data[props.name])
</script>

<template>
  <template v-if="api">
    <h3>Props</h3>
    <table v-if="api.props.length">
      <thead>
        <tr>
          <th>이름</th>
          <th>타입</th>
          <th>기본값</th>
          <th>설명</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in api.props" :key="prop.name">
          <td>
            <code>{{ prop.name }}</code
            ><span v-if="prop.required"> (필수)</span>
          </td>
          <td>
            <code>{{ prop.type }}</code>
          </td>
          <td>
            <code v-if="prop.default">{{ prop.default }}</code
            ><template v-else>-</template>
          </td>
          <td>{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>없음</p>

    <template v-if="api.events.length">
      <h3>Events</h3>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>인자</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in api.events" :key="event.name">
            <td>
              <code>{{ event.name }}</code>
            </td>
            <td>
              <code>{{ event.type }}</code>
            </td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="api.slots.length">
      <h3>Slots</h3>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in api.slots" :key="slot.name">
            <td>
              <code>{{ slot.name }}</code>
            </td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </template>
</template>
