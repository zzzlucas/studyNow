<template>
  <a-drawer
    width="100%"
    placement="right"
    wrap-class-name="contract-new-form"
    :body-style="{padding: '10px 10px 60px', backgroundColor: 'hsl(0, 0%, 98%)'}"
    :mask-closable="false"
    :visible="visible"
    :closable="false"
    @close="close"
  >
    <template slot="title">
      <span style="float: left;">{{ title }}</span>
      <a-button type="primary" style="float: right;" @click="openConfig">设置</a-button>
      <div style="clear: both"></div>
    </template>
    <a-row :gutter="16">
      <a-col span="12">
        <a-card title="基本信息" class="main-form contract-height-mark">
          <a-form layout="horizontal" :form="form">
            <a-row>
              <a-col span="12">
                <a-form-item label="客户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input
                    placeholder="单击选择企业"
                    v-decorator="['custId', {rules: rules['custId']}]"
                    @click="openEnterpriseModal"
                  ></a-input>
                </a-form-item>
                <a-form-item label="甲方" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-select
                    placeholder="请选择甲方"
                    v-decorator="['firstParty', {rules: rules['firstParty']}]"
                  >
                    <a-select-option
                      v-for="(item, key) in firstParty"
                      :value="item.value"
                      :key="key"
                    >{{ item.title }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="开始日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-date-picker
                    class="date-picker"
                    v-decorator="['startDate', {rules: rules['startDate']}]"
                  />
                </a-form-item>
                <a-form-item label="保证金" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="['deposit', {}]"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="合同编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="['contractNo', {rules: rules['contractNo']}]"></a-input>
                </a-form-item>
                <a-form-item label="支付方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-select v-decorator="['payMonth', {initialValue: '1'}]">
                    <a-select-option value="1">一个月</a-select-option>
                    <a-select-option value="2">季度</a-select-option>
                    <a-select-option value="3">半年</a-select-option>
                    <a-select-option value="4">年度</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-date-picker
                    class="date-picker"
                    v-decorator="['endDate', {rules: rules['endDate']}]"
                  />
                </a-form-item>
                <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-select placeholder="请选择经办人" v-decorator="['operator', {}]">
                    <a-select-option
                      v-for="(item, key) in agent"
                      :value="item.value"
                      :key="key"
                    >{{ item.title }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="备注" class="full-item">
              <a-textarea :rows="5" v-decorator="['remark', {}]" />
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col span="12">
        <contract-file ref="file" parent-class="contract-new-form" :files="files"></contract-file>
        <contract-tags ref="tags" style="margin-top: 16px;" :tags="tags"></contract-tags>
      </a-col>
    </a-row>
    <contract-table ref="rent" class="full-table" title="租金" :type="1" :list="rent" @close="close"></contract-table>
    <contract-table
      ref="propertyFee"
      class="full-table"
      title="物业费"
      :type="2"
      :list="propertyFee"
      @close="close"
    ></contract-table>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="onSave">确定</a-button>
      <a-button @click="close">取消</a-button>
    </div>
    <contract-config ref="config" @change="getConfig"></contract-config>
    <yq-enterprise-modal ref="ent" @ok="getCust"></yq-enterprise-modal>
  </a-drawer>
</template>

<script>
import ContractFile from '../components/ContractFile'
import ContractTags from '../components/ContractTags'
import ContractTable from '../components/ContractTable'
import ContractConfig from './ContractConfig'
import YqEnterpriseModal from '@comp/extend/YqEnterpriseModal'
import mixins from '../js/mixins'
import _ from 'lodash'
import moment from 'moment'
import { mapState } from 'vuex'
import { newForm } from '../js/rules'
import { promiseForm } from '@utils/util'
import { getAction, postAction, putAction } from '@api/manage'
import { ajaxGetDictItems } from '@api/api'
import { contractInfoForm } from '@/config/pick-fields'

export default {
  name: 'NewForm',
  mixins: [mixins],
  components: { ContractTable, YqEnterpriseModal, ContractConfig, ContractTags, ContractFile },
  data() {
    return {
      title: '合同',
      visible: false,
      form: this.$form.createForm(this, { name: 'contract' }),
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      rules: newForm,
      firstParty: [],
      agent: [],
      contractId: '',
      rent: null,
      propertyFee: null,
      files: [],
      tags: null,
      secondRent: false
    }
  },
  created() {
    //zzzlucas 暂替请求
    getAction('/park.park/basePark/queryUserByDepId', { parkId: this.parkId }).then(res => {
      if (res.success) {
        this.agent = res.result.map(item => ({
          value: item.id,
          title: item.realname
        }))
      }
    })

    let promiseList = _.map(
      [
        ajaxGetDictItems('contract_first_party')
        // ajaxGetDictItems('sys_user,realname,id')
      ],
      promise => {
        return promise.catch(err => {
          return err
        })
      }
    )

    Promise.all(promiseList).then(([firstParty]) => {
      // Promise.all(promiseList).then(([firstParty,agent]) => {
      if (firstParty.success) {
        this.firstParty = firstParty.result
      } else {
        this.$message.error('甲方获取失败')
      }

      // if (agent.success) {
      //   this.agent = agent.result
      // } else {
      //   this.$message.error('经办人获取失败')
      // }
    })
  },
  computed: mapState('industrialPark', {
    parkId: state => state.id
  }),
  methods: {
    init() {
      this.form.resetFields()
    },
    add() {
      this.init()
      this.title = '新建合同'
      this.contractId = ''
      this.rent = null
      this.propertyFee = null
      this.files = []
      this.tags = null
      this.config = {
        decimalDigits: '2',
        expireRemind: '3',
        expireRemindUnit: '1',
        feeDeadlineDays: '10',
        paymentMethod: '1',
        tailRemoval: '1'
      }
      this.cust = { id: '', name: '' }
      this.secondRent = false
      this.visible = true
    },
    edit(id, bool) {
      this.init()
      this.visible = true
      this.secondRent = bool
      this.title = bool ? '续租合同' : '编辑合同'

      getAction('/park.lease/mgrLeaseContract/queryById', { id }).then(res => {
        if (res.success) {
          let { contract, config, rent, propertyFee } = res.result
          this.cust = { id: contract.custId, name: contract.custName }
          contract.custId = contract.custName
          contract.startDate = moment(contract.startDate)
          contract.endDate = moment(contract.endDate)
          this.form.setFieldsValue(_.pick(contract, contractInfoForm))
          this.contractId = contract.contractId
          this.files = JSON.parse(contract.addDocFiles)
          this.tags = JSON.parse(contract.labelGroupId)
          this.config = _.pick(config, [
            'decimalDigits',
            'expireRemind',
            'expireRemindUnit',
            'feeDeadlineDays',
            'paymentMethod',
            'tailRemoval'
          ])
          this.rent = rent
          this.propertyFee = propertyFee
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onSave() {
      let tags = this.$refs.tags.get()
      let files = this.$refs.file.list()
      let rent = this.$refs.rent.getData()
      let propertyFee = this.$refs.propertyFee.getData()
      if (!rent || !propertyFee) {
        this.$notification.warning({
          message: '请完整填写租金和物业费',
          duration: 3
        })
        return false
      }

      promiseForm(this.form).then(data => {
        let form = {}
        data.parkId = this.parkId
        data.custId = this.cust.id
        data.labelGroupId = JSON.stringify(tags)
        data.addDocFiles = JSON.stringify(files)

        if (moment.isMoment(data.startDate)) {
          data.startDate = data.startDate.format('YYYY-MM-DD')
        }
        if (moment.isMoment(data.endDate)) {
          data.endDate = data.endDate.format('YYYY-MM-DD')
        }

        form.contract = data
        form.config = this.config
        form.rent = rent
        form.propertyFee = propertyFee

        if (this.contractId) {
          let obj = this.secondRent
            ? {
                url: '/park.lease/mgrLeaseContract/secondRent',
                message: '合同续租成功'
              }
            : {
                url: '/park.lease/mgrLeaseContract/edit',
                message: '合同修改成功'
              }

          form.contract.contractId = this.contractId
          putAction(obj.url, form).then(res => {
            if (res.success) {
              this.$message.success(obj.message)
              this.$emit('change')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          postAction('/park.lease/mgrLeaseContract/add', form).then(res => {
            if (res.success) {
              this.$message.success('合同创建成功')
              this.$emit('change')
              this.visible = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    close() {
      this.$refs.file.close()
      this.visible = false
    },
    getConfig(config) {
      this.config = config
    }
  }
}
</script>

<style lang="less">
.contract-new-form {
  .main-form {
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

    .date-picker {
      width: 100%;
    }
  }

  .full-table {
    margin-top: 16px;
  }
}
</style>
