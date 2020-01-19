<template>
  <a-modal
    :title="title"
    :width="600"
    :closable="false"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    :confirmLoading="confirmLoading"
  >
    <a-form :form="form">
      <!-- layout="inline" -->
      <a-row :span="24">
        <a-col>
          <a-form-item label="是否通过">
            <a-radio-group v-decorator="['result']">
              <a-radio value="Y">通过</a-radio>
              <a-radio value="N2USER">不通过</a-radio>
              <a-radio v-if="model.workFlowNextNodeIndex>=1" value="N2PRE">驳回</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="审核人员">
            <a-input v-decorator="['name', {initialValue:''}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="审核时间">
            <a-date-picker disabled v-decorator="['fakerTime']" style="width:100%" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="审核意见">
            <a-textarea :rows="4" v-decorator="['des' ]"></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="附件">
              附件？？
      </a-form-item>-->
    </a-form>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash/pick'
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
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {},
      url: {
        // add: '/park.workflow/baseWorkFlowProject/add',
        edit: '/park.workflow/baseWorkFlowProject/review'
      },
      userId: '',
      auditor: [],
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
    //获取到审核人  对应权限
    getAction('/park.workflow/baseWorkFlowProject/list', { code: 'N4' }).then(res => {
      console.log(res.result.records)
      this.auditor = res.result.records
    })
  },
  methods: {
    // add() {
    //   this.edit({})
    // },
    moment,
    edit(record) {
      // console.log('object');
      this.form.resetFields()
      this.visible = true
      record.fakerTime = moment()
      // console.log(record.fakerTime)
      this.model = Object.assign({}, record)
      // console.log('object')
      // console.log(this.model.workFlowNextNodeIndex)
      this.$nextTick(() => {
        //projectWorkFlowId
        this.form.setFieldsValue(pick(this.model, 'des', 'name', 'projectWorkFlowId', 'result', 'fakerTime'))
        //时间格式化
      })
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          httpurl += this.url.edit
          method = 'put'
          let formData = Object.assign(this.model, values)

          //根据选到的名字，遍历比找出对应id给后端  XXX 客户要求的审核人员是酱油
          // for (const item of this.auditor) {
          //   if (item.salt == formData.name) {
          //     formData.projectWorkFlowId = item.id
          //   }
          // }
          // formData.projectWorkFlowId = 0

          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
                that.model = {}
              } else {
                that.$message.warning(res.message)
                that.$emit('reload')
                that.model = {}
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.handleCancel()
            })
        }
      })
    },
    handleCancel() {
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