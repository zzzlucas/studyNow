/**
 * ViewAside(查看/详情) mixin
 *
 * To use:
 *
 * ```
 * import ViewAsideMixin from '@mixins/ViewAside';
 *
 * export default {
 *   mixins: [ViewAsideMixin],
 *   // other logic...
 * }
 * ```
 */

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  data() {
    return {
      title: '',
      modal: false,
      urlDownload: window._CONFIG['domianURL'] + "/sys/common/download/",
    }
  },
  methods: {
    close() {
      this.$emit('change', false)
    }
  },
  watch: {
    show(val) {
      this.modal = val
    }
  }
}