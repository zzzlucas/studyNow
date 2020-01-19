<template>
  <div class="zj-policy-index">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>政策</BreadcrumbItem>
    </Breadcrumb>
    <div class="zj-policy-search">
      <ul>
        <span class="title">政策类别：</span>
        <li
          v-for="(level, index) in dict.policyType"
          :key="index"
          :class="{ischeck:typesCurrent.includes(index)}"
          @click="levelClass(index)"
        >{{ level.title }}</li>
      </ul>
      <ul>
        <span class="title">发布部门：</span>
        <li
          v-for="(department, index) in dict.publishingDepartment"
          :key="index"
          :class="{ischeck:deptsCurrent.includes(index)}"
          @click="departmentClass(index)"
        >{{ department.title }}</li>
      </ul>
    </div>
    <div class="zj-policy-box">
      <div class="zj-policy-left">
        <div class="zj-policy-item" v-for="(item, key) in data" :key="key">
          <h1 class="title">
            <router-link
              class="title-font"
              :to="'/policy/detail/' + item.policyId"
            >{{ item.titile }}</router-link>
          </h1>
          <div class="info">
            <span style="margin-right: 10px;">
              <i class="iconfont iconshijian" style="margin-right: 5px;"></i>
              {{ moment(item.publishTime).format('MM-DD HH:mm') }}
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
import { initDictOptions, filterDictText } from "@/api/dict";
import { mixinPage } from "@/utils/mixin";

export default {
  name: "",
  mixins: [mixinPage],
  data() {
    return {
      spinShow: false,
      data: [],
      levelCurrent: 0,
      departmentCurrent: 0,
      dict: { policyType: [], publishingDepartment: [] },
      ary: { policyTypeAry: [], publishingDepartmentAry: [] },
      depts: [0],
      types: [0],
      deptsCurrent: [0],
      typesCurrent: [0],
      isPublic: 1 // 此处1为已发布
    };
  },
  created() {
    this.loadData();
    this.loadDataHotPolicy();
    initDictOptions("policy_type").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.policyType = res.result;
        for (let item of this.dict.policyType) {
          this.ary.policyTypeAry.push(item.value);
        }
        console.log(this.ary.policyTypeAry);
      }
    });
    initDictOptions("publishing_department").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.publishingDepartment = res.result;
        for (let item of this.dict.publishingDepartment) {
          this.ary.publishingDepartmentAry.push(item.value);
        }
        console.log(this.ary.publishingDepartmentAry);
      }
    });
  },
  methods: {
    getData(status) {
      return new Promise((resolve, reject) => {
        let { depts, types, isPublic, pageNo, pageSize, parkId } = this;
        getAction("/park.service/mgrPolicyInfo/list", {
          deptGroups: String(depts),
          typeGroups: String(types),
          isPublic,
          pageNo,
          pageSize,
          parkId,
          userSortOrder: "no"
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
    loadData(arg) {
      if (arg == 1) {
        this.pageNo = 1;
      }
      this.spinShow = true;
      this.getData().then(
        data => {
          this.data = data.records;
          this.pageTotal = data.total;
          this.spinShow = false;
        },
        error => {
          this.data = [];
          this.spinShow = false;
          // console.log(error);
        }
      );
    },
    moment,
    //多选筛选逻辑  @zzzlucas
    levelClass(index) {
      if (index == 0) {
        this.typesCurrent = [];
        this.types = [];
      } else {
        if (this.typesCurrent.includes(0)) {
          this.typesCurrent.splice(this.typesCurrent.indexOf(0), 1);
        }
        if (this.types.includes(0)) {
          this.types.splice(this.types.indexOf(0), 1);
        }
      }
      if (this.typesCurrent.includes(index)) {
        this.typesCurrent.splice(this.typesCurrent.indexOf(index), 1);
      } else {
        this.typesCurrent.push(index);
      }
      let TYPES = this.ary.policyTypeAry[index];
      if (this.types.includes(TYPES)) {
        this.types.splice(this.types.indexOf(TYPES), 1);
      } else {
        this.types.push(TYPES);
      }
      this.loadData(1);
    },
    //多选筛选逻辑
    departmentClass(index) {
      if (index == 0) {
        this.deptsCurrent = [];
        this.depts = [];
      } else {
        if (this.deptsCurrent.includes(0)) {
          this.deptsCurrent.splice(this.deptsCurrent.indexOf(0), 1);
        }
        if (this.depts.includes(0)) {
          this.depts.splice(this.depts.indexOf(0), 1);
        }
      }
      if (this.deptsCurrent.includes(index)) {
        this.deptsCurrent.splice(this.deptsCurrent.indexOf(index), 1);
      } else {
        this.deptsCurrent.push(index);
      }
      let DEPTS = this.ary.publishingDepartmentAry[index];
      if (this.depts.includes(DEPTS)) {
        this.depts.splice(this.depts.indexOf(DEPTS), 1);
      } else {
        this.depts.push(DEPTS);
      }
      this.loadData(1);
    }
  }
};
</script>

<style lang="less">
.zj-policy-index {
  .pageclass {
    margin: 30px auto;
    text-align: center;
    margin-bottom: 0;
  }
  // overflow: hidden;
  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  width: 1260px;
  margin: 0 auto;
  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  .zj-policy-search {
    background-color: #fff;
    border: 1px solid rgba(228, 228, 228, 1);
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
        padding: 0 25px;
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
  .zj-policy-box {
    display: flex;
    .zj-policy-left {
      width: 75%;
      padding: 30px;
      background-color: #fff;
      border: 1px solid rgba(228, 228, 228, 1);
      // border: 1px solid #eee;
      .zj-policy-item {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        .title {
          font-size: 16px;
          display: block;
          width: 85%;
          padding-left: 30px;
          font-weight: 500;
          .title-font {
            color: #333;
          }
        }
        .info {
          font-size: 12px;
          color: rgb(153, 153, 153);
          width: 15%;
        }
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
