<template>
  <div class="zj-home-index">
    <zj-slider></zj-slider>
    <div class="serve">
      <h1 class="title">服务</h1>
      <div class="serve-box">
        <div class="serve-box-left">
          <router-link :to="{name: 'TenementRepairsStep1'}">
            <div class="serve-box-item">
              <span class="img-span">物业报修</span>
              <img src="../../assets/images/d1.png" alt />
            </div>
          </router-link>
          <router-link :to="{name: 'DemandSubmissionStep1'}">
            <div class="serve-box-item" style="margin-top: 5px;">
              <span class="img-span">需求提报</span>
              <img src="../../assets/images/d2.png" alt />
            </div>
          </router-link>
        </div>
        <div class="serve-box-center">
          <router-link :to="{name: 'AdvertisingApplyStep1'}">
            <div class="serve-box-item">
              <span class="img-span">广告位预定</span>
              <img style="height:498px" src="../../assets/images/d3.png" alt />
            </div>
          </router-link>
        </div>
        <div class="serve-box-right">
          <router-link :to="{name: 'ConferenceReservation'}">
            <div class="serve-box-item">
              <span class="img-span">会议室预约</span>
              <img src="../../assets/images/d4.png" alt />
            </div>
          </router-link>
          <router-link :to="{name: 'AdvertisingReservation'}">
            <div class="serve-box-item" style="margin-top: 5px;">
              <span class="img-span">广告位预约</span>
              <img src="../../assets/images/d5.png" alt />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="activity">
      <h1 class="title">精彩活动</h1>
      <Tabs>
        <TabPane label="当前活动">
          <div class="activity-all">
            <Card
              style="width:32%; margin-bottom: 20px;"
              v-for="(item, index) in proceed"
              :key="index"
            >
              <div style="text-align:center">
                <div
                  class="tier-box"
                  @mouseenter="showDialog(index)"
                  @mouseleave="hideDialog(index)"
                  :accesskey="index"
                >
                  <img style="width: 100%;" :src="geImgPreview(item.addDocFiles)" />
                  <div class="tier" v-if="ishow && index === current">
                    <div class="tier-button">
                      <router-link
                        :to="{name: 'ActivityView', params:{ id: item.activityId }}"
                        class="tier-left"
                      >详情</router-link>
                      <div class="tier-right" @click="apply(item)" v-if="item.status=='1'">报名</div>
                    </div>
                  </div>
                </div>
                <h3 class="activity-all-left">{{ item.title }}</h3>
                <div class="activity-all-right">{{ item.status_dictText }}</div>
                <div class="clear"></div>
                <p class="introduce" v-html="item.text"></p>
                <div class="activity-all-bottom">
                  <p style="text-align: left;">
                    <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
                    {{ moment(item.begDate).format('YYYY-MM-DD HH:mm') }}
                  </p>
                  <p style="text-align: left;">
                    <i class="iconfont icondizhi" style="margin-right: 5px;"></i>
                    {{ item.address }}
                  </p>
                  <p
                    style="text-align: right;"
                  >{{ (item.num?item.num:0) +'/'+ item.applyMembersMax }}人</p>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>
        <TabPane label="往期活动">
          <div class="activity-all">
            <Card
              style="width:32%; margin-bottom: 20px;"
              v-for="(item, index) in before"
              :key="index"
            >
              <div style="text-align:center">
                <div
                  class="tier-box"
                  @mouseenter="showDialog(index)"
                  @mouseleave="hideDialog(index)"
                  :accesskey="index"
                >
                  <img style="width: 100%;" :src="geImgPreview(item.addDocFiles)" />
                  <div class="tier" v-if="ishow && index === current">
                    <div class="tier-button">
                      <router-link
                        :to="{name: 'ActivityView', params:{ id: item.activityId }}"
                        class="tier-middle"
                      >详情</router-link>
                      <!-- <div class="tier-right" @click="apply(item)">报名</div> -->
                    </div>
                  </div>
                </div>
                <h3 class="activity-all-left">{{ item.title }}</h3>
                <div class="activity-all-right">{{ item.status_dictText }}</div>
                <div class="clear"></div>
                <p class="introduce" v-html="item.text"></p>
                <div class="activity-all-bottom">
                  <p style="text-align: left;">
                    <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
                    {{ moment(item.begDate).format('YYYY-MM-DD HH:mm') }}
                  </p>
                  <p style="text-align: left;">
                    <i class="iconfont icondizhi" style="margin-right: 5px;"></i>
                    {{ item.address }}
                  </p>
                  <p
                    style="text-align: right;"
                  >{{ (item.num?item.num:0) +'/'+ item.applyMembersMax }}人</p>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
      <router-link :to="{name: 'ActivityIndex'}">
        <Button class="more" type="primary" shape="circle">查看更多</Button>
      </router-link>
    </div>
    <modal-form ref="modalForm"></modal-form>
  </div>
</template>

<script>
import ZjSlider from "@comp/slider/index";
import { getAction } from "@/api/manage";
import { mixinPage } from "@/utils/mixin";
import modalForm from "@/pages/activity/modalForm";

export default {
  name: "HomeIndex",
  components: { ZjSlider, modalForm },
  mixins: [mixinPage],
  data() {
    return {
      ishow: false,
      current: null,
      formModal: false,
      form: {
        activityId: "",
        title: "",
        date: "",
        name: "",
        phone: "",
        email: "",
        remark: ""
      },
      numTotal: "",
      before: [],
      proceed: [],
      keyword: "",
      pageNo: 1,
      pageSize: 3,
      status: 1
    };
  },
  async created() {
    this.activityBefore();
    await this.activityProceed();
    this.activityProceeding();
  },
  methods: {
    geImgPreview(files) {
      if (files) {
        return this.BASR_IMG_URL + files.split(",")[0];
      } else {
        return this.DEFAULT_IMG;
      }
    },
    getData(status) {
      return new Promise((resolve, reject) => {
        let { keyword, parkId, pageNo, pageSize } = this;
        getAction("/park.service/mgrActivityInfo/list", {
          keyword,
          parkId,
          pageNo,
          pageSize,
          status
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
    activityBefore() {
      this.getData(3).then(data => {
        for (const item of data.records) {
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 70) + "......";
            item.text = item.text.trim();
          }
        }
        this.before = data.records;
      });
    },
    activityProceed() {
      return this.getData(1).then(data => {
        for (const item of data.records) {
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 70) + "......";
            item.text = item.text.trim();
          }
        }
        for (const item of data.records) {
          this.proceed.push(item);
        }
        this.numTotal = data.records.length;
      });
    },
    activityProceeding() {
      this.pageSize = 3 - this.numTotal;
      if (this.pageSize <= 0) return;
      this.getData(2).then(data => {
        for (const item of data.records) {
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 70) + "......";
            item.text = item.text.trim();
          }
        }
        for (const item of data.records) {
          this.proceed.push(item);
        }
      });
    },
    showDialog(index, item) {
      this.ishow = true;
      this.current = index;
    },

    hideDialog(index, item) {
      this.ishow = false;
      this.current = null;
    },
    apply(data) {
      this.$refs.modalForm.check(data);
    },
    activityFormCancel() {
      this.formModal = false;
    }
  }
};
</script>

<style lang="less">
.zj-home-index {
  margin-top: 80px;
  .ivu-card + .ivu-card {
    margin-left: 2%;
  }
  .serve {
    width: 1260px; //
    margin: 50px auto;
    .title {
      display: block;
      width: 50px;
      margin: auto;
      text-align: center;
      color: #333;
      font-size: 24px;
      font-weight: 500;
    }
    .title:after {
      content: "";
      display: block;
      width: 50px;
      height: 2px;
      background: #222;
    }
    .serve-box {
      margin-top: 30px;
      display: flex;
      .serve-box-left,
      .serve-box-center,
      .serve-box-right {
        .serve-box-item {
          //
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .img-span {
            position: absolute;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            vertical-align: top;
          }
          .serve-box-text:before {
            content: "";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            margin-right: -0.25em; /* Adjusts for spacing */
          }
        }
        width: calc(98% / 3); //
        img {
          width: 100%;
          height: 245px;
          // height: 100%;
        }
        .serve-box-item::before {
          height: 100%;
          width: 100%;
          position: absolute;
          content: "";
          background-color: rgba(0, 0, 0, 0.5);
          background-size: 100px 100px;
          background-position: center;
        }
        .serve-box-item:hover {
          &::before {
            background-color: rgba(0, 0, 0, 0.3);
          }
          // .img-span {
          //   border-bottom: 2px solid #fff;
          // }
        }
      }
      .serve-box-center,
      .serve-box-right {
        margin-left: 1%;
      }
    }
  }
  .activity {
    .title {
      font-size: 24px;
      font-weight: 500;
      display: block;
      margin: 18px auto;
      text-align: center;
      color: #333;
    }
    .ivu-tabs-nav-scroll {
      margin: auto;
      width: 252px;
      .ivu-tabs-nav {
        width: 252px;
        text-align: center;
        .ivu-tabs-ink-bar {
          width: 50% !important;
        }
      }
      .ivu-tabs-ink-bar {
        height: 2px;
        box-sizing: border-box;
        // background-color: red;
        position: absolute;
        left: 0;
        bottom: 1px;
        z-index: 1;
        transition: transform 0.3s ease-in-out;
        transform-origin: 0 0;
      }
      // .ivu-tabs-nav .ivu-tabs-tab-active {
      //   // color: red;
      // }
    }

    .activity-all {
      width: 1260px; //
      margin: auto;
      display: flex;
      flex-warp: warp;
      -ms-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      .tier-box {
        width: 100%;
        height: 200px; //
        position: relative;
        margin-bottom: 10px;
        img {
          height: 100%;
        }
        .tier {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          position: absolute;
          top: 0;
          left: 0;
          cursor: pointer;
          .tier-button {
            margin: 115px auto;
            width: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            .tier-left {
              width: 100px;
              height: 30px;
              line-height: 30px;
              color: red;
              border: 1px solid red;
              // float: left;
              display: inline-block;
            }
            .tier-right {
              width: 100px;
              height: 30px;
              line-height: 30px;
              background-color: red;
              color: #fff;
              // float: left;
              margin-left: 20px;
            }
            .tier-middle {
              width: 100px;
              height: 30px;
              line-height: 30px;
              color: red;
              border: 1px solid red;
              // padding: 7px 36px;
              // float: left;
              // margin-left: 20px;
            }
          }
        }
      }
      // .ivu-card-bordered & .ivu-card-bordered {

      // }
      .ivu-card-bordered {
        // margin-left: 2%;
        .activity-all-left {
          float: left;
          font-weight: 500;
        }
        .activity-all-right {
          float: right;
          width: 50px;
          height: 20px;
          -webkit-border-radius: 2em 2em 2em 0;
          -moz-border-radius: 2em 2em 2em 0;
          border-radius: 2em 2em 2em 0;
          background: red;
          color: #fff;
          font-size: 12px;
          line-height: 20px;
        }
        .clear {
          clear: both;
        }
        .introduce {
          height: 72px;
          word-break: break-all;
          color: rgb(153, 153, 153);
          text-align: left;
          margin-top: 10px;
          border-bottom: 1px solid #eee;
        }
        .activity-all-bottom {
          // margin-top: 20px;
          p {
            font-weight: 400;
            font-size: 12px;
            color: rgb(153, 153, 153);
          }
        }
      }
    }
    .more {
      display: block;
      width: 264px;
      height: 40px;
      line-height: 40px;
      margin: 50px auto;
      color: #fff;
      background-color: rgba(240, 128, 119, 1);
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
    }
    .ivu-btn-primary {
      border-color: rgba(0, 0, 0, 0);
      &:hover {
        border-color: #c40001;
      }
    }
  }
}
.zj-home-activity-modal {
  .ivu-modal-footer {
    border-top: none;
  }
  .form-modal-footer {
    padding: 30px 0;
    .ivu-btn {
      padding: 0 25px;
      height: 36px;
      font-size: 14px;
    }
  }
}
</style>
