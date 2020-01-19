<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <!-- <a slot="extra" @click.prevent="addShowOne">
        <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
      </a>-->
      <a-tabs defaultActiveKey="1" v-model="activeKey">
        <a-tab-pane tab="政策原文" key="1">
          <a-spin :spinning="confirmLoading">
            <p v-html="info.context"></p>
          </a-spin>
        </a-tab-pane>
        <a-tab-pane tab="扶持力度" key="2">
          <p v-html="info.support"></p>
        </a-tab-pane>
        <a-tab-pane tab="申报条件" key="3">
          <p v-html="info.conditions"></p>
        </a-tab-pane>
        <a-tab-pane tab="申报程序" key="4">
          <p v-html="info.procedureFlow"></p>
        </a-tab-pane>
        <a-tab-pane tab="提交材料" key="5">
          <p v-html="info.material"></p>
        </a-tab-pane>
        <a-tab-pane tab="受理业务" key="6">
          <p v-html="info.services"></p>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" type="primary" @click="AddBSupportForm">编辑当前页</a-button>
      </a-tabs>
    </a-card>
    <add-b-support-form ref="AddBSupportForm" @reload="load"></add-b-support-form>
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
import AddBSupportForm from './AddBSupportForm'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    AddBSupportForm
  },
  data() {
    return {
      activeKey: '1',
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
      dataSourceA: [],
      url: {
        list: '/park.service/mgrPolicyInfo/queryById'
      }
    }
  },
  created() {
    this.load()
  },
  mounted() {},
  watch: {
    $route(val) {
      this.load()
    }
  },
  methods: {
    load() {
      getAction('/park.service/mgrPolicyInfo/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.info = res.result
          // console.log(info.context)
          this.confirmLoading = false
        } else {
          // this.$router.back()
          // this.$message.error(res.message)
          console.log(res.message)
        }
      })
    },
    AddBSupportForm() {
      //打开时参数传入当前页签key
      // console.log(this.activeKey)
      this.$refs.AddBSupportForm.detail(this.activeKey)
    },
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