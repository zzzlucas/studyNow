<template>
  <a-drawer
    width="65%"
    placement="right"
    :title="title"
    :visible="visible"
    :mask-closable="true"
    @close="close"
  >
    <a-form class="drawer-form mgr-engineering-info-drawer" layout="horizontal" :form="form">
      <h2>基本信息</h2>
      <a-form-item class="full-item" :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
        <a-input placeholder="请输入项目名称" v-decorator="['projectName', {rules: rules.projectName}]" />
      </a-form-item>
      <a-row>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目类别">
            <a-select placeholder="请选择项目类别" v-decorator="['types', {rules: rules.types}]">
              <a-select-option value="1">工业项目</a-select-option>
              <a-select-option value="2">住宅项目</a-select-option>
              <a-select-option value="3">商业项目</a-select-option>
              <a-select-option value="4">基础设施项目</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目进展">
            <a-select
              placeholder="请选择项目进展"
              v-decorator="['engineeringProcess', {initValue: '1', rules: rules.engineeringProcess}]"
            >
              <a-select-option value="1">前期准备</a-select-option>
              <a-select-option value="2">办证</a-select-option>
              <a-select-option value="3">已入库</a-select-option>
              <a-select-option value="4">在建中</a-select-option>
              <a-select-option value="5">已竣工</a-select-option>
              <a-select-option value="6">已投产</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目状态">
            <a-input placeholder="请输入项目状态" v-decorator="['status', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目单位">
            <a-input
              placeholder
              v-decorator="['customerName', {rules: [{ required: true, message: '请选择项目单位', whitespace: true}]}]"
              @click="openEnterpriseModal"
            ></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目总投资">
            <a-input v-decorator="[ 'invest', {}]" />
          </a-form-item>
          <a-form-item
            class="form-picker"
            label="计划开工日期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker v-decorator="[ 'planStartDate', {}]"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目联系人">
            <a-input placeholder="请输入项目联系人" v-decorator="['manager', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="立项文号">
            <a-input placeholder="请输入立项文号" v-decorator="['setUpSerialNum', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="土地编号">
            <a-input placeholder="请输入土地编号" v-decorator="['serialNum', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="初步设计批复文号">
            <a-input placeholder="请输入初步设计批复文号" v-decorator="['approveSerialNum', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="立项金额">
            <a-input v-decorator="[ 'setUpInvest', {}]" />
          </a-form-item>
          <a-form-item
            class="form-picker"
            label="计划完工日期"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker v-decorator="[ 'planEndDate', {}]"></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item class="full-item" label="项目性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入项目性质" v-decorator="['nature', {}]" />
          </a-form-item>
          <a-form-item
            class="full-item"
            label="备注信息"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 18}"
          >
            <a-textarea rows="3" placeholder="请输入备注信息" v-decorator="['remark', {}]" />
          </a-form-item>
        </a-col>
      </a-row>

      <h2>详细数据</h2>
      <a-row>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总用地面积">
            <a-input v-decorator="[ 'area', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总户数">
            <a-input v-decorator="[ 'familyNum', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="绿地面积">
            <a-input v-decorator="[ 'greenbeltArea', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="每层面积">
            <a-input v-decorator="[ 'defenceArea', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="层数">
            <a-input v-decorator="[ 'floorNumber', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="承重">
            <a-input v-decorator="[ 'loadBearing', {}]" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总建筑面积">
            <a-input v-decorator="[ 'overGroundArea', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="容积率">
            <a-input v-decorator="[ 'plotRatio', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="绿地率">
            <a-input v-decorator="[ 'greeningRate', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="结构形式">
            <a-input placeholder="请输入结构形式" v-decorator="['structuralStyle', {}]" />
          </a-form-item>
          <!--<a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="层高">
            <a-input v-decorator="[ 'floorHeight', {}]"/>
          </a-form-item>-->
        </a-col>
      </a-row>

      <h2>参建单位</h2>
      <a-row>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建设单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.builder', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="代建单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.agencyBuilder', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="施工单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.constructor', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目地址">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.address', {}]" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设计单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.designer', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="勘察单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.perambulator', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="监理单位">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.supervisor', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系方式">
            <a-input v-decorator="[ 'mgrEngineeringBuilder.tel', {}]" />
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item
            class="full-item"
            label="备注信息"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 18}"
          >
            <a-textarea rows="3" placeholder="请输入备注信息" v-decorator="['description', {}]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
    <yq-enterprise-modal ref="ent" @ok="getCust"></yq-enterprise-modal>
  </a-drawer>
</template>

<script>
import { httpAction, getAction } from '@api/manage'
import _ from 'lodash'
import moment from 'moment'
import rules from '../js/rules'
import { promiseForm } from '@utils/util'
import qs from 'qs'
import { PickMgrEngineeringInfoForm } from '@/config/pick-fields'
import { mapState } from 'vuex'
import YqEnterpriseModal from '@comp/extend/YqEnterpriseModal'
import mixins from '../mixins'

export default {
  name: 'MgrEngineeringInfoDrawer',
  components: { YqEnterpriseModal },
  mixins: [mixins],
  data() {
    return {
      rules,
      title: '工程',
      visible: false,
      model: {},
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
      form: this.$form.createForm(this, { name: 'engineering' }),
      url: {
        add: '/park.engineering/mgrEngineeringInfo/add',
        edit: '/park.engineering/mgrEngineeringInfo/edit'
      },
      dict: {}
    }
  },
  computed: mapState('industrialPark', {
    parkId: state => state.id
  }),
  created() {
    getAction('/park.customer/baseCustomer/listAll', { parkId: this.parkId }).then(res => {
      this.dict.custList = res.result.records
      console.log(this.dict.custList)
    })
  },
  methods: {
    add() {
      this.title = '新增工程'
      this.form.resetFields()
      this.visible = true
    },
    edit(record) {
      this.title = '编辑工程'
      this.form.resetFields()
      _.map(record.mgrEngineeringBuilder, (value, key) => {
        record[`mgrEngineeringBuilder.${key}`] = value || ''
      })
      delete record.mgrEngineeringBuilder
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(_.pick(this.model, PickMgrEngineeringInfoForm))
        //时间格式化
        this.form.setFieldsValue({ planStartDate: this.model.planStartDate ? moment(this.model.planStartDate) : null })
        this.form.setFieldsValue({ planEndDate: this.model.planEndDate ? moment(this.model.planEndDate) : null })
        this.form.setFieldsValue({ createrDate: this.model.createrDate ? moment(this.model.createrDate) : null })
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      // 触发表单验证
      const form = promiseForm(this.form)

      form
        .then(form => {
          //时间格式化
          form.planStartDate = form.planStartDate ? form.planStartDate.format('YYYY-MM-DD') : ''
          form.planEndDate = form.planEndDate ? form.planEndDate.format('YYYY-MM-DD') : ''
          form.createrDate = form.createrDate ? form.createrDate.format('YYYY-MM-DD') : ''

          this.confirmLoading = true
          let httpUrl = ''
          let method = ''
          if (!this.model.projectId) {
            form.parkId = this.parkId
            httpUrl += this.url.add
            method = 'post'
            _.map(form.mgrEngineeringBuilder, (value, key) => {
              form[key] = value || ''
            })
          } else {
            _.map(form.mgrEngineeringBuilder, (value, key) => {
              form[`mgrEngineeringBuilder.${key}`] = value || ''
            })
            form['mgrEngineeringBuilder.projectId'] = this.model.projectId
            form.projectId = this.model.projectId
            httpUrl += this.url.edit
            method = 'put'
          }

          form.projectTypes = 1
          // form.fillUnit = this.cust.id
          // form.custId = this.cust.id

          delete form.mgrEngineeringBuilder
          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then(res => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok')
              this.close()
            } else {
              this.$message.warning(res.message)
            }
          })
        })
        .catch(err => {
          console.log('工程项目新增：', err)
        })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>

<style lang="less">
.mgr-engineering-info-drawer {
  & > h2 {
    width: (50% / 24) * 6;
    padding-right: 11px;
    text-align: right;

    //noinspection CssInvalidPseudoSelector
    &:not(:first-of-type) {
      margin-top: 16px;
    }
  }

  .full-item {
    .ant-form-item-label {
      width: (50% / 24) * 6;
    }

    .ant-form-item-control-wrapper {
      width: (50% / 24) * 18 + 50%;
    }
  }

  .form-picker {
    .ant-form-item-children {
      width: 100%;
      display: block;

      .ant-calendar-picker {
        width: 100%;
      }
    }
  }
}
</style>
