<template>
  <!-- 跟踪记录表单  下拉2  表格里的查看卡片-->

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
        <detail-list :col="2">
          <detail-list-item term="企业名称">{{info.customerName}}</detail-list-item>
          <detail-list-item term="姓名">{{info.contactName}}</detail-list-item>
          <detail-list-item term="手机">{{info.mobile}}</detail-list-item>
          <detail-list-item term="Email">{{info.email}}</detail-list-item>
          <detail-list-item term="微信号">{{info.weChat}}</detail-list-item>
          <detail-list-item term="QQ">{{info.qq}}</detail-list-item>
          <detail-list-item term="性别">{{info.sex}}</detail-list-item>
          <detail-list-item term="职务">{{info.position}}</detail-list-item>
        </detail-list>
        <!-- <detail-list>
          <detail-list-item term="个人简介">{{info.trackMethod}}</detail-list-item>
        </detail-list>-->
      </a-spin>
    </a-card>
  </a-modal>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DetailList from '@/components/tools/DetailList'
import { getAction, putAction } from '@/api/manage'
const DetailListItem = DetailList.Item

export default {
  mixins: [JeecgListMixin],
  name: 'SysAnnouncementModal',
  components: { DetailList, DetailListItem },
  data() {
    return {
      confirmLoading: false,
      // form: this.$form.createForm(this),
      title: '查看联系人',
      record: {},
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
    handleOk() {},
    detail(record) {
      this.visible = true
      // this.record = record
      this.confirmLoading = true
      // console.log(this.record)
      //定义获取小卡片内容的方法

      getAction('/park.customer/baseCustomerContact/queryById', { id: record.contactId }).then(res => {
        if (res.code === 200) {
          this.confirmLoading = false
          this.info = res.result
          this.info.customerName = record.customerName  
          // console.log(this.info)
          // this.initDictConfig()
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.info = {}
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
