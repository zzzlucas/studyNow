<template>
  <a-drawer
    :title="getTitle"
    wrapClassName="industrial-parks-list-form"
    width="65%"
    :closable="false"
    :mask-closable="false"
    :visible="show"
    @close="closeDrawer"
  >
    <a-form layout="horizontal" :form="form" style="padding-bottom: 20px;">
      <a-row>
        <a-col span="12">
          <a-form-item label="园区名称" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['parkName', {rules: [{required: true, message: '请输入园区名称'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="园区简介" :label-col="formItem.label" :wrapper-col="formItem.value">
            <j-editor v-model="editor.content"></j-editor>
          </a-form-item>
          <a-form-item label="优惠政策" :label-col="formItem.label" :wrapper-col="formItem.value">
            <j-editor v-model="editor.policy"></j-editor>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="总建筑面积" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="['totalBulidingArea', {rules: [{pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数'}]}]"
            >
              <span slot="addonAfter">㎡</span>
            </a-input>
          </a-form-item>
          <a-form-item label="工位总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="['totalWorkstation', {rules: [{pattern: /^\d+$/, message: '请输入数字'}]}]"
            ></a-input>
          </a-form-item>
          <a-form-item label="工位收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input
                v-decorator="['feeScale', {rules: [{pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数'}]}]"
              >
                <a-select
                  slot="addonAfter"
                  style="width: 100px;"
                  v-decorator="['feeScaleUnit', {initialValue: dict.parksStationExt[0].value}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.parksStationExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-input>
            </span>
          </a-form-item>
          <a-form-item label="独立空间总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['totalRoom', {rules: [{pattern: /^\d+$/, message: '请输入数字'}]}]"></a-input>
          </a-form-item>
          <a-form-item label="独立空间收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input
                v-decorator="['feeScaleRoom', {rules: [{pattern: /^\d+\.\d{2}$/, message: '请输入金额，补齐两位小数'}]}]"
              >
                <a-select
                  slot="addonAfter"
                  style="width: 100px"
                  v-decorator="['feeScaleRoomUnit', {initialValue: dict.parksInterspaceExt[0].value}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.parksInterspaceExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-input>
            </span>
          </a-form-item>
          <a-form-item label="地址" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['address']"></a-input>
          </a-form-item>
          <a-form-item label="经度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="[
                'lng',
                {
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        validateLngLat('lng', rule, value, callback)
                      }
                    }
                  ]
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="纬度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="[
                'lat',
                {
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        validateLngLat('lat', rule, value, callback)
                      }
                    }
                  ]
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="得房率" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="[
                'roomRate',
                {
                  rules: [
                    {validator: this.validateRoomRate}
                  ]
                }
              ]"
            >
              <span slot="addonAfter">%</span>
            </a-input>
          </a-form-item>
          <a-form-item label="联系电话" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input
              v-decorator="['telephone', {rules: [{pattern: /^1(3\d|4[5-7]|5[0-35-9]|7[0135-8]|8\d|9[89])\d{8}$/, message: '请输入正确的手机号'}]}]"
            ></a-input>
          </a-form-item>
          <a-form-item label="具备设备" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-select mode="tags" v-decorator="['deviceGroupId']">
              <a-select-option value="1">桌子</a-select-option>
              <a-select-option value="2">椅子</a-select-option>
              <a-select-option value="3">电脑</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
      <a-button @click="closeDrawer">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import pick from 'lodash.pick'
import { PickParksForm } from '@/config/pick-fields'

export default {
  name: 'ParksAddForm',
  components: { JEditor },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  created() {
    initDictOptions('parks_station_ext').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.parksStationExt = res.result
      }
    })
    initDictOptions('parks_interspace_ext').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.parksInterspaceExt = res.result
      }
    })
  },
  data() {
    return {
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      form: this.$form.createForm(this, { name: 'park' }),
      editor: {
        content: '',
        policy: ''
      },
      dict: {
        parksStationExt: [{ value: '1' }],
        parksInterspaceExt: [{ value: '1' }]
      },
      editBool: false,
      editData: {}
    }
  },
  computed: {
    getTitle() {
      return (this.editBool ? '编辑' : '登记') + '园区'
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('close', false)
      this.form.resetFields()
      this.editor = {
        content: '',
        policy: ''
      }
    },
    handleSubmit() {
      this.form.validateFieldsAndScroll((err, form) => {
        if (err === null) {
          const { content, policy } = this.editor
          form.content = content
          form.policy = policy
          if (this.editBool) {
            this.editBool = false
            const { __key, parkId } = this.editData
            form.__key = __key
            form.parkId = parkId
            this.$emit('edit', form)
          } else {
            this.$emit('submit', form)
          }
          this.closeDrawer()
        }
      })
    },
    validateLngLat(type, rule, value, callback) {
      const num = Number(value)
      if (isNaN(num)) {
        return callback(new Error('请输入数字'))
      }
      if (/\.$/.test(value)) {
        return callback(new Error('请输入正确的小数'))
      }
      switch (type) {
        case 'lng':
          if (num > 180 || num < -180) {
            return callback(new Error('请输入正确的经度'))
          }
          break
        case 'lat':
          if (num > 90 || num < -90) {
            return callback(new Error('请输入正确的纬度'))
          }
          break
      }
      callback()
    },
    validateRoomRate(rule, value, callback) {
      const num = Number(value)
      if (isNaN(num)) {
        return callback(new Error('请输入数字'))
      }
      if (/\.$/.test(value)) {
        return callback(new Error('请输入正确的小数'))
      }
      if (num > 100 || num < 0) {
        return callback(new Error('不能大于 100 或小于 0'))
      }
      callback()
    },
    edit(row) {
      this.editBool = true
      this.editData = row
      const editData = pick(row, PickParksForm)
      editData.deviceGroupId = editData.deviceGroupId.split(',')

      this.$emit('close', true)
      this.$nextTick(() => {
        this.editor = {
          content: row.content,
          policy: row.policy
        }
        this.form.setFieldsValue(editData)
      })
    }
  }
}
</script>