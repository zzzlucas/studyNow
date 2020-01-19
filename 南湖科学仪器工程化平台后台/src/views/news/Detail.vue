<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <h2>{{model.newsTitle}}</h2>
      <span>
        <a-icon type="clock-circle" style="font-size:13px;margin-right:3px;margin-bottom:15px" />
        发布时间：{{moment(model.publishTime).format('YYYY-MM-DD HH:mm')}}
      </span>
      <span style="margin-left:50px;">
        <a-icon type="file-search" style="font-size:13px;margin-right:1px;margin-bottom:15px" />
        资讯类别：{{filterCategoryText( categoryList,model.categoryId)}}
      </span>
      <div class="content" v-html="model.content"></div>
    </a-card>
  </a-drawer>
</template>

<script>
import { getAction } from '@/api/manage'
import moment from 'moment'

export default {
  name: '',
  props: { categoryList: Array },
  data() {
    return {
      title: '资讯详情',
      visible: false,
      model: {},

      url: {
        content: '/platform/platformBody.controller/queryContent',
        categoryUrl: '/platform/platformNews/controller/queryCategorys'
      }
    }
  },
  created() {},
  methods: {
    filterCategoryText(dictOptions, text) {
      if (dictOptions instanceof Array) {
        for (let dictItem of dictOptions) {
          if (text == dictItem.categoryId) {
            return dictItem.categoryName
          }
        }
      }
      return text
    },
    moment,
    detail(row) {
      this.model = Object.assign({}, row)
      this.visible = true
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  // font-size: 15px;
}
</style>
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
