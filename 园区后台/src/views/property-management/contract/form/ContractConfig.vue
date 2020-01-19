<template>
  <a-drawer
    title="合同参数设置"
    width="400"
    :visible="visible"
    @close="close">
    <a-form :form="form">
      <a-form-item label="合同分账方式">
        <a-radio-group v-decorator="['paymentMethod', {}]">
          <a-radio value="1">自然月</a-radio>
          <a-radio value="2">合同月</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="应收账结果取整">
        <a-select v-decorator="['decimalDigits', {}]">
          <a-select-option value="0">不保留小数点</a-select-option>
          <a-select-option value="1">1位</a-select-option>
          <a-select-option value="2">2位</a-select-option>
          <a-select-option value="3">3位</a-select-option>
          <a-select-option value="4">4位</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="续租提醒日期">
        <a-input v-decorator="['expireRemind', {}]">
          <a-select
            slot="addonAfter"
            style="width: 70px"
            v-decorator="['expireRemindUnit', {}]">
            <a-select-option value="1">天</a-select-option>
            <a-select-option value="2">月</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item label="付款截至天数">
        <a-input v-decorator="['feeDeadlineDays', {}]">
          <span slot="addonAfter">天</span>
        </a-input>
      </a-form-item>
      <a-form-item label="应收帐去尾法">
        <a-radio-group v-decorator="['tailRemoval', {}]">
          <a-radio value="1">采用</a-radio>
          <a-radio value="0">不采用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class="drawer-bottom-btn-group">
      <a-button type="primary" @click="close">保存</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import { promiseForm } from '@utils/util'
  import isEmpty from 'lodash/isEmpty'

  export default {
    name: 'ContractConfig',
    props: {
      config: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this, { name: 'config' })
      }
    },
    methods: {
      open(config) {
        this.form.resetFields()
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(config)
        })
      },
      close() {
        return promiseForm(this.form).then(data => {
          this.$emit('change', data)
          this.visible = false
        })
      }
    }
  }
</script>
