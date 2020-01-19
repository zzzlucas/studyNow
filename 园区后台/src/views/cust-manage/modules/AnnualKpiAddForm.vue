<template>
  <a-drawer
    :title="title"
    :width="800"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible"
    destroyOnClose
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="园区ID">
          <a-input placeholder="请输入园区ID" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年度">
          <!-- <a-input placeholder="请输入年度" v-decorator="['year', validatorRules.year ]" /> -->
          <a-select v-decorator="['year', validatorRules.year,{initialValue: ''}]">
            <a-select-option value="2018">2018年</a-select-option>
            <a-select-option value="2019">2019年</a-select-option>
            <a-select-option value="2020">2020年</a-select-option>
            <a-select-option value="2021">2021年</a-select-option>
            <a-select-option value="2022">2022年</a-select-option>
            <a-select-option value="2023">2023年</a-select-option>
            <a-select-option value="2024">2024年</a-select-option>
            <a-select-option value="2025">2025年</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地区生产总值（万元）">
          <a-input v-decorator="[ 'originalLeader', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="规模以上工业总产值（万元）">
          <a-input v-decorator="[ 'industrialOutput', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="全社会固定资产投资额（万元）">
          <a-input v-decorator="[ 'allFixedInvest', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工业固定资产投资额（万元）">
          <a-input v-decorator="[ 'industrialFiexedInvest', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="智能制造产业收入（万元）">
          <a-input v-decorator="[ 'intelligentIndustrialIncome', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="一般预算收入（万元）">
          <a-input v-decorator="[ 'generalBudgetIncome', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea :rows="4" placeholder v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button type="primary" @click="close">取消</a-button>
    </a-spin>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'querystring'
import { mapGetters } from 'vuex'
export default {
  name: 'baseIndicatorsMsgModal',
  data() {
    return {
      // title: '新增预算指标',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] },
        year: { rules: [{ required: true, message: '请输入年度!' }] }
      },
      editBool: false,
      url: {
        add: '/park.indicators/baseIndicatorsMsg/add',
        edit: '/park.indicators/baseIndicatorsMsg/edit'
      },
      yearGroup: []
    }
  },
  computed: {
    title() {
      return (this.editBool ? '编辑' : '新增') + '预算指标'
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {},
  methods: {
    add(yearGroup) {
      console.log(yearGroup)
      this.yearGroup = yearGroup
      this.editBool = false
      this.visible = true
    },
    //每次新增都绕不过编辑
    edit(record) {
      this.editBool = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'parkId',
            'year',
            'month',
            'type',
            'originalLeader',
            'industrialOutput',
            'allFixedInvest',
            'industrialFiexedInvest',
            'intelligentIndustrialIncome',
            'generalBudgetIncome',
            'remark',
            'sortOrder',
            'version',
            'createUserName',
            'updateUserName'
          )
        )
        //时间格式化
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.editBool) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.parkId = this.industrialParkId
          //判断当年份是已存在时，月份字段必须含有数据
          if (this.yearGroup.includes(formData.year)) {
            that.$message.warning('已存在该年预算！')
            that.confirmLoading = false
            return
          }
          //时间格式化
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('loaddata')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.close()
              that.confirmLoading = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/** Button按钮间距 */
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
</style>