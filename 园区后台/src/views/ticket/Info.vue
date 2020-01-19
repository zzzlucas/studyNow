<template>
  <div class="ticket-view">
    <a-card
      class="ticket-header-container"
      :bordered="false"
      :loading="loading">
      <!-- Nav (unclickable) -->
      <a-breadcrumb>
        <a-breadcrumb-item>工单管理</a-breadcrumb-item>
        <a-breadcrumb-item>{{ filterDictText(types.order_type, data.orderType) }}</a-breadcrumb-item>
        <a-breadcrumb-item>工单详情</a-breadcrumb-item>
      </a-breadcrumb>
      <!-- Layout Header -->
      <a-row class="ticket-header-content">
        <!-- Header left -->
        <a-col :xl="18">
          <!-- Content box -->
          <div class="ticket-header-content-box">
            <!-- Icon column -->
            <div class="ticket-header-content-box-left">
              <a-avatar class="ticket-header-icon">
                <a-icon type="mail" theme="twoTone" />
              </a-avatar>
            </div>
            <!-- Info column -->
            <div class="ticket-header-content-box-right">
              <h1>主题：{{ data.title }}</h1>
              <a-row>
                <a-col :xl="12">工单类别：{{ filterDictText(types.order_type, data.orderType) }}</a-col>
                <a-col :xl="12">工单编号：{{ data.orderId }}</a-col>
                <a-col :xl="12">负责人：{{ data.principalUser }}</a-col>
                <a-col :xl="12">提单时间：{{ data.createTime }}</a-col>
                <a-col :xl="12">来源渠道：手动创建</a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <!-- Header right -->
        <a-col class="ticket-header-action-column" :xl="6">
          <!-- Action -->
          <div class="ticket-action-container">
            <a-button-group>
              <a-button @click="handleChangeStatus('1')" v-if="data.status === '0'|| data.status === '2' || data.status === '3'">{{ data.status === '0' ? '受理' : '重新受理' }}</a-button>
              <a-button @click="handleChangeStatus('2')" v-if="data.status === '0' || data.status === '1'">退回</a-button>
              <a-button @click="handleChangeStatus('3')" v-if="data.status === '1'">完成</a-button>
            </a-button-group>
            <a-dropdown>
              <a class="ant-dropdown-link">更多<a-icon type="down" /></a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="handleEdit">编辑</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="确定删除吗?" @confirm="() => handleDel(data)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div class="ticket-status-container">
            状态
            <span>{{ filterDictText(this.types.order_status, data.status) }}</span>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <!-- Layout content -->
    <div class="ticket-content-container">
      <a-tabs defaultActiveKey="detail">
        <a-tab-pane tab="详情" key="detail">
          <a-card
            :bordered="false"
            :loading="loading">
            <p class="detail-heading detail-row">主题：{{ data.title }}</p>
            <template v-if="isCurrentTypeInProject">
              <p class="detail-row">企业名称：{{ data.custName }}</p>
              <p class="detail-row">经办人：{{ data.contactName }}</p>
              <p class="detail-row">联系方式：{{ data.mobile }}</p>
              <p class="detail-row">项目名称：{{ data.title }}</p>
            </template>
            <template v-if="isCurrentTypeInProjectPeriod">
              <p class="detail-row">企业名称：{{ data.custName }}</p>
              <p class="detail-row">经办人：{{ data.contactName }}</p>
              <p class="detail-row">联系方式：{{ data.mobile }}</p>
              <p class="detail-row">项目名称：{{ data.title }}</p>
              <p class="detail-row">期限：{{ data.begDate }} - {{ data.endDate }}</p>
            </template>
            <div class="detail-row">问题描述：
              <br>
              <br>
              <div v-html="data.content"></div>
            </div>
            <div class="detail-row">文件：</div>
            <j-upload ref="uploader" />
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="处理记录" key="records">
          <a-card
            title="工单处理记录"
            :bordered="false"
            :loading="recordLoading">
            <a-button type="primary" slot="extra" icon="plus" shape="circle" @click="handleAddOperate('process')" />
            <a-timeline>
              <a-timeline-item v-for="record in records.process" :key="record.recordId">
                <p class="timeline-heading">{{ record.createTime }} 【{{ record.createUserName }}】
                  <template v-if="record.operateName == null">
                    添加了信息
                  </template>
                  <template v-else>
                    将工单状态设置为{{ getProcessStatus(record.operateName) }}
                  </template>
                </p>
                <p class="timeline-content" v-if="record.remark != null">{{ record.remark }}</p>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="反馈记录" key="feedback">
          <a-card
            title="工单反馈记录"
            :bordered="false"
            :loading="recordLoading">
            <a-button type="primary" slot="extra" icon="plus" shape="circle" @click="handleAddOperate('feedback')" />
            <a-timeline>
              <a-timeline-item v-for="record in records.feedback" :key="record.recordId">
                <p class="timeline-heading">{{ record.createTime }} 【{{ record.createUserName }}】添加了信息</p>
                <p class="timeline-content" v-if="record.remark">{{ record.remark }}</p>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- Add/Edit form -->
    <ticket-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- Operate Add form -->
    <ticket-operate-edit-form
      ref="operateModalForm"
      @submit="handleEditSubmit" />
  </div>
</template>

<script>
  import JUpload from '@/components/jeecg/JUpload'
  import TicketEditForm from '@views/ticket/components/TicketEditForm'
  import TicketOperateEditForm from '@views/ticket/components/TicketOperateEditForm'
  import { filterDictText } from '@/components/dict/JDictSelectUtil'
  import ViewMixin from '@/mixins/View'
  import Mixin from './mixin'
  import { url, viewInfo, changeStatusInfo, listOperateProcess, listOperateFeedback } from './api'

  export default {
    mixins: [
      ViewMixin,
      Mixin,
    ],
    components: {
      JUpload,
      TicketEditForm,
      TicketOperateEditForm,
    },
    data() {
      return {
        // Url
        url: url.info,
        // Types
        dictesCreateFields: ['order_type', 'order_status'],
        // Data
        recordLoading: true,
        records: {
          process: [],
          feedback: [],
        },
      }
    },
    computed: {
      isCurrentTypeInProjectPeriod() {
        return this.orderTypeProjectPeriod.includes(this.data.orderType)
      },
      isCurrentTypeInProject() {
        return this.orderTypeProject.includes(this.data.orderType)
      },
    },
    methods: {
      // Route
      getRouteParams() {
        return { orderId: this.$route.params.id }
      },
      // Filter
      filterDictText,
      getProcessStatus(operateName) {
        return filterDictText(this.types.order_status, operateName)
      },
      // Request data
      async loadData() {
        this.loadDetail().then(() => {
          this.$refs.uploader.initFileList(this.data.addDocFiles)
        })
        this.loadRecords()
      },
      async loadDetail() {
        this.loading = true
        try {
          const resp = await viewInfo(this.getRouteParams())
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.data = resp.result
        } catch (e) {
          this.$message.error(e.message)
        }
        this.loading = false
      },
      async loadRecords() {
        this.recordLoading = true
        try {
          const promises = [
            listOperateProcess({ orderId: this.getRouteParams().orderId }),
            listOperateFeedback({ orderId: this.getRouteParams().orderId }),
          ]
          const respCollection = await Promise.all(promises)
          for (const [i, resp] of respCollection.entries()) {
            if (!resp.success) {
              throw new Error(resp.message)
            }
            const records = resp.result
            if (i === 0) {
              this.records.process = records
            } else {
              this.records.feedback = records
            }
          }
        } catch (e) {
          this.$message.error(e.message)
        }
        this.recordLoading = false
      },
      // Action
      handleAddOperate(type) {
        this.$refs.operateModalForm.add();
        this.$refs.operateModalForm.type = type
        this.$refs.operateModalForm.disableSubmit = false;
      },
      // Change status
      async handleChangeStatus(status) {
        try {
          const params = { status, orderId: this.data.orderId }
          const resp = await changeStatusInfo(params)
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.loadData()
        } catch (e) {
          this.$message.error(e.message)
        }
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    },
    async created() {
      if (!this.checkRouteConfig()) {
        return
      }
      await this.initDictConfig()
      this.loadData()
    }
  }
</script>

<style lang="less">
  .ticket-view {
    // Remove extra margin on parent layout
    margin: -12px -12px 0;

    // --Layout Header--
    .ticket-header-content {
      margin-top: 20px;
    }
    // Header content box
    .ticket-header-content-box {
      display: flex;
      h1 {
        line-height: 1;
        font-size: 20px;
        font-weight: bold;
      }
      // Left side
      // Icon
      .ticket-header-icon {
        background: rgb(24, 144, 255);
      }
      // Right side
      .ticket-header-content-box-right {
        padding-left: 10px;
        .ant-row {
          margin-top: 20px;
          > div {
            margin: 5px 0;
          }
        }
      }
    }
    // Header action column
    .ticket-header-action-column {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      // Buttons
      .ticket-action-container {
        .ant-btn-group {
          margin-right: 15px;
        }
      }
      // Status
      .ticket-status-container {
        margin-top: 20px;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        span {
          margin-top: 5px;
          color: #000000;
          font-size: 20px;
        }
      }
    }

    // --Layout Content--
    .ticket-content-container {
      background: #f0f2f5;
      // Tab
      .ant-tabs-bar {
        background: #fff;
        padding-left: 32px;
        padding-right: 32px;
        .ant-tabs-nav-container {
          margin-top: 0;
        }
      }
      // Tab panel
      .ant-tabs-content {
        // Card
        .ant-card {
          margin: 20px 35px;
        }
        // Detail
        .detail-row {
          margin: 10px 0;
        }
        .detail-heading {
          font-size: 18px;
        }
        .ant-upload {
          display: none;
        }
      }
    }
  }
</style>