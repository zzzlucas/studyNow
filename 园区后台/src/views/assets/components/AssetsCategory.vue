<template>
  <div class="assets-category-aside">
    <a-tree
      showLine
      defaultExpandAll
      :tree-data="data"
      :defaultSelectedKeys="defaultSelectedKeys"
      @select="onSelect"
      v-if="ready" />
    <a-spin v-if="!ready" size="large" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'  // PARKID
  import { buildTreeData } from '@utils/util'
  import { treeListCategory } from '../api'

  export default {
    props: {
      showLast: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        ready: false,
        data: [],
        list: [],
      }
    },
    computed: {
      defaultSelectedKeys() {
        if (!this.data[0]) {
          return []
        }
        return [this.data[0].key]
      },
      ...mapGetters([
        'industrialParkId'
      ]),  // PARKID
    },
    methods: {
      onSelect(...ev) {
        this.$emit('select', ...ev)
      },
      async fetchList() {
        const params = { parkId: this.industrialParkId }
        if (this.showLast) {
          params.need = 1
        }
        const res = await treeListCategory(params)
        this.list = res.result
      },
      async buildTree() {
        this.data = buildTreeData(this.list, 'categoryId', 'categoryName', 'parentId', true)
        this.ready = true
      },
      async getList() {
        await this.fetchList()
        this.buildTree()
      },
    },
    created() {
      this.getList()
    },
  }
</script>
