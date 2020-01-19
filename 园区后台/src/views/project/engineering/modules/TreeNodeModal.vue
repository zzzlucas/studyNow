<template>
  <a-modal
    :title="title"
    v-model="show"
    :mask-closable="true"
    :width="680"
    @cancel="close">
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col span="12">
          <a-form-item label="节点名称">
            <a-input v-decorator="['title', {rules: rules.title}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="父节点">
            <a-select v-decorator="['parentID', {initialValue: ''}]">
              <a-select-option
                v-for="(item, key) in parentNode"
                :value="item.value"
                :key="key"
                v-if="model.nodeId !== item.value">{{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="16">
          <a-form-item label="计划时间" required :help="plan.help" :validateStatus="plan.status">
            <a-range-picker v-decorator="['plan', {}]" @change="dateChange('plan', ...arguments)"/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="计划工期">
            {{ model ? model.planDays : 0 }} 天
          </a-form-item>
        </a-col>
        <a-col span="16">
          <a-form-item label="实际时间">
            <a-range-picker v-decorator="['actual', {}]" @change="dateChange('actual', ...arguments)"/>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="实际工期">
            {{ model ? model.actualDays : 0 }} 天
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template slot="footer">
      <a-button @click="close">取消</a-button>
      <a-button type="danger" @click="nodeDel(model.nodeId)" v-if="isEdit">删除节点</a-button>
      <a-button type="primary" :loading="loading" @click="nodeSave">保存</a-button>
    </template>
  </a-modal>
</template>

<script>
  import { node } from '../js/rules'
  import _ from 'lodash'
  import { PickMgrEngineeringNodeForm } from '@/config/pick-fields'
  import moment from 'moment'
  import { promiseForm } from '@utils/util'
  import { deleteAction, httpAction } from '@api/manage'
  import qs from 'qs'

  export default {
    name: 'TreeNodeModal',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        title: '节点',
        form: this.$form.createForm(this, { name: 'node' }),
        rules: node,
        show: false,
        model: {},
        isEdit: false,
        loading: false,
        url: {
          add: '/park.engineering/mgrEngineeringNode/add',
          delete: '/park.engineering/mgrEngineeringNode/delete',
          edit: '/park.engineering/mgrEngineeringNode/edit'
        },
        plan: {
          status: 'success',
          help: ''
        }
      }
    },
    methods: {
      init() {
        this.parentNode = _.map(_.merge([], this.list), row => {
          return {
            value: row.nodeId,
            label: row.title
          }
        })
        this.parentNode = _.chain(this.parentNode).unshift({ label: '顶级', value: '' }).value()
        this.form.resetFields()
      },
      add(data) {
        this.init()
        this.title = '新增节点'
        this.model = _.merge({
          plan: [],
          planDays: 0,
          actual: [],
          actualDays: 0
        }, data)
        this.isEdit = false
        this.show = true
      },
      edit(data) {
        this.init()
        this.title = '编辑节点'
        this.isEdit = true
        this.show = true

        let planBool = !(data.planStartDate === '---' || data.planEndDate === '---')
        let actualBool = !(data.actualStartDate === '---' || data.actualEndDate === '---')
        data.plan = planBool ? [moment(data.planStartDate), moment(data.planEndDate)] : []
        data.planDays = planBool ? moment(data.planEndDate).diff(moment(data.planStartDate), 'd') : 0
        data.actual = actualBool ? [moment(data.actualStartDate), moment(data.actualEndDate)] : []
        data.actualDays = actualBool ? moment(data.actualEndDate).diff(moment(data.actualStartDate), 'd') : 0
        delete data.planStartDate
        delete data.planEndDate
        delete data.actualStartDate
        delete data.actualEndDate

        this.model = data

        this.$nextTick(() => {
          this.form.setFieldsValue(_.pick(this.model, PickMgrEngineeringNodeForm))
        })
      },
      close(reset = false) {
        this.loading = false
        this.show = false
        this.$emit('close', reset)
      },
      nodeDel(id) {
        this.$confirm({
          title: `是否删除 ${this.model.title}`,
          okType: 'danger',
          okText: '删除',
          onOk: () => {
            deleteAction(this.url.delete, { id }).then(res => {
              if (res.success && res.code === 200) {
                this.$message.success('删除成功')
                this.close()
              } else {
                this.$message.error('删除失败')
              }
            })
          }
        })
      },
      nodeSave() {
        this.loading = true

        let url = ''
        let method = ''
        let success = ''
        if (this.isEdit) {
          url = this.url.edit
          method = 'PUT'
          success = '编辑成功'
        } else {
          url = this.url.add
          method = 'POST'
          success = '添加成功'
        }

        const form = promiseForm(this.form)
        form.then(res => {
          let data = _.merge({}, this.model, res)
          if (data.plan === undefined || data.plan.length < 2) {
            this.plan.status = 'error'
            this.plan.help = '计划时间不能为空'
            this.loading = false
            return false
          }
          if (data.actual === undefined) {
            data.actual = []
          }
          data.planStartDate = data.plan.length > 0 ? data.plan[0].format('YYYY-MM-DD') : ''
          data.planEndDate = data.plan.length > 0 ? data.plan[1].format('YYYY-MM-DD') : ''
          data.actualStartDate = data.actual.length > 0 ? data.actual[0].format('YYYY-MM-DD') : ''
          data.actualEndDate = data.actual.length > 0 ? data.actual[1].format('YYYY-MM-DD') : ''
          delete data.plan
          delete data.actual

          httpAction(url, qs.stringify(data), method).then(res => {
            if (res.success && res.code === 200) {
              this.$message.success(success)
              this.close(true)
            } else {
              this.$message.warning(res.message)
            }
          })
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      },
      dateChange(type, date) {
        if (type === 'plan') {
          this.model.plan = date
          this.model.planDays = date.length > 0 ? date[1].diff(date[0], 'd') : 0
        } else if (type === 'actual') {
          this.model.actual = date
          this.model.actualDays = date.length > 0 ? date[1].diff(date[0], 'd') : 0
        }
        this.plan.status = 'success'
        this.plan.help = ''
      }
    }
  }
</script>
