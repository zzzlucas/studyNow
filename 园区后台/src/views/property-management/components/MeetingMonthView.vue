<template>
  <div class="meeting-week-view">
    <!-- Filter -->
    <a-row :gutter="24">
      <a-col :xl="5">
        <a-select
          placeholder="会议室"
          style="width: 100%;"
          v-if="!roomId"
          v-model="queryParam.roomId"
          @change="handleChangeRoom">
          <a-select-option
            :value="item.name"
            v-for="item in rooms"
            :key="item.name">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <!-- Fc -->
    <full-calendar
      ref="calendar"
      :events="getList"
      :config="config" />
    <!-- Add/Edit form -->
    <meeting-event-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- View modal -->
    <meeting-event-view-modal
      :data="viewData"
      v-model="view"
      @edit="handleEditEvent"
      @delete="handleDeleteEvent" />
  </div>
</template>

<script>
  import Mixin from '../mixin/calendar'

  export default {
    mixins: [
      Mixin,
    ],
    data() {
      return {
        // Fc
        config: {
          defaultView: 'month',
        }
      }
    },
    computed: {
      rooms() {
        let list = this.roomList.map(item => {
          return { label: `${item.projectName}/${item.buildingName}/${item.floorName}/${item.roomName}`, name: item.roomId }
        })
        list.unshift({ label: '全部', name: '' })
        return list
      }
    },
    methods: {
      // Event
      handleChangeRoom() {
        this.$refs.calendar.fireMethod('refetchEvents')
      },
      async init() {
        await this.loadData()
        this.ready = true
      },
    },
    created() {
      this.init()
    },
  }
</script>
