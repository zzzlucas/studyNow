<template>
  <a-modal
    class="assets-list"
    title="选择资产"
    width="80%"
    v-model="modal"
    @ok="close"
    @cancel="close">
    <!-- Filter -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-form-item label="关键字" style="width: 100%;">
              <a-input placeholder="资产名称、资产编号、规格型号" v-model="queryParam.keyword" style="width: 100%;"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- Table -->
    <a-table
      style="margin-top: 20px"
      ref="table"
      size="middle"
      bordered
      rowKey="assetId"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      @change="handleTableChange">
    </a-table>
    <!-- Footer -->
    <template slot="footer">
      <a-button
        key="submit"
        type="primary"
        @click="done">
        完成
      </a-button>
    </template>
  </a-modal>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list } from '../mixins'
  import { filterDictText } from '@comp/dict/JDictSelectUtil'
  import { url } from '../api'
  import '../style/list.less'

  export default {
    mixins: [
      JeecgListMixin,
      MixinList,
      list,
    ],
    props: {
      type: {
        type: [String, Array],
        default: ''
      },
      useStatus: {
        type: [String, Array],
        default: '',
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
        // Mixin flag
        noInitOnCreated: true,
        // Url
        url: url.info,
        // Status
        modal: false,
        // Filter
        queryParam: {
          keyword: '',
        },
        // Types
        dictesCreateFields: ['asset_use_status'],
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => Number(index) + 1
          },
          {
            title: '资产名称',
            align: 'center',
            dataIndex: 'fixedAssetName'
          },
          {
            title: '资产编号',
            align: 'center',
            dataIndex: 'assetNumber'
          },
          {
            title: '规格型号',
            align: 'center',
            dataIndex: 'assetModel'
          },
          {
            title: '使用状态',
            align: 'center',
            dataIndex: 'useStatus',
            customRender: (t => {
              return filterDictText(this.types.asset_use_status, t)
            })
          },
        ],
      }
    },
    methods: {
      done() {
        this.$emit('select', this.selectedRowKeys, this.selectionRows)
        this.close()
      },
      close() {
        this.$emit('change', false)
      },
      buildQueryParams() {
        // categoryType
        let _type = this.type
        if (!Array.isArray(_type)) {
          _type = [_type]
        }
        const newType = _type.join(',')
        if (this.queryParam.categoryType !== newType) {
          this.onClearSelected()
          this.queryParam.categoryType = newType
        }
        let _useStatus = this.useStatus
        if (!Array.isArray(_useStatus)) {
          _useStatus = [_useStatus]
        }
        // useStatus
        this.queryParam.useStatus = _useStatus.join(',')
      },
      init() {
        this.loadData()
        this.initDictConfig()
      }
    },
    watch: {
      async show(val) {
        this.modal = val
        if (!val) {
          return
        }
        await this.$nextTick()
        this.init()
      },
    }
  }
</script>
