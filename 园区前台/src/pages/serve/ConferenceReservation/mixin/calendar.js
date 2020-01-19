/**
 * Calendar mixin
 * This file must be loaded before fullcalendar-scheduler plugin!
 */
import 'jquery'
import 'fullcalendar/dist/locale/zh-cn'
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.min.css';
// import MeetingEventEditForm from '../components/MeetingEventEditForm'
// import MeetingEventViewModal from '../components/MeetingEventViewModal'
import { filterObj } from '@utils/util'
// import MixinList from '@/mixins/List'
import { meetingRoom as BookMeetingRoomMixin } from './book'
import { listMeetingEvent, viewMeetingEvent, deleteMeetingEvent } from '../api'
import modalForm from "../ModalForm";

export default {
  mixins: [
    // MixinList,
    BookMeetingRoomMixin,
  ],
  components: {
    FullCalendar, modalForm,
    // MeetingEventEditForm,
    // MeetingEventViewModal,
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
          right: 'today prev,next'
        },
        editable: false,
        // select: this.handleAddEventSelect,
        dayClick: this.handleAddEvent,
        // eventClick: this.handleViewEvent,   // 前台本就不应具备看到具体信息的能力
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
        this.$Message.error('请登录后查看会议预定列表')
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
    handleAddEventSelect(e) {
      console.log('e');
      console.log(e);
    },
    // Event
    handleAddEvent(date) {
      console.log('f');
      // console.log('date');
      // console.log(date);
      const begDate = date.format(this.dateFormat)
      const endDate = date.add(30, 'm').format(this.dateFormat)
      const roomId = this.$route.params.id
      // const roomId = this.queryParam.roomId
      this.$refs.modalForm.add({ begDate, endDate, roomId })
      // this.$refs.modalForm.title = "添加"
      // this.$refs.modalForm.disableSubmit = false
    },
    // handleEditEvent(record) {
    //   this.$refs.modalForm.edit(record)
    //   this.$refs.modalForm.title = "编辑"
    //   this.$refs.modalForm.disableSubmit = false
    // },
    async handleDeleteEvent(record) {
      try {
        const resp = await deleteMeetingEvent({ id: record.requestId })
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.$Message.success('操作成功')
        this.$refs.calendar.fireMethod('removeEvents', record.requestId)
      } catch (e) {
        this.$Message.error(e.message)
      }
    },
    async handleEditSubmit() {
      this.$refs.calendar.fireMethod('refetchEvents')
    },
    // async handleViewEvent(info) {
    //   try {
    //     const resp = await viewMeetingEvent({ id: info.id })
    //     if (!resp.success) {
    //       throw new Error(resp.message)
    //     }
    //     this.viewData = resp.result
    //     this.view = true
    //   } catch (e) {
    //     this.$Message.error(e.message)
    //   }
    // },
  },
  created() {
    if (this.roomId) {
      this.queryParam.roomId = this.roomId
    }
  }
}
