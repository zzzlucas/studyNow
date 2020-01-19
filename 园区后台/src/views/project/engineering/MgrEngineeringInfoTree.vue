<template>
  <a-row :gutter="8" class="mgr-engineering-info-tree">
    <a-col span="4">
      <a-card>
        <a-input-search v-model="keyword" placeholder="通过ID/项目名称搜索" @search="onSearch"></a-input-search>
        <a-tree :expandedKeys.sync="expandedKeys" :selectedKeys.sync="selectedKeys">
          <a-tree-node :title="parkName" :selectable="false" key="main">
            <a-tree-node
              key="prev"
              :selectable="false"
              class="tree-page-item"
              :style="{display: prevShow ? 'block' : 'none'}">
              <span slot="title" @click="treeChange('prev')">上一页</span>
            </a-tree-node>

            <a-tree-node :title="row.name" :key="row.id" v-for="row in tree.list"></a-tree-node>

            <a-tree-node
              key="next"
              :selectable="false"
              class="tree-page-item"
              :style="{display: nextShow ? 'block' : 'none'}">
              <span slot="title" @click="treeChange('next')">下一页</span>
            </a-tree-node>
          </a-tree-node>
        </a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <tree-table-charts :id="tableId" :title="tableName"></tree-table-charts>
    </a-col>
  </a-row>
</template>

<script>
  import TreeTableCharts from './components/TreeTableCharts'
  import { mapState } from 'vuex'
  import { getAction } from '@api/manage'
  import _ from 'lodash'

  export default {
    name: 'MgrEngineeringInfoTree',
    components: { TreeTableCharts },
    data() {
      return {
        expandedKeys: ['main'], // 直接写上面还不行，必须要变量兜着
        selectedKeys: [],
        tableId: '',
        keyword: '',
        tree: {
          page: 1,
          list: [],
          maxPage: 0,
          prevShow: true,
          nextShow: true
        }
      }
    },
    created() {
      this.pageChange(this.tree.page)
    },
    computed: {
      ...mapState('industrialPark', {
        parkName: state => state.name,
        parkId: state => state.id
      }),
      prevShow() {
        if (this.tree.prevShow) {
          return this.tree.page !== 1
        }

        return false
      },
      nextShow() {
        six: {
          if (!this.tree.nextShow) {
            break six
          }

          if (this.tree.maxPage === 0) {
            return true
          } else {
            return this.tree.page < this.tree.maxPage
          }
        }

        return false
      },
      tableName(){
        let name = ''
        _.map(this.tree.list, row => {
          if(this.tableId === row.id){
            name = row.name
          }
        })

        return name
      }
    },
    methods: {
      http(params, callback) {
        params.parkId = this.parkId
        getAction('/park.engineering/mgrEngineeringInfo/list', params).then(res => {
          if (res.success && res.code === 200) {
            let id = _.get(res.result.records, '[0].projectId')
            this.tableId = id
            this.selectedKeys = [id]
            callback(true, res.result)
          } else {
            callback(false, res.message)
          }
        })
      },
      // tree分页
      pageChange(pageNo) {
        this.http({ pageNo, pageSize: 15 }, (bool, data) => {
          if (bool) {
            this.tree.list = _.map(data.records, row => {
              return {
                id: row.projectId,
                name: row.projectName
              }
            })
            this.tree.maxPage = data.pages
          } else {
            this.$message.warning('初始化失败')
          }
        })
      },
      // tree搜索
      onSearch(keyword) {
        this.http({ keyword, pageNo: 1, pageSize: 500 }, (bool, data) => {
          if (bool) {
            this.tree = _.assign(this.tree, {
              list: _.map(data.records, row => {
                return {
                  id: row.projectId,
                  name: row.projectName
                }
              }),
              prevShow: false,
              nextShow: false
            })
          } else {
            this.$message.warning('搜索失败')
          }
        })
      },
      // tree翻页
      treeChange(type) {
        if (type === 'prev') {
          this.tree.page--
        } else if (type === 'next') {
          this.tree.page++
        }
      }
    },
    watch: {
      'tree.page'(page) {
        this.pageChange(page)
      },
      'keyword'(str) {
        if (str === '') {
          this.tree = _.assign(this.tree, {
            prevShow: true,
            nextShow: true
          })
          this.$nextTick(() => {
            this.pageChange(this.tree.page)
          })
        }
      },
      'selectedKeys'(keys) {
        if (keys.length === 0) {
          this.selectedKeys = [this.tableId]
        } else {
          this.tableId = keys[0]
        }
      }
    }
  }
</script>

<style lang="scss">
  .mgr-engineering-info-tree {
    .tree-page-item .ant-tree-node-content-wrapper {
      $color: #e6e6e6;
      background-color: $color;

      &:hover {
        background-color: $color;
      }
    }
  }
</style>
