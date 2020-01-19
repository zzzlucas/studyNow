<template>
  <a-drawer
    :title="title"
    :width="800"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="园区ID">
          <a-input  placeholder="当前parkid：555" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>
        <!-- <a-row>
        <a-col span="12">-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年度">
          <a-select
            placeholder="请选择年份"
            v-decorator="['year',{initialValue: ''}]"
          >
            <a-select-option value="2018">2018</a-select-option>
            <a-select-option value="2019">2019</a-select-option>
            <a-select-option value="2020">2020</a-select-option>
            <a-select-option value="2021">2021</a-select-option>
            <a-select-option value="2022">2022</a-select-option>
          </a-select>
        </a-form-item>
        <!-- </a-col>
        <a-col span="12">-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="月份">
          <a-select
            placeholder="请选择月份"
            v-decorator="['month',{initialValue: ''}]"
          >
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
            <a-select-option value="5">5</a-select-option>
            <a-select-option value="6">6</a-select-option>
            <a-select-option value="7">7</a-select-option>
            <a-select-option value="8">8</a-select-option>
            <a-select-option value="9">9</a-select-option>
            <a-select-option value="10">10</a-select-option>
            <a-select-option value="11">11</a-select-option>
            <a-select-option value="12">12</a-select-option>
          </a-select>
        </a-form-item>
        <!-- </a-col>
        </a-row>-->
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
          <a-textarea :rows="4" placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'querystring'
export default {
  name: 'baseIndicatorsMsgModal',
  data() {
    return {
      title: '新增完成情况',
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
        year: { rules: [{ required: true, message: '请输入年度!' }] },
        month: { rules: [{ required: true, message: '请输入月份!' }] }
      },
      url: {
        add: '/park.indicators/baseIndicatorsMsg/add',
        edit: '/park.indicators/baseIndicatorsMsg/edit'
      }
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
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
          //真的有区分吗
          if (!this.model.year) {
            console.log('post')
            httpurl += this.url.add
            method = 'post'
          } else {
            console.log('put')
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
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

<style lang="less" scoped>
/** Button按钮间距 */
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
</style>