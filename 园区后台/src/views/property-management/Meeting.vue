<template>
  <a-card class="meeting-tab" :bordered="false">
    <a-tabs v-model="tab">
      <a-tab-pane tab="会议室列表" key="roomList">
        <meeting-list />
      </a-tab-pane>
      <a-tab-pane tab="周视图" key="weekView">
        <meeting-week-view />
      </a-tab-pane>
      <a-tab-pane tab="月视图" key="monthView">
        <meeting-month-view />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
  import MeetingList from './components/MeetingList'
  import MeetingWeekView from './components/MeetingWeekView'
  import MeetingMonthView from './components/MeetingMonthView'

  export default {
    components: {
      MeetingList,
      MeetingWeekView,
      MeetingMonthView,
    },
    data() {
      return {
        // Tab
        tab: 'weekView',
      }
    }
  }

</script>

<style lang="less">

</style>