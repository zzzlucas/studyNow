<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <h2>{{model.productName}}</h2>
      <!-- <span>
        <a-icon type="clock-circle" style="font-size:13px;margin-right:3px;margin-bottom:15px" />
        发布时间：{{moment(model.createTime).format('YYYY-MM-DD HH:mm')}}
      </span>-->
      <span>
        <a-icon type="bank" style="font-size:13px;margin-right:1px;margin-bottom:15px" />
        单位：{{model.createrUnit}}
      </span>
      <span style="margin-left:50px;">
        <a-icon type="user" style="font-size:13px;margin-right:1px;margin-bottom:15px" />
        作者：{{model.productCreater}}
      </span>
      <span style="margin-left:50px;">
        <a-icon type="clock-circle" style="font-size:13px;margin-right:1px;margin-bottom:15px" />
        实施日期：{{model.inventTime}}
      </span>
      <span style="margin-left:50px;">
        <a-icon type="file-search" style="font-size:13px;margin-right:1px;margin-bottom:15px" />
        案例类别：{{filterCategoryText( categoryList,model.categoryId)}}
      </span>
      <!-- 图片列表 -->
      <!-- <a-divider /> -->
      <div class="detail-img-box">
        <image-list
          v-if="model.imageList"
          :data="model.imageList"
          previewKey="image"
          height="200px"
        />
      </div>
      <a-divider />
      <p v-html="model.productIntroduce"></p>
    </a-card>
  </a-drawer>
</template>

<script>
import ImageList from '@/components/zj/ImageList'
import { getAction } from '@/api/manage'
import moment from 'moment'

export default {
  name: '',
  props: { categoryList: Array },
  components: { ImageList },
  data() {
    return {
      title: '案例详情',
      visible: false,
      model: {},

      url: {
        // content: '/platform/platformBody.controller/queryContent',
        categoryUrl: '/platform/platformProduct/controller/queryCategorys',
        productIntroduce: '/platform/platformProduct/controller/queryContent'
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
      this.visible = true
      getAction(this.url.productIntroduce, { id: row.id }).then(res => {
        if (res.code == 200) {
          this.model = res.result
          console.log(this.model)
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
.detail-img-box {
  margin: 10px auto;
  width: 100%;
  .image-list-box {
    img {
      cursor: pointer;
    }
  }
}
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
