<template>
  <a-modal
    :title="title"
    :width="600"
    :closable="false"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="inline">
        <a-form-item label="审核人员">
          <a-select style="width:400px" v-decorator="['userId', {initialValue:''}]">
            <a-select-option
              v-for="(item, key) in dict.userIdExt"
              :value="item.value"
              :key="key"
            >{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="审核阶段">
              <a-select v-decorator="['industrySectorValue', {initialValue:''}]">
                <a-select-option
                  v-for="(item, key) in dict.industrySectorValueExt"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
        </a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
import qs from 'querystring'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'

export default {
  name: '',
  data() {
    return {
      title: '审核项目',
      visible: false,
      model: {},
      labelCol: {
        // xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        // xs: { span: 24 },
        sm: { span: 18 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        add: '/park.workflow/baseWorkFlowProject/add'
      },
      userId: '',
      dict: {
        userIdExt: [{ value: '1' }]
      }
    }
  },
  created() {
    initDictOptions('tech_user_id').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.userIdExt = res.result
      }
    })
  },
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
            'corporateIncomeTax',
            'individualIncomeTax',
            'cityTax',
            'addedValueTax',
            'otherTax',
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
          //根据model中是否已有某id来判断  亦或  外部传值editbool
          //传值parkId是否合适,不合适，头部比在
          //只要是model中edit带进来的任何必要值都可以达到效果
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
      this.visible = false
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