<template>
  <div class="meeting-room-1209">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">会议室列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="meeting-body">
      <h1 class="zj-recruitment-title">会议室预订</h1>
      <div class="zj-recruitment-search">
        <ul>
          <span class="title">容纳人数：</span>
          <li
            v-for="(capacity, index) in dict.meetingRoomCapacity"
            :key="index"
            :class="{ischeck: index === capacityCurrent}"
            @click="capacityClass(index)"
          >{{ capacity.title }}</li>
        </ul>

        <ul>
          <span class="title">设备提供：</span>
          <li
            v-for="(device, index) in dict.meetingRoomDevice"
            :key="index"
            :class="{ischeck: deviceCurrent.includes(index)}"
            @click="deviceClass(index)"
          >{{ device.title }}</li>
        </ul>
      </div>
      <div class="zj-recruitment-box">
        <Table :columns="table" :data="data" @on-row-click="goDetail">
          <!-- table start -->
          <template slot-scope="{ row, index }" slot="roomName">
            <div class="room-block-left">
              <img :src="getRoomPreview(row.addDocFiles)" alt v-if="row.addDocFiles" />
              <Icon type="ios-image-outline" v-else />
            </div>
            <div class="room-block-right">
              <p class="title">{{ row.roomName }}</p>
              <span>详细位置：{{ row.address }}</span>
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="maxCapacity">
            <div>容纳人数</div>
            <span>{{ row.maxCapacity }}人</span>
          </template>
          <template slot-scope="{ row, index }" slot="contactTel">
            <div>联系方式</div>
            <span>{{ row.contactPerson }}/{{ row.contactTel }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="deviceGroupId">
            <div>标准配置</div>
            <span>{{ row.roomDevices }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="chargingArea">
            <div>占地面积</div>
            <span>{{ row.chargingArea }}m²</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <a @click.stop="handleCheck(row)">预定</a>
          </template>
          <!-- table end -->
        </Table>
        <!-- page -->
        <div class="pageclass">
          <Page
            :total="pageTotal"
            show-elevator
            show-sizer
            @on-change="pageCurrentFun"
            @on-page-size-change="pageSizeFun"
          />
        </div>
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <modal-form ref="ModalForm"></modal-form>
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { initDictOptions, filterDictText } from "@/api/dict";
import ModalForm from "./ModalForm";
import { mixinPage } from "@/utils/mixin";

export default {
  name: "RecruitmentIndex",
  components: { ModalForm },
  mixins: [mixinPage],
  data() {
    return {
      isPublic: "1",
      jobType: "",
      keyword: "",
      dict: {
        monthlySalary: "",
        expType: "",
        educationType: "",
        meetingRoomCapacity: [],
        meetingRoomDevice: []
      },
      table: [
        {
          title: "名称-位置",
          align: "left",
          width: 360,
          slot: "roomName"
        },
        {
          title: "容纳人数",
          align: "left",
          width: 120,
          slot: "maxCapacity"
        },
        {
          title: "联系方式",
          align: "left",
          slot: "contactTel"
        },
        {
          title: "配置",
          align: "left",
          slot: "deviceGroupId"
        },
        {
          title: "占地面积",
          align: "left",
          width: 120,
          slot: "chargingArea"
        },
        {
          title: "操作",
          align: "left",
          width: 100,
          slot: "action"
        }
      ],
      data: [],
      capacityCurrent: 0,
      deviceCurrent: [0],
      ary: {
        meetingRoomCapacityAry: [],
        meetingRoomDeviceAry: []
      },
      maxCapacity: 0,
      minCapacity: 0,
      device: []
    };
  },
  created() {
    this.loadData();
    initDictOptions("	meeting_room_capacity").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.meetingRoomCapacity = res.result;
        for (let item of this.dict.meetingRoomCapacity) {
          this.ary.meetingRoomCapacityAry.push(item.value);
        }
        console.log(this.ary.meetingRoomCapacityAry);
      }
    });
    initDictOptions("meeting_room_device").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.meetingRoomDevice = res.result;
        for (let item of this.dict.meetingRoomDevice) {
          this.ary.meetingRoomDeviceAry.push(item.value);
        }
        //纯粹数组
        console.log(this.ary.meetingRoomDeviceAry);
      }
    });
  },
  methods: {
    goDetail(e) {
      // console.log(e.roomId);
      if (this.$store.getters.isLogin) {
        this.$router.push({
          name: "ConferenceReservationDetail",
          params: { id: e.roomId }
        });
      } else {
        this.$Message.error("当前处于未登录状态，请登录后查看会议室详情！");
      }
    },
    getRoomPreview(files) {
      return files.split(",")[0];
    },
    handleCheck(record) {
      this.$refs.ModalForm.check(record);
    },
    getData(status) {
      return new Promise((resolve, reject) => {
        let {
          maxCapacity,
          minCapacity,
          device,
          pageNo,
          pageSize,
          parkId
        } = this;
        getAction("/park.service/baseMeetingroomInfo/list", {
          maxCapacity,
          minCapacity,
          device: String(device),
          pageNo,
          pageSize,
          parkId
        })
          .then(res => {
            if (res.code === 200 && res.success) {
              resolve(res.result);
            } else {
              reject(res.message);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    loadData() {
      // this.spinShow = true;
      this.getData().then(
        data => {
          this.data = data.records;
          this.pageTotal = data.total;
          this.spinShow = false;
        },
        error => {
          this.data = [];
          // console.log(error);
        }
      );
    },
    capacityClass(index) {
      this.capacityCurrent = index;
      let a = this.ary.meetingRoomCapacityAry[index];
      if (a == 0) {
        this.minCapacity = 0;
        this.maxCapacity = 0;
      } else {
        a = a.split("-");
        this.minCapacity = a[0];
        this.maxCapacity = a[1];
      }
      console.log(this.minCapacity);
      console.log(this.maxCapacity);
      this.loadData();
    },
    deviceClass(index) {
      //要求：选中任意具体项，0跳闸；选中0，其余全部跳闸
      if (index == 0) {
        //清空，不填0，下面会有对应逻辑来填0
        this.deviceCurrent = [];
        //清空，不填0，下面会有对应逻辑来填0
        this.device = [];
      } else {
        //选中不为0，0跳闸
        if (this.deviceCurrent.includes(0)) {
          this.deviceCurrent.splice(this.deviceCurrent.indexOf(0), 1);
        }
        if (this.device.includes(0)) {
          this.device.splice(this.device.indexOf(0), 1);
        }
      }
      //有则减  无则加
      if (this.deviceCurrent.includes(index)) {
        this.deviceCurrent.splice(this.deviceCurrent.indexOf(index), 1);
      } else {
        this.deviceCurrent.push(index);
      }
      //有则减  无则加
      let DEVICE = this.ary.meetingRoomDeviceAry[index];
      if (this.device.includes(DEVICE)) {
        this.device.splice(this.device.indexOf(DEVICE), 1);
      } else {
        this.device.push(DEVICE);
      }
      this.loadData();
    }
  }
};
</script>
<style lang="less">
.meeting-room-1209 {
  .pageclass {
    padding: 20px;
    // margin: 20px;
    .ivu-page {
      float: right;
    }
  }
  thead {
    display: none;
  }
  .ivu-table-row {
    height: 100px;
    .room-block-left {
      height: 40px;
      width: 40px;
      float: left;
      background: #f2f2f2;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .ivu-icon {
        font-size: 36px;
      }
    }
    .room-block-right {
      float: left;
    }
    .title {
      font-weight: bold;
      color: #333;
    }
    span {
      color: #999;
    }
    div {
      color: #999;
    }
  }
  .ivu-table th {
    background-color: rgba(242, 242, 242, 0.9);
  }
  .meeting-body {
    padding: 20px;
    width: 1260px;
    margin: 20px auto;
    border: 1px solid rgba(200, 200, 200, 0.5);
    h1 {
      font-weight: normal;
      font-size: 20px;
    }
    h3 {
      font-weight: bold;
      font-size: 14px;
      margin: 20px 0;
    }
  }

  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  .zj-recruitment-title {
    font-size: 18px;
    padding: 0 20px 20px 30px;
  }

  .breadcrumb-box {
    padding: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .zj-recruitment-search {
    background-color: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;

    ul {
      padding: 20px 0 20px 60px;
      display: flex;

      .title {
        margin-right: 30px;
        display: block;
        height: 30px;
        line-height: 30px;
      }

      li {
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        list-style-type: none;
        cursor: pointer;
        text-align: center;
        margin-left: 50px;
      }

      .ischeck {
        background-color: #c40005;
        color: #fff;
      }
    }
  }
  .zj-recruitment-box {
    margin: 10px 30px;
  }
}
</style>
