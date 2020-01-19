<template>
  <a-drawer
    :title="getTitle"
    wrapClassName="industrial-parks-list-form"
    width="65%"
    :closable="true"
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer"
  >
    <a-form class="drawer-form" layout="horizontal" :form="form">
      <a-row>
        <a-col span="12">
          <a-form-item label="园区名称" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['parkName', {rules: rules.parkName}]"></a-input>
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
            <a-input v-decorator="['totalBulidingArea', {rules: rules.totalBulidingArea}]">
              <span slot="addonAfter">㎡</span>
            </a-input>
          </a-form-item>
          <a-form-item label="工位总数" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['totalWorkstation', {rules: rules.totalWorkstation}]"></a-input>
          </a-form-item>
          <a-form-item label="工位收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input v-decorator="['feeScale', {rules: rules.feeScale}]">
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
            <a-input v-decorator="['totalRoom', {rules: rules.totalRoom}]"></a-input>
          </a-form-item>
          <a-form-item label="独立空间收费标准" :label-col="formItem.label" :wrapper-col="formItem.value">
            <span>
              <a-input v-decorator="['feeScaleRoom', {rules: rules.feeScaleRoom}]">
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
          <!-- <a-row>
          <a-col>-->
          <div class="flex-box">
            <a @click.prevent="showMap" style>
              <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />获取当前经纬度
            </a>
          </div>
          <!-- </a-col>
          </a-row>-->
          <a-form-item label="经度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['lng', {rules: rules.lng}]"></a-input>
          </a-form-item>
          <a-form-item label="纬度" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['lat', {rules: rules.lat}]"></a-input>
          </a-form-item>
          <a-form-item label="得房率" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['roomRate', {rules: rules.roomRate}]">
              <span slot="addonAfter">%</span>
            </a-input>
          </a-form-item>
          <a-form-item label="联系电话" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-input v-decorator="['telephone', {rules: rules.telephone}]"></a-input>
          </a-form-item>
          <a-form-item label="具备设备" :label-col="formItem.label" :wrapper-col="formItem.value">
            <a-select mode="multiple" v-decorator="['deviceGroupId']">
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
    <my-map ref="MyMap" @getMapData="getMapData"></my-map>
  </a-drawer>
</template>

<script>
import MyMap from './Map'
import JEditor from '@comp/jeecg/JEditor'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import pick from 'lodash/pick'
import { PickParksForm } from '@/config/pick-fields'
import rules from '../js/rules'

export default {
  name: 'ParksAddForm',
  components: { JEditor, MyMap },
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
      rules,
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
    showMap() {
      this.$refs.MyMap.show()
    },
    getMapData(e) {
      this.form.setFieldsValue({
        lng: e[0],
        lat: e[1]
      })
    },
    closeDrawer() {
      this.$emit('close', false)
      this.form.resetFields()
      this.editor = {
        content: '',
        policy: ''
      }
      this.editBool = false
    },
    handleSubmit() {
      this.form.validateFields((err, form) => {
        if (err === null) {
          const { content, policy } = this.editor
          form.content = content
          form.policy = policy
          if (form.deviceGroupId) {
            form.deviceGroupId = form.deviceGroupId.toString()
          }
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
    edit(row) {
      this.editBool = true
      this.editData = row
      const editData = pick(row, PickParksForm)
      if (editData.deviceGroupId) {
        editData.deviceGroupId = editData.deviceGroupId.split(',')
      }

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

<style lang="less">
.industrial-parks-list-form {
  .flex-box {
    display: flex;
    justify-content: flex-end;
    margin-top: -22.5px;
  }
}
</style>
