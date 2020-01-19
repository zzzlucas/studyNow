<template>
  <a-drawer
    wrapClassName="add-job-drawer"
    :title="title"
    width="50%"
    destroyOnClose
    :visible="visible"
    @close="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="add-job-drawer-form" :form="form">
        <!-- 111 -->
        <a-card :bordered="false" title="职位信息">
          <a-row>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="职位名称"
              >
                <a-input
                  v-decorator="['jobName',  {rules: [{required: true, message: '请输入职位名称'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="招聘人数"
              >
                <a-input
                  v-decorator="['jobNum',  {rules: [{required: true, message: '请输入招聘人数'},{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="学历">
                <a-select
                  v-decorator="['educationType',  {rules: [{required: true, message: '请选择学历'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.educationType"
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
                label="经验要求"
              >
                <a-select
                  v-decorator="['expType',  {rules: [{required: true, message: '请选择经验要求'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.expType"
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
                label="薪资待遇"
              >
                <a-select
                  v-decorator="['monthlySalary',  {rules: [{required: true, message: '请选择薪资待遇'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.monthlySalary"
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
                label="福利待遇"
              >
                <a-select
                  mode="multiple"
                  v-decorator="['companyBenefit',  {rules: [{required: true, message: '请选择福利待遇'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.companyBenefit"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <!-- 222 -->
        <a-card :bordered="false" title="公司信息">
          <a-row>
            <a-col span="12">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="公司">
                <!-- <a-input
                v-decorator="['customerName',  {rules: [{required: true, message: '请输入公司名称'}]}]"
                />-->
                <a-select v-decorator="['custId',  {rules: [{required: true, message: '请选择公司'}]}]">
                  <a-select-option
                    v-for="(item, key) in dict.customerName"
                    :value="item.custId"
                    :key="key"
                  >{{ item.customerName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="公司规模"
              >
                <a-select
                  v-decorator="['staffMember',  {rules: [{required: true, message: '请选择公司规模'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.staffMember"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="行业">
                <a-select
                  v-decorator="['jobType',  {rules: [{required: true, message: '请选择行业名称'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.jobType"
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
                label="公司地址"
              >
                <a-input
                  v-decorator="['address',  {rules: [{required: true, message: '请输入公司地址'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="联系人"
              >
                <a-input
                  v-decorator="['contactName',  {rules: [{required: true, message: '请输入联系人'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="联系方式"
              >
                <a-input
                  v-decorator="['contactTel',  {rules: [{required: true, message: '请输入联系方式'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="邮箱">
                <a-input
                  v-decorator="['email',  {rules: [{required: true, message: '请输入邮箱'},{ pattern: email, message: '请输入正确的邮箱' }]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <!-- 333 -->
        <a-card :bordered="false" title="其他信息">
          <a-row>
            <a-col span="24">
              <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="岗位描述">
                <a-textarea
                  :rows="4"
                  placeholder
                  v-decorator="['description',  {rules: [{required: true, message: '请输入岗位描述'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="岗位要求">
                <a-textarea
                  :rows="4"
                  placeholder
                  v-decorator="['summary',  {rules: [{required: true, message: '请输入岗位要求'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-spin>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'
import { getAction } from '../../../api/manage'
import { email } from '@/config/regex'
export default {
  name: '',
  components: { JEditor },
  data() {
    return {
      form: this.$form.createForm(this),
      // title: '通知消息',
      email,
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 6
        }
      },
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 18
        }
      },
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      //常用数据初始化
      record: {},
      editor: {},
      model: {},
      visible: false,
      loading: false,
      editBool: false,
      confirmLoading: false,
      //这是跟踪人，不是服务人员，是否走字典有待考究
      dict: {},
      url: {
        add: '/park.service/mgrRecruitInfo/add',
        edit: '/park.service/mgrRecruitInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '职位' + (this.editBool ? '编辑' : '新增')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    getAction('/park.customer/baseCustomer/listAll').then(res => {
      if (res.success) {
        this.dict.customerName = res.result.records
      } else {
        console.log('企业全查接口错误')
      }
    })
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
        this.dict.jobType = res.result
      }
    })
  },
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.recruitId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //只有审核后才为1
          formData.isPublic = '0'
          formData.status = '1'
          formData.companyBenefit = formData.companyBenefit.toString()
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
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
              this.editor.context = ''
              this.model = {}
              setTimeout(() => {
                that.confirmLoading = false
              }, 1000)
            })
        }
      })
    },
    detail(record) {
      console.log(typeof record.companyBenefit)
      this.editBool = true
      // console.log(record)
      this.form.resetFields()
      //在第一次打开时候，把字符串分割为数组，让框架能获取到数据
      if (typeof record.companyBenefit == 'string') {
        record.companyBenefit = record.companyBenefit.split(',')
      }
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jobName',
            'jobNum',
            'educationType',
            'expType',
            'monthlySalary',
            'companyBenefit',
            'custId',
            'staffMember',
            'jobType',
            'address',
            'contactName',
            'contactTel',
            'email',
            'description',
            'summary'
          )
        )
      })
    },
    Add() {
      this.editBool = false
      this.form.resetFields()
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      this.editor.context = ''
      this.model = {}
    }
  }
}
</script>

<style lang="less">
.add-job-drawer {
  /** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }

  .add-job-drawer-form {
    @width: 120px;
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
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
