<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    width="90%"
    :visible="visible"
    @close="handleCancel"
    destroyOnClose
    :title="title"
  >
    <a-spin :spinning="confirmLoading">
      <div>
        <a-form @submit="handleSubmit" :form="form">
          <!-- 11111111111111 -->
          <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
            <!-- 行1 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="填报单位">
                  <a-input
                    placeholder
                    v-decorator="['custId', {rules: [{ required: true, message: '请选择项目单位', whitespace: true}]}]"
                    @click="openEnterpriseModal"
                  ></a-input>
                </a-form-item>
                <!-- <a-form-item label="填报单位">
                  <a-select
                    v-decorator="['fillUnit',{rules: [{ required: true, message: '请选择项目单位', whitespace: true}]}]"
                  >
                    <a-select-option
                      v-for="(item, key) in dict.custList"
                      :value="item.custId"
                      :key="key"
                    >{{ item.customerName }}</a-select-option>
                  </a-select>
                </a-form-item>-->
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="填报日期">
                  <a-date-picker
                    disabled
                    placeholder
                    style="width:100%"
                    format="YYYY-MM-DD"
                    v-decorator="['reportTime']"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行2 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="项目名称">
                  <a-input
                    placeholder
                    v-decorator="['projectName',{rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="成立年份" required>
                  <a-input
                    placeholder
                    v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true},{ pattern: /^\d{4}$/, message: '请输入四位数字年份' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行3 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <!-- importance -->
                <a-form-item label="重要程度" required>
                  <a-select
                    v-decorator="['importance',{rules: [{ required: true, message: '请选择重要程度', whitespace: true}]}]"
                  >
                    <a-select-option
                      v-for="(item, key) in dict.importanceExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="跟踪人员  ">
                  <a-select v-decorator="['projectManager']">
                    <a-select-option
                      v-for="(item, key) in dict.projectManagerExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行4 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="产品名称">
                  <a-input
                    v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'}]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="行业类别">
                  <a-select v-decorator="['industrySectorValue']">
                    <a-select-option
                      v-for="(item, key) in dict.industrySectorValueExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行5 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="建设地址">
                  <a-input placeholder v-decorator="['getLandBuildingAddress']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="所属主体">
                  <a-input placeholder v-decorator="['belongSubject']" />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行6 -->

            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="法人代表">
                  <a-input
                    v-decorator="['legalPerson', {rules: [{ required: true, message: '请输入法人姓名', whitespace: true}]} ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="联系电话（法人）">
                  <a-input
                    v-decorator="[ 'legalTel',{rules: [{ required: true, message: '请输入法人手机号', whitespace: true},{ pattern: phone, message: '请输入正确的手机号' }]}]"
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
                    v-decorator="['agentTel',{rules: [{ required: true, message: '请输入经办人手机号', whitespace: true},{ pattern: phone, message: '请输入正确的手机号' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行7 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}">
                <a-form-item label="公司概况">
                  <a-textarea :rows="4" placeholder v-decorator="['companyDescription']" />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行8 -->

            <!-- 行9 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}">
                <a-form-item label="团队成员情况">
                  <a-textarea :rows="4" placeholder v-decorator="['teamMemberDescription']" />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行10 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="年产值">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['annualProductionValue',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="年税金">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['annualTaxes',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="投资主体">
                  <a-input placeholder v-decorator="['investorValue']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="是否人才项目">
                  <a-radio-group v-decorator="['isTalentProject']">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="2">否</a-radio>
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
                <a-form-item label="项目总投资">
                  <a-input
                    addonAfter="万元"
                    v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="注册资本">
                  <a-input
                    addonAfter="万元"
                    v-decorator="['registerCapital',{rules: [{ required: true, message: '请输入数额'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="是否外资">
                  <a-radio-group v-decorator="['isForeignCapital']">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="2">否</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="租赁面积">
                  <a-input
                    addonAfter="m²"
                    v-decorator="['rentBuildArea',{rules: [{ required: true, message: '请输入租赁面积'},{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="固定资产投资">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['fixedAssetInvest',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="单位面积固定资产投资">
                  <a-input
                    addonAfter="万元/平方米"
                    placeholder
                    v-decorator="['areaFixedInvest',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="设备投资">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['deviceInvest',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="其他">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['otherInvest',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="建筑占地面积">
                  <a-input
                    addonAfter="m²"
                    placeholder
                    v-decorator="['buildingArea',{rules:[{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="总建筑面积（m²）">
                  <a-input
                    addonAfter="m²"
                    placeholder
                    v-decorator="['allBuildingArea',{rules:[{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="建筑密度">
                  <a-input addonAfter="%" placeholder v-decorator="['buildingDensity']" />
                  <!-- <a-input addonAfter="%" placeholder v-decorator="['buildingDensity',{rules:rate}]" /> -->
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="容积率">
                  <a-input addonAfter="%" placeholder v-decorator="['plotRatio']" />
                  <!-- <a-input addonAfter="%" placeholder v-decorator="['plotRatio',{rules:rate}]" /> -->
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="单位面积税收">
                  <a-input
                    addonAfter="元/平米"
                    placeholder
                    v-decorator="['areaTax',{rules:[{ pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="单位面积产值">
                  <a-input
                    addonAfter="元/平米"
                    placeholder
                    v-decorator="['areaOutput',{rules:[{ pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="开工日期">
                  <a-date-picker placeholder style="width:100%" v-decorator="['startDate']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="竣工日期">
                  <a-date-picker placeholder style="width:100%" v-decorator="['endDate']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="工业增加值">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['industryAddedValue',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="全员劳动生产率">
                  <a-input
                    addonAfter="%"
                    placeholder
                    v-decorator="['productionRate',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="万元工业增加值能耗">
                  <a-input
                    addonAfter="吨/万元"
                    placeholder
                    v-decorator="['addedEnergy',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}">
                <a-form-item label="项目申请理由简述">
                  <a-textarea :rows="4" v-decorator="['applyReason' ]"></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}">
                <a-form-item label="备注">
                  <a-textarea :rows="4" v-decorator="['remark' ]"></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}">
                <a-form-item label="附件">
                  <j-upload v-decorator="['addDocFiles']" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
      </div>
      <div class="drawer-bottom-btn-group">
        <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </div>
    </a-spin>
    <yq-enterprise-modal ref="ent" @ok="getCust"></yq-enterprise-modal>
  </a-drawer>
</template>

<script>
// import '@/components/dict/JDictSelectUtil'
import qs from 'qs'
import JEditor from '@/components/jeecg/JEditor'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { mapGetters } from 'vuex'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import { AddProjectLeaseForm } from '@/config/pick-fields'
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import JUpload from '@/components/jeecg/JUpload'
import { phone, email, rate } from '@/config/regex'
import { getAction } from '../../../../api/manage'
import YqEnterpriseModal from '@comp/extend/YqEnterpriseModal'
import mixins from '../mixins'

export default {
  name: 'addProjectLandForm',
  components: { JEditor, JDictSelectTag, JUpload, YqEnterpriseModal },
  mixins: [mixins],
  data() {
    return {
      // title: '首页 / 租赁项目 / 项目维护',
      form: this.$form.createForm(this, { name: 'addProjectLandForm' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      phone,
      email,
      rate,
      url: {
        add: '/park.project/mgrProjectInfo/addProjectLease',
        edit: '/park.project/mgrProjectInfo/editProject'
      },
      editBool: false,
      confirmLoading: false,
      model: {},
      dateFormat: 'YYYY-MM-DD',
      testData: '',
      industrySectorValue: '',
      record: {},
      visible: false,
      loading: false,
      dict: []
      // DictDataindustrySectorValue:this.form.getFieldValue('industrySectorValue')
    }
  },
  computed: {
    title() {
      return '租赁项目' + (this.editBool ? '维护' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    getAction('/park.customer/baseCustomer/listAll', { parkId: this.industrialParkId }).then(res => {
      this.dict.custList = res.result.records
      console.log(this.dict.custList)
    })
    initDictOptions('importance').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.importanceExt = res.result
      }
    })
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.projectManagerExt = res.result
      }
    })
    initDictOptions('industrySectorValue').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
  },
  updated() {
    // this.edit(this.record.id)
  },
  methods: {
    moment,
    handleCancel() {
      this.visible = false
    },
    add() {
      this.editBool = false
      this.visible = true
      // 获取当前日期作为填报日期？
      let record = {}
      record.reportTime = moment()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'reportTime'))
      })
    },
    detail(record) {
      this.editBool = true
      // this.record = record
      // console.log(this.record.recordId)
      this.form.resetFields()
      if (record.mgrProjectCust) {
        record.fillUnit = record.mgrProjectCust.fillUnit
        record.setUpYear = record.mgrProjectCust.setUpYear
        record.totalAsset = record.mgrProjectCust.totalAsset
        record.legalPerson = record.mgrProjectCust.legalPerson
        record.legalTel = record.mgrProjectCust.legalTel
        record.companyDescription = record.mgrProjectCust.companyDescription
        record.teamMemberDescription = record.mgrProjectCust.teamMemberDescription
        record.reportTime = record.mgrProjectCust.reportTime
      }
      if (record.mgrProjectInvestLease) {
        record.addDocFiles = record.mgrProjectInvestLease.addDocFiles
        record.investAmount = record.mgrProjectInvestLease.investAmount
        record.registerCapital = record.mgrProjectInvestLease.registerCapital
        record.isForeignCapital = record.mgrProjectInvestLease.isForeignCapital
        record.fixedAssetInvest = record.mgrProjectInvestLease.fixedAssetInvest
        record.areaFixedInvest = record.mgrProjectInvestLease.areaFixedInvest
        record.deviceInvest = record.mgrProjectInvestLease.deviceInvest
        record.otherInvest = record.mgrProjectInvestLease.otherInvest
        record.buildingArea = record.mgrProjectInvestLease.buildingArea
        record.allBuildingArea = record.mgrProjectInvestLease.allBuildingArea
        record.buildingDensity = record.mgrProjectInvestLease.buildingDensity
        record.plotRatio = record.mgrProjectInvestLease.plotRatio
        record.areaTax = record.mgrProjectInvestLease.areaTax
        record.areaOutput = record.mgrProjectInvestLease.areaOutput
        record.industryAddedValue = record.mgrProjectInvestLease.industryAddedValue
        record.productionRate = record.mgrProjectInvestLease.productionRate
        record.addedEnergy = record.mgrProjectInvestLease.addedEnergy
        record.remark = record.mgrProjectInvestLease.remark

        record.startDate = record.mgrProjectInvestLease.startDate
        record.endDate = record.mgrProjectInvestLease.endDate
      }
      delete record.mgrProjectCust
      delete record.mgrProjectInvest
      delete record.mgrProjectInvestLease

      //获取公司名
      for (const item of this.dict.custList) {
        if (item.custId == record.custId) {
          this.cust.id = item.custId
          this.cust.name = item.customerName
        }
      }
      record.custId = this.cust.name

      this.model = Object.assign({}, record)
      console.log(this.model)
      this.visible = true
      // console.log(pick(this.model, ProjectAttractShowZeroForm))
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, AddProjectLeaseForm))
        this.form.setFieldsValue({
          reportTime: this.model.reportTime ? moment(this.model.reportTime) : null
        })
        this.form.setFieldsValue({
          startDate: this.model.startDate ? moment(this.model.startDate) : null
        })
        this.form.setFieldsValue({
          endDate: this.model.endDate ? moment(this.model.endDate) : null
        })
      })
    },
    // edit(record) {
    //   console.log('edit开始了')
    //   this.form.resetFields()
    //   // console.log('mian');
    //   this.model = Object.assign({}, record)
    //   // console.log(this.model)
    //   this.visible = true
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue(pick(this.model, AddProjectLeaseForm))
    //     //时间格式化
    //   })
    //   // console.log(this.model)
    // },

    handleSubmit() {
      // console.log(this.form.getFieldValue('setUpYear'))
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.projectId) {
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            console.log('put方式')
            httpurl += this.url.edit
            method = 'put'
          }

          // let formData = {}
          let formData = Object.assign(this.model, values)
          formData.reportTime = formData.reportTime ? formData.reportTime.format('YYYY-MM-DD') : null
          formData.startDate = formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null
          formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null
          formData.parkId = this.industrialParkId
          formData.fillUnit = this.cust.id
          formData.custId = this.cust.id
          // delete formData.custId

          // console.log(formData)
          // formData.projectType = '2'
          if (!this.model.projectId) {
            formData.status = '1'
          }
          //qs.stringify  目前看来必须转换
          formData = qs.stringify(formData)
          console.log(formData)

          // formData = JSON.stringify(formData);
          // console.log(formData)

          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.visible = false
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

<style lang="less" scoped>
.ant-spin-nested-loading {
  position: inherit;
  /deep/ .ant-spin-container {
    position: inherit;
  }
}
</style>
<style lang='scss' scoped>
// .ant-col-sm-24 {
//   .ant-row {
//     /deep/ .ant-form-item-control {
//       height: 40px;
//     }
//   }
// }
.ant-col-sm-24 {
  height: 102.9px;
}
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