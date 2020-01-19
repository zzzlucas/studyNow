<template>
  <a-drawer
    wrapClassName="assets-recipients-edit-form form-edit-drawer"
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
          <a-col :xl="12">
            <a-form-item label="借用日期">
              <j-date
                :trigger-change="true"
                v-decorator="['useDate',{rules: rules.useDate}]"
                style="width: 100%;"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="借用人">
              <a-input v-decorator="['usePerson', {rules: rules.usePerson}]"></a-input>
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
          <a-col :xl="24">
            <a-form-item
              label="借用资产"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-button @click="openAssetModal">添加</a-button>
              <br />
              <a-tag :key="tag.assetId" v-for="tag in assetSelectRows">{{ tag.fixedAssetName }}</a-tag>
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
      <!-- Asset modal -->
      <assets-search-modal
        type="1"
        use-status="1"
        v-model="assetModal"
        @select="handleSelectAssets"
      />
    </a-spin>
  </a-drawer>
</template>

<script>
import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import AssetsSearchModal from './AssetsSearchModal'
import { filterObj, promiseForm } from '@utils/util'
import { assetsRegisterEditForm } from '@/config/pick-fields'
import { addOpertion } from '../api'

export default {
  mixins: [FormEditDrawerMixin('assets-borrow')],
  components: {
    JDate,
    JUpload,
    AssetsSearchModal
  },
  data() {
    return {
      // Form
      fields: assetsRegisterEditForm,
      confirmLoading: false,
      // Rules
      rules: {
        useDate: [{ required: true, message: '请选择领用日期' }],
        usePerson: [{ required: true, message: '请输入领用人' }]
      },
      // Asset modal
      assetModal: false,
      assetSelectKeys: [],
      assetSelectRows: []
    }
  },
  methods: {
    openAssetModal() {
      this.assetModal = true
    },
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()
      try {
        const data = await promiseForm(this.form)
        if (!this.assetSelectKeys.length) {
          throw new Error('请选择至少一个资产')
        }
        filterObj(data)
        data.parkId = this.industrialParkId
        data.assetId = this.assetSelectKeys.join(',')
        data.useType = '2' // Borrow
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
    },
    handleSelectAssets(rowKeys, rowSelection) {
      this.assetSelectKeys = rowKeys
      this.assetSelectRows = rowSelection
    }
  }
}
</script>
