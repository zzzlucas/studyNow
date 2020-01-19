<template>
  <div>
    <a-drawer
      width="100%"
      placement="right"
      wrap-class-name="contract-view"
      :title="title"
      :body-style="{padding: '10px'}"
      :mask-closable="false"
      :visible="visible"
      @close="close">
      <a-row :gutter="16">
        <a-col span="12">
          <a-card title="基本信息" class="main-view contract-height-mark">
            <a-form layout="horizontal">
              <a-row>
                <a-col span="12">
                  <a-form-item
                    label="客户名称"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ contract.custName }}
                  </a-form-item>
                  <a-form-item
                    label="甲方"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ filterDictText(firstParty, contract.firstParty) }}
                  </a-form-item>
                  <a-form-item
                    label="开始日期"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ contract.startDate }}
                  </a-form-item>
                  <a-form-item
                    label="保证金"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    &yen; {{ toFixed(contract.deposit) }}
                  </a-form-item>
                </a-col>
                <a-col span="12">
                  <a-form-item
                    label="合同编号"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ contract.contractNo }}
                  </a-form-item>
                  <a-form-item
                    label="支付方式"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ filterDictText(payMonth, contract.payMonth) }}
                  </a-form-item>
                  <a-form-item
                    label="结束日期"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ contract.endDate }}
                  </a-form-item>
                  <a-form-item
                    label="经办人"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol">
                    {{ filterDictText(agent, contract.operator) }}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item
                label="备注"
                class="full-item">
                {{ contract.remark }}
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col span="12">
          <contract-file class="view-files" parent-class="contract-view" readonly :files="files"></contract-file>
          <a-card title="合同标签" class="contract-tags">
            <a class="ant-btn" v-for="(text, key) in tags" :key="key">{{ text }}</a>
          </a-card>
        </a-col>
      </a-row>
      <contract-view-table
        class="full-table"
        title="租金"
        :list="rent"></contract-view-table>
      <contract-view-table
        class="full-table"
        title="物业费"
        :list="propertyFee"></contract-view-table>
    </a-drawer>
  </div>
</template>

<script>
  import _ from 'lodash'
  import ContractFile from '../components/ContractFile'
  import ContractViewTable from '../components/ContractViewTable'
  import numeral from 'numeral'
  import { getAction } from '@api/manage'
  import { getTags } from '../js/utils'
  import { ajaxGetDictItems } from '@api/api'
  import { filterDictText } from '@comp/dict/JDictSelectUtil'

  export default {
    name: 'ContractView',
    components: { ContractViewTable, ContractFile },
    data() {
      return {
        title: '查看合同',
        visible: false,
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        },
        tags: [''],
        files: [],
        contract: {},
        firstParty: [],
        agent: [],
        payMonth: [],
        rent: [],
        propertyFee: []
      }
    },
    created() {
      let promiseList = _.map([
        ajaxGetDictItems('contract_first_party'),
        ajaxGetDictItems('sys_user,realname,id'),
        ajaxGetDictItems('contract_pay_month')
      ], promise => {
        return promise.catch(err => {
          return err
        })
      })

      Promise.all(promiseList).then(([firstParty, agent, payMonth]) => {
        if (firstParty.success) {
          this.firstParty = firstParty.result
        } else {
          this.$message.error('甲方获取失败')
        }

        if (agent.success) {
          this.agent = agent.result
        } else {
          this.$message.error('经办人获取失败')
        }

        if (payMonth.success) {
          this.payMonth = payMonth.result
        } else {
          this.$message.error('支付方式获取失败')
        }
      })
    },
    methods: {
      filterDictText,
      init(id) {
        getAction('/park.lease/mgrLeaseContract/queryById', { id }).then(res => {
          if (res.success) {
            let { contract, rent, propertyFee } = res.result
            let { labelGroupId, addDocFiles } = contract

            this.contract = contract
            let tags = JSON.parse(labelGroupId)
            this.tags = getTags(tags)
            this.files = JSON.parse(addDocFiles)

            this.rent = rent
            this.propertyFee = propertyFee
          } else {
            this.$message.error(res.message)
          }
        })
      },
      open(id) {
        this.init(id)
        this.visible = true
      },
      close() {
        this.visible = false
      },
      toFixed(number){
        return numeral(number).format('0.00')
      }
    }
  }
</script>

<style lang="less">
  .contract-view {
    .ant-drawer-wrapper-body {
      background-color: hsl(0, 0%, 98%);
    }

    .view-files {
      .ant-card-body {
        padding: 18px 24px;
      }

      .ant-upload-list-item {
        .ant-upload-list-item-info {
          padding-right: 0;
        }

        .anticon-close {
          display: none;
        }
      }
    }

    .contract-tags {
      margin-top: 16px;

      .ant-btn {
        cursor: default;

        & + .ant-btn {
          margin-left: 8px;
        }

        &:hover {
          color: unset;
          border-color: #d9d9d9;
        }

        &:focus {
          color: unset;
          border-color: #d9d9d9;
        }
      }
    }

    .main-view {
      .full-item {
        .ant-form-item-label {
          width: (50% / 24) * 6;
          vertical-align: top;
        }

        .ant-form-item-control-wrapper {
          width: (50% / 24) * 18 + 50%;
          display: inline-block;
        }
      }
    }

    .full-table {
      margin-top: 16px;
    }
  }
</style>
