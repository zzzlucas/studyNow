<template>
  <div class="activity-index">
    <div class="activity-index-box">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="{name: 'HomeIndex'}">首页</BreadcrumbItem>
        <BreadcrumbItem v-if="!$route.query.keyword">活动</BreadcrumbItem>
        <!-- <BreadcrumbItem v-if="$route.params.keyword"  :to="{name: 'ActivityIndex',params: { keyword: '' }}">活动</BreadcrumbItem> -->
        <BreadcrumbItem
          v-if="$route.query.keyword"
          :to="{name: 'ActivityIndex',        
          query: { keyword: '' }}"
        >活动</BreadcrumbItem>
        <BreadcrumbItem v-if="$route.query.keyword">搜索结果</BreadcrumbItem>
      </Breadcrumb>

      <div class="content">
        <h4 class="title">活动</h4>
        <div class="card-box">
          <div
            class="card"
            v-for="(item, index) in data"
            :key="index"
            @mouseenter="showDialog(index)"
            @mouseleave="hideDialog(index)"
            :accesskey="index"
          >
            <div class="card-img">
              <img :src="geImgPreview(item.addDocFiles)" alt />
              <!-- <img src="../../assets/images/default_img.jpg" alt /> -->
              <div class="tier" v-if="ishow && index === current">
                <div class="tier-button">
                  <router-link
                    :to="{name: 'ActivityView', params:{ id:item.activityId }}"
                    class="tier-left"
                  >详情</router-link>
                  <div class="tier-right" @click="apply(item)" v-if="item.status=='1'">报名</div>
                </div>
              </div>
            </div>
            <div class="card-top">
              <h4>{{ item.title }}</h4>
              <div class="apply">{{ item.status_dictText }}</div>
              <div class="clear"></div>
            </div>
            <p class="introduce" v-html="item.text"></p>
            <div class="card-bottom">
              <p>
                <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
                {{ moment(item.begDate).format('YYYY-MM-DD HH:mm') }}
              </p>
              <p>
                <i class="iconfont icondizhi" style="margin-right: 5px;"></i>
                {{ item.address }}
              </p>
              <p class="apply-num">{{ (item.num?item.num:0) +'/'+ item.applyMembersMax }} 报名</p>
            </div>
          </div>
        </div>
        <!-- page -->
        <div class="content-page pageclass">
          <Page
            :total="pageTotal"
            :page-size="pageSize"
            :current="pageNo"
            @on-change="pageCurrentFun"
            @on-page-size-change="pageSizeFun"
          />
          <!-- prev-text="<上一页"      next-text="下一页>" -->
        </div>
      </div>
    </div>
    <modal-form ref="modalForm"></modal-form>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
import { mixinPage } from "@/utils/mixin";
import modalForm from "./modalForm";

export default {
  name: "ActivityIndex",
  mixins: [mixinPage],
  components: { modalForm },
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
      spinShow: false,
      data: [],
      total: 0,
      pageNo: 1,
      pageSize: 6,
      status: "",
      statusA: 1,
      statusB: 2,
      statusC: 3,
      statusX: 5, //该数字全查除未发布政策
      pageTotalA: "",
      pageTotalB: "",
      pageTotalC: "",
      dataA: [],
      dataB: [],
      dataC: []
    };
  },
  created() {
    if (this.$route.query.keyword) {
      this.searchData();
    } else {
      this.loadData();
    }
  },
  watch: {
    //问题是同页面不同params 不会触发 路由的push
    $route(val) {
      console.log(this.$route.query);
      this.searchData();
    }
  },
  methods: {
    //搜索结果页返回原活动列表页
    // goWholeActivity() {
    //   this.$router.push({
    //     name: "ActivityIndex"
    //   });
    // },
    geImgPreview(files) {
      if (files) {
        return this.BASR_IMG_URL + files.split(",")[0];
      } else {
        return this.DEFAULT_IMG;
      }
    },
    loadData() {
      this.spinShow = true;
      let { parkId, pageNo, pageSize, statusX } = this;
      getAction("/park.service/mgrActivityInfo/list", {
        parkId,
        pageNo,
        pageSize,
        status: statusX
      }).then(res => {
        if (res.success && res.code === 200) {
          //根据富文本内容获取摘要
          for (const item of res.result.records) {
            //在富文本内容很大的情况下，性能应该会很低下
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 70) + "......";
            item.text = item.text.trim();
          }
          this.data = res.result.records;
          this.pageTotal = res.result.total;
          this.spinShow = false;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    searchData() {
      this.spinShow = true;
      console.log(this.$route.query);
      let { parkId, pageNo, pageSize, statusX } = this;
      getAction("/park.service/mgrActivityInfo/list", {
        parkId,
        pageNo,
        pageSize,
        status: statusX,
        keyword: this.$route.query.keyword
      }).then(res => {
        if (res.success && res.code === 200) {
          //根据富文本内容获取摘要
          for (const item of res.result.records) {
            //在富文本内容很大的情况下，性能应该会很低下
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 70) + "......";
            item.text = item.text.trim();
          }
          this.data = res.result.records;
          this.pageTotal = res.result.total;
          this.spinShow = false;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // loadData() {
    //   let { parkId, pageNo, pageSize, statusA, statusB } = this;
    //   getAction("/park.service/mgrActivityInfo/list", {
    //     parkId,
    //     pageNo,
    //     pageSize,
    //     status: statusA
    //   }).then(res => {
    //     if (res.success && res.code === 200) {
    //       this.dataA = res.result.records;
    //       this.pageTotalA = res.result.total;
    //       getAction("/park.service/mgrActivityInfo/list", {
    //         parkId,
    //         pageNo,
    //         pageSize: pageSize - this.pageTotalA,
    //         status: statusB
    //       }).then(resB => {
    //         if (resB.success && resB.code === 200) {
    //           this.dataB = resB.result.records;
    //           this.pageTotalB = resB.result.total;
    //           let DATA = this.dataA.concat(this.dataB);
    //           //根据富文本内容获取摘要
    //           for (const item of DATA) {
    //             //在富文本内容很大的情况下，性能应该会很低下
    //             item.text = item.context;
    //             item.text = item.text.replace(/<\/?.+?>/g, "");
    //             item.text = item.text.replace(/&nbsp;/g, "");
    //             item.text = item.text.slice(0, 180) + "......";
    //             item.text = item.text.trim();
    //           }
    //           this.data = DATA;
    //           this.pageTotal = this.pageTotalA + this.pageTotalB;
    //           console.log(this.pageTotal);
    //         }
    //       });
    //     } else {
    //       this.$Message.error(res.message);
    //     }
    //   });
    // },

    showDialog(index, item) {
      this.ishow = true;
      this.current = index;
    },
    hideDialog(index, item) {
      this.ishow = false;
      this.current = null;
    },
    apply(data) {
      // 判断当前未登录
      // let a = 1;
      // if (a === 1) {
      //   return this.$router.push({ name: "LoginIndex" });
      // }
      this.$refs.modalForm.check(data);
    },
    activityFormCancel() {
      this.formModal = false;
    }
  }
};
</script>

<style lang="less">
.activity-index {
  margin: 85px auto 0;
  width: 1260px;
  overflow: hidden;
  // margin-top: 90px;
  // background-color: rgba(246, 246, 246, 1);

  .card + .card {
    margin-left: 2%;
  }
  .card:nth-child(4) {
    margin-left: 0px;
  }
  .activity-index-box {
    // width: 90%;
    margin: auto;
    .ivu-breadcrumb {
      text-align: left;
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #fff;
    }
    .content {
      background-color: #fff;
      text-align: left;
      .title {
        padding: 20px 0;
        font-size: 18px;
        width: 95%;
        margin: auto;
        border-bottom: 1px solid #ddd;
      }
      .card-box {
        width: 95%;
        display: flex;
        margin: 20px auto;
        // flex-warp: warp;
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;

        .card {
          border: 1px solid #ddd;
          width: 32%;
          // margin-left: 2%;
          margin-bottom: 20px;
          .card-img {
            height: 200px; //
            cursor: pointer;
            position: relative;
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
                  display: inline-block;
                  width: 100px;
                  height: 30px;
                  line-height: 30px;
                  color: red;
                  border: 1px solid red;
                  // float: left;
                  text-align: center;
                }
                .tier-right {
                  width: 100px;
                  height: 30px;
                  line-height: 30px;
                  background-color: red;
                  color: #fff;
                  // float: left;
                  margin-left: 20px;
                  text-align: center;
                }
              }
            }
            img {
              width: 100%;
              height: 100%; //
            }
          }
          .card-top {
            padding: 10px 20px 3px;
            h4 {
              float: left;
              font-size: 16px;
            }
            .apply {
              text-align: center;
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
          }

          .introduce {
            word-break: break-all;
            height: 72px; //
            padding: 7px 20px;
            border-bottom: 1px solid #ddd;
            color: #999999;
            font-size: 13px;
          }
          .card-bottom {
            padding: 5px 20px;
            p {
              width: 100%;
              text-align: left;
              font-weight: 400;
              font-size: 12px;
              margin: 0 0; //
              color: #999999;
            }
            .apply-num {
              text-align: right;
            }
          }
        }
      }
      .content-page {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        .ivu-page-custom-text {
          // border: 1px solid #ddd;
          padding: 0 10px;
        }
        .ivu-page-item-active {
          // background-color: red;
          // color: #fff;
          // border-color: unset;
        }
        .ivu-page-item {
          // border: 1px solid red;
        }

        .ivu-page-item:hover a {
          // color: red !important;
        }
        .ivu-page-item-active a {
          // color: #fff !important;
        }

        .ivu-page-item-active:hover a {
          // color: #fff !important;
        }
      }
    }
  }
}
</style>
