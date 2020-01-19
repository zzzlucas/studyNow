import store from '@/store'
import AppBase from './AppBase'

/**
 * List(列表) mixin
 *
 * To use:
 *
 * ```
 * import ListMixin from '@mixins/List';
 *
 * export default {
 *   mixins: [ListMixin],
 *   // other logic...
 * }
 * ```
 */
export default {
  mixins: [
    AppBase
  ],
  data() {
    const parkId = store.state.industrialPark.id
    return {
      // Common query params
      queryParam: {
        parkId,
      },
    }
  },
  methods: {

  },
}

export const lifeCycle = {
  async created() {
    await this.initDictConfig();
    this.loadData();
  }
}