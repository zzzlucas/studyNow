<template>
  <a-modal
    class="announcementCustomModal"
    :width="modelStyle.width"
    :visible="visible"
    :bodyStyle="bodyStyle"
    @cancel="handleCancel"
    destroyOnClose
  >
    <template slot="title">
      <a-button icon="fullscreen" class="custom-btn" @click="handleClickToggleFullScreen" />
    </template>
    <a-card class="daily-article" :loading="loading">
      <a-card-meta title="审核项目">
        <!-- <a-card-meta
        :title="record.titile"
        :description="'发布人：'+record.sender + ' 发布时间： ' + record.sendTime">-->
      </a-card-meta>
      <a-divider />
      <!-- <span v-html="record.msgContent" class="article-content"></span> -->
      <!--  JCheckbox -->

      <a-row>
        <a-form-item label="是否通过" required>
          <a-radio-group @change="onChange" v-model="Rvalue">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="审核人" >
        <a-input></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="审核时间" >
        <a-date-picker @change="onChange" />
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="审核意见" required>
        <a-textarea :rows="4"></a-textarea >
        </a-form-item>
      </a-row>
    </a-card>
  </a-modal>
</template>

<script>
export default {
  name: 'SysAnnouncementModal',
  components: {},
  data() {
    return {
      Rvalue: '',
      title: '通知消息',
      record: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '35%',
        style: { top: '20px' },
        fullScreen: false
      }
    }
  },
  created() {},
  methods: {
    onChange() {
      console.log(this.Rvalue)
    },
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
    },
    /** 切换全屏显示 */
    handleClickToggleFullScreen() {
      let mode = !this.modelStyle.fullScreen
      if (mode) {
        this.modelStyle.width = '100%'
        this.modelStyle.style.top = '20px'
      } else {
        this.modelStyle.width = '35%'
        this.modelStyle.style.top = '20px'
      }
      this.modelStyle.fullScreen = mode
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
