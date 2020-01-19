<template>
  <page-layout :title="data.roomName">
    <template slot="action">
      <a-button type="primary" @click="handleEdit">编辑</a-button>
    </template>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}">
      <keep-alive>
        <template v-if="activeTabKey === 'basic'">
          <detail-list>
            <detail-list-item term="会议室名称">{{ data.roomName }}</detail-list-item>
            <detail-list-item term="占地面积">{{ data.chargingArea }}m<sup>2</sup></detail-list-item>
            <detail-list-item term="容纳人数">{{ data.maxCapacity }}人</detail-list-item>
            <detail-list-item term="所属建筑项目">{{ data.buildingName }}</detail-list-item>
            <detail-list-item term="详细地址">{{ data.projectName }}/{{ data.buildingName }}/{{ data.floorName }}/{{ data.address }}</detail-list-item>
            <detail-list-item term="提供设备">{{ roomDevices }}&nbsp;</detail-list-item>
            <detail-list-item term="联系人">{{ data.contactPerson }}</detail-list-item>
            <detail-list-item term="联系电话">{{ data.contactTel }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="开放时间起">{{ data.begTime }}</detail-list-item>
            <detail-list-item term="开放时间止">{{ data.endTime }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="预定须知">{{ data.remarks }}</detail-list-item>
          </detail-list>
          <detail-list>
            <detail-list-item term="会议室详情">{{ data.summary }}</detail-list-item>
          </detail-list>
        </template>
        <template v-if="activeTabKey === 'image'">
          <image-list
            :data="data.addDocFiles"
            previewKey="image"
            height="300px" />
        </template>
        <template v-if="activeTabKey === 'weekView'">
          <meeting-week-view :room-id="data.roomId" v-if="data.roomId" />
        </template>
        <template v-if="activeTabKey === 'monthView'">
          <meeting-month-view :room-id="data.roomId" v-if="data.roomId" />
        </template>
      </keep-alive>
    </a-card>
    <!-- Add/Edit form -->
    <meeting-room-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </page-layout>
</template>

<script>
  import PageLayout from '@/components/page/PageLayout'
  import DetailList from '@/components/tools/DetailList'
  import JUpload from '@/components/jeecg/JUpload'
  import ImageList from '@/components/image-list/ImageList'
  import MeetingRoomEditForm from './components/MeetingRoomEditForm'
  import MeetingWeekView from './components/MeetingWeekView'
  import MeetingMonthView from './components/MeetingMonthView'
  import ViewMixin, { lifeCycle as ViewLifeCycleMixin } from '@/mixins/View'
  import { url, listRoomEquipment } from './api'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewMixin,
      ViewLifeCycleMixin,
    ],
    components: {
      PageLayout,
      DetailList,
      DetailListItem,
      JUpload,
      ImageList,
      MeetingRoomEditForm,
      MeetingWeekView,
      MeetingMonthView,
    },
    data() {
      return {
        // Types
        dictesCreateFields: ['meeting_room_device'],
        // Url
        url: url.meetingRoom,
        // Tab
        tabList: [
          {
            key: 'basic',
            tab: '基本信息'
          },
          {
            key: 'image',
            tab: '图片'
          },
          {
            key: 'weekView',
            tab: '周视图'
          },
          {
            key: 'monthView',
            tab: '月视图'
          },
        ],
        activeTabKey: 'basic',
      }
    },
    computed: {
      roomDevices() {
        if (!this.types.meeting_room_device || !this.data.roomDevices) {
          return ''
        }
        const types = {}
        this.types.meeting_room_device.forEach(item =>{
          types[item.value] = item.title
        })
        return this.data.roomDevices.map(item => types[item]).join(',')
      },
    },
    methods: {
      // Route
      getRouteParams() {
        return { id: this.$route.params.id }
      },
      // Load data
      async afterLoadData() {
        try {
          const resp = await listRoomEquipment(this.data.deviceGroupId)
          if (!resp.success) {
            throw new Error(resp.message)
          }
          this.data.roomDevices = resp.result.map(item => item.labelNo)
        } catch (e) {
          this.$message(e.message)
        }
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    },

  }
</script>
