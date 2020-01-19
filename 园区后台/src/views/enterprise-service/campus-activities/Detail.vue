<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="活动概况" key="1">
          <a-spin :spinning="confirmLoading">
            <detail-list :col="1">
              <detail-list-item term="开始时间">{{ info.begDate | formatDate }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="结束时间">{{ info.endDate | formatDate }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="活动地点">{{ info.address }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="主办单位">{{ info.hostUnit }}</detail-list-item>
              <detail-list :col="1"></detail-list>
              <detail-list-item term="报名情况">{{ info.num }}</detail-list-item>
            </detail-list>
          </a-spin>
        </a-tab-pane>

        <a-tab-pane tab="活动图片" key="2">
          <yq-image
            v-for="(item,i) in info.addDocFiles"
            class="block-image"
            size="40"
            fit="contain"
            :src="getOneImage(info.addDocFiles[i])"
          ></yq-image>
        </a-tab-pane>

        <a-tab-pane tab="参与情况" key="3">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="false"
            :loading="loading"
            @change="handleTableChange"
          >
            <!-- :customRow="customRow" -->
            <span slot="action" slot-scope="text, record">
              <a v-if="record.auditStatus == 0" @click.stop="showConfirm(record)">审核</a>
              <span v-if="record.auditStatus == 1">审核通过</span>
              <span v-if="record.auditStatus == 2">审核不通过</span>
            </span>
          </a-table>
        </a-tab-pane>

        <a-tab-pane tab="活动介绍" key="4">
          <p style="word-break:break-all" v-html="info.context"></p>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" type="primary" @click="AddActivitiesForm">编辑活动</a-button>
      </a-tabs>
    </a-card>
    <!-- 表单 -->
    <add-activities-form ref="AddActivitiesForm" @reload="loadData"></add-activities-form>
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
import AddActivitiesForm from './AddActivitiesForm'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import YqImage from '@comp/extend/YqImage'

export default {
  name: '',
  mixins: [JeecgListMixin],
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    AddActivitiesForm,
    YqImage
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
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
          title: '报名人',
          align: 'center',
          dataIndex: 'personName'
        },
        {
          title: '报名时间',
          align: 'center',
          dataIndex: 'signupDate'
        },
        {
          title: '参加人数',
          align: 'center',
          dataIndex: 'num'
        },
        {
          title: '手机号码',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '联系邮箱',
          align: 'center',
          dataIndex: 'email'
        },
        {
          title: '审核状态',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          dataIndex: 'auditStatus'
          // customRender: text => {
          //   return filterDictText(this.dict.trackMethodDictOptions, text)
          // }
        }
      ],
      url: {
        list: '/park.service/mgrActivitySignup/queryById'
      }
    }
  },
  watch: {
    $route(val) {
      this.loadData()
    }
  },
  created() {
    this.confirmLoading = true
  },
  mounted() {},
  methods: {
    getOneImage,
    loadData(arg) {
      getAction('/park.service/mgrActivityInfo/queryById', { activityId: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.info = res.result
          if (this.info.addDocFiles) {
            this.info.addDocFiles = this.info.addDocFiles.split(',')
          }
          this.confirmLoading = false
          // console.log(this.info)
        } else {
          console.log(res.message);
          // this.$router.back()
          // this.$message.error(res.message)
        }
      })
      console.log('object1111')
      if (arg === 1) {
        this.ipagination.current = 1
      }
      // var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, { activityId: this.$route.params.id }).then(res => {
        if (res.success) {
          this.dataSource = res.result
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    moment,
    filterDictText,
    AddActivitiesForm() {
      this.$refs.AddActivitiesForm.detail()
    },
    showConfirm(row, e) {
      const that = this
      this.$confirm({
        okText: '通过',
        cancelText: '拒绝',
        title: '审核报名信息',
        content: '确认通过此条报名信息吗？',
        onOk() {
          return new Promise((resolve, reject) => {
            let params = { id: row.id, auditStatus: '1' }
            params = qs.stringify(params)
            putAction('/park.service/mgrActivitySignup/changeStatus', params).then(res => {
              if (res.code === 200) {
                that.loadData()
                resolve()
              } else {
                reject()
                that.$message.error(res.message)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {
          return new Promise((resolve, reject) => {
            let params = { id: row.id, auditStatus: '2' }
            params = qs.stringify(params)
            putAction('/park.service/mgrActivitySignup/changeStatus', params).then(res => {
              if (res.code === 200) {
                that.loadData()
                resolve()
              } else {
                reject()
                that.$message.error(res.message)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        }
      })
    }
  },
  filters: {
    formatDate: function(time) {
      if (!time) return ''
      time = time ? moment(time).format('YYYY年MM月DD日 HH:mm') : null
      return time
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>
<style lang="less">
.block-image {
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