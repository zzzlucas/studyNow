<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="内容" key="1">
          <a-spin :spinning="confirmLoading">
            <p v-html="info.context"></p>
          </a-spin>
        </a-tab-pane>

        <a-tab-pane tab="资讯图片" key="2">
          <yq-image
            v-for="(item,i) in info.addDocFiles"
            class="block-image-zj"
            size="40"
            fit="contain"
            :src="getOneImage(info.addDocFiles[i])"
          ></yq-image>
          <!-- <img
            v-for="(item,i) in info.addDocFiles"
            :src="getOneImage(info.addDocFiles[i])"
            alt="资讯图片"
          />-->
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import ABadge from 'ant-design-vue/es/badge/Badge'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import qs from 'querystring'
import Dom7 from 'dom7'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
//获取到文件地址
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import YqImage from '@comp/extend/YqImage'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    YqImage
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
      dataSourceA: [],
      url: {
        list: '/park.service/mgrNewsInfo/queryById'
      }
    }
  },
  watch: {
    $route(val) {
      this.loadData()
    }
  },
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    loadData() {
      getAction('/park.service/mgrNewsInfo/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.info = res.result
          // this.info.addDocFiles = getOneImage(this.info.addDocFiles)

          //把 附件组 变成数组
          //如何把做好的地址传到外面
          this.info.addDocFiles = this.info.addDocFiles.split(',')
          // console.log(this.info.addDocFiles)
          // for (const item of this.info.addDocFiles) {
          //   item = getOneImage(item)
          //   console.log(item)
          // }

          // console.log(this.info.addDocFiles)
          this.confirmLoading = false
        } else {
          // this.$message.error(res.message)
          console.log(res.message);
        }
      })
    },
    getOneImage,
    moment,
    filterDictText
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>
<style lang="less">
.block-image-zj {
  height: auto;
  // height: 130px;
}
</style>
<style lang="scss" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
.flex1 {
  margin-top: 15px;
  display: flex;
  height: 420px;

  .flex11 {
    width: 55%;
    height: 100%;
    margin-right: 10px;
  }
  .flex12 {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .ant-card {
      margin-bottom: 10px;
    }
  }
}
</style>