<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-form
      class="form-edit-drawer-form"
      layout="horizontal"
      :form="form"
      :label-col="gridOptions.formItem.label"
      :wrapper-col="gridOptions.formItem.value"
      @submit="submit">
      <a-row>
        <a-col :xl="12">
          <a-form-item label="处置日期">
            <j-date :trigger-change="true" v-decorator="['useDate',{rules: rules.useDate}]" style="width: 100%;" />
          </a-form-item>
        </a-col>
        <a-col :xl="12">
          <a-form-item label="处置类型">
            <j-dict-select-tag
              v-decorator="['detailType', {rules: rules.detailType}]"
              :triggerChange="true"
              dictCode="detail_type" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="处置原因" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['reason']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="备注" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-textarea v-decorator="['remark']" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="处置资产" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <a-button @click="openAssetModal">添加</a-button>
            <br>
            <div class="assets-list">
              <div class="assets-item" :key="row.assetId" v-for="row in assetSelectRows">
                <a-tag>{{ row.fixedAssetName }}</a-tag>
                数量：
                <a-input-number
                  size="small"
                  placeholder="数量"
                  :disabled="row.categoryType === '1'"
                  v-decorator="['assets.' + row.assetId, { rules: rules.assets, initialValue: 1 }]" />
              </div>
            </div>
          </a-form-item>
        </a-col>
        <a-col :xl="24">
          <a-form-item label="附件" :label-col="gridOptions.formItemFullRow.label" :wrapper-col="gridOptions.formItemFullRow.value">
            <j-upload v-decorator="['addDocFiles']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="action-row" type="flex" justify="end">
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button @click="closeDrawer">
              取消
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :xl="2">
          <a-form-item style="float: right">
            <a-button type="primary" html-type="submit">
              确认
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- Asset modal -->
    <assets-search-modal
      :use-status="['1', '3']"
      v-model="assetModal"
      @select="handleSelectAssets" />
  </a-drawer>
</template>

<script>
  import JDate from '@/components/jeecg/JDate'
  import JUpload from '@/components/jeecg/JUpload'
  import AssetsSearchModal from './AssetsSearchModal'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import { filterObj, promiseForm } from '@utils/util'
  import { assetsRegisterEditForm } from '@/config/pick-fields'
  import { addOpertion } from '../api'

  export default {
    mixins: [
      FormEditDrawerMixin('assets-disposal'),
    ],
    components: {
      JDate,
      JUpload,
      AssetsSearchModal,
    },
    data() {
      return {
        // Form
        type: '',
        fields: assetsRegisterEditForm,
        confirmLoading: false,
        // Rules
        rules: {
          useDate: [
            { required: true, message: '请选择处置日期' },
          ],
          detailType: [
            { required: true, message: '请选择处置类型' },
          ],
          assets: [
            { required: true, message: '请输入数量，至少需要1个', type: 'integer', min: 1 },
          ],
        },
        // Asset modal
        assetModal: false,
        assetSelectKeys: [],
        assetSelectRows: [],
      }
    },
    methods: {
      openAssetModal() {
        this.assetModal = true
      },
      handleSelectAssets(rowKeys, rowSelection) {
        this.assetSelectKeys = rowKeys
        this.assetSelectRows = rowSelection
      },
      cleanup() {
        this.assetSelectKeys = []
        this.assetSelectRows = []
      },
      async submit(ev) {
        ev.preventDefault();
        try {
          this.confirmLoading = true
          const data = await promiseForm(this.form)
          const total = this.assetSelectKeys.length // Total assets
          let counter = 0
          let errMsg = []
          if (!total) {
            throw new Error('请选择至少一个资产')
          }
          // Setup request body
          filterObj(data)
          data.parkId = this.industrialParkId
          data.useType = '4' // Disposal
          const assets = data.assets
          delete data.assets
          // Batch request
          let i = 0
          for (let [assetId, qty] of Object.entries(assets)) {
            try {
              data.assetId = assetId
              data.qty = qty
              const resp = await addOpertion(data)
              if (!resp.success) {
                throw new Error(resp.message)
              }
              counter++
            } catch (e) {
              errMsg.push({ number: this.assetSelectRows[i].assetNumber, name: this.assetSelectRows[i].fixedAssetName, message: e.message })
            }
            i++
          }
          // Stats report
          if (total !== counter) {
            this.$message.warning(`已成功操作 ${counter} 个资产，失败操作 ${total - counter} 个`, 5)
            errMsg.forEach(item => {
              this.$message.error(`资产: ${item.name}，失败原因：${item.message}`, 5)
            })
          } else {
            this.$message.success('操作成功')
            this.closeDrawer()
            this.$emit('submit')
          }
        } catch (e) {
          this.$message.error(e.message)
        }
        this.confirmLoading = false
      },
    },
  }
</script>
