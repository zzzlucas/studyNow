<template>
  <div class="meeting-week-view">
    <!-- Filter -->
    <!-- <Row :gutter="36">
    <Col span="12">-->
    <Row :gutter="24">
      <Col :xl="5">
        <Select
          placeholder="会议室"
          style="width: 100%;"
          v-if="!roomId"
          v-model="queryParam.roomId"
          @change="handleChangeRoom"
        >
          <Option :value="item.name" v-for="item in rooms" :key="item.name">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <!-- Fc -->
    <full-calendar ref="calendar" :events="getList" :config="config" />
    <!-- Add/Edit form -->
    <modal-form ref="modalForm" :roomNameTempX="roomNameTemp"></modal-form>
  </div>
</template>

<script>
import Mixin from "../mixin/calendar";

export default {
  mixins: [Mixin],
  props: { roomNameTemp: String },
  data() {
    return {
      // Fc
      config: {
        defaultView: "month"
      }
    };
  },
  computed: {
    rooms() {
      let list = this.roomList.map(item => {
        return {
          label: `${item.projectName}/${item.buildingName}/${item.floorName}/${item.roomName}`,
          name: item.roomId
        };
      });
      list.unshift({ label: "全部", name: "" });
      return list;
    }
  },
  methods: {
    // Event
    handleChangeRoom() {
      this.$refs.calendar.fireMethod("refetchEvents");
    },
    async init() {
      await this.loadData();
      this.ready = true;
    }
  },
  created() {
    this.init();
  }
};
</script>
