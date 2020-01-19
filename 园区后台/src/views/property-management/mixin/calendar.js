/**
 * Calendar mixin
 * This file must be loaded before fullcalendar-scheduler plugin!
 */
import 'jquery'
import 'fullcalendar/dist/locale/zh-cn'
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.min.css';
import MeetingEventEditForm from '../components/MeetingEventEditForm'
import MeetingEventViewModal from '../components/MeetingEventViewModal'
import { filterObj } from '@utils/util'
import MixinList from '@/mixins/List'
import { meetingRoom as BookMeetingRoomMixin } from './book'
import { listMeetingEvent, viewMeetingEvent, deleteMeetingEvent } from '../api'

export default {
  mixins: [
    MixinList,
    BookMeetingRoomMixin,
  ],
  components: {
    FullCalendar,
    MeetingEventEditForm,
    MeetingEventViewModal,
  },
  props: {
    roomId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // Query
      queryParam: {
        beginDate: '',
        endDate: '',
        roomId: '',
      },
      // Fc
      ready: false,
      config: {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        locale: 'zh-cn',
        header: {
          left: '',
          center: 'title',
          right:  'today prev,next'
        },
        editable: false,
        dayClick: this.handleAddEvent,
        eventClick: this.handleViewEvent,
      },
      // Format
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      // View modal/aside
      viewData: {},
      view: false,
    }
  },
  methods: {
    // List
    async fetchList() {
      try {
        const params = this.queryParam
        filterObj(params)
        params.pageSize = 99999
        const resp = await listMeetingEvent(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        return resp.result.records
      } catch (e) {
        this.$message.error('获取会议预定列表失败')
      }
    },
    buildEvents(list) {
      return list.map(item => {
        return {
          id: item.requestId,
          title: item.baseMeetingroom.roomName,
          resourceId: item.roomId,
          start: item.begDate,
          end: item.endDate,
        }
      })
    },
    async getList(start, end, timezone, callback) {
      this.queryParam.begDate = start.format(this.dateFormat)
      this.queryParam.endDate = end.format(this.dateFormat)
      const list = await this.fetchList()
      callback(this.buildEvents(list))
    },
    async loadData() {
      await this.getRoomList()
    },
    // Event
    handleAddEvent(date) {
      const begDate = date.format(this.dateFormat)
      const endDate = date.add(1, 'd').format(this.dateFormat)
      const roomId = this.queryParam.roomId
      this.$refs.modalForm.add({ begDate, endDate, roomId })
      this.$refs.modalForm.title = "添加"
      this.$refs.modalForm.disableSubmit = false
    },
    handleEditEvent(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = "编辑"
      this.$refs.modalForm.disableSubmit = false
    },
    async handleDeleteEvent(record) {
      try {
        const resp = await deleteMeetingEvent({ id: record.requestId })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.$message.success('操作成功')
        this.$refs.calendar.fireMethod('removeEvents', record.requestId)
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async handleEditSubmit() {
      this.$refs.calendar.fireMethod('refetchEvents')
    },
    async handleViewEvent(info) {
      try {
        const resp = await viewMeetingEvent({ id: info.id })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.viewData = resp.result
        this.view = true
      } catch (e) {
        this.$message.error(e.message)
      }
    },
  },
  created() {
    if (this.roomId) {
      this.queryParam.roomId = this.roomId
    }
  }
}
