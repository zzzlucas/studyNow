<template>
  <div class="zj-message-index">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/message/index/2" v-if="dataType==2">新闻动态</BreadcrumbItem>
      <BreadcrumbItem to="/message/index/3" v-if="dataType==3">通知公告</BreadcrumbItem>
      <BreadcrumbItem>{{ newsInfo.titile }}</BreadcrumbItem>
    </Breadcrumb>
    <div class="zj-message-box">
      <div class="zj-message-left">
        <div>
          <Card dis-hover>
            <div slot="title" class="newsinfo-title-style">
              <h2>{{ newsInfo.titile }}</h2>
              <span style="margin-right: 10px;">
                <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
                {{ newsInfo.publishTime }}
              </span>
              <span style="margin-right: 10px;">
                <Icon type="ios-list-box-outline" />
                <!-- <i class="iconfont iconshijian" style="margin-right: 5px;"></i> -->
                {{ newsInfo.type }}
              </span>
            </div>
            <div class="newsinfo-body-style">
              <p v-html="newsInfo.context"></p>
            </div>
          </Card>
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
  name: "Index",
  mixins: [mixinPage],
  data() {
    return {
      spinShow: false,
      newsInfo: [],
      isPublic: "",
      keyword: "",
      pageNo: 1,
      pageSize: 5,
      type: "4",
      dataType: ""
    };
  },
  watch: {
    $route(val) {
      this.loadData();
    }
  },
  created() {
    this.loadData();
    this.loadDataHot();
  },
  methods: {
    getData(status) {
      //   console.log(this.$route.params.id);
      return new Promise((resolve, reject) => {
        // let { isPublic, keyword, pageNo, pageSize, parkId, type } = this;
        getAction("/park.service/mgrNewsInfo/queryById", {
          id: this.$route.params.id
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
      this.spinShow = true;
      this.getData().then(data => {
        if (data.type == 2) {
          this.dataType = 2;
          data.type = "新闻动态";
        } else if (data.type == 3) {
          this.dataType = 3;
          data.type = "通知公告";
        }
        this.newsInfo = data;
        this.spinShow = false;
        // console.log(this.newsInfo);
      });
    }
  }
};
</script>

<style lang="less">
.newsinfo-title-style {
  h2 {
    font-weight: normal;
    margin-bottom: 10px;
  }
  span {
    color: #999;
  }
}
.newsinfo-body-style {
  p {
    font-size: 14px;
    line-height: 2em;
    word-break: break-all;
  }
}
.zj-message-index {
  overflow: hidden; //
  margin-top: 80px; // 85
  text-align: left;
  background-color: #eee;
  .breadcrumb-box {
    padding: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .zj-message-box {
    width: 1260px;
    margin: 0 auto;
    display: flex;
    .zj-message-left {
      width: 75%;
      // padding: 30px;
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
      border: 1px solid #eee;
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
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
