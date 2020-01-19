<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <h3>{{model.contentTitle}}</h3>
      <a-divider></a-divider>
      <p v-html="model.content"></p>
      <div>
        <p style="font-weight:bold">平台公众号</p>
        <img :src="getImgPre(model.imageList)" alt style="height:200px;width:auto" />
      </div>
    </a-card>
  </a-drawer>
</template>

<script>
import { getAction } from '@/api/manage'

export default {
  name: '',
  data() {
    return {
      title: '详情',
      visible: false,
      model: {},
      url: {
        content: '/platform/platformBody.controller/queryContent'
      }
    }
  },
  created() {},
  methods: {
    getImgPre(file) {
      console.log(file)
      if (file) {
        file = file.split(',')[0]
        return window._CONFIG.imgDomainURL + file
      } else {
        return process.env.BASE_URL + 'images/iu95.jpg'
      }
    },
    detail(row) {
      getAction(this.url.content, { title: '关于我们', contentTitle: row }).then(res => {
        if (res.code === 200) {
          this.model = Object.assign({}, res.result)
          this.visible = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.editor.content = ''
    }
  }
}
</script>

<style lang="less">
.ant-calendar-time-picker-panel {
  .ant-calendar-time-picker-select:last-child {
    display: none !important;
  }
}
.ant-calendar-time-picker-column-3 {
  .ant-calendar-time-picker-select {
    width: 50% !important;
  }
}
</style>
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
