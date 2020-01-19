<template>
  <div class="zj-recruitment-index">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">人才招聘</BreadcrumbItem>
    </Breadcrumb>
    <div class="recruit-body">
      <h1 class="zj-recruitment-title">人才招聘</h1>
      <div class="zj-recruitment-search">
        <ul>
          <span class="title">薪资：</span>
          <!-- 如何往里面塞一个不限 -->
          <!-- 1.拿数据时候处理一下 -->
          <!-- 2.渲染时候加 -->
          <li
            v-for="(salary, index) in dict.monthlySalary"
            :key="index"
            :class="{ischeck :index === salaryCurrent}"
            @click="salaryClass(index)"
          >{{ salary.title }}</li>
          <!-- v-model无效 -->
        </ul>
        <ul>
          <span class="title">经验：</span>
          <li
            v-for="(experience, index) in dict.expType"
            :key="index"
            :class="{ischeck: index === experienceCurrent}"
            @click="experienceClass(index)"
          >{{ experience.title }}</li>
        </ul>
        <ul>
          <span class="title">学历：</span>
          <li
            v-for="(learn, index) in dict.educationType"
            :key="index"
            :class="{ischeck: index === learnCurrent}"
            @click="learnClass(index)"
          >{{ learn.title }}</li>
        </ul>
      </div>
      <div class="zj-recruitment-box">
        <Table :columns="table" :loading="loading" :data="data" @on-row-click="goDetail"></Table>
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
  name: "RecruitmentIndex",
  mixins: [mixinPage],
  data() {
    return {
      spinShow: false,
      isPublic: "1",
      jobType: "",
      keyword: "",
      loading: false,
      dict: {
        monthlySalary: "",
        expType: "",
        educationType: ""
      },
      table: [
        {
          title: "序号",
          dataIndex: "",
          key: "recruitId",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [h("strong", params.index + 1)]);
          }
        },
        {
          title: "职位名称",
          align: "center",
          key: "jobName"
        },
        {
          title: "招聘人数",
          align: "center",
          key: "jobNum"
        },
        {
          title: "薪资",
          align: "center",
          key: "monthlySalary",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                filterDictText(
                  this.dict.monthlySalary,
                  params.row.monthlySalary
                )
              )
            ]);
          }
        },
        {
          title: "学历",
          align: "center",
          key: "educationType",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                filterDictText(
                  this.dict.educationType,
                  params.row.educationType
                )
              )
            ]);
          }
        },
        {
          title: "经验",
          align: "center",
          key: "expType",
          render: (h, params) => {
            return h("div", [
              h("p", filterDictText(this.dict.expType, params.row.expType))
            ]);
          }
        }
      ],
      data: [],
      salaryCurrent: 0,
      experienceCurrent: 0,
      learnCurrent: 0
    };
  },
  created() {
    this.loadData();
    initDictOptions("education_type").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.educationType = res.result;
      }
    });
    initDictOptions("exp_type").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.expType = res.result;
      }
    });
    initDictOptions("monthly_salary").then(res => {
      if (res.code === 0 && res.success) {
        res.result.unshift({
          value: 0,
          text: "不限",
          title: "不限"
        });
        this.dict.monthlySalary = res.result;
      }
    });
  },
  methods: {
    goDetail(info) {
      this.$router.push({
        name: "RecruitmentDetail",
        params: { id: info.recruitId }
      });
    },
    // monthlySalary: salaryCurrent,
    // expType: experienceCurrent,
    // educationType: learnCurrent,
    getData(status) {
      return new Promise((resolve, reject) => {
        let {
          salaryCurrent,
          experienceCurrent,
          learnCurrent,
          isPublic,
          pageNo,
          pageSize,
          parkId
        } = this;
        getAction("/park.service/mgrRecruitInfo/list", {
          monthlySalary: salaryCurrent,
          expType: experienceCurrent,
          educationType: learnCurrent,
          isPublic,
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
    loadData(arg) {
      if (arg == 1) {
        this.pageNo = 1;
      }
      this.loading = true;
      // this.$Spin.show();
      this.getData().then(data => {
        this.data = data.records;
        this.pageTotal = data.total;
        this.loading = false;
        // this.$Spin.hide();
      });
    },
    salaryClass(index) {
      this.salaryCurrent = index;
      this.loadData(1);
    },
    experienceClass(index) {
      this.experienceCurrent = index;
      this.loadData(1);
    },
    learnClass(index) {
      this.learnCurrent = index;
      this.loadData(1);
    }
    //后台逻辑，用v-model获取参数
    //前台逻辑，用click方法传值改变参数
  }
};
</script>
<style lang="less">
.zj-recruitment-index {
  // overflow: hidden;
  margin-top: 85px;
  text-align: left;
  background-color: #fff;
  .pageclass {
    margin: 30px auto;
    text-align: center;
    margin-bottom: 0;
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
  .ivu-table-tbody {
    .ivu-table-row {
      cursor: pointer;
    }
  }
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

  .zj-recruitment-box {
    margin: 10px 30px;
  }
}
</style>
