<template>
  <a-card class="book-list" :bordered="false">
    <!-- Filter/Action -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="4">
            <a-form-item label="资源类">
              <a-select v-model="queryParam.type">
                <a-select-option :value="item.name" v-for="item in types.type" :key="item.name">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="预定开始时间">
              <j-date v-model="queryParam.begDate" date-format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="预定结束时间">
              <j-date v-model="queryParam.endDate" date-format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%;" />
            </a-form-item>
          </a-col>
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="资源名称、订单号、预定人、手机号" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="4">
            <a-form-item label="状态">
              <j-dict-select-tag
                placeholder="请选择状态"
                v-model="queryParam.status"
                dict-code="adverts_status" />
            </a-form-item>
          </a-col>
          <a-col :xl="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :xl="16">
            <a-form-item style="float:right">
              <a-button type="primary" @click="handleAdd('1')">广告位预定</a-button>
              <a-button type="primary" @click="handleAdd('2')" style="margin-left: 8px">会议室预定</a-button>
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
      rowKey="requestId"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :customRow="handleCustomRow"
      @change="handleTableChange">
      <!-- Action -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <template v-if="record.status === '1'">
          <a-divider type="vertical" />
          <a-popconfirm title="确定通过吗?" @confirm="() => handleReview(record, true)">
            <a>通过</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-popconfirm title="确定拒绝吗?" @confirm="() => handleReview(record, false)">
            <a>拒绝</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <advertising-event-edit-form
      ref="modalFormAdvertisingEvent"
      @submit="handleEditSubmit" />
    <meeting-event-edit-form
      ref="modalFormMeetingEvent"
      @submit="handleEditSubmit" />
    <!-- View modal -->
    <advertising-event-view-modal
      no-footer
      :data="viewDataAd"
      v-model="viewAd" />
    <meeting-event-view-modal
      no-footer
      :data="viewDataMeeting"
      v-model="viewMeeting" />
  </a-card>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import AdvertisingEventEditForm from './components/AdvertisingEventEditForm'
  import MeetingEventEditForm from './components/MeetingEventEditForm'
  import AdvertisingEventViewModal from './components/AdvertisingEventViewModal'
  import MeetingEventViewModal from './components/MeetingEventViewModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import Mixin from './mixin/list'
  import { url, reviewBook, viewMeetingEvent, viewAdEvent } from './api'
  import '@assets/less/common.less'

  export default {
    components: {
      JDate,
      AdvertisingEventEditForm,
      MeetingEventEditForm,
      AdvertisingEventViewModal,
      MeetingEventViewModal,
    },
    mixins: [
      JeecgListMixin,
      MixinList,
      Mixin,
    ],
    data() {
      return {
        // Types
        types: {
          type: [
            { name: '1', label: '广告位' },
            { name: '2', label: '会议室' },
          ],
        },
        // Query
        originalQueryParam: {},
        queryParam: {
          type: '1',
        },
        // Url
        url: url.book,
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
            title: '请求编号',
            align: 'center',
            dataIndex: 'requestId'
          },
          {
            title: '资源名称',
            align: 'center',
            customRender: (t, r, index) => {
              if (this.originalQueryParam.type === '2') {
                return r.baseMeetingroom ? r.baseMeetingroom.roomName : ''
              } else {
                return r.advertsName
              }
            },
          },
          {
            title: '预定时间',
            align: 'center',
            customRender: (t, r, index) => {
              return `${r.begDate} - ${r.endDate}`
            },
          },
          {
            title: '金额',
            align: 'center',
            customRender: (t, r, index) => {
              if (this.originalQueryParam.type === '2') {
                return `-`
              } else {
                return `${r.amount}元`
              }
            },
          },
          {
            title: '预订人',
            align: 'center',
            dataIndex: 'requestPerson'
          },
          {
            title: '电话',
            align: 'center',
            dataIndex: 'telephone'
          },
          {
            title: '提交时间',
            align: 'center',
            dataIndex: 'createTime'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status_dictText'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
        // View modal/aside
        viewDataMeeting: {},
        viewMeeting: false,
        viewDataAd: {},
        viewAd: false,
      }
    },
    methods: {
      // Action
      handleAdd(type) {
        let modalForm
        if (type === '1') {
          modalForm = 'modalFormAdvertisingEvent'
        } else {
          modalForm = 'modalFormMeetingEvent'
        }
        this.$refs[modalForm].add();
        this.$refs[modalForm].title = '预定'
        this.$refs[modalForm].disableSubmit = false;
      },
      handleEdit(record) {
        let modalForm
        if (this.originalQueryParam.type === '2') {
          modalForm = 'modalFormMeetingEvent'
        } else {
          modalForm = 'modalFormAdvertisingEvent'
        }
        this.$refs[modalForm].edit(record);
        this.$refs[modalForm].title = '编辑'
        this.$refs[modalForm].disableSubmit = false;
      },
      handleCustomRow(row) {
        return {
          on: {
            click: () => {
              if (this.originalQueryParam.type === '2') {
                this.handleViewMeetingEvent(row)
              } else {
                this.handleViewAdvertisingEvent(row)
              }
            }
          }
        }
      },
      async handleEditSubmit() {
        this.loadData(1)
      },
      async handleReview(record, pass) {
        try {
          const resp = await reviewBook({ RequestId: record.requestId, Status: pass ? '2' : '0' })
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.loadData(1)
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // View
      async handleViewAdvertisingEvent(info) {
        try {
          const resp = await viewAdEvent({ id: info.requestId })
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.viewDataAd = resp.result
          this.viewAd = true
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      async handleViewMeetingEvent(info) {
        try {
          const resp = await viewMeetingEvent({ id: info.requestId })
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.viewDataMeeting = resp.result
          this.viewMeeting = true
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // Search
      searchQuery() {
        this.saveQueryParam()
        this.loadData(1);
      },
      searchReset() {
        this.saveQueryParam()
        this.queryParam = {}
        this.loadData(1);
      },
      saveQueryParam() {
        this.originalQueryParam = { ...this.queryParam }
      }
    },
  }
</script>

<style lang="less">
  .book-list {
    .ant-table-row {
      cursor: pointer;
    }
  }
</style>
