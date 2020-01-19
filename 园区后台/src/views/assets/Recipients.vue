<template>
  <a-card class="assets-list" :bordered="false">
    <a-layout>
      <a-layout-sider theme="light">
        <assets-category @select="selectCategory" v-if="showCategory" />
      </a-layout-sider>
      <a-layout-content>
        <!-- Filter/Action -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
              <a-col :xl="8">
                <a-form-item label="关键字">
                  <a-input placeholder="资产名称、资产编号、规格型号" v-model="queryParam.keyword"></a-input>
                </a-form-item>
              </a-col>
              <a-col :xl="6">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :xl="8">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="handleAdd('2')">易耗品领用登记</a-button>
                  <a-button type="primary" @click="handleAdd('1')" style="margin-left: 8px">固定资产领用登记</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- table区域-begin -->
        <div class="table-operator">
          <a-button style="margin-left: 8px" type="danger" icon="delete" @click="batchDel" v-if="selectedRowKeys.length > 0">批量删除</a-button>
        </div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
        <!-- Table -->
        <a-table
          ref="table"
          size="middle"
          rowKey="opertionId"
          bordered
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :customRow="handleCustomRow"
          @change="handleTableChange">
            <!-- Column slot -->
            <span slot="action" slot-scope="text, record" @click.stop>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
        </a-table>
        <!-- table区域-end -->
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-recipients-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- View -->
    <assets-view-modal
      :columns="viewColumns"
      :data="viewData"
      v-model="view" />
  </a-card>
</template>

<script>
  import AssetsRecipientsEditForm from '@/views/assets/components/AssetsRecipientsEditForm'
  import AssetsViewModal from '@views/assets/components/AssetsViewModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list as AssetsListMixin, viewAssetsQtyTable as AssetsViewAssetsQtyTableMixin } from './mixins'
  import { url, viewConsumingDetail } from './api'
  import './style/list.less'

  export default {
    components: {
      AssetsRecipientsEditForm,
      AssetsViewModal,
    },
    mixins: [
      JeecgListMixin,
      MixinList,
      AssetsListMixin,
    ],
    data() {
      return {
        // Mixin option
        deleteKey: 'opertionId',
        // Url
        url: url.opertion,
        // Filter query
        queryParam: {
          keyword: '',
          useType: '1',
        },
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
            title: '领用单号',
            align: 'center',
            dataIndex: 'opertionId'
          },
          {
            title: '领用日期',
            align: 'center',
            dataIndex: 'useDate'
          },
          {
            title: '领用人',
            align: 'center',
            dataIndex: 'usePerson'
          },
          {
            title: '领用资产名称',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
        // View
        viewColumns: [
          { name: '领用单号', value: 'opertionId', },
          { name: '领用日期', value: 'useDate', },
          { name: '领用人', value: 'usePerson', },
          { name: '备注', value: 'remark', type: 'remark', },
          { value: { ...AssetsViewAssetsQtyTableMixin, }, type: 'table', },
          { name: '附件', type: 'files', value: 'addDocFiles' },
        ],
      }
    },
    methods: {
      handleAdd(type) {
        this.$refs.modalForm.add();
        this.$refs.modalForm.disableSubmit = false;
        this.$refs.modalForm.type = type
      },
      handleCustomRow(row) {
        return {
          on: {
            click: async () => {
              const resp = await viewConsumingDetail({ id: row.opertionId })
              if (!resp.success) {
                this.$message.error('获取详情时发生错误')
                return
              }
              const detail = resp.result
              const viewData = Object.assign({}, row)
              if (detail && detail[0] && detail[0].qty) {
                viewData.qty = detail[0].qty
              }
              this.viewData = viewData
              this.view = true
            }
          }
        }
      }
    },
    watch: {
      selectCategoryKey(val) {
        this.queryParam.categoryId = val
        this.loadData(1)
      },
    }
  }
</script>
