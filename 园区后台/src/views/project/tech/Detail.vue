<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="企业基本概括" key="1">
          <a-spin :spinning="confirmLoading">
            <detail-list :col="2">
              <detail-list-item term="项目单位">{{ info.fillUnit }}</detail-list-item>
              <detail-list-item term="组织机构代码">{{ info.creditCode }}</detail-list-item>
              <detail-list-item term="单位地址">{{ info.unitAddress }}</detail-list-item>
              <detail-list-item term="成立年份">{{ info.setUpYear }}</detail-list-item>
              <detail-list-item
                term="企业登记注册类型"
              >{{ filterDictText(dict.companyRegisterTypeExt, info.companyRegisterType) }}</detail-list-item>

              <!-- <detail-list-item term="企业登记注册类型">{{ info.companyRegisterType }}</detail-list-item> -->
              <detail-list-item term="注册资金">{{ info.registerMoney }}万元</detail-list-item>
              <detail-list-item term="企业总资产">{{ info.totalAsset }}万元</detail-list-item>
              <detail-list-item term="固定资产净值">{{ info.fixedAsset }}万元</detail-list-item>
              <detail-list-item term="法定代表人">{{ info.legalPerson }}</detail-list-item>
              <detail-list-item term="联系电话（法人）">{{ info.legalTel }}</detail-list-item>
              <detail-list-item term="经办人">{{ info.agentPerson }}</detail-list-item>
              <detail-list-item term="联系电话（经办人）">{{ info.agentTel }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="电子信箱">{{ info.email }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="公司概况">{{ info.companyDescription }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="团队成员情况">{{ info.teamMemberDescription }}</detail-list-item>
            </detail-list>
            <detail-list :col="1">
              <detail-list-item term="年产值">{{ info.annualProductionValue }}万元</detail-list-item>
            </detail-list>
          </a-spin>
        </a-tab-pane>

        <a-tab-pane tab="项目基本信息" key="2">
          <detail-list :col="1">
            <detail-list-item term="建设项目名称">{{info.projectName}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="拟建设地址">{{info.getLandBuildingAddress}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="主要建设内容及规模">{{info.mainBuildingContent}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="亩均绩效评价">{{info.areaPerformance}}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="主要原料">{{info.mainMaterial}}</detail-list-item>

            <detail-list-item term="消耗量或产出量  ">{{info.materialCost}}</detail-list-item>
            <detail-list-item term="主要产品">{{info.gainArea}}</detail-list-item>
            <detail-list-item term="消耗量或产出量">{{info.productOutput}}</detail-list-item>
            <detail-list-item
              term="所属行业"
            >{{filterDictText(dict.industrySectorValueExt,info.industrySectorValue)}}</detail-list-item>
            <detail-list-item
              term="建设起止年限"
            >{{info.buildingBeginDate | formatDate }}~{{info.buildingEndDate | formatDate}}</detail-list-item>
            <detail-list-item term="是否人才项目">{{info.isTalentProject==1?'是':'否'}}</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="项目投资情况" key="3">
          <detail-list :col="2">
            <detail-list-item term="项目总投资">{{info.investAmount}}万元</detail-list-item>
            <detail-list-item term="项目用汇">{{info.projectUseInvest}}万美元</detail-list-item>
            <detail-list-item term="注册资本">{{info.registerCapital}}万元</detail-list-item>
            <detail-list-item term="是否外资">{{info.isForeignCapital==1?'是':'否'}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="固定资产投资">{{info.fixedAssetInvest}}万元</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="土建">{{info.civilWork}}</detail-list-item>
            <detail-list-item term="安装">{{info.install}}</detail-list-item>
            <detail-list-item term="设备">{{info.device}}</detail-list-item>
            <detail-list-item term="工程建设其他费用">{{info.projectBuilding}}</detail-list-item>
            <detail-list-item term="预备费">{{info.budget}}</detail-list-item>
            <detail-list-item term="建设期利息">{{info.buildingInterest}}</detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="铺底流动资金">{{info.bottomWorkingCapital}}</detail-list-item>
          </detail-list>
          <detail-list :col="2">
            <detail-list-item term="自有资金">{{info.freeCapital}}</detail-list-item>
            <detail-list-item term="股票/债券">{{info.sharesBond}}</detail-list-item>
            <detail-list-item term="银行贷款">{{info.bankLoan}}</detail-list-item>
            <detail-list-item term="其他">{{info.otherCapital}}</detail-list-item>
            <detail-list-item term="新增销售收入">{{info.newSale}}万元</detail-list-item>
            <detail-list-item term="新增利润">{{info.newProfit}}万元</detail-list-item>
            <detail-list-item term="新增税金">{{info.newTax}}万元</detail-list-item>
            <detail-list-item term="创汇">{{info.foreignEarning}}万美元</detail-list-item>
          </detail-list>
        </a-tab-pane>
        <a-tab-pane tab="项目用地情况" key="4">
          <detail-list :col="1">
            <detail-list-item term="固定资产投资">
              <p class="myinput">
                1.项目总用地面积
                {{info.allUseArea}}平方米；其中：新征用地面积
                {{info.newUseArea}}平方米。项目利用企业已有土地的，土地证等证书文件编号
                {{info.ownLandNumber}}。租赁使用其他企业厂房的，出租房土地证等证书文件编号
                {{info.rentLandNumber}}。
                <br />
                2.项目原建筑面积
                {{info.originalBuildArea}} 平方米，实施技术改造后建筑面积
                {{info.afterChangeBuildArea}} 平方米。新增建筑面积
                {{info.newBuildArea}} 平方米。实施技术改造{{info.isChangeBuild=='是'?null:'不'}}涉及主体建筑结构改变。
              </p>
            </detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="项目工艺流程">
              <span v-html="info.projectTechnologyFlow"></span>
            </detail-list-item>
          </detail-list>
          <detail-list :col="1">
            <detail-list-item term="备注">{{info.remark}}</detail-list-item>
          </detail-list>
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

export default {
  name: 'Detail',
  components: {
    PageLayout,
    ABadge,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {},
      url: {
        list: '/park.project/mgrProjectLand/queryById'
      }
    }
  },

  created() {
    this.loadData()
    initDictOptions('mgr-attr-addpl-companyRegisterType').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyRegisterTypeExt = res.result
      }
    })
    initDictOptions('industry_sector_value').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
  },
  watch: {
    $route(val) {
      this.loadData()
    }
  },
  methods: {
    loadData() {
      this.confirmLoading = true
      getAction('/park.project/mgrProjectLand/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.info = res.result
          this.confirmLoading = false
          // console.log(this.info)
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    moment,
    filterDictText
  },
  filters: {
    formatDate: function(time) {
      if (!time) return ''
      time = time ? moment(time).format('YYYY-MM-DD') : null
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