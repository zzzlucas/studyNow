<template>
  <page-layout :title="title">
    <!-- 应该在page-layout组件vue里写abadge -->
    <!-- <div style="width:1200px;margin:auto;"> -->
    <a-card :bordered="false">
      <!-- <a slot="extra" @click.prevent="addShowTwo">
        <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
      </a>-->
      <a-tabs defaultActiveKey="1">
        <!-- @change="callback" -->
        <a-tab-pane tab="企业基本信息" key="1">
          <a-spin :spinning="confirmLoading">
            <detail-list :col="2">
              <detail-list-item
                term="投资额"
              >{{ info.mgrProjectInvest?info.mgrProjectInvest.investAmount:null }}万元</detail-list-item>
              <detail-list-item
                term="注册投资"
              >{{ info.mgrProjectCust?info.mgrProjectCust.registerMoney:null }}万元</detail-list-item>
              <detail-list-item term="年产值">{{ info.annualProductionValue }}万元</detail-list-item>
              <detail-list-item term="年税金">{{ info.annualTaxes }}万元</detail-list-item>
              <!-- 这个租赁项目才有 -->
              <!-- v-if="info.projectType == 2" -->
              <!-- <detail-list-item term="重要程度" >{{ info.importance }}</detail-list-item> -->
              <detail-list-item
                term="是否外资"
              >{{ info.mgrProjectInvest?(info.mgrProjectInvest.isForeignCapital=="1"?"是":"否"):null }}</detail-list-item>
            </detail-list>
            <!-- 这个只有租赁才有吗 v-if projectType==2 点击跳转公共平台  -->
            <detail-list :col="1">
              <detail-list-item term="新建项目申请">
                <a href="#">查看新建项目申请信息</a>
              </detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="是否人才项目">{{ info.isTalentProject=="1"?"是":"否" }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item
                term="公司概况"
              >{{ info.mgrProjectCust?info.mgrProjectCust.companyDescription:null }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item
                term="团队成员情况"
              >{{ info.mgrProjectCust?info.mgrProjectCust.teamMemberDescription:null }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item
                term="备注"
              >{{ info.mgrProjectInvest?info.mgrProjectInvest.remark:null }}</detail-list-item>
            </detail-list>
          </a-spin>
        </a-tab-pane>
        <!-- 2222222222222222222222222 -->
        <a-tab-pane tab="跟踪记录" key="2">
          <detail-show-two></detail-show-two>
        </a-tab-pane>
        <!-- 2222222222222222222222222 -->
        <a-tab-pane tab="项目需求" key="3">
          <detail-list :col="2">
            <detail-list-item term="拿地面积" v-if="info.projectType == 1">{{info.gainArea}}㎡</detail-list-item>
            <detail-list-item term="租赁面积" v-if="info.projectType == 2">{{info.rentBuildArea}}㎡</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="联系人" key="4">
          <detail-list :col="2">
            <detail-list-item term="联系人">{{info.agentPerson}}</detail-list-item>
            <detail-list-item term="电话">{{info.agentTel}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="附件" key="5">
          <yq-image
            v-for="(item,i) in info.addDocFiles"
            class="block-image"
            size="40"
            fit="contain"
            :src="getOneImage(info.addDocFiles[i])"
          ></yq-image>
        </a-tab-pane>
        <a-tab-pane tab="公司注册信息" key="6">
          <detail-list :col="2">
            <detail-list-item term="拟注册公司名称">{{infoB?infoB.custName:null}}</detail-list-item>
            <detail-list-item term="拟注册资本">{{infoB?infoB.registerAssets:null}}</detail-list-item>
            <detail-list-item term="法人代表">{{infoB?infoB.legalPerson:null}}</detail-list-item>
            <detail-list-item term="联系方式">{{infoB?infoB.telephone:null}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="拟注册地址">{{infoB?infoB.registerAddress:null}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="经营范围">{{infoB?infoB.businessScope:null}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="股权架构(法人股东）" key="7">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns1"
            :dataSource="dataSourceA"
            :pagination="false"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="ShowOne(record,...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handelDelete(record)">删除</a>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="股权架构(个人股东）" key="8">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns2"
            :dataSource="dataSourceB"
            :pagination="false"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="ShowOne(record,...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handelDelete(record)">删除</a>
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="团队成员具体信息" key="9">
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columns3"
            :dataSource="dataSourceC"
            :pagination="false"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="ShowOne(record,...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handelDelete(record)">删除</a>
            </span>
          </a-table>
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
import DetailShowTwo from './modules/DetailShowTwoM'
import qs from 'querystring'
import Dom7 from 'dom7'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import YqImage from '@comp/extend/YqImage'

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    DetailShowTwo,
    YqImage
  },
  data() {
    return {
      // dataSource: [],
      // ipagination: [],
      confirmLoading: false,
      loading: false,
      dataSourceA: [],
      dataSourceB: [],
      dataSourceC: [],
      info: {},
      infoB: {},
      columns1: [
        {
          title: '序号',
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'equrityRatio'
        },
        {
          title: '已授权发明专利数',
          align: 'center',
          dataIndex: 'inventPatentMount'
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      columns2: [
        {
          title: '序号',
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'equrityRatio'
        },
        {
          title: '学历',
          align: 'center',
          dataIndex: 'educationBackground'
        }
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      columns3: [
        {
          title: '序号',
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '职务',
          align: 'center',
          dataIndex: 'position'
        },
        {
          title: '出生年月',
          align: 'center',
          dataIndex: 'birthday'
        }
      ],
      url: {
        list: '/park.project/mgrProjectInfo/queryProjectById'
      }
    }
  },

  created() {
    this.loadDataA()
    this.loadDataB()
    this.getListA()
    this.getListB()
    this.getListC()
  },
  watch: {
    $route(val) {
      this.loadDataA()
      this.loadDataB()
      this.getListA()
      this.getListB()
      this.getListC()
    }
  },
  methods: {
    loadDataA() {
      this.confirmLoading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.info = res.result
          if (this.info.mgrProjectInvest.addDocFiles) {
            this.info.addDocFiles = this.info.mgrProjectInvest.addDocFiles.split(',')
          }
          this.confirmLoading = false
          // console.log(this.info)
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    loadDataB() {
      //二次申请之前，这里是请求为空
      getAction('/project/mgrCustRegisterInfo/queryById', { projectId: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.infoB = res.result
          console.log(this.infoB)
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    getOneImage,
    getListA() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '1' }).then(
        res => {
          if (res.success) {
            this.dataSourceA = res.result
            console.log('this.dataSourceA')
            console.log(this.dataSourceA)
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    getListB() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '2' }).then(
        res => {
          if (res.success) {
            this.dataSourceB = res.result
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    getListC() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '3' }).then(
        res => {
          if (res.success) {
            this.dataSourceC = res.result
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    //新增
    addShowOne() {
      this.$refs.ShowOne.add()
    },
    addShowTwo() {
      this.$refs.ShowTwo.add()
    },
    addShowThree() {
      this.$refs.ShowThree.add()
    },
    //编辑
    ShowOne(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowOne.detail(row)
    },
    ShowTwo(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowTwo.detail(row)
    },
    ShowThree(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowThree.detail(row)
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        processing: '进行中',
        success: '完成',
        failed: '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-row .ant-col-sm-12 {
  height: 36px;
}
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