<template>
  <div class="zj-policy-detail">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/policy/index">政策</BreadcrumbItem>
      <BreadcrumbItem>{{ policyInfo.titile }}</BreadcrumbItem>
    </Breadcrumb>
    <div class="zj-policy-box">
      <div class="zj-policy-left">
        <div>
          <Card dis-hover>
            <div slot="title" class="policyInfo-title-style">
              <h2>{{ policyInfo.titile }}</h2>
              <span style="margin-right: 10px;">
                <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
                {{ moment(policyInfo.publishTime).format('YYYY-MM-DD HH:mm') }}
              </span>
              <!-- 政策类别 -->
              <span style="margin-right: 10px;">
                <Tag
                  color="primary"
                  :key="item.value"
                  v-if="typesArray.includes(item.value)"
                  v-for="item in dict.talentPolicy"
                >{{ item.text }}</Tag>
              </span>
            </div>
            <div class="policyInfo-body-style">
              <Tabs>
                <TabPane label="政策原文">
                  <p v-html="policyInfo.context"></p>
                </TabPane>
                <TabPane label="扶持力度">
                  <p v-html="policyInfo.support"></p>
                </TabPane>
                <TabPane label="申报条件">
                  <p v-html="policyInfo.conditions"></p>
                </TabPane>
                <TabPane label="申报程序">
                  <p v-html="policyInfo.procedureFlow"></p>
                </TabPane>
                <TabPane label="提交材料">
                  <p v-html="policyInfo.material"></p>
                </TabPane>
                <TabPane label="受理业务">
                  <p v-html="policyInfo.services"></p>
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
      <div class="zj-policy-right">
        <h4 class="zj-policy-right-title">重要政策</h4>
        <div class="zj-policy-item" v-for="(hot, key) in policyListHot" :key="key">
          <h1>
            <router-link class="title" :to="'/policy/detail/' + hot.policyId">{{ hot.titile }}</router-link>
          </h1>
          <p>
            <router-link class="text" :to="'/policy/detail/' + hot.policyId" v-html="hot.text"></router-link>
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
import { initDictOptions } from "@/api/dict";
export default {
  name: "Index",
  mixins: [mixinPage],
  data() {
    return {
      policyInfo: [],
      isPublic: "",
      keyword: "",
      pageNo: 1,
      pageSize: 5,
      type: "4",
      spinShow: false,
      dict: {
        talentPolicy: []
      },
      typesArray: []
    };
  },
  watch: {
    $route(val) {
      this.loadData();
    }
  },
  created() {
    initDictOptions("policy_type").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.talentPolicy = res.result;
      }
    });
    this.loadData();
    this.loadDataHotPolicy();
  },
  methods: {
    getData(status) {
      return new Promise((resolve, reject) => {
        getAction("/park.service/mgrPolicyInfo/queryById", {
          id: this.$route.params.id
        })
          .then(res => {
            if (res.code === 200 && res.success) {
              resolve(res.result);
            } else {
              reject(res.policy);
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
        this.typesArray = [];
        for (const item of data.types) {
          this.typesArray.push(item.labelNo);
        }
        this.policyInfo = data;
        this.spinShow = false;
        // console.log(this.policyInfo);
      });
    }
  }
};
</script>

<style lang="less">
.policyInfo-title-style {
  h2 {
    font-weight: normal;
    margin-bottom: 10px;
  }
  span {
    color: #999;
  }
}
.policyInfo-body-style {
  p {
    font-size: 14px;
    line-height: 2em;
    word-break: break-all;
  }
}
.zj-policy-detail {
  overflow: hidden; //
  margin-top: 80px; // 85
  text-align: left;
  // background-color: rgba(245, 245, 245, 1);
  .breadcrumb-box {
    padding: 10px;
    border: 1px solid rgba(228, 228, 228, 1);
    background-color: #fff;
    margin-bottom: 20px;
  }
  .zj-policy-box {
    width: 1260px;
    margin: 0 auto;
    display: flex;
    .zj-policy-left {
      width: 75%;
      // padding: 30px;
      background-color: #fff;
      // border: 1px solid rgba(228, 228, 228, 1);
      // .ivu-card.ivu-card-dis-hover.ivu-card-bordered {
      //   border: none;
      // }
      .zj-policy-item {
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: 0;
        }
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
      .zj-policy-item:nth-child(5) {
        border-bottom: 0;
      }
    }
    .zj-policy-right {
      width: 23%;
      margin-left: 2%;
      background-color: #fff;
      border: 1px solid rgba(228, 228, 228, 1);
      .zj-policy-right-title {
        padding: 20px 15px;
        border-bottom: 1px solid #eee;
      }
      .zj-policy-item {
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
