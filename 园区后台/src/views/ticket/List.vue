<template>
  <a-card class="ticket-list" :bordered="false">
    <!-- Filter/Action -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="工单主题" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="类别" v-if="!isShortcutRoute">
              <j-dict-select-tag
                v-model="queryParam.orderType"
                :dict="types.order_type" />
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :xl="isShortcutRoute ? 10 : 4">
            <a-form-item style="float:right">
              <a-button type="primary" @click="handleAdd">创建工单</a-button>
            </a-form-item>
          </a-col>
          <a-col :xl="14">
            <a-form-item label="状态">
              <j-dict-select-tag
                type="radio"
                v-model="queryParam.status"
                :dict="typeOrderStatus"
                @input="searchQuery" />
            </a-form-item>
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
      bordered
      rowKey="orderId"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :customRow="handleCustomRow"
      @change="handleTableChange">
      <!-- Column slot -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a-dropdown>
          <a class="ant-dropdown-link">状态管理<a-icon type="down" /></a>
          <a-menu slot="overlay">
            <a-menu-item v-if="record.status === '0'|| record.status === '2' || record.status === '3'">
              <a-popconfirm title="确定受理吗?" @confirm="handleChangeStatus(record.orderId, '1')">
                <a>{{ record.status === '0' ? '受理' : '重新受理' }}</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item v-if="record.status === '0' || record.status === '1'">
              <a-popconfirm title="确定退回吗?" @confirm="handleChangeStatus(record.orderId, '2')">
                <a>退回</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item v-if="record.status === '1'">
              <a-popconfirm title="确定转为已完成吗?" @confirm="handleChangeStatus(record.orderId, '3')">
                <a>已完成</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
          <a>删除</a>
        </a-popconfirm>
        </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <ticket-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import TicketEditForm from '@views/ticket/components/TicketEditForm'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { filterDictText } from '@/components/dict/JDictSelectUtil'
  import { url, changeStatusInfo } from './api'
  import '@assets/less/common.less'

  export default {
    components: {
      TicketEditForm,
    },
    mixins: [
      JeecgListMixin,
      MixinList,
    ],
    data() {
      return {
        // Mixin options
        deleteKey: 'orderId',
        // Url
        url: url.info,
        // Types
        dictesCreateFields: ['order_type', 'order_status'],
        // Filter query
        queryParam: {
          orderType: '',
          keyword: '',
          status: '',
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
            title: '工单编号',
            align: 'center',
            dataIndex: 'orderId'
          },
          {
            title: '工单主题',
            align: 'center',
            dataIndex: 'title'
          },
          {
            title: '工单类别',
            align: 'center',
            dataIndex: 'orderType',
            customRender: t => {
              return filterDictText(this.types.order_type, t)
            }
          },
          {
            title: '提单客户',
            align: 'center',
            dataIndex: 'custName'
          },
          {
            title: '提单日期',
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'principalUser'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            customRender: t => {
              return filterDictText(this.types.order_status, t)
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
      }
    },
    computed: {
      typeOrderStatus() {
        let types = this.types.order_status
        if (types) {
          types.unshift({ text: '全部', title: '全部', value: '' })
        }
        return types
      },
      isShortcutRoute() {
        return this.$route.name !== 'ticket-service'
      },
    },
    methods: {
      // Query params
      buildQueryParams() {
        const name = this.$route.name
        const prefix = 'ticket-'
        const category = name.substring(prefix.length)
        const routeMap = {
          'public-facilities': '7',
          'construction-company-license': '8',
          'construction-waste-disposal': '9',
          'building-facility-renovation': '12',
          'temporary-occupation-road': '10',
        }
        if (routeMap[category]) {
          this.queryParam.orderType = routeMap[category]
        }
      },
      // List
      handleCustomRow(row) {
        return {
          on: {
            click: () => {
              this.$router.push({ name: 'ticket-info-@id', params: { id: row.orderId } })
            }
          }
        }
      },
      async handleChangeStatus(orderId, status) {
        try {
          const params = { status, orderId }
          const resp = await changeStatusInfo(params)
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.loadData(1)
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // Add/Edit
      handleAdd() {
        this.$refs.modalForm.add({ orderType: this.queryParam.orderType })
        this.$refs.modalForm.title = "新增"
        this.$refs.modalForm.disableSubmit = false
      },
      async handleEditSubmit() {
        this.loadData(1)
      },
    },
    watch: {
      '$route'(val) {
        // Reset orderType if route name === 'ticket-service'
        if (val.name === 'ticket-service') {
          this.queryParam.orderType = ''
        }
        this.loadData(1)
      },
    }
  }
</script>

<style lang="less">
  .ticket-list {
    .ant-table-row {
      cursor: pointer;
    }
  }
</style>