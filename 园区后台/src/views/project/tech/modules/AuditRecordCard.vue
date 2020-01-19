<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :footer="null"
    style="top: 250px;"
  >
    <a-card :bordered="false">
      <a-spin :spinning="confirmLoading">
        <detail-list :col="1">
          <detail-list-item
            term="是否通过"
          >{{ filterDictText(dict.approvalResultExt, info.approvalResult) }}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="审核人">{{info.approvalUserName}}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="审核时间">{{info.approvalDate}}</detail-list-item>
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="审核意见">{{info.approvalDes}}</detail-list-item>
        </detail-list>
      </a-spin>
    </a-card>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DetailList from '@/components/tools/DetailList'
import { getAction, putAction } from '@/api/manage'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
const DetailListItem = DetailList.Item

export default {
  mixins: [JeecgListMixin],
  name: '',
  components: { DetailList, DetailListItem },
  data() {
    return {
      confirmLoading: false,
      // form: this.$form.createForm(this),
      title: '信息明细',
      record: {},
      dict: {
        tracker: [],
        trackMethod: []
      },
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
      url: {
        list: '/park.project/mgrProjectTrace/list'
      }
    }
  },
  created() {},
  methods: {
    filterDictText,
    showCard(record) {
      this.$refs.AuditRecordCard.detail(record)
    },
    handleOk() {},
    detail(record) {
      this.visible = true
      this.record = record
      this.confirmLoading = true
      if (this.record) {
        getAction('/park.workflow/baseWorkFlowProjectDetail/queryById', {
          id: this.record.projectWorkFlowDetailId
        }).then(res => {
          if (res.code === 200) {
            this.info = res.result
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
      this.dictText.approvalResultText = ''
    },
    initDictConfig() {
      initDictOptions('approval_result').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.approvalResultExt = res.result
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
