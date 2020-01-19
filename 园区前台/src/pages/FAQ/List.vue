<template>
  <div class="zj-message-index">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>常见问题</BreadcrumbItem>
    </Breadcrumb>
    <div class="zj-message-box">
      <div class="zj-message-left">
        <Collapse v-model="value1" @on-change="clg">
          <Panel v-for="(item, key) in newsList" :key="key" :name="item.newId">
            {{ item.titile }}
            <p slot="content" v-html="item.context"></p>
          </Panel>
        </Collapse>

        <!-- <div class="zj-message-item"></div> -->

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
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { mixinPage } from "@/utils/mixin";
export default {
  name: "FAQ",
  mixins: [mixinPage],
  data() {
    return {
      value1: [],
      newsList: [],
      type: 1
    };
  },
  created() {
    this.loadData();
    this.loadDataHot();
  },
  methods: {
    clg(key) {
      console.log(this.value1);
      console.log(key);
    },
    getData() {
      return new Promise((resolve, reject) => {
        let { pageNo, pageSize, parkId, type } = this;
        getAction("/park.service/mgrNewsInfo/list", {
          pageNo,
          pageSize,
          parkId,
          type
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
      this.getData().then(data => {
        this.value1 = []; //干脆清空一下
        this.newsList = data.records;
        this.pageTotal = data.total;
      });
    }
  }
};
</script>

<style lang="less">
.zj-message-index {
  overflow: hidden;
  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  // background-color: #eee;
  .ivu-collapse {
    margin-left: 1px;
  }
  .pageclass {
    margin: 30px auto;
    text-align: center;
  }
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
      // border: 1px solid #eee;
      // padding: 30px;
      // background-color: #fff;
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
