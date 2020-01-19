<template>
  <div class="zj-message-index-one">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.params.id == 2">新闻动态</BreadcrumbItem>
      <BreadcrumbItem v-if="$route.params.id == 3">通知公告</BreadcrumbItem>
    </Breadcrumb>
    <div class="zj-message-box">
      <div class="zj-message-left">
        <div class="zj-message-item" v-for="(item, key) in newsList" :key="key">
          <h1>
            <router-link class="title" :to="'/message/detail/' + item.newId">{{ item.titile }}</router-link>
          </h1>
          <p>
            <router-link class="text" :to="'/message/detail/' + item.newId" v-html="item.text"></router-link>
          </p>
          <div class="info">
            <span style="margin-right: 10px;">
              <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
              {{ item.publishTime }}
            </span>
            <!-- <span>
              <i class="iconfont iconyuedushuliang" style="margin-right: 5px;"></i>
              {{item.reading}}
            </span>-->
          </div>
        </div>
        <!-- page -->
        <div class="pageclass">
          <Page
            :total="pageTotal"
            :page-size="pageSize"
            :current="pageNo"
            @on-change="pageCurrentFun"
            @on-page-size-change="pageSizeFun"
          />
        </div>
      </div>
      <div class="zj-message-right">
        <h4 class="zj-message-right-title">热门动态资讯</h4>
        <div class="zj-message-item" v-for="(hot, key) in newsListHot" :key="key">
          <h1>
            <router-link class="title" :to="'/message/detail/' + hot.newId">{{ hot.titile }}</router-link>
          </h1>
          <p>
            <router-link class="text" :to="'/message/detail/' + hot.newId" v-html="hot.text"></router-link>
          </p>
        </div>
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { mixinPage } from "@/utils/mixin";
export default {
  name: "MessageIndex",
  mixins: [mixinPage],
  data() {
    return {
      spinShow: false,
      newsList: [],
      pageSize: 5,
      isPublic: "",
      keyword: "",
      type: ""
    };
  },

  watch: {
    //router-link路由切换时，未触发created时的加载
    $route(val) {
      // console.log(val.params.id);
      this.pageNo = 1;
      // this.pageCurrent = this.pageNo;
      this.loadData();
    }
  },
  created() {
    this.loadData();
    this.loadDataHot();
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        let { isPublic, keyword, pageNo, pageSize, parkId, type } = this;
        getAction("/park.service/mgrNewsInfo/list", {
          isPublic,
          keyword,
          pageNo,
          pageSize,
          parkId,
          userSortOrder: "no",
          type: this.$route.params.id
        })
          .then(res => {
            // console.log(this.$route.params.id);
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
      this.spinShow = true;
      this.getData().then(data => {
        //根据富文本内容获取摘要
        for (const item of data.records) {
          item.publishTime = moment(item.publishTime).format("MM-DD HH:mm");
          //在富文本内容很大的情况下，性能应该会很低下
          if (item.context) {
            item.text = item.context;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 180) + "......";
            item.text = item.text.trim();
          }
        }
        this.newsList = data.records;
        //页码总数未改变
        this.pageTotal = data.total;
        this.spinShow = false;
      });
    }
  }
};
</script>

<style lang="less">
.zj-message-index-one {
  // overflow: hidden;
  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  // background-color: #eee;
  .pageclass {
    margin: 30px auto;
    margin-bottom: 0;
    text-align: center;
  }
  .breadcrumb-box {
    padding: 10px;
    // border: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .zj-message-box {
    width: 1260px;
    margin: 0 auto;
    display: flex;
    .zj-message-left {
      border: 1px solid rgba(228, 228, 228, 1);
      width: 75%;
      padding: 30px;
      padding-top: 0;
      background-color: #fff;
      .zj-message-item {
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        .title {
          font-size: 16px;
          margin-bottom: 15px;
          color: #333333;
        }
        .text {
          color: rgb(153, 153, 153);
          word-break: break-all;
        }
        .info {
          font-size: 12px;
          color: rgb(153, 153, 153);
          margin-top: 10px;
        }
      }
    }
    .zj-message-right {
      width: 23%;
      margin-left: 2%;
      background-color: #fff;
      border: 1px solid rgba(228, 228, 228, 1);
      .zj-message-right-title {
        padding: 20px 15px;
        border-bottom: 1px solid #eee;
      }
      .zj-message-item {
        padding: 30px 0;
        margin: 0 15px;
        border-bottom: 1px solid #eee;
        .title {
          font-size: 18px;
          margin-bottom: 5px;
          font-weight: 400;
          color: rgb(102, 102, 102);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .text {
          color: rgb(153, 153, 153);
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
