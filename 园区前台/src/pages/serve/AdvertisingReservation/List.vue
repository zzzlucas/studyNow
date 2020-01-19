<template>
  <div class="meeting-room-1209">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">广告位预订</BreadcrumbItem>
    </Breadcrumb>
    <div class="recruit-body">
      <h1 class="zj-recruitment-title">广告位预订</h1>
      <div class="zj-recruitment-search">
        <ul>
          <span class="title">厂房列表：</span>
          <li
            v-for="(block, index) in dict.blockList"
            :key="index"
            :class="{ischeck: index === blockCurrent}"
            @click="blockClass(index)"
          >{{ block.projectName }}</li>
        </ul>
      </div>
      <div class="zj-recruitment-box">
        <Table :columns="table" :data="data">
          <!-- table start -->
          <template slot-scope="{ row, index }" slot="advertName">
            <div class="room-block-left">
              <img :src="getRoomPreview(row.addDocFiles)" alt v-if="row.addDocFiles" />
              <Icon type="ios-image-outline" v-else />
            </div>
            <div class="room-block-right">
              <p class="title">{{ row.advertName }}</p>
              <span>详细位置：{{ row.address }}</span>
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="contactTel">
            <div>联系方式</div>
            <span>{{ row.contactPerson }}/{{ row.contactTel }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="area">
            <div>占地面积</div>
            <span>{{ row.chargingArea?row.chargingArea:0 }}㎡</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <!-- <Button @click.stop="handleCheck(index)">预定</Button> -->
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
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { initDictOptions, filterDictText } from "@/api/dict";
import { mixinPage } from "@/utils/mixin";

export default {
  name: "",
  components: {},
  mixins: [mixinPage],
  data() {
    return {
      isPublic: "1",
      jobType: "",
      keyword: "",
      table: [
        {
          title: "名称-位置",
          align: "left",
          width: 560,
          slot: "advertName"
        },
        {
          title: "联系方式",
          align: "left",
          slot: "contactTel"
        },
        {
          title: "占地面积",
          align: "left",
          slot: "area"
        },
        {
          title: "操作",
          align: "left",
          width: 100,
          slot: "action"
        }
      ],
      data: [],
      dict: {
        blockList: ""
      },
      blockCurrent: 0,
      projectId: 0
    };
  },
  created() {
    this.loadData();
    //获取厂房列表
    getAction("/park.architecture/baseArchitectureProject/queryByParkId", {
      parkId: this.parkId
    }).then(res => {
      if (res.success) {
        res.result.unshift({
          buildingProjectId: 0,
          projectName: "不限"
        });
        this.dict.blockList = res.result;
      }
    });
  },
  methods: {
    getRoomPreview(files) {
      return files.split(",")[0];
    },
    handleCheck(record) {
      if (this.$store.getters.isLogin) {
        this.$router.push({
          name: "AdvertisingApplyStep1",
          params: { id: record.advertId, name: record.advertName }
        });
      } else {
        this.$Message.error("当前处于未登录状态，请先登录账号！");
      }
    },
    getData(status) {
      return new Promise((resolve, reject) => {
        let { pageNo, pageSize, parkId, projectId } = this;
        getAction("/park.service/baseAdvertsInfo/list", {
          pageNo,
          pageSize,
          parkId,
          projectId
        })
          .then(res => {
            if (res.code === 200 && res.success) {
              resolve(res.result);
            } else {
              reject(res.message);
            }
          })
          .catch(err => {
            console.log(err);
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
    blockClass(index) {
      this.blockCurrent = index;
      //根据index 获得 正确的projectId
      this.projectId = this.dict.blockList[index].buildingProjectId;
      console.log(this.projectId);
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
  .recruit-body {
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
