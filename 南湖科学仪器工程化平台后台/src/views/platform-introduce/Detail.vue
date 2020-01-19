<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <h3>{{model.contentTitle}}</h3>
      <a-divider></a-divider>
      <p v-html="model.content"></p>
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
        add: '',
        add1: '/platform/platformBody.controller/add_1',
        add2: '/platform/platformBody.controller/add_2',
        add3: '/platform/platformBody.controller/add_3',
        add4: '/platform/platformBody.controller/add_4',
        edit: '/platform/platformBody.controller/edit',
        content: '/platform/platformBody.controller/queryContent'
      }
    }
  },
  created() {
    switch (this.$route.path) {
      case '/platform-introduce':
        this.url.add = this.url.add1
        this.params = '平台简介'
        break
      case '/platform-function':
        this.url.add = this.url.add2
        this.params = '平台功能'
        break
      case '/platform-advantage':
        this.url.add = this.url.add3
        this.params = '条件优势'
        break
      case '/about-us':
        this.url.add = this.url.add4
        break
    }
  },
  watch: {
    $route() {
      switch (this.$route.path) {
        case '/platform-introduce':
          this.url.add = this.url.add1
          this.params = '平台简介'
          break
        case '/platform-function':
          this.url.add = this.url.add2
          this.params = '平台功能'
          break
        case '/platform-advantage':
          this.url.add = this.url.add3
          this.params = '条件优势'
          break
        case '/about-us':
          this.url.add = this.url.add4
          break
      }
    }
  },
  methods: {
    detail(row) {
      getAction(this.url.content, { title: this.params, contentTitle: row }).then(res => {
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
