<template>
  <a-drawer
    wrapClassName="meeting-room-edit"
    width="65%"
    closable
    :title="getTitle"
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-spin :spinning="confirmLoading">
      <a-form
        class="form-edit-drawer-form"
        layout="horizontal"
        :form="form"
        :label-col="gridOptions.formItem.label"
        :wrapper-col="gridOptions.formItem.value"
        @submit="submit">
        <a-row>
          <a-col :xl="24">
            <a-form-item
              label="会议室名称"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value">
              <a-input v-decorator="['roomName', {rules: rules.roomName}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="占地面积">
              <a-input-number
                v-decorator="['chargingArea', {rules: rules.chargingArea}]"
                style="width: 90%;"></a-input-number>
              <span class="ant-form-text" style="margin-left: 3%; width: 7%; padding-right: 0;">
                m<sup>2</sup>
              </span>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="容纳人数">
              <a-input v-decorator="['maxCapacity', {rules: rules.maxCapacity}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="所属厂房">
              <a-select
                style="width: 100%;"
                v-decorator="['projectId', {rules: rules.projectId}]"
                @change="fetchBuildings">
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
                @change="fetchFloors">
                <a-select-option
                  :value="item.buildingId"
                  v-for="item in types.building"
                  :key="item.buildingId">
                  {{ item.buildingName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="所属楼层">
              <a-select style="width: 100%;" v-decorator="['floorId', {rules: rules.floorId}]">
                <a-select-option
                  :value="item.floorId"
                  v-for="item in types.floor"
                  :key="item.floorId">
                  {{ item.floorName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="地理位置">
              <a-input v-decorator="['address']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系人">
              <a-input v-decorator="['contactPerson']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系电话">
              <a-input v-decorator="['contactTel']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-row>
              <a-col :xl="12">
                <a-form-item label="开放时间">
                  <j-time timeFormat="HH:mm" v-decorator="['begTime']" style="width: 100%;"></j-time>
                </a-form-item>
              </a-col>
              <a-col :xl="12">
                <a-form-item class="form-item-label-align" label="—" :colon="false">
                  <j-time timeFormat="HH:mm" v-decorator="['endTime']" style="width: 100%;"></j-time>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="提供设备"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value">
              <j-multi-select-tag v-decorator="['device']" dict-code="meeting_room_device"></j-multi-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="预定须知"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value">
              <a-textarea v-decorator="['remarks']" :rows="6" />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="会议室详情"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value">
              <a-textarea v-decorator="['summary']" :rows="6" />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="图片"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value">
              <j-upload v-decorator="['addDocFiles']" :rows="6" />
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
  import JTime from '@/components/jeecg/JTime'
  import JUpload from '@/components/jeecg/JUpload'
  import JMultiSelectTag from '@comp/dict/JMultiSelectTag'
  import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
  import Mixin from '../mixin/list'
  import { filterObj, promiseForm } from '@utils/util'
  import { meetingRoomEditForm } from '@/config/pick-fields'
  import { addMeetingRoom, editMeetingRoom, listRoomEquipment } from '../api'

  export default {
    mixins: [FormEditDrawerMixin('meeting-room-edit'), Mixin],
    components: {
      JDate,
      JTime,
      JUpload,
      JMultiSelectTag
    },
    data() {
      return {
        // Form
        fields: meetingRoomEditForm,
        confirmLoading: false,
        // Rules
        rules: {
          roomName: [{ required: true, message: '请填写会议室名称' }],
          chargingArea: [
            { required: true, message: '请填写占地面积' },
            { type: 'number', min: 1, message: '占地面积至少大于1' }
          ],
          maxCapacity: [{ required: true, message: '请填写容纳人数' }],
          projectId: [{ required: true, message: '请填写选择厂房' }],
          buildingId: [{ required: true, message: '请填写选择楼宇' }],
          floorId: [{ required: true, message: '请选择所属楼层' }],
          contactPerson: [{ required: true, message: '请填写联系人' }],
          contactTel: [{ required: true, message: '请填写联系电话' }]
        }
      }
    },
    methods: {
      async submit(ev) {
        this.confirmLoading = true
        ev.preventDefault();
        try {
          const data = await promiseForm(this.form)
          filterObj(data)
          data.parkId = this.industrialParkId
          if (data.begTime && data.begTime.length === 5) {
            data.begTime += ':00'
          }
          if (data.endTime && data.endTime.length === 5) {
            data.endTime += ':00'
          }
          let resp
          if (this.isEdit) {
            data.roomId = this.record.roomId
            resp = await editMeetingRoom(data)
          } else {
            resp = await addMeetingRoom(data)
          }
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.$message.success('操作成功')
          this.closeDrawer()
          this.$emit('submit')
        } catch (e) {
          this.$message.error(e.message)
        }
        this.confirmLoading = false
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
      async getDeviceList(deviceGroupId) {
        const resp = await listRoomEquipment(deviceGroupId)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        return resp.result
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
          const deviceGroupId = this.record.deviceGroupId
          if (deviceGroupId) {
            const res = await this.getDeviceList(deviceGroupId)
            this.form.setFieldsValue({ device: res.map(item => item.labelNo).join(',') })
          }
        }
      },
    },
    watch: {
      'show'(val) {
        if (!val) {
          return
        }
        this.fixRules()
        this.init()
      }
    }
  }
</script>

<style lang="less">
  .meeting-room-edit {
    .form-item-label-align label {
      text-align: center;
      display: block;
    }
  }
</style>
