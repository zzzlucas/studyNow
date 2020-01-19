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
        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系人ID">
          <a-input placeholder="请输入联系人ID" v-decorator="['contactId', validatorRules.contactId ]" />
        </a-form-item>-->
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业ID">
          <a-input disabled placeholder="请输入企业ID" v-decorator="['custId', validatorRules.custId ]" />
        </a-form-item>-->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称">
          <a-input disabled placeholder="请输入企业名称" v-decorator="['customerName']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['contactName', validatorRules.contactName]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机">
          <a-input placeholder="请输入手机" v-decorator="['mobile', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="性别">
          <!-- <a-input placeholder="请输入性别" v-decorator="['sex', {}]" /> -->
          <a-radio-group v-decorator="['sex', {initialValue:''}]">
            <a-radio value="1">男</a-radio>
            <a-radio value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="Email">
          <a-input placeholder="请输入Email" v-decorator="['email', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="传真">
          <a-input placeholder="请输入传真" v-decorator="['fax', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微信号">
          <a-input placeholder="请输入微信号" v-decorator="['weChat', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="QQ">
          <a-input placeholder="请输入QQ" v-decorator="['qq', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职务">
          <a-input placeholder v-decorator="['position', {}]" />
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件类型">
          <a-select
            v-decorator="['industrySectorValue', {initialValue: dict.industrySectorValueExt[0].value}]"
          >
            <a-select-option
              v-for="(item, key) in dict.industrySectorValueExt"
              :value="item.value"
              :key="key"
            >{{ item.text }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="证件号码">
          <a-input placeholder v-decorator="['position', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="标签">
          <a-input placeholder v-decorator="['position', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="个人简介">
          <a-textarea :row="4" placeholder v-decorator="['position', {}]" />
        </a-form-item>-->
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="版本号">
          <a-input-number v-decorator="[ 'version', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建者名称">
          <a-input placeholder="请输入创建者名称" v-decorator="['createUserName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="更新者名称">
          <a-input placeholder="请输入更新者名称" v-decorator="['updateUserName', {}]" />
        </a-form-item>-->
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import qs from 'qs'

export default {
  name: 'BaseCustomerContactModal',
  data() {
    return {
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      editBool: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        contactId: { rules: [{ required: true, message: '请输入联系人ID!' }] },
        custId: { rules: [{ required: true, message: '请输入企业ID!' }] },
        contactName: { rules: [{ required: true, message: '请输入姓名!' }] }
      },
      url: {
        add: '/park.customer/baseCustomerContact/add',
        edit: '/park.customer/baseCustomerContact/edit'
      }
    }
  },
  created() {
    // initDictOptions('INDUSTRY_SECTOR_VALUE').then(res => {
    //   if (res.code === 0 && res.success) {
    //     this.dict.industrySectorValueExt = res.result
    //   }
    // })
  },
  computed: {
    title() {
      return '联系人' + (this.editBool ? '编辑' : '新增')
    }
  },
  methods: {
    add(record) {
      this.editBool = false
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'custId', 'customerName'))
      })
    },
    edit(record) {
      this.editBool = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'contactId',
            'customerName',
            'custId',
            'contactName',
            'mobile',
            'sex',
            'email',
            'fax',
            'weChat',
            'qq',
            'position',
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
        // console.log('values');
        // console.log(values);
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          console.log('this.model.contactName')
          console.log(this.model.contactName)
          if (!this.model.contactName) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData = qs.stringify(formData)
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