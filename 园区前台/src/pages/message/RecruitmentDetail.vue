<template>
  <div class="zj-recruitment-detail">
    <Breadcrumb class="breadcrumb-box" separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">人才招聘</BreadcrumbItem>
    </Breadcrumb>
    <div class="recruit-body">
      <h1>人才招聘</h1>
      <Divider />
      <h3>岗位信息</h3>
      <div class="zj-recruitment-tablediv">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <table>
          <tr>
            <td>职位名称：</td>
            <td>{{ info.jobName }}</td>
            <td>行业：</td>
            <td>{{ filterDictText(dict.industryGategory, info.jobType) }}</td>
          </tr>
          <tr>
            <td>招聘人数：</td>
            <td>{{ info.jobNum }}</td>
            <td>薪资待遇：</td>
            <td>{{ filterDictText(dict.monthlySalary, info.monthlySalary) }}</td>
          </tr>
          <tr>
            <td>联系方式：</td>
            <td>{{ info.contactTel }}</td>
            <td>经验要求：</td>
            <td>{{ filterDictText(dict.expType, info.expType) }}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{ info.email }}</td>
            <td>学历：</td>
            <td>{{ filterDictText(dict.educationType, info.educationType) }}</td>
          </tr>
          <tr>
            <td>公司规模：</td>
            <td>{{ filterDictText(dict.staffMember, info.staffMember) }}</td>
            <td>福利待遇：</td>
            <td>{{ companyBenefitBBQ }}</td>
          </tr>
          <tr>
            <td>公司地址：</td>
            <td>{{ info.address }}</td>
            <td>公司名称：</td>
            <td>{{ info.customerName }}</td>
          </tr>
        </table>
      </div>
      <div class="sec-body">
        <h3>岗位描述</h3>
        <p>{{ info.description }}</p>
        <h3>岗位要求</h3>
        <p>{{ info.summary }}</p>
      </div>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import { initDictOptions, filterDictText } from "@/api/dict";

export default {
  name: "RecruitmentDetail",
  data() {
    return {
      info: "",
      isPublic: "",
      jobType: "",
      keyword: "",
      pageNo: "1",
      pageSize: "5",
      spinShow: false,
      dict: {
        educationType: "",
        expType: "",
        monthlySalary: "",
        companyBenefit: "",
        staffMember: "",
        industryGategory: "",
        customerName: ""
      },
      companyBenefitBBQ: ""
    };
  },
  created() {
    this.spinShow = true;
    this.loadData();
    getAction("/park.customer/baseCustomer/listAll").then(res => {
      const that = this;
      if (res.success) {
        that.dict.customerName = res.result.records;
        //获取数字，然后马上拿数字去跟已经初始化完成的dict数组对比
        //公司名list需要在loaddata（this.loadData();)之前得到
        this.loadData();
      }
    });
    initDictOptions("education_type").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.educationType = res.result;
      }
    });
    initDictOptions("exp_type").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.expType = res.result;
      }
    });
    initDictOptions("monthly_salary").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.monthlySalary = res.result;
      }
    });
    initDictOptions("company_benefit").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyBenefit = res.result;
      }
    });
    initDictOptions("staff_member").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.staffMember = res.result;
      }
    });
    initDictOptions("industry_gategory").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryGategory = res.result;
      }
    });
  },
  methods: {
    filterDictText,
    getData(status) {
      return new Promise((resolve, reject) => {
        let { isPublic, jobType, keyword, pageNo, pageSize, parkId } = this;
        getAction("/park.service/mgrRecruitInfo/queryById", {
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
      this.getData().then(data => {
        this.info = data;
        const that = this;
        //START-----------2019-11-27
        // console.log(that.info.companyBenefit)
        if (typeof that.info.companyBenefit == "string") {
          that.info.companyBenefit = that.info.companyBenefit.split(",");
        }
        // console.log(that.info.companyBenefit)
        for (const item of that.dict.companyBenefit) {
          for (const itemBBQ of that.info.companyBenefit) {
            if (item.value == itemBBQ) {
              //第二个数组项开始，先加加号，再串烧
              //只有一项福利待遇，就不会展示加号了
              if (itemBBQ != that.info.companyBenefit[0]) {
                that.companyBenefitBBQ = that.companyBenefitBBQ.concat("+");
              }
              //把拿到的字串烧起来~
              that.companyBenefitBBQ = that.companyBenefitBBQ.concat(item.text);
            }
          }
        }

        for (const item of that.dict.customerName) {
          if (item.custId == that.info.custId) {
            that.info.customerName = item.customerName;
          }
        }
        this.spinShow = false;
        console.log(that.companyBenefitBBQ);
        return;
        //END-----------
      });
    },
    salaryClass(index) {
      this.salaryCurrent = index;
    },
    experienceClass(index) {
      this.experienceCurrent = index;
    },
    learnClass(index) {
      this.learnCurrent = index;
    }
  }
};
</script>
<style lang="less">
//12.09
@PRESENTWIDTH: 1220px;
.zj-recruitment-detail {
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
    p {
      border: 1px solid rgba(200, 200, 200, 0.5);
      padding: 20px;
      min-height: 120px;
      // margin: 20px;
    }
  }
  table {
    font-size: 14px;
    width: @PRESENTWIDTH;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }
  table tr td {
    padding: 10px;
    border: 1px solid rgba(200, 200, 200, 0.5);
  }
  table tr td:nth-child(even) {
    background: #fff;
    width: 38%;
  }
  table tr td:nth-child(odd) {
    width: 12%;
    // width: calc(~'100% - @{width}');
    background: rgba(245, 245, 245, 1);
    text-align: right;
  }

  .zj-recruitment-tablediv {
    ul {
      max-width: 1160px;
      margin: 0 auto;
      .ivu-col-span-3 {
        background-color: rgba(245, 245, 245, 1);
      }
    }
  }
}
.zj-recruitment-detail {
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
