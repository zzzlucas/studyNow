<template>
  <page-layout :title="title">
    <!-- 应该在page-layout组件vue里写abadge -->
    <!-- <div style="width:1200px;margin:auto;"> -->
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1" @tabClick="getCustomerContact">
        <a-tab-pane tab="基本信息" key="1">
          <div class="div-detail-list">
            <detail-list>
              <detail-list-item term="企业简称">{{ info.customerAbbr }}</detail-list-item>
              <detail-list-item term="企业编号">{{ info.customerNo }}</detail-list-item>
              <detail-list-item term="法人">{{ info.legalPerson }}</detail-list-item>
              <detail-list-item term="单位电话">{{ info.telephone }}</detail-list-item>
              <detail-list-item term="招商人员">{{ info.merchantManager }}</detail-list-item>
              <detail-list-item term="服务人员">{{ info.servicer }}</detail-list-item>
              <detail-list-item term="所属项目">{{ info.caseId }}</detail-list-item>
              <detail-list-item term="入驻日期">{{ info.settledDate }}</detail-list-item>
              <detail-list-item term="所属楼宇">{{ info.buidling }}</detail-list-item>
            </detail-list>
          </div>
          <detail-list>
            <detail-list-item term="邮 箱">{{ info.email }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="网 址">{{ info.website }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="关联客户">{{ info.relCustListId }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="企业简介">{{ info.content }}</detail-list-item>
          </detail-list>
          <div
            :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
          >
            <!-- <a-button :style="{marginRight: '8px'}" @click="onClose">Cancel</a-button> -->
            <a-button @click="editZero()" type="primary">编辑</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="企业标识" key="2">
          <!-- <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columnsA"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click.stop>编辑</a>&nbsp;
              <a @click.stop>查看</a>
            </span>
          </a-table>-->
        </a-tab-pane>
        <a-tab-pane tab="附件" key="3">
          <detail-list>
            <detail-list-item term="附件">ASDASD</detail-list-item>
          </detail-list>
        </a-tab-pane>

        <a-tab-pane tab="分类信息" key="4">
          <detail-list>
            <detail-list-item term="公司性质">{{dictText.unitNatureText}}</detail-list-item>
            <detail-list-item term="行业类型">{{dictText.industryCategoryText}}</detail-list-item>
            <detail-list-item term="公司类型">{{dictText.organizationalText}}</detail-list-item>
            <detail-list-item term="技术领域">{{dictText.technicalFieldText}}</detail-list-item>
            <detail-list-item term="企业评级">{{dictText.enterpriseRatingText}}</detail-list-item>
            <detail-list-item term="注册类型">{{dictText.registrationTypeText}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="工商/税务信息" key="5">
          <detail-list>
            <detail-list-item term="注册日期">{{info.baseCustomerBusiness.registDate}}</detail-list-item>
            <detail-list-item term="注册资本">{{info.baseCustomerBusiness.registeredCapital}}</detail-list-item>
            <detail-list-item term="转化为人民币">{{info.baseCustomerBusiness.rCToRMB}}</detail-list-item>
            <!-- 这俩用字典搞一下还怎么说 -->
            <detail-list-item term="工商状态">{{dictText.bussinessStatusText}}</detail-list-item>
            <detail-list-item term="税务状态">{{dictText.taxStatusText}}</detail-list-item>
            <detail-list-item term="统一社会信用号码">{{info.baseCustomerBusiness.creditCode}}</detail-list-item>
            <detail-list-item term="注册地址">{{info.baseCustomerBusiness.registerAddress}}</detail-list-item>
            <detail-list-item term="注册地邮编">{{info.baseCustomerBusiness.registerAddressZipCode}}</detail-list-item>
            <detail-list-item term="经营范围">{{info.baseCustomerBusiness.businessScope}}</detail-list-item>
            <detail-list-item term="特许经营范围">{{info.baseCustomerBusiness.businessScopePermit}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <!-- <a-tab-pane tab="联系人" key="6"> -->
        <a-tab-pane tab="联系人" key="6">
          <!-- <a-button style="margin-bottom:20px;" type="primary" @click="getCustomerContact">获取联系人</a-button> -->
          <a-button style="margin-bottom:20px;" type="primary" @click="ShowAddCFormDrawer">新建联系人</a-button>
          <!-- :pagination="ipagination"      -->
          <a-table
            ref="table"
            size="default"
            bordered
            rowKey="id"
            :columns="columnsB"
            :dataSource="dataSource"
            :loading="loading"
            :customRow="customRow"
          >
            <span slot="action" slot-scope="text, record">
              <a @click.stop="editAddCFormDrawer(record, ...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <show-add-c-form-drawer ref="ShowAddCFormDrawer" @reload="getCustomerContact()"></show-add-c-form-drawer>
    <show-zero ref="ShowZero" @reload="getloadData"></show-zero>
    <show-c-card ref="ShowCCard"></show-c-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import ABadge from 'ant-design-vue/es/badge/Badge'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
// import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ShowZero from './modules/ShowZeroD'
import ShowAddCFormDrawer from './modules/ShowAddCFormDrawer'
import ShowCCard from './modules/ShowCCard'

import qs from 'qs'
import Dom7 from 'dom7'
export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem,
    ShowAddCFormDrawer,
    ShowZero,
    ShowCCard
  },
  data() {
    return {
      dataSource: [],
      ipagination: [],
      loading: false,
      info: {},
      // url: {
      //   list: '/park.project/mgrProjectInfo/queryById'
      // },
      custId: '',
      columnsA: [],
      columnsB: [
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
          title: '姓名',
          align: 'center',
          dataIndex: 'contactName'
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'sex',
          customRender: function(text) {
            if (text == 1) {
              return '男'
            } else if (text == 2) {
              return '女'
            } else {
              return text
            }
          }
        },
        {
          title: '手机',
          align: 'center',
          dataIndex: 'mobile'
        },
        {
          title: 'Email',
          align: 'center',
          dataIndex: 'email'
        },
        // {
        //   title: '证件类型',
        //   align: 'center',
        //   dataIndex: 'getArea'
        //   //暂改
        // },
        // {
        //   title: '证件号码',
        //   align: 'center',
        //   dataIndex: ''
        // },
        {
          title: '操作',
          dataIndex: 'action',
          width: 200,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dict: {
        bussinessStatus: [],
        taxStatus: [],
        unitNature: [],
        industryCategory: [],
        organizational: [],
        technicalField: [],
        enterpriseRating: [],
        registrationType: []
      },
      dictText: {
        bussinessStatusText: '',
        taxStatusText: '',
        unitNatureText: '',
        industryCategoryText: '',
        organizationalText: '',
        technicalFieldText: '',
        enterpriseRatingText: '',
        registrationTypeText: ''
      }
    }
  },

  // async created() {

  created() {
    if (typeof this.$route.params.id !== 'string') {
      this.$router.back()
      this.$message.warning('ID不正确')
      return false
    }
    this.getloadData()
    console.log('test start-------------')
    // this.getCustomerContact()
  },
  mounted() {},
  methods: {
    customRow(row) {
      return {
        on: {
          click: () => {
            row.customerName = this.info.customerName
            this.$refs.ShowCCard.detail(row)
            // this.$router.push({ name: 'industrial-parks-info-@id', params: { id: row.parkId } })
          }
        }
      }
    },
    // ShowCCard(row, e) {
    //   row.__key = Dom7(e.currentTarget)
    //     .parents('.ant-table-row')
    //     .data('row-key')
    //   this.$refs.ShowCCard.detail(row)
    // },
    getloadData() {
      getAction('/park.customer/baseCustomer/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.loading = false
          //info就是表单需要的东西
          this.info = res.result

          //这一步晚了，所以报错？ 要提前，虽然其实得到了数据
          this.initDictConfig()
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    editZero() {
      //在这里要把当前页面的custId传过去，在新页面自己获取
      // let
      this.$refs.ShowZero.detail(this.info)
    },
    //tab页6：联系人表格数据获取 与 绑定
    getCustomerContact(arg = 1) {
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      //获取到当前页面的custId
      let params = { custId: this.info.custId }
      // this.loading = true
      // console.log('test start 777777777777')
      console.log(this.info)
      console.log(this.info.baseCustomerBusiness)

      getAction('/park.customer/baseCustomerContact/list', params).then(res => {
        if (res.success) {
          // console.log('test start11111111')
          // console.log(res.result)
          this.dataSource = res.result
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        // this.loading = false
      })
    },
    editAddCFormDrawer(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      row.customerName = this.info.customerName
      this.$refs.ShowAddCFormDrawer.edit(row)
    },
    ShowAddCFormDrawer() {
      let row = { custId: this.$route.params.id, customerName: this.info.customerName }
      this.$refs.ShowAddCFormDrawer.add(row)
    },
    initDictConfig() {
      initDictOptions('unit_nature').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.unitNature = res.result
          this.dict.unitNature.forEach(this.switchFunctionU)
        }
      }),
        initDictOptions('industry_gategory').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.industryCategory = res.result
            this.dict.industryCategory.forEach(this.switchFunctionI)
          }
        }),
        initDictOptions('organizational').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.organizational = res.result
            this.dict.organizational.forEach(this.switchFunctionO)
          }
        }),
        initDictOptions('technical_field').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.technicalField = res.result
            this.dict.technicalField.forEach(this.switchFunctionT)
          }
        }),
        initDictOptions('enterprise_rating').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.enterpriseRating = res.result
            this.dict.enterpriseRating.forEach(this.switchFunctionE)
          }
        }),
        initDictOptions('registration_type').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.registrationType = res.result
            // this.dict.registrationType.forEach(this.switchFunctionR)
            for (const item of this.dict.registrationType) {
              if (item.value == this.info.baseCustomerType.registrationType)
                return (this.dictText.registrationTypeText = item.text)
              // break 无需
            }
          }
        }),
        initDictOptions('bussiness_status').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.bussinessStatus = res.result
            // this.dict.registrationType.forEach(this.switchFunctionR)
            for (const item of this.dict.bussinessStatus) {
              if (item.value == this.info.baseCustomerBusiness.bussinessStatus)
                return (this.dictText.bussinessStatusText = item.text)
              // break 无需
            }
          }
        }),
        initDictOptions('tax_status').then(res => {
          if (res.code === 0 && res.success) {
            this.dict.taxStatus = res.result
            // this.dict.registrationType.forEach(this.switchFunctionR)
            for (const item of this.dict.taxStatus) {
              if (item.value == this.info.baseCustomerBusiness.taxStatus)
                return (this.dictText.taxStatusText = item.text)
              // break 无需
            }
          }
        })
    },
    //数据字典匹配服务端传来数据值，返回数据字典字段，以下是forEach中的六条匹配规则
    switchFunctionU(item) {
      if (item.value == this.info.baseCustomerType.unitNature) return (this.dictText.unitNatureText = item.text)
    },
    switchFunctionI(item) {
      if (item.value == this.info.baseCustomerType.industryCategory)
        return (this.dictText.industryCategoryText = item.text)
    },
    switchFunctionO(item) {
      if (item.value == this.info.baseCustomerType.organizational) return (this.dictText.organizationalText = item.text)
    },
    switchFunctionT(item) {
      if (item.value == this.info.baseCustomerType.technicalField) return (this.dictText.technicalFieldText = item.text)
    },
    switchFunctionE(item) {
      if (item.value == this.info.baseCustomerType.enterpriseRating)
        return (this.dictText.enterpriseRatingText = item.text)
    },
    // switchFunctionR(item) {
    //   if (item.value == this.info.baseCustomerType.registrationType)
    //     return (this.dictText.registrationTypeText = item.text)
    // },
    // callback() {
    //   console.log('callback');
    //   // this.getCustomerContact()
    // },
    handleDelete() {}
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
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>