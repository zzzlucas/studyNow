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
              <a-col :xl="10">
                <span style="float: right">
                  <a-form-item >
                    <a-button type="primary" @click="handleAdd">处置登记</a-button>
                  </a-form-item>
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
        </a-table>
        <!-- table区域-end -->
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-disposal-edit-form
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
  import AssetsDisposalEditForm from '@views/assets/components/AssetsDisposalEditForm'
  import AssetsViewModal from '@views/assets/components/AssetsViewModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list as AssetsListMixin, viewAssetsTable as AssetsViewAssetsTableMixin } from './mixins'
  import { url } from './api'
  import './style/list.less'

  export default {
    components: {
      AssetsDisposalEditForm,
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
          categoryId: '',
          keyword: '',
          useType: '4',
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
            title: '处置单号',
            align: 'center',
            dataIndex: 'opertionId'
          },
          {
            title: '处置日期',
            align: 'center',
            dataIndex: 'useDate'
          },
          {
            title: '处置资产名称',
            align: 'center',
            dataIndex: 'assertName'
          },
          {
            title: '处置类型',
            align: 'center',
            dataIndex: 'detailType'
          },
          {
            title: '处置原因',
            align: 'center',
            dataIndex: 'reason'
          },
          {
            title: '备注',
            align: 'center',
            dataIndex: 'remark'
          },
        ],
        // View
        viewColumns: [
          { name: '处置单号', value: 'opertionId', },
          { name: '处置日期', value: 'useDate', },
          { name: '处置原因', value: 'detailType', },
          { name: '备注', value: 'remark', type: 'remark', },
          { value: { ...AssetsViewAssetsTableMixin }, type: 'table', },
          { name: '附件', type: 'files', value: 'addDocFiles' },
        ],
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
