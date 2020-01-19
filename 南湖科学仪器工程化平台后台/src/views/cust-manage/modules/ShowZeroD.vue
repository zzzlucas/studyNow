<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    width="80%"
    :visible="visible"
    @close="close"
    destroyOnClose
  >
    <div>
      <a-form class="project-drawer-form" :form="form">
        <a-spin :spinning="confirmLoading">
          <a-row>
            <a-col span="15">
              <a-card class="daily-article" :bordered="false" title="基本信息">
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业名称"
                  >
                    <a-input
                      v-decorator="['customerName',{rules: [{ required: true, message: '请输入企业名称', whitespace:true}]}]"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业简称"
                  >
                    <a-input v-decorator="['customerAbbr']"></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="企业编号"
                  >
                    <a-input v-decorator="['customerNo']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="法人"
                  >
                    <a-input v-decorator="['legalPerson']"></a-input>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="单位电话"
                  >
                    <a-input v-decorator="['telephone']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="招商人员"
                  >
                    <a-select v-decorator="['merchantManager']" placeholder="请选择">
                      <a-select-option
                        v-for="(item, key) in dict.merchantManagerExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="服务人员"
                  >
                    <a-select v-decorator="['servicer']" placeholder="请选择">
                      <a-select-option
                        v-for="(item, key) in dict.servicerExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="引进日期"
                  >
                    <a-date-picker style="width:100%" v-decorator="[ 'merchantDate']" />
                  </a-form-item>
                </a-col>
                <!-- 五行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="入驻日期"
                  >
                    <a-date-picker style="width:100%" v-decorator="[ 'settledDate']" />
                  </a-form-item>
                </a-col>
                <!-- , {rules: [{required: true, message: '请输入跟踪日期'}]} -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属园区"
                  >
                    <a-input
                      placeholder="暂无联动"
                      v-decorator="['parkId',{rules: [{ required: true, message: '请输入', whitespace:true}]}]"
                    ></a-input>
                    <!-- 传递园区名到此处？ -->
                    <!-- <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>-->
                  </a-form-item>
                </a-col>
                <!-- 六行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属项目"
                  >
                    <a-input
                      placeholder="暂无联动"
                      v-decorator="['caseId',{rules: [{ required: true, message: '请输入', whitespace:true}]}]"
                    ></a-input>
                    <!-- caseId -->
                    <!-- <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>-->
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="所属楼宇"
                  >
                    <a-input placeholder="暂无联动" v-decorator="['buidling']"></a-input>
                    <!-- buidling -->
                    <!-- <a-select defaultValue="1" style="width:100%">
                      <a-select-option value="1">来访</a-select-option>
                      <a-select-option value="2">联营企业</a-select-option>
                    </a-select>-->
                  </a-form-item>
                </a-col>
                <!-- 一行 -->
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="邮箱"
                  >
                    <a-input v-decorator="['email']"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    :labelCol="labelCol.default"
                    :wrapperCol="wrapperCol.default"
                    label="网址"
                  >
                    <a-input v-decorator="['website']"></a-input>
                  </a-form-item>
                </a-col>

                <a-row>
                  <a-col>
                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="关联客户"
                    >
                      <a-textarea :rows="4" v-decorator="['relCustListId', {}]"></a-textarea>
                    </a-form-item>

                    <a-form-item
                      :labelCol="labelCol.long"
                      :wrapperCol="wrapperCol.long"
                      label="企业简介"
                    >
                      <a-textarea :rows="4" placeholder="请输入企业简介" v-decorator="['content', {}]"></a-textarea>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>

            <a-col span="9">
              <a-card class="daily-article" :bordered="false" title="企业标识">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
                  <!-- <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" /> -->
                  <!-- :options="plainOptions"   摘出 -->
                  <a-checkbox-group v-model="checkedList" @change="onChange">
                    <a-row>
                      <a-col :span="8">
                        <a-checkbox value="A">A</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="B">B</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="C">C</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="D">D</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                      <a-col :span="8">
                        <a-checkbox value="E">E</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-form-item>
              </a-card>
              <a-card class="daily-article" :bordered="false" title="附件">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
                  <!-- <a-input placeholder="请输入附件组ID" v-decorator="['addDocFiles', {}]" /> -->
                  <!-- <a-upload
                  name="file"
                  :showUploadList="true"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="importExcelUrl"
                  @change="handleImportExcel"
                >
                  <a-button type="primary" icon="import">营业执照</a-button>
                  </a-upload>-->
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label>
                  <!-- <a-input placeholder="请输入附件组ID" v-decorator="['addDocFiles', {}]" /> -->
                  <!-- <a-upload
                  name="file"
                  :showUploadList="true"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="importExcelUrl"
                  @change="handleImportExcel"
                > 
                  <a-button type="primary" icon="import">其他附件</a-button>
                  </a-upload>-->
                </a-form-item>
              </a-card>
            </a-col>
          </a-row>
          <a-card class="daily-article" :bordered="false" title="分类信息">
            <a-row>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="公司性质"
                >
                  <a-select v-decorator="['unitNature']" placeholder="请选择">
                    <a-select-option
                      v-for="(item, key) in dict.unitNatureExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="行业类型"
                >
                  <a-select
                    v-decorator="['industryCategory',{rules: [{ required: true, message: '请选择行业类型', whitespace:true}]}]"
                    placeholder="请选择"
                  >
                    <a-select-option
                      v-for="(item, key) in dict.industryCategoryExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="公司类型"
                >
                  <a-select v-decorator="['organizational']" placeholder="请选择">
                    <a-select-option
                      v-for="(item, key) in dict.organizationalExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="技术领域"
                >
                  <a-select v-decorator="['technicalField']" placeholder="请选择">
                    <a-select-option
                      v-for="(item, key) in dict.technicalFieldExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="企业评级"
                >
                  <a-select v-decorator="['enterpriseRating']" placeholder="请选择">
                    <a-select-option
                      v-for="(item, key) in dict.enterpriseRatingExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册类型"
                >
                  <a-select v-decorator="['registrationType']" placeholder="请选择">
                    <a-select-option
                      v-for="(item, key) in dict.registrationTypeExt"
                      :value="item.value"
                      :key="key"
                    >{{ item.text }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <a-card class="daily-article" :bordered="false" title="工商/税务信息">
            <a-row>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册日期"
                >
                  <a-date-picker style="width:100%" v-decorator="[ 'registDate']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册资本"
                >
                  <a-input v-decorator="[ 'registeredCapital']">
                    <a-select
                      slot="addonAfter"
                      style="width: 100px;"
                      v-decorator="['registeredCapitalUnit', {initialValue: dict.registeredCapitalUnitExt[0].value}]"
                    >
                      <a-select-option
                        v-for="(item, key) in dict.registeredCapitalUnitExt"
                        :value="item.value"
                        :key="key"
                      >{{ item.text }}</a-select-option>
                    </a-select>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="转化为人民币"
                >
                  <a-input addonAfter="万元" v-decorator="[ 'rCToRMB']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="工商状态"
                >
                  <a-select style="width:100%" v-decorator="['bussinessStatus']" placeholder="请选择">
                    <a-select-option value="1">工商正常</a-select-option>
                    <a-select-option value="2">工商未办</a-select-option>
                    <a-select-option value="3">工商未迁</a-select-option>
                    <a-select-option value="4">工商迁出</a-select-option>
                    <a-select-option value="5">工商吊销</a-select-option>
                    <a-select-option value="6">工商注销</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="税务状态"
                >
                  <a-select style="width:100%" v-decorator="['taxStatus']" placeholder="请选择">
                    <a-select-option value="1">税务正常</a-select-option>
                    <a-select-option value="2">税务未办</a-select-option>
                    <a-select-option value="3">税务未迁</a-select-option>
                    <a-select-option value="4">税务迁出</a-select-option>
                    <a-select-option value="5">税务吊销</a-select-option>
                    <a-select-option value="6">税务注销</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="统一社会信用号码"
                >
                  <a-input
                    v-decorator="[ 'creditCode',{rules: [{ required: true, message: '请输入统一社会信用号码', whitespace:true}]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册地址"
                >
                  <a-input v-decorator="[ 'registerAddress']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="注册地邮编"
                >
                  <a-input v-decorator="[ 'registerAddressZipCode']" />
                </a-form-item>
              </a-col>
              <a-col span="16">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="经营地址"
                >
                  <a-input v-decorator="[ 'businessAddress']" />
                </a-form-item>
              </a-col>
              <a-col span="8">
                <a-form-item
                  :labelCol="labelCol.default"
                  :wrapperCol="wrapperCol.default"
                  label="经营地邮编"
                >
                  <a-input v-decorator="[ 'businessAddressZipCode']" />
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item :labelCol="labelCol.whole" :wrapperCol="wrapperCol.whole" label="经营范围">
                  <a-textarea :rows="4" v-decorator="['businessScope', {}]"></a-textarea>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item
                  :labelCol="labelCol.whole"
                  :wrapperCol="wrapperCol.whole"
                  label="特许经营范围"
                >
                  <a-textarea :rows="4" v-decorator="['businessScopePermit', {}]"></a-textarea>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <!-- <a-form-item
                  :labelCol="labelCol.whole"
                  :wrapperCol="wrapperCol.whole"
                  label="parkId"
                >
                  <a-input
                    v-decorator="['parkId',{rules: [{ required: true, message: '请输入parkId', whitespace:true}]}]"
                  ></a-input>
                </a-form-item>-->
              </a-col>
            </a-row>
          </a-card>
        </a-spin>
      </a-form>

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
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <!-- <a-button :style="{marginRight: '8px'}" @click="onClose">Cancel</a-button> -->
        <a-button @click="handleOk" type="primary">保存</a-button>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import qs from 'qs'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { AddbaseCustomerForm } from '@/config/pick-fields'

export default {
  name: '',
  //1111111111111111111111
  props: {
    show: {
      type: Boolean,
      default: false
    }
    // headers:
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  visible: false,
  //11111111111111111111112
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      checkedList: [],
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 6
        },
        whole: {
          span: 6
        }
      },
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 18
        },
        whole: {
          span: 18
        }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        recordId: { rules: [{ required: true, message: '请输入记录ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      url: {
        add: '/park.customer/baseCustomer/add',
        edit: '/park.customer/baseCustomer/edit'
      },
      merchantManager: '',
      dict: {
        merchantManagerExt: [{ value: '' }],
        servicerExt: [{ value: '' }],
        unitNatureExt: [{ value: '' }],
        industryCategoryExt: [{ value: '' }],
        organizationalExt: [{ value: '' }],
        technicalFieldExt: [{ value: '' }],
        enterpriseRatingExt: [{ value: '' }],
        registrationTypeExt: [{ value: '' }],
        registeredCapitalUnitExt: [{ value: '' }]
      }
    }
  },
  created() {
    initDictOptions('attract_staff').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.merchantManagerExt = res.result
      }
    }),
      initDictOptions('service_staff').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.servicerExt = res.result
        }
      }),
      initDictOptions('unit_nature').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.unitNatureExt = res.result
        }
      }),
      initDictOptions('industry_gategory').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.industryCategoryExt = res.result
        }
      }),
      initDictOptions('organizational').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.organizationalExt = res.result
        }
      }),
      initDictOptions('technical_field').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.technicalFieldExt = res.result
        }
      }),
      initDictOptions('enterprise_rating').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.enterpriseRatingExt = res.result
        }
      }),
      initDictOptions('registration_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.registrationTypeExt = res.result
        }
      }),
      initDictOptions('registered_capital_unit').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.registeredCapitalUnitExt = res.result
        }
      })
  },
  methods: {
    plainOptions() {},
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    add() {
      this.visible = true
    },
    //新页面 详情 打开的，咋传，考虑一哈
    detail(record) {
      // this.record = record
      console.log(record)
      this.form.resetFields()

      record.unitNature = record.baseCustomerType.unitNature
      record.industryCategory = record.baseCustomerType.industryCategory
      record.organizational = record.baseCustomerType.organizational
      record.technicalField = record.baseCustomerType.technicalField
      record.enterpriseRating = record.baseCustomerType.enterpriseRating
      record.registrationType = record.baseCustomerType.registrationType

      record.registDate = record.baseCustomerBusiness.registDate
      record.registeredCapital = record.baseCustomerBusiness.registeredCapital
      record.bussinessStatus = record.baseCustomerBusiness.bussinessStatus
      record.taxStatus = record.baseCustomerBusiness.taxStatus
      record.creditCode = record.baseCustomerBusiness.creditCode
      record.registerAddress = record.baseCustomerBusiness.registerAddress
      record.registerAddressZipCode = record.baseCustomerBusiness.registerAddressZipCode
      record.businessAddress = record.baseCustomerBusiness.businessAddress
      record.businessAddressZipCode = record.baseCustomerBusiness.businessAddressZipCode
      record.businessScope = record.baseCustomerBusiness.businessScope
      record.businessScopePermit = record.baseCustomerBusiness.businessScopePermit
      record.rCToRMB = record.baseCustomerBusiness.rCToRMB
      //浏览器编辑请求里多余的东西来自record，把record里的对象遍历出来删掉
      delete record.baseCustomerBusiness
      delete record.baseCustomerType
      delete record.longLat
      // let Rrecord = {}
      // for (const item in record) {
      //   if (item != baseCustomerType && item != baseCustomerBusiness) {
      //     Rrecord.push(item)
      //   }
      // }

      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, AddbaseCustomerForm))
        this.form.setFieldsValue({ merchantDate: this.model.merchantDate ? moment(this.model.merchantDate) : null })
        this.form.setFieldsValue({ settledDate: this.model.settledDate ? moment(this.model.settledDate) : null })
        this.form.setFieldsValue({ registDate: this.model.registDate ? moment(this.model.registDate) : null })
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleImportExcel() {},
    importExcelUrl() {},
    tokenHeader() {},
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.customerName) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          if (formData.merchantDate)
            formData.merchantDate = formData.merchantDate ? formData.merchantDate.format('YYYY-MM-DD') : null
          if (formData.registDate)
            formData.registDate = formData.registDate ? formData.registDate.format('YYYY-MM-DD') : null
          if (formData.settledDate)
            formData.settledDate = formData.settledDate ? formData.settledDate.format('YYYY-MM-DD') : null
          formData = qs.stringify(formData)
          console.log(formData)

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
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>

<style lang="less">
.mgr-project-trace-drawer {
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 0px;
    float: right;
  }

  .project-drawer-form {
    @width: 180px;
    .ant-form-item-label {
      width: @width;
    }

    .ant-form-item-control-wrapper {
      width: calc(~'100% - @{width}');
    }
    .ant-col-12 {
      z-index: 10;
    }
  }
}
</style>