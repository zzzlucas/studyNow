<template>
  <a-drawer
    title="招聘详情"
    width="40%"
    maskClosable
    destroyOnClose
    :visible="visible"
    @close="handleCancel"
  >
    <a-card :bordered="false">
      <a-spin :spinning="confirmLoading">
        <detail-list :col="2">
          <detail-list-item term="职位名称">{{info.jobName}}</detail-list-item>
          <detail-list-item term="公司">{{info.customerName}}</detail-list-item>
          <!-- {{info.contactName}} -->
          <a-divider />
          <!-- <detail-list-item term="行业">{{filterDictText(dict.industryGategory, info.jobType)}}</detail-list-item> -->
          <detail-list-item term="行业">{{filterDictText(dict.industryGategory, info.jobType)}}</detail-list-item>
          <!-- <button @click="cc">111</button> -->
          <detail-list-item term="招聘人数">{{info.jobNum}}人</detail-list-item>
          <a-divider />
          <detail-list-item term="薪资待遇">{{filterDictText(dict.monthlySalary, info.monthlySalary)}}</detail-list-item>
          <detail-list-item term="联系方式">{{info.contactTel}}</detail-list-item>
          <a-divider />
        </detail-list>
        <detail-list :col="1">
          <detail-list-item term="经验要求">{{filterDictText(dict.expType, info.expType)}}</detail-list-item>
        </detail-list>
        <a-divider />
        <detail-list :col="2">
          <detail-list-item term="邮箱">{{info.email}}</detail-list-item>
          <detail-list-item term="学历">{{filterDictText(dict.educationType, info.educationType)}}</detail-list-item>
          <a-divider />
          <detail-list-item term="公司规模">{{filterDictText(dict.staffMember, info.staffMember)}}</detail-list-item>
          <detail-list-item term="福利待遇">{{companyBenefitBBQ}}</detail-list-item>
          <a-divider />
          <detail-list-item term="公司地址  ">{{info.address}}</detail-list-item>
          <a-divider />
        </detail-list>
        <detail-list :col="1">
          <detail-list-item style="word-break: break-all;" term="岗位描述">{{info.description}}</detail-list-item>
        </detail-list>
        <a-divider />
        <detail-list :col="1">
          <detail-list-item style="word-break: break-all;" term="岗位要求">{{info.summary}}</detail-list-item>
        </detail-list>
      </a-spin>
    </a-card>
  </a-drawer>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'Detail',
  components: {
    DetailList,
    DetailListItem
  },
  props: ['DDindustryGategory'],
  data() {
    return {
      companyBenefitBBQ: '',
      visible: false,
      dateFormat: 'YYYY-MM-DD',
      confirmLoading: false,
      info: {},
      dict: {
        companyBenefit: []
      },
      dataSourceA: [],
      url: {
        list: '/park.service/mgrRecruitInfo/queryById'
      }
    }
  },
  created() {
    initDictOptions('education_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.educationType = res.result
      }
    })
    initDictOptions('exp_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.expType = res.result
      }
    })
    initDictOptions('monthly_salary').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.monthlySalary = res.result
      }
    })
    initDictOptions('company_benefit').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyBenefit = res.result
      }
    })
    initDictOptions('staff_member').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.staffMember = res.result
      }
    })
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryGategory = res.result
      }
    })
  },
  mounted() {},
  methods: {
    cc() {
      console.log('DDindustryGategory')
      console.log(this.DDindustryGategory)
    },
    filterDictText,
    //异步获取
    // getCustomerNameDict() {
    //   getAction('/park.customer/baseCustomer/listAll').then(res => {
    //     if (res.success) {
    //       this.dict.customerName = res.result.records
    //       console.log('object')
    //       console.log(filterDictText(this.dict.customerName, this.info.customerName))
    //     } else {
    //       console.log('企业全查接口错误')
    //     }
    //   })
    // },
    show(record) {
      const that = this
      that.visible = true
      that.confirmLoading = true
      getAction('/park.customer/baseCustomer/listAll').then(res => {
        if (res.success) {
          that.dict.customerName = res.result.records
          // console.log(that.dict.customerName)
          getAction(that.url.list, { id: record.recruitId }).then(resA => {
            if (resA.code == 200) {
              that.info = resA.result
              for (const item of that.dict.customerName) {
                if (item.custId == that.info.custId) {
                  that.info.customerName = item.customerName
                  //比较获取福利待遇里的字
                  //START-----------2019-11-27
                  // console.log(that.info.companyBenefit)
                  if (typeof that.info.companyBenefit == 'string') {
                    that.info.companyBenefit = that.info.companyBenefit.split(',')
                  }
                  // console.log(that.info.companyBenefit)
                  for (const item of that.dict.companyBenefit) {
                    for (const itemBBQ of that.info.companyBenefit) {
                      if (item.value == itemBBQ) {
                        //第二个数组项开始，先加加号，再串烧
                        //只有一项福利待遇，就不会展示加号了
                        if (itemBBQ != that.info.companyBenefit[0]) {
                          that.companyBenefitBBQ = that.companyBenefitBBQ.concat('+')
                          console.log(that.companyBenefitBBQ)
                        }
                        //把拿到的字串烧起来~
                        that.companyBenefitBBQ = that.companyBenefitBBQ.concat(item.text)
                      }
                    }
                  }
                  that.confirmLoading = false
                  return
                  //END-----------
                }
              }
            } else {
              that.$message.error(resA.message)
            }
          })
          // console.log('object')
          // console.log(filterDictText(this.dict.customerName, this.info.customerName))
        } else {
          console.log('企业全查接口错误')
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.info = {}
      this.companyBenefitBBQ = ''
    }
  },
  computed: {
    // title() {
    //   return this.$route.meta.title
    // }
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