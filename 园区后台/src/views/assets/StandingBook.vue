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
                <a-form-item label="使用状态">
                  <j-dict-select-tag
                    v-model="queryParam.useStatus"
                    dict-code="asset_use_status" />
                </a-form-item>
              </a-col>
              <a-col :xl="5">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
              <a-col :xl="5">
                <div style="float: right">
                  <a-upload
                    name="file"
                    :showUploadList="false"
                    :multiple="false"
                    :headers="tokenHeader"
                    :data="{ parkId: queryParam.parkId }"
                    :action="baseUrl + url.importExcelUrl"
                    @change="handleImportExcel">
                    <a-button type="primary">批量登记入库</a-button>
                  </a-upload>
                  <a-button @click="handleExportXls('资产台账')" style="margin-left: 8px;">Excel导出</a-button>
                </div>
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
    <!-- View -->
    <assets-view-aside
      :columns="viewColumns"
      :data="viewData"
      v-model="view" />
  </a-card>
</template>

<script>
  import AssetsViewAside from '@views/assets/components/AssetsViewAside'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list as AssetsListMixin } from './mixins'
  import { url } from './api'
  import './style/list.less'

  export default {
    components: {
      AssetsViewAside,
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
        baseUrl: window._CONFIG['domianURL'],
        url: url.info,
        // Filter query
        queryParam: {
          categoryId: '',
          keyword: '',
          useStatus: '',
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
            title: '所属分类',
            align: 'center',
            dataIndex: 'categoryName'
          },
          {
            title: '规格型号',
            align: 'center',
            dataIndex: 'assetModel'
          },
          {
            title: '单价',
            align: 'center',
            dataIndex: 'stockPrice'
          },
          {
            title: '采购日期',
            align: 'center',
            dataIndex: 'purchaseDate'
          },
          {
            title: '使用状态',
            align: 'center',
            dataIndex: 'useStatus_dictText'
          },
        ],
        // View
        viewColumns: [
          { name: '所属分类', value: 'categoryId', },
          { name: '资产编号', value: 'assetNumber', },
          { name: '资产名称', value: 'fixedAssetName', },
          { name: '规格型号', value: 'assetModel', },
          { name: '单价', value: 'stockPrice', },
          { name: '总价', value: 'stockAmount', },
          { name: '采购日期', value: 'purchaseDate', },
          { name: '使用人', value: 'usePerson', },
          { name: '备注', value: 'remark', type: 'remark', },
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
