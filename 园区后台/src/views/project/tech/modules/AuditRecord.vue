<template>
  <a-modal
    :title="title"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :footer="null"
    style="top: 200px;"
  >
    <a-card :bordered="false">
      <a-spin :spinning="confirmLoading">
        <a-table
          ref="table"
          size="default"
          bordered
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <!-- :customRow="customRow" -->
          <span slot="action" slot-scope="text, record">
            <a @click="showCard(record)">查看</a>
          </span>
        </a-table>
      </a-spin>
    </a-card>
    <audit-record-card ref="AuditRecordCard"></audit-record-card>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction, putAction } from '@/api/manage'
import AuditRecordCard from './AuditRecordCard'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  mixins: [JeecgListMixin],
  name: '',
  components: { AuditRecordCard },
  data() {
    return {
      confirmLoading: false,
      // form: this.$form.createForm(this),
      title: '审核信息',
      record: {},
      dict: {},
      dictText: {
        trackerText: '',
        trackMethodText: ''
      },
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      },
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      info: {},
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '审核人',
          align: 'center',
          dataIndex: 'approvalUserName'
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'approvalResultName',
          // customRender: text => {
          //   return filterDictText(this.dict.approvalResult, text)
          // }
        },
        {
          title: '审核时间',
          align: 'center',
          dataIndex: 'approvalDate'
          //   customRender: text => {
          //     return filterDictText(this.dict.trackMethodDictOptions, text)
          //   }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {},
  methods: {
    showCard(record) {
      this.$refs.AuditRecordCard.detail(record)
    },
    handleOk() {},
    detail(record) {
      this.visible = true
      this.record = record
      this.confirmLoading = true
      if (this.record) {
        getAction('/park.workflow/baseWorkFlowProject/listAudit', { projectId: this.record.projectId }).then(res => {
          if (res.code === 200) {
            this.dataSource = res.result.records
            // delete this.dataSource[0]
            this.ipagination.total = res.result.total
            this.initDictConfig()
          } else {
            this.$message.error(res.message)
          }
          this.confirmLoading = false
        })
      }
    },
    handleCancel() {
      this.visible = false
      this.info = {}
      this.dictText.trackerText = ''
      this.dictText.trackMethodText = ''
    },
    initDictConfig() {
      initDictOptions('approval_result').then(res => {
        if (res.success) {
          this.dict.approvalResult = res.result
        }
      })
    }
  }
}
</script>

<style lang="less">
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
