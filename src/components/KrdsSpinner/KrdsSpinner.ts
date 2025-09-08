import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'KrdsSpinner',
  props: {
    label: {
      type: String,
      default: undefined
    }
  },
  render() {
    const children = [h('span', { class: 'sr-only' }, '로딩 중')]

    if (this.label) {
      children.push(h('span', this.label))
    }

    return h('div', { class: 'krds-spinner', role: 'status' }, children)
  }
})
