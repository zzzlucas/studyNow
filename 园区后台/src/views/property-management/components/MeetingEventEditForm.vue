<template>
  <a-drawer
    wrapClassName="meeting-event-edit form-edit-drawer"
    width="65%"
    closable
    :title="getTitle"
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
              label="会议室名称"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-select v-decorator="['roomId', {rules: rules.roomId}]">
                <a-select-option
                  :value="item.roomId"
                  v-for="item in roomList"
                  :key="item.roomId"
                >{{ item.roomName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="预约时间">
              <j-date
                show-time
                dateFormat="YYYY-MM-DD HH:mm:ss"
                v-decorator="['begDate', {rules: rules.begDate}]"
                style="width: 100%;"
              ></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item class="form-item-label-align" label="—" :colon="false">
              <j-date
                show-time
                dateFormat="YYYY-MM-DD HH:mm:ss"
                v-decorator="['endDate', {rules: rules.endDate}]"
                style="width: 100%;"
              ></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="申请人">
              <a-input v-decorator="['requestPerson', {rules: rules.requestPerson}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系电话">
              <a-input v-decorator="['telephone']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="参与人">
              <a-input v-decorator="['participants']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="备注"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['remark']" :rows="6" />
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
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { meetingRoom as BookMeetingRoomMixin } from '../mixin/book'
import { filterObj, promiseForm } from '@utils/util'
import { meetingEventEditForm } from '@/config/pick-fields'
import { addMeetingEvent, editMeetingEvent } from '../api'

export default {
  mixins: [FormEditDrawerMixin('meeting-event-edit'), BookMeetingRoomMixin],
  components: {
    JDate
  },
  data() {
    return {
      // Query
      queryParam: {
        // Dummy for book mixin
      },
      // Form
      fields: meetingEventEditForm,
      confirmLoading: false,
      // Rules
      rules: {
        roomId: [{ required: true, message: '请选择会议室名称' }],
        begDate: [{ required: true, message: '请填写预约时间' }],
        endDate: [{ required: true, message: '请填写预约时间' }],
        requestPerson: [{ required: true, message: '请填写申请人' }]
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
          data.requestId = this.record.requestId
          resp = await editMeetingEvent(data)
        } else {
          resp = await addMeetingEvent(data)
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
    async init() {
      this.getRoomList()
      if (!this.isEdit) {
        await this.$nextTick()
        this.form.setFieldsValue({
          roomId: this.record.roomId,
          begDate: this.record.begDate,
          endDate: this.record.endDate
        })
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return
      }
      this.init()
    }
  }
}
</script>

<style lang="less">
.meeting-event-edit {
  .form-item-label-align label {
    text-align: center;
    display: block;
    &:before {
      content: '';
    }
  }
}
</style>
