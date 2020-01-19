import { filterObj } from '@utils/util'
import { listMeetingRoom, listAdPlace } from '../api'

export const meetingRoom = {
  data() {
    return {
      roomList: [],
    }
  },
  methods: {
    async getRoomList() {
      try {
        const params = {
          parkId: this.queryParam.parkId,
          projectId: this.queryParam.projectId,
          buildingId: this.queryParam.buildingId,
        }
        filterObj(params)
        const resp = await listMeetingRoom(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.roomList = resp.result.records
      } catch (e) {
        this.$message.error('获取会议室列表失败')
      }
    },
  }
}

export const advertisingPlace = {
  data() {
    return {
      advertisingPlaceList: [],
    }
  },
  methods: {
    async getAdvertisingPlaceList() {
      try {
        const params = {
          parkId: this.queryParam.parkId,
          projectId: this.queryParam.projectId,
          buildingId: this.queryParam.buildingId,
        }
        filterObj(params)
        const resp = await listAdPlace(params)
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.advertisingPlaceList = resp.result.records
      } catch (e) {
        this.$message.error('获取广告位列表失败')
      }
    }
  },
}