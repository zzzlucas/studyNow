<template>
  <div class="activity-view">
    <div class="activity-bread-box">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/serve/ConferenceReservation">会议室列表</BreadcrumbItem>
        <BreadcrumbItem>{{data.roomName}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="info">
      <div class="info-left">
        <img :src="geImgPreview(data.addDocFiles)" alt />
      </div>
      <div class="info-right">
        <div class="title">
          {{ data.roomName }}
          <!-- <span class="status">{{ filterDictText(dict.activityStatus,data.status) }}</span> -->
        </div>
        <p>
          容纳人数：
          <span>{{ data.maxCapacity }}人</span>
        </p>
        <p>
          所在位置：
          <span>{{ data.address }}</span>
        </p>
        <p>
          占地面积：
          <span>{{ data.chargingArea }}㎡</span>
        </p>
        <p>
          联系方式：
          <span>{{ data.contactTel }}</span>
        </p>
        <p>
          提供设备：
          <span>{{ data.roomDevices }}</span>
        </p>
        <Button class="apply-button" type="error" @click="addModalForm">预定</Button>
      </div>
    </div>

    <div class="introduce">
      <Tabs value="name1">
        <TabPane label="会议室详情" name="name1">
          <p v-html="data.summary"></p>
        </TabPane>
        <TabPane label="会议室图片" name="name1.1">
          <div class="detail-img-box">
            <!-- <img v-for="item in data.addDocFiles" :src="getImgSrc(item)" /> -->
            <image-list :data="data.addDocFiles" previewKey="image" height="300px" />
          </div>
        </TabPane>
        <TabPane label="周视图" name="name2">
          <meeting-week-view :room-id="$route.params.id" :roomNameTemp="data.roomName" />
        </TabPane>
        <TabPane label="月视图" name="name3">
          <meeting-month-view :room-id="$route.params.id" :roomNameTemp="data.roomName" />
        </TabPane>
      </Tabs>
    </div>
    <modal-form ref="modalForm" :roomNameTemp="data.roomName"></modal-form>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
import { mixinPage } from "@/utils/mixin";
import modalForm from "./ModalForm";
import { initDictOptions } from "@/api/dict";
import MeetingWeekView from "./components/MeetingWeekView";
import MeetingMonthView from "./components/MeetingMonthView";
import ImageList from "./ImageList";

export default {
  name: "ActivityView",
  mixins: [mixinPage],
  components: { modalForm, MeetingWeekView, MeetingMonthView, ImageList },
  data() {
    return {
      data: {},
      spinShow: false,
      dict: {
        activityStatus: []
      }
    };
  },
  created() {
    this.init(this.$route.params.id);
    initDictOptions("activity_status").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.activityStatus = res.result;
      }
    });
  },
  methods: {
    geImgPreview(files) {
      if (files) {
        return this.BASR_IMG_URL + files[0];
      } else {
        return this.DEFAULT_IMG;
      }
    },
    getImgSrc(files) {
      if (files) {
        return this.BASR_IMG_URL + files;
      } else {
        return this.DEFAULT_IMG;
      }
    },
    addModalForm() {
      this.$refs.modalForm.check(this.data);
    },
    init(id) {
      this.spinShow = true;
      getAction("/park.service/baseMeetingroomInfo/queryById", {
        id
      }).then(res => {
        if (res.success && res.code === 200) {
          this.data = res.result;
          if (this.data.addDocFiles) {
            this.data.addDocFiles = this.data.addDocFiles.split(",");
          }
          this.spinShow = false;
        } else {
          this.$Message.error(res.message);
          this.spinShow = false;
        }
      });
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.init(id);
    }
  }
};
</script>

<style lang="less">
.activity-view {
  margin: 90px auto 0;
  width: 1260px;
  overflow: hidden;
  .detail-img-box {
    margin: 10px auto;
    width: 100%;
  }
  // background-color: rgba(246, 246, 246, 1);
  .activity-bread-box {
    // width: 90%;
    margin: auto;
    .ivu-breadcrumb {
      text-align: left;
      padding: 10px;
      border: 1px solid #eee;
      background-color: #fff;
    }
  }
  .info {
    margin: 20px auto 0;
    border: 1px solid #eee;
    text-align: left;
    background-color: #fff;
    // width: 90%;
    padding: 20px 10px 30px 10px;
    display: flex;
    .info-left {
      width: 30%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .info-right {
      width: 70%;
      padding-left: 30px;
      .title {
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        font-weight: 600;
        position: relative;
        .status {
          padding: 3px 10px;
          background-color: red;
          font-size: 12px;
          margin-left: 10px;
          -webkit-border-radius: 2em 2em 2em 0;
          -moz-border-radius: 2em 2em 2em 0;
          border-radius: 2em 2em 2em 0;
          color: #fff;
        }
      }
      p {
        margin: 10px 0;
        color: #999;
        span {
          color: #000;
          margin-left: 15px;
        }
      }
      .apply-button {
        width: 86px;
        height: 32px;
        margin-top: 8px;
      }
    }
  }

  .introduce {
    word-break: break-all;
    margin: 20px auto;
    border: 1px solid #eee;
    text-align: left;
    background-color: #fff;
    // width: 90%;
    padding: 20px 30px 30px 30px;
    .title {
      font-size: 18px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    p {
      margin: 20px 0;
    }
  }
}
</style>
