<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
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
          <a-col :xl="24">
            <a-form-item
              label="广告位名称"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-input v-decorator="['advertName', {rules: rules.advertName}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="所属厂房">
              <a-select
                style="width: 100%;"
                v-decorator="['projectId', {rules: rules.projectId}]"
                @change="fetchBuildings"
              >
                <a-select-option
                  :value="item.buildingProjectId"
                  v-for="item in types.project"
                  :key="item.buildingProjectId"
                >{{ item.projectName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="所属楼宇">
              <a-select
                style="width: 100%;"
                v-decorator="['buildingId', {rules: rules.buildingId}]"
                @change="fetchFloors"
              >
                <a-select-option
                  :value="item.buildingId"
                  v-for="item in types.building"
                  :key="item.buildingId"
                >{{ item.buildingName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="所属楼层">
              <a-select style="width: 100%;" v-decorator="['floorId', {rules: rules.floorId}]">
                <a-select-option
                  :value="item.floorId"
                  v-for="item in types.floor"
                  :key="item.floorId"
                >{{ item.floorName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="地理位置">
              <a-input v-decorator="['address']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="占地面积">
              <a-input-number
                v-decorator="['chargingArea', {rules: rules.chargingArea}]"
                style="width: 90%;"
              ></a-input-number>
              <span class="ant-form-text" style="margin-left: 3%; width: 7%; padding-right: 0;">
                m
                <sup>2</sup>
              </span>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系人">
              <a-input v-decorator="['contactPerson', {rules: rules.contactPerson}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系电话">
              <a-input v-decorator="['contactTel', {rules: rules.contactTel}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="是否收费"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-switch v-model="isCharge"></a-switch>
            </a-form-item>
          </a-col>
          <a-col :xl="12" v-show="isCharge">
            <a-form-item label="标准单价">
              <a-input v-decorator="['price']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12" v-show="isCharge">
            <a-form-item label="收费单位">
              <j-dict-select-tag
                dict-code="advert_price_unit"
                :trigger-change="true"
                v-decorator="['unit']"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="预定须知"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['remarks']" :rows="6" />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="广告位详情"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['summary']" :rows="6" />
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
    </a-spin>
  </a-drawer>
</template>

<script>
import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import JEditor from '@/components/jeecg/JEditor'
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import Mixin from '../mixin/list'
import { filterObj, promiseForm } from '@utils/util'
import { advertisingEditForm } from '@/config/pick-fields'
import { addAdPlace, editAdPlace } from '../api'

export default {
  mixins: [FormEditDrawerMixin('advertising-edit'), Mixin],
  components: {
    JEditor,
    JDate,
    JUpload
  },
  data() {
    return {
      // Form
      fields: advertisingEditForm,
      isCharge: false,
      confirmLoading: false,
      // Rules
      rules: {
        advertName: [{ required: true, message: '请输入广告位名称' }],
        projectId: [{ required: true, message: '请选择所属建筑项目' }],
        buildingId: [{ required: true, message: '请选择所属楼宇' }],
        floorId: [{ required: true, message: '请选择所属楼层' }],
        contactPerson: [{ required: true, message: '请输入联系人' }],
        contactTel: [{ required: true, message: '请输入联系电话' }]
      }
    }
  },
  methods: {
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()
      try {
        const data = await promiseForm(this.form)
        filterObj(data)
        data.parkId = this.industrialParkId
        let resp
        if (this.isEdit) {
          data.advertId = this.record.advertId
          resp = await editAdPlace(data)
        } else {
          resp = await addAdPlace(data)
        }
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
    async fetchBuildings() {
      this.types.building = []
      await this.$nextTick()
      this.form.setFieldsValue({ buildingId: '' })
      this.getBuildings(this.form.getFieldValue('projectId'))
    },
    async fetchFloors() {
      this.types.floor = []
      await this.$nextTick()
      this.form.setFieldsValue({ floorId: '' })
      this.getFloors(this.form.getFieldValue('buildingId'))
    },
    async init() {
      this.types.project = []
      this.types.building = []
      this.types.floor = []
      this.getProjects(this.industrialParkId)
      if (this.isEdit) {
        const projectId = this.record.projectId
        if (projectId) {
          this.getBuildings(projectId)
        }
        const buildingId = this.record.buildingId
        if (buildingId) {
          this.getFloors(buildingId)
        }
        this.isCharge = !!this.record.price
      } else {
        this.isCharge = false
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return
      }
      this.init()
    },
    isCharge(val) {
      if (val === false) {
        this.form.setFieldsValue({ price: '0', unit: '' })
      }
    }
  }
}
</script>
