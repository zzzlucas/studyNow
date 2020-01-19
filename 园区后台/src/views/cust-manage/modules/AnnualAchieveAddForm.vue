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
          <a-input placeholder="当前parkid：555" v-decorator="['parkId', validatorRules.parkId ]" />
        </a-form-item>-->
        <!-- <a-row>
        <a-col span="12">-->
        <a-form-item
          v-if="!this.record.month"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="年度"
        >
          <a-select placeholder="请选择年份" v-decorator="['year',{initialValue: ''}]">
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
        <!-- </a-col>
        <a-col span="12">-->
        <!-- 如果行传来的year转为的month大于2000，就是真年份了，就设置为空，且disabled -->
        <a-form-item
          v-if="!this.record.year"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="月份"
        >
          <a-select placeholder="请选择月份" v-decorator="['month',{initialValue: ''}]">
            <a-select-option value="1">1月</a-select-option>
            <a-select-option value="2">2月</a-select-option>
            <a-select-option value="3">3月</a-select-option>
            <a-select-option value="4">4月</a-select-option>
            <a-select-option value="5">5月</a-select-option>
            <a-select-option value="6">6月</a-select-option>
            <a-select-option value="7">7月</a-select-option>
            <a-select-option value="8">8月</a-select-option>
            <a-select-option value="9">9月</a-select-option>
            <a-select-option value="10">10月</a-select-option>
            <a-select-option value="11">11月</a-select-option>
            <a-select-option value="12">12月</a-select-option>
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
          <a-textarea :rows="4" placeholder v-decorator="['remark', {}]" />
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button type="primary" @click="handleCancel">取消</a-button>
    </a-spin>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'querystring'
import { mapGetters } from 'vuex'
import { filterObj } from '@/utils/util'
export default {
  name: 'baseIndicatorsMsgModal',
  data() {
    return {
      // title: '新增完成情况',
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
      editBool: false,
      url: {
        add: '/park.indicators/baseIndicatorsMsg/add',
        edit: '/park.indicators/baseIndicatorsMsg/edit'
      },
      record: {},
      yearGroup: [],
      yearGroupM: []
    }
  },
  created() {},
  computed: {
    title() {
      return (this.editBool ? '编辑' : '新增') + '完成情况'
    },
    ...mapGetters(['industrialParkId'])
  },
  methods: {
    add(yearGroup, yearGroupM) {
      console.log(yearGroup) //会增加冗余，但不影响逻辑判断
      this.yearGroup = yearGroup
      this.yearGroupM = yearGroupM
      this.editBool = false
      this.visible = true
      this.record.year = ''
      this.record.month = ''
    },
    edit(record) {
      this.record = Object.assign({}, record)
      //处理后端给的月字段，多了“月”字，字段从year转到month
      this.record.month = this.record.year
      let monthS = this.record.month.indexOf('月')
      this.record.month = this.record.month.slice(0, monthS)
      if (this.record.month > 1000) {
        this.record.month = null
      }
      //处理后端给的年字段，当小于2000时直接为空，同时表单这一项v-if不显示
      if (this.record.year.includes('月')) {
        this.record.year = null
      } else {
        //去掉"年"
        this.record.year = this.record.year.replace('年', '')
      }

      this.editBool = true
      this.form.resetFields()
      this.model = Object.assign({}, this.record)
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
            console.log('post')
            httpurl += this.url.add
            method = 'post'
          } else {
            console.log('put')
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          if (this.editBool == false) {
            //判断当年份是已存在时，月份字段必须含有数据
            if (that.yearGroup.includes(formData.year) && !formData.month) {
              that.$message.warning('请输入月份！')
              that.confirmLoading = false
              return
            }
            //防止在没有预算情况下，输入了实际无展示
            if (!that.yearGroup.includes(formData.year) && formData.month) {
              that.$message.warning('请先输入当年预算！')
              that.confirmLoading = false
              return
            }
            //防止相同月份重复添加？
            //需获取全部数据的年月
            //当这一年存在时，然后indexOf拿到的M数组里这一项里也存在对应月份，就警告
            // console.log(this.yearGroup);
            // console.log(formData.year);
            // console.log(this.yearGroupM);
            // console.log(formData.month);
            if (
              that.yearGroup.includes(formData.year) &&
              that.yearGroupM[that.yearGroup.indexOf(formData.year)].includes(formData.month)
            ) {
              that.$message.warning('该月份实际完成情况已存在！')
              that.confirmLoading = false
              return
            }
          }
          formData.parkId = this.industrialParkId
          filterObj(formData)
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