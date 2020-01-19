<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />
      <a-form @submit="handleSubmit" :form="form">
        <!-- 11111111111111 -->
        <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="填报单位">
                <a-input
                  placeholder
                  v-decorator="['fillUnit',{rules: [{ required: true, message: '请输入填报单位', whitespace:true}]}]"
                />
                <!-- getFieldDecorator="[]"   initialValue:'test' -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="填报日期">
                <!-- <a-date-picker style="width:100%" v-decorator="['setUpYear']" /> -->
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行2 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目名称">
                <a-input
                  placeholder
                  v-decorator="['unitAddress',{rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="成立年份" required>
                <a-input
                  placeholder
                  v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行3 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="重要程度" required>
                <a-select style="width:100%" v-decorator="['companyRegisterType']">
                  <a-select-option value="1">一级</a-select-option>
                  <a-select-option value="2">二级</a-select-option>
                  <a-select-option value="3">三级</a-select-option>
                  <a-select-option value="4">四级</a-select-option>
                  <a-select-option value="5">五级</a-select-option>
                </a-select>
                <!-- 根据excel表，此处无需字典表 -->
                <!-- <JDictSelectTag v-model="testData" dictCode="mgr-attr-addpl-companyRegisterType"></JDictSelectTag> -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="跟踪人员  ">
                <!-- <JDictSelectTag v-model="testData" dictCode="mgr-attr-addpl-companyRegisterType"></JDictSelectTag> -->
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行4 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="产品名称">
                <a-input
                  v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="行业类别">
                <a-input
                  v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入固定资产净值', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行5 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设地址">
                <a-input placeholder v-decorator="['legalPerson']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="所属主体">
                <a-input placeholder v-decorator="['legalTel']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行6 -->

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="法人代表">
                <a-input
                  v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（法人）">
                <a-input
                  v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="经办人">
                <a-input
                  v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（经办人）">
                <a-input
                  v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行7 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="公司概况">
                <a-textarea :rows="4" placeholder v-decorator="['teamMemberDescription']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行8 -->

          <!-- 行9 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="团队成员情况">
                <a-textarea :rows="4" placeholder v-decorator="['teamMemberDescription']" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行10 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年产值（万元）">
                <a-input placeholder v-decorator="[    'annualProductionValue'   ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年税金（万元）">
                <a-input placeholder v-decorator="[  'annualTaxes'  ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="投资主体">
                <a-input placeholder v-decorator="[    'annualProductionValue'   ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否人才项目">
                <a-radio-group v-decorator="['isTalentProject']">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>-->
        </a-card>

        <!-- 333333333333 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目投资">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目总投资（万元）">
                <a-input
                  v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资本（万元）">
                <a-input
                  v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否外资">
                <a-radio-group v-decorator="['isForeignCapital']">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="租赁面积（m²）">
                <a-input
                  v-decorator="['investAmount',{rules: [{ required: true, message: '请输入租赁面积', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产投资（万元）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="单位面积固定资产投资（万元/平方米）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="设备投资（万元）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其他（万元）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建筑占地面积（m²）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="总建筑面积（m²）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建筑密度（%）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="容积率">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="单位面积税收（元/平米）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="单位面积产值（元/平米）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="开工日期">
                <!-- <a-date-picker style="width:100%" v-decorator="['setUpYear']" /> -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="竣工日期">
                <!-- <a-date-picker style="width:100%" v-decorator="['setUpYear']" /> -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="工业增加值（万元）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="全员劳动生产率">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="万元工业增加值能耗（吨/万元）">
                <a-input placeholder v-decorator="['fixedAssetInvest']" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目申请理由简述">
                <a-textarea :rows="4" v-decorator="['applyReason' ]"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="备注">
                <a-textarea :rows="4" v-decorator="['remark' ]"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="projectId test">
                <a-input
                  placeholder
                  v-decorator="['projectId', {rules: [{ required: true, message: '请输入projectId', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="parkId test">
                <a-input
                  placeholder
                  v-decorator="['parkId', {rules: [{ required: true, message: '请输入parkId', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- upload  addDocFiles   附件 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="附件">
                <a-upload
                  name="file"
                  :showUploadList="true"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="importExcelUrl"
                  @change="handleImportExcel"
                >
                  <a-button type="primary" icon="import">上传附件</a-button>
                  <!-- <span>（单个图片大小不可超过10.00M，全部图片大小不可超过30.00M）</span> -->
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card
          :bordered="false"
          size="small"
          style="position:fixed;bottom:0;width:calc(100% - 200px - 15px)"
        >
          <a-button style="float:right;" type="primary" @click="handleSubmit">保存（Test Submit）</a-button>
          <!-- <a-button type="primary" html-type="submit" @click="handleSubmit">Test Submit</a-button> -->
        </a-card>
      </a-form>
    </page-layout>
  </div>
</template>

<script>
// import '@/components/dict/JDictSelectUtil'
import qs from 'qs'

import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import JDictSelectTag from '@/components/dict/JDictSelectTag'

import { initDictOptions } from '@/components/dict/JDictSelectUtil'

import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
export default {
  name: 'addProjectLandForm',
  components: { PageLayout, JEditor, JDictSelectTag },
  data() {
    return {
      title: '首页 / 租赁项目 / 项目维护',
      //   form: {}
      form: this.$form.createForm(this, { name: 'addProjectLandForm' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      url: {
        add: '/park.project/mgrProjectInfo/addProject',
        edit: '/park.project/mgrProjectInfo/editProject'
      },
      confirmLoading: false, //独立页面，其实不需要该项
      model: {},
      // setUpYear: '',
      dateFormat: 'YYYY-MM-DD',
      // record: { id: 1191619700384071680 }
      testData: '',
      industrySectorValue: ''
      // value:""
      // DictDataindustrySectorValue:this.form.getFieldValue('industrySectorValue')
    }
  },
  updated() {
    // this.edit(this.record.id)
  },
  methods: {
    moment,
    add() {
      this.edit({})
    },
    // add() {
    //   this.picUrl = ''
    //   this.refresh()
    //   this.edit({ activitiSync: '1' })
    // },
    edit(record) {
      console.log('edit开始了')
      this.form.resetFields()
      this.model = Object.assign({}, record)
      // console.log(this.model)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'projectId', //id
            'fillUnit',
            'creditCode',
            'unitAddress',
            'setUpYear',
            'companyRegisterType',
            'registerMoney',
            'totalAsset',
            'fixedAsset',
            'legalPerson',
            'legalTel',
            'email',
            'companyDescription',
            'teamMemberDescription',
            'parkId', //表单无此项
            'version', //版本号
            'createUserName', //创建者名称
            'updateUserName', //更新者名称

            'projectName',
            'projectType', //无
            'agentPerson',
            'agentTel',
            'belongSubject', //无  所属主体
            'investorValue', //无  投资主体
            'custId', //无  企业ID
            'getLandBuildingAddress',
            'mainBuildingContent', //目前注释  已填   textarea
            'areaPerformance', //目前注释  已填   textarea
            'mainMaterial',
            'materialCost',
            'mainProduct',
            'productOutput',
            'waterElec', //目前注释  已填   textarea
            'greenFire', //目前注释  已填   textarea
            'allUseArea',
            'newUseArea',
            'rentBuildArea',
            'industrySectorValue', //目前注释  已填   select 可能数据字典
            'isTalentProject', //目前注释  已填  radio
            'gainArea', //需加require
            'annualProductionValue',
            'annualTaxes',
            'status', //无  表单无此项  项目状态
            'applyReason', //目前注释  已填   textarea
            'projectTechnologyFlow', //目前注释  已填   富文本
            'importance', //无
            'projectManager', //无
            'auditStatus', //无

            'investAmount',
            'projectUseInvest',
            'registerCapital',
            'isForeignCapital', //目前注释  已填  radio
            'fixedAssetInvest',
            'civilWork',
            'install',
            'device',
            'projectBuilding',
            'budget',
            'buildingInterest',
            'bottomWorkingCapital',
            'freeCapital',
            'sharesBond',
            'bankLoan',
            'otherCapital',
            'newSale',
            'newProfit',
            'newTax',
            'foreignEarning',
            'remark',
            'addDocFiles'

            //表单有，但是这里没有的
            //buildingBeginDate
            //buildingEndDate
          )
        )
        //时间格式化
      })
      // console.log(this.model)
    },
    // close() {
    //   this.$emit('close')
    //   this.visible = false
    // },
    handleSubmit() {
      // console.log(this.form.getFieldValue('setUpYear'))
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        // values.setUpYear = 1
        // console.log(values.setUpYear)

        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          // console.log('2222')
          if (!this.model.id) {
            //增
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            //改
            console.log('put方式')
            httpurl += this.url.edit
            method = 'put'
          }

          // let formData = {}
          let formData = Object.assign(this.model, values)
          // formData.setUpYear = formData.setUpYear ? formData.setUpYear.format() : null
          // formData.buildingBeginDate = formData.buildingBeginDate ? formData.buildingBeginDate.format() : null
          // formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format() : null
          // console.log(formData)

          //qs.stringify  目前看来必须转换
          formData = qs.stringify(formData)
          console.log(formData)

          // formData = JSON.stringify(formData);
          // console.log(formData)

          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                // that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close()
            })
        }
      })
      // this.form.resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
.top {
  margin: 0;
}
.myinput {
  color: rgba(0, 0, 0, 0.85);
  .ant-input {
    width: 50px;
  }
}
</style>