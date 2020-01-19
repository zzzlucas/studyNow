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
          </a-form>
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
          :customRow="handleCustomRow"
          @change="handleTableChange">
            <!-- Column slot -->
            <span slot="action" slot-scope="text, record" @click.stop>
              <a @click.stop="handleEdit(record, ...arguments)">归还</a>
            </span>
        </a-table>
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-recipients-return-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- View -->
    <assets-view-aside
      :columns="viewColumns"
      :data="viewData"
      v-model="view" />
  </a-card>
</template>

<script>
  import AssetsRecipientsReturnEditForm from '@/views/assets/components/AssetsRecipientsReturnEditForm'
  import AssetsViewAside from '@views/assets/components/AssetsViewAside'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list as AssetsListMixin } from './mixins'
  import { url } from './api'
  import './style/list.less'

  export default {
    components: {
      AssetsRecipientsReturnEditForm,
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
        url: url.opertion,
        // Filter query
        queryParam: {
          categoryId: '',
          keyword: '',
          useStatus: '3', // Always be fixed asset
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
            dataIndex: 'assertName'
          },
          {
            title: '资产编号',
            align: 'center',
            dataIndex: 'assetNumber'
          },
          {
            title: '所属分类',
            align: 'center',
            dataIndex: 'categoryType'
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
            dataIndex: 'useStatus'
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
          { name: '所属分类', value: 'categoryType', },
          { name: '资产编号', value: 'assetNumber', },
          { name: '资产名称', value: 'assertName', },
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
