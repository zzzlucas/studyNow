<template>
  <div class="meeting-week-view">
    <!-- Fc -->
    <full-calendar ref="calendar" :events="getList" :config="config" v-if="ready" />
    <!-- Add/Edit form -->
    <modal-form ref="modalForm" :roomNameTempX="roomNameTemp"></modal-form>
    <!-- <meeting-event-edit-form ref="modalForm" @submit="handleEditSubmit" /> -->
    <!-- View modal -->
    <!-- <meeting-event-view-modal
      :data="viewData"
      v-model="view"
      @edit="handleEditEvent"
    @delete="handleDeleteEvent" />-->
  </div>
</template>

<script>
// DO NOT CHANGE IMPORT ORDER OR THE CALENDAR WON'T WORK!
import Mixin from "../mixin/calendar";
import "fullcalendar-scheduler";
import "fullcalendar-scheduler/dist/scheduler.min.css";

export default {
  mixins: [Mixin],
  props: { roomNameTemp: String },
  data() {
    return {
      // Fc
      config: {
        defaultView: "timelineWeek",
        slotLabelInterval: { days: 1 },
        slotLabelFormat: "ddd MM-DD",
        resourceLabelText: "会议室",
        // Room list
        resources: []
      }
    };
  },
  methods: {
    buildConfig() {
      if (!this.roomId) {
        this.config.resources = this.roomList.map(item => {
          return {
            id: item.roomId,
            title: item.roomName
          };
        });
      } else {
        this.config.defaultView = undefined;
      }
    },
    async init() {
      await this.loadData();
      this.buildConfig();
      this.ready = true;
    }
  },
  created() {
    this.init();
  }
};
</script>
