<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer"
  >
    <a-spin :spinning="confirmLoading">
      <a-form
        class="form-edit-drawer-form"
        layout="horizontal"
        :form="form"
        :label-col="gridOptions.formItem.label"
        :wrapper-col="gridOptions.formItem.value"
        @submit="submit"
      >
        <a-row>
          <a-col :xl="12">
            <a-form-item label="工单类别">
              <j-dict-select-tag
                v-decorator="['orderType', {rules: rules.orderType}]"
                :triggerChange="true"
                dictCode="order_type"
                @change="changeOrderType"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="负责人">
              <a-input v-decorator="['principalUser', {rules: rules.principalUser}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="服务方式">
              <j-dict-select-tag
                v-decorator="['method', {rules: rules.method}]"
                :triggerChange="true"
                dictCode="service_type"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="是否收费">
              <a-switch v-decorator="['isCharge']"></a-switch>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="客户名称">
              <a-input v-decorator="['custName', {rules: rules.custName}]"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="isCurrentTypeInProject">
            <a-col :xl="12">
              <a-form-item label="项目名称">
                <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="经办人">
                <a-input v-decorator="['contactName', {rules: rules.contactName}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="联系方式">
                <a-input v-decorator="['mobile', {rules: rules.mobile}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="24">
              <a-form-item
                label="附件"
                :label-col="gridOptions.formItemFullRow.label"
                :wrapper-col="gridOptions.formItemFullRow.value"
              >
                <j-upload v-decorator="['addDocFiles']" />
              </a-form-item>
            </a-col>
          </template>
          <template v-if="isCurrentTypeInProjectPeriod">
            <a-col :xl="12">
              <a-form-item label="项目名称">
                <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="经办人">
                <a-input v-decorator="['contactName', {rules: rules.contactName}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="联系方式">
                <a-input v-decorator="['mobile', {rules: rules.mobile}]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="期限开始时间">
                <j-date :trigger-change="true" v-decorator="['begDate']" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xl="12">
              <a-form-item label="期限结束时间">
                <j-date :trigger-change="true" v-decorator="['endDate']" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xl="24">
              <a-form-item
                label="附件"
                :label-col="gridOptions.formItemFullRow.label"
                :wrapper-col="gridOptions.formItemFullRow.value"
              >
                <j-upload v-decorator="['addDocFiles']" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="24" v-if="!isCurrentTypeInProject && !isCurrentTypeInProjectPeriod">
            <a-form-item
              label="主题"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="内容"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <j-editor v-decorator="['content', {rules: rules.content}]" triggerChange></j-editor>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="action-row" type="flex" justify="end">
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button @click="closeDrawer">取消</a-button>
            </a-form-item>
          </a-col>
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button type="primary" html-type="submit">确认</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import JEditor from '@/components/jeecg/JEditor'
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { filterObj, promiseForm } from '@utils/util'
import { ticketEditForm } from '@/config/pick-fields'
import { addInfo, editInfo } from '../api'
import Mixin from '../mixin'

export default {
  mixins: [FormEditDrawerMixin('ticket-edit'), Mixin],
  components: {
    JDate,
    JUpload,
    JEditor
  },
  data() {
    return {
      // Form
      fields: ticketEditForm,
      confirmLoading: false,
      orderType: '',
      // Rules
      rules: {
        orderType: [{ required: true, message: '请输入分类名称' }],
        principalUser: [{ required: true, message: '请选择负责人名称' }],
        method: [{ required: true, message: '请选择服务方式' }],
        custName: [{ required: true, message: '请输入客户名称' }],
        title: [{ required: true, message: '请输入主题' }],
        contactName: [{ required: true, message: '请选择经办人名称' }],
        mobile: [{ required: true, message: '请填写联系方式' }],
        content: [{ required: true, message: '请输入内容' }]
      }
    }
  },
  computed: {
    isCurrentTypeInProjectPeriod() {
      return this.orderTypeProjectPeriod.includes(this.orderType)
    },
    isCurrentTypeInProject() {
      return this.orderTypeProject.includes(this.orderType)
    }
  },
  methods: {
    changeOrderType(value) {
      this.orderType = value
    },
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()
      try {
        const data = await promiseForm(this.form)
        filterObj(data)
        data.parkId = this.industrialParkId
        let resp
        if (this.isEdit) {
          data.orderId = this.record.orderId
          resp = await editInfo(data)
        } else {
          resp = await addInfo(this.orderType, data)
        }
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.confirmLoading = false
        this.$message.success('操作成功')
        this.closeDrawer()
        this.$emit('submit')
      } catch (e) {
        this.$message.error(e.message)
      }
      this.confirmLoading = false
    },
    async init() {
      if (!this.isEdit) {
        this.orderType = this.record.orderType
        await this.$nextTick()
        this.form.setFieldsValue({ orderType: this.record.orderType })
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return
      }
      this.init()
    }
  }
}
</script>
