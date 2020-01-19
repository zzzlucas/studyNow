import { filterObj } from '@/utils/util';
import store from '@/store'
import AppBase from './AppBase'
import { deleteAction, getAction } from '@api/manage'

/**
 * View(查看/详情) mixin
 *
 * To use:
 *
 * ```
 * import ViewMixin from '@mixins/View';
 *
 * export default {
 *   mixins: [ViewMixin],
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
      // 接口Url
      url: {},
      // 查询条件
      queryParam: {},
      // 园区id
      parkId,
      // 加载flag
      loading: true,
      // 主内容
      data: {},
    }
  },
  methods: {
    /**
     * 检查路由配置
     * @return Boolean
     */
    checkRouteConfig() {
      if (typeof this.$route.params.id !== 'string') {
        this.$router.back()
        this.$message.warning('ID不正确')
        return false
      }
      return true
    },
    /**
     * 加载数据
     */
    async loadData() {
      if (!this.url.view) {
        this.$message.error(`请设置url.view属性!`)
        return
      }
      const params = this.getQueryParams()
      this.loading = true
      try {
        const data = await getAction(this.url.view, params)
        if (!data.success) {
          throw new Error(data.message)
        }
        if (data.code === 510) { // What is code 510?
          this.$message.warning(data.message)
        }
        this.data = this.processData(data.result)
        await this.afterLoadData()
      } catch (e) {
        this.$message.error(e.message)
        throw e
      }
      this.loading = false
    },
    /**
     * 处理数据
     */
    processData(data) {
      return data
    },
    /**
     * 加载数据后处理
     */
    async afterLoadData() {
      // loadData() life cycle method
    },
    /**
     * Get查询条件
     * @return Object
     */
    getQueryParams() {
      const route = this.getRouteParams()
      const params = Object.assign({}, route, this.queryParam)
      return filterObj(params)
    },
    /**
     * Get路由查询条件
     * @return Object
     */
    getRouteParams() {
      return { id: this.$route.params.id }
    },
    /**
     * 编辑
     * 需要设置一个ref=modalForm的组件，并且拥有edit方法，title和disableSubmit属性，
     * 建议编辑组件使用FormEditDrawerMixin。
     */
    handleEdit() {
      this.$refs.modalForm.edit(this.data);
      this.$refs.modalForm.title = "编辑";
      this.$refs.modalForm.disableSubmit = false;
    },
    /**
     * 删除
     * 需要设置url.delete和deleteKey
     */
    handleDel(data) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      if (typeof data !== 'object') {
        data = { id: data }
      }
      if (!this.deleteKey) {
        if (!data.hasOwnProperty('id')) {
          this.$message.error('请设置deleteKey，删除的主键!')
          return
        }
      }
      var that = this;
      deleteAction(that.url.delete, {id: data[this.deleteKey ? this.deleteKey : 'id']}).then((res) => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      });
    }
  },
}

/**
 * 生命周期混入项
 *
 * + created()
 */
export const lifeCycle = {
  async created() {
    if (!this.checkRouteConfig()) {
      return
    }
    await this.initDictConfig()
    this.loadData()
  }
}
