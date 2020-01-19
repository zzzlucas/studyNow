<template>
  <div>
    <a-drawer :title="getTitle" width="600" :closable="false" @close="onClose" :visible="visible">
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-row>
            <a-col span="24">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="用户名"
              >
                <a-input
                  autocomplete="off"
                  :disabled="editBool"
                  placeholder
                  v-decorator="['username',  {rules: [{required: true, message: '请输入用户名'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24" v-if="!editBool">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="密码">
                <a-input-password
                  autocomplete="new-password"
                  placeholder
                  v-decorator="['password',  validatorRules.password]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24" v-if="!editBool">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="确认密码"
              >
                <a-input-password
                  autocomplete="new-password"
                  placeholder
                  v-decorator="[ 'confirmpassword', validatorRules.confirmpassword]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="真实姓名"
              >
                <a-input
                  placeholder
                  v-decorator="['realname',  {rules: [{required: true, message: '请输入真实姓名'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="手机">
                <a-input
                  placeholder
                  v-decorator="['phone',  {rules: [{pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, message: '请输入正确手机'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col span="24">
              <a-form-item :labelCol="labelCol.default" :wrapperCol="wrapperCol.default" label="邮箱">
                <a-input
                  placeholder
                  v-decorator="['email',  {rules: [{pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: '请输入正确邮箱'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div class="drawer-bottom-btn-group">
          <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
          <a-button @click="onClose">取消</a-button>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<script>
import { getAction, httpAction } from '@/api/manage'
import { mapGetters } from 'vuex'
import qs from 'querystring'
import pick from 'lodash/pick'
export default {
  data() {
    return {
      visible: false,
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 4
        }
      },
      confirmLoading: false,
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 20
        }
      },
      form: this.$form.createForm(this),
      model: {},
      editBool: false,
      url: {
        add: '/park.park/basePark/userAdd',
        edit: '/park.park/basePark/userEdit'
      },
      validatorRules: {
        password: {
          rules: [
            {
              required: true,
              // pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              // message: '密码由8位数字、大小写字母和特殊符号组成!'
              message: '请填写密码',
            }
          ]
        },
        confirmpassword: {
          rules: [
            {
              required: true,
              message: '请确认新密码!'
            },
            {
              validator: this.compareToFirstPassword
            }
          ]
        }
      }
    }
  },
  computed: {
    getTitle() {
      return '用户' + (this.editBool ? '编辑' : '添加')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {},
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一样！')
      } else {
        callback()
      }
    },
    add() {
      this.visible = true
      this.editBool = false
    },
    edit(row) {
      console.log(row)
      this.visible = true
      this.editBool = true
      this.model.id = row.id
      this.model.username = row.username
      this.model.realname = row.realname
      this.model.phone = row.phone
      this.model.email = row.email
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'username', 'realname', 'phone', 'email'))
      })
    },
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
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
          console.log(formData.resourceGroupId)
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.onClose()
                that.$emit('reload')
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
    onClose() {
      this.visible = false
      this.form.resetFields()
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
</style>
