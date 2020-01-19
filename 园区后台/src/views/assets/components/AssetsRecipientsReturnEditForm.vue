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
            <a-form-item label="资产编号">
              <a-input v-decorator="['assetNumber']" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="资产名称">
              <a-input v-decorator="['assertName']" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="归还人">
              <a-input v-decorator="['usePerson', {rules: rules.usePerson}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="操作人">
              <a-input v-model="nickname" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="归还时间">
              <j-date
                :trigger-change="true"
                v-decorator="['useDate',{rules: rules.useDate}]"
                style="width: 100%;"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="归还原因"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['reason', {rules: rules.reason}]" :rows="6" />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="备注"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['remark']" :rows="6" />
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
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { mapGetters } from 'vuex'
import { filterObj, promiseForm } from '@utils/util'
import { assetsRecipientsReturnEditForm } from '@/config/pick-fields'
import { addOpertion } from '../api'

export default {
  mixins: [FormEditDrawerMixin('assets-recipients-return')],
  components: {
    JDate
  },
  data() {
    return {
      // Form
      fields: assetsRecipientsReturnEditForm,
      confirmLoading: false,
      // Rules
      rules: {
        usePerson: [{ required: true, message: '请输入归还人' }],
        reason: [{ required: true, message: '请输入归还原因' }]
      }
    }
  },
  computed: {
    ...mapGetters(['nickname'])
  },
  methods: {
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()

      try {
        const data = await promiseForm(this.form)
        filterObj(data)
        data.assetId = this.record.assetId
        data.parkId = this.industrialParkId
        data.useType = '3'
        const resp = await addOpertion(data)
        if (!resp.success) {
          throw new Error(resp.message)
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
