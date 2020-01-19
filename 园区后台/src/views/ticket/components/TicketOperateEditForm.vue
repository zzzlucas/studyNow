<template>
  <a-drawer
    wrapClassName="form-edit-drawer"
    width="65%"
    closable
    :title="getTitle"
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
          <a-col :xl="24">
            <a-form-item
              label="内容"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <j-editor v-decorator="['remark', {rules: rules.remark}]" triggerChange></j-editor>
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
import JEditor from '@/components/jeecg/JEditor'
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { filterObj, promiseForm } from '@utils/util'
import { addOperateProcess, addOperateFeedback } from '../api'

export default {
  mixins: [FormEditDrawerMixin('ticket-operate')],
  components: {
    JDate,
    JEditor
  },
  data() {
    return {
      // Form
      type: '',
      confirmLoading: false,
      // Rules
      rules: {
        remark: [{ required: true, message: '请填写内容' }]
      }
    }
  },
  methods: {
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()
      const data = await promiseForm(this.form)
      try {
        filterObj(data)
        data.orderId = this.$route.params.id
        let resp
        if (this.type === 'process') {
          resp = await addOperateProcess(data)
        } else {
          resp = await addOperateFeedback(data)
        }
        if (!resp.success) {
          throw new Error(resp.message)
          this.confirmLoading = false
        }
        this.$message.success('操作成功')
        this.closeDrawer()
        this.$emit('submit')
        this.confirmLoading = false
      } catch (e) {
        this.$message.error(e.message)
        this.confirmLoading = false
      }
    }
  }
}
</script>
