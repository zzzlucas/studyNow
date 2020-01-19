<template>
  <a-drawer
    title="退租"
    width="100%"
    wrap-class-name="contract-surrender-form"
    :visible="visibles"
    :body-style="{padding: '10px 10px 60px', backgroundColor: 'hsl(0, 0%, 98%)'}"
    :mask-closable="false"
    @close="close">
    <a-row :gutter="14">
      <a-col span="12">
        <a-card title="基本信息">
          <a-form class="main-form" layout="horizontal" :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form">
            <a-form-item label="退租类型">
              <a-radio-group v-decorator="['returnType', {rules: rules.returnType}]">
                <a-radio :value="1">部分退租</a-radio>
                <a-radio :value="2">整体退租</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="退租日期">
              <a-date-picker v-decorator="['contractNo', {rules: rules.contractNo, initialValue: getDate()}]"/>
            </a-form-item>
            <a-form-item label="退租位置" required v-if="form.getFieldValue('returnType') === 1">
              <a-select
                mode="multiple"
                placeholder="请选择房间"
                v-decorator="['resourceGroupId', {rules: rules.resourceGroupId, initialValue: []}]">
                <a-select-option v-for="(item, key) in rent" :value="item.recordId" :key="key">
                  {{ item.roomName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="退租原因">
              <a-textarea :rows="5" v-decorator="['returnReason', {initialValue: ''}]"/>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col span="12">
        <a-card title="合同信息" class="contract-info-card">
          <a-form layout="horizontal" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-form-item label="合同编号">{{ contract.contractNo }}</a-form-item>
            <a-form-item label="客户名称">{{ contract.custName }}</a-form-item>
            <a-form-item label="合同租期">{{ contract.startDate }} ~ {{ contract.endDate }}</a-form-item>
            <a-form-item label="支付方式">{{ dictReplace(contract.payMonth) }}</a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="confirm">确认退租</a-button>
      <a-button @click="close">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import moment from 'moment'
  import qs from 'qs'
  import _ from 'lodash'
  import { surrenderForm } from '../js/rules'
  import { promiseForm } from '@utils/util'
  import { getAction, postAction } from '@api/manage'
  import { filterDictText, initDictOptions } from '@comp/dict/JDictSelectUtil'

  export default {
    name: 'SurrenderForm',
    data() {
      return {
        visibles: false,
        form: this.$form.createForm(this, { name: 'SurrenderForm' }),
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 21
        },
        rules: surrenderForm.call(this),
        contract: {},
        rent: [],
        payMonth: []
      }
    },
    created() {
      initDictOptions('contract_pay_month').then(res => {
        if (res.success) {
          this.payMonth = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      open(id) {
        this.$message.loading('加载中')
        this.form.resetFields()
        getAction('/park.lease/mgrLeaseContract/queryById', { id }).then(res => {
          this.$message.destroy()
          if (res.success) {
            let { contract, rent } = res.result
            this.contract = contract
            this.rent = rent
            this.form.setFields({
              'returnType': {
                value: 1
              }
            })
            this.visibles = true
          } else {
            this.$message.warning(res.message)
          }
        }).catch(err => {
          this.$message.destroy()
          this.$message.warning(err.message)
        })
      },
      close() {
        this.visibles = false
      },
      confirm() {
        promiseForm(this.form).then(form => {
          form.contractNo = form.contractNo.format('YYYY-MM-DD')
          form.resourceGroupId = JSON.stringify(form.resourceGroupId)
          form = _.merge({}, form, _.pick(this.contract, ['parkId', 'custId', 'firstParty']))
          postAction('/park.lease/mgrLeaseContractReturn/add', qs.stringify(form)).then(res => {
            if (res.success) {
              this.$message.success('退租提交成功')
              this.$emit('change')
              this.close()
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            this.$message.error(err.message)
          })
        })
      },
      getDate() {
        return moment()
      },
      dictReplace(text) {
        return filterDictText(this.payMonth, text)
      }
    }
  }
</script>

<style lang="less">
  .contract-surrender-form {
    .main-form {
      .ant-calendar-picker {
        width: 100%;
      }
    }

    .contract-info-card {
      .ant-card-body {
        padding: 3px 8px;
      }

      .ant-form-item {
        margin-bottom: 0;
      }
    }
  }
</style>
