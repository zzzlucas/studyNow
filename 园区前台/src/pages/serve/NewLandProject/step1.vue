<template>
  <div class="rubbish-disposition-step1">
    <h1 class="title">新建拿地项目申请</h1>
    <div class="schedule">
      <Steps :current="0" status="error">
        <Step title="新建拿地项目申请"></Step>
        <Step title="新建拿地项目申请成功"></Step>
      </Steps>
    </div>
    <Form ref="form" :model="form" :rules="ruleValidate">
      <!-- :rules="ruleValidate" :label-width="80" -->
      <div class="rubbish-disposition-form">
        <p class="title">企业信息</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="项目单位:" prop="fillUnit">
                <Input v-model="form.fillUnit" disabled />
                <!-- <Select v-model="form.fillUnit" placeholder>
                  <Option
                    v-for="(item, key) in dict.custList"
                    :value="item.custId"
                    :key="key"
                  >{{ item.customerName }}</Option>
                </Select>-->
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="组织机构代码:" prop="creditCode">
                <Input v-model="form.creditCode" />
                <!-- <DatePicker v-model="form.reportTime" type="date" style="width: 100%"></DatePicker> -->
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="36">
            <Col span="12">
              <FormItem label="单位地址:" prop="unitAddress">
                <Input v-model="form.unitAddress" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="成立年份:" prop="setUpYear">
                <Input v-model="form.setUpYear" />
                <!-- <Select placeholder v-model="form.industrySectorValue">
                  <Option
                    v-for="(item, key) in dict.industrySectorValueExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>-->
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="36">
            <Col span="12">
              <FormItem label="企业登记注册类型:" prop="companyRegisterType">
                <Select v-model="form.companyRegisterType" placeholder>
                  <Option
                    v-for="(item, key) in dict.companyRegisterTypeExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="注册资金（万元）:" prop="registerMoney">
                <Input v-model="form.registerMoney" />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="36">
            <Col span="12">
              <FormItem label="企业总资产（万元）:" prop="totalAsset">
                <Input v-model="form.totalAsset" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="固定资产净值（万元）:" prop="fixedAsset">
                <Input v-model="form.fixedAsset" />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="36">
            <Col span="12">
              <FormItem label="法人代表:" prop="legalPerson">
                <Input v-model="form.legalPerson" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话（法人）:" prop="legalTel">
                <Input v-model="form.legalTel" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="经办人:" prop="agentPerson">
                <Input v-model="form.agentPerson" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话（经办人）:" prop="agentTel">
                <Input v-model="form.agentTel" />
              </FormItem>
            </Col>
          </Row>
          <FormItem label="电子信箱:" prop="email">
            <Input v-model="form.email" />
          </FormItem>
          <FormItem label="公司概况:" prop="companyDescription">
            <Input v-model="form.companyDescription" type="textarea" :rows="5" />
          </FormItem>
          <FormItem label="团队成员情况:" prop="teamMemberDescription">
            <Input v-model="form.teamMemberDescription" type="textarea" :rows="5" />
          </FormItem>

          <Row :gutter="36">
            <Col span="12">
              <FormItem label="年产值(万元):" prop="annualProductionValue">
                <Input v-model="form.annualProductionValue" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="年税金(万元):" prop="annualTaxes">
                <Input v-model="form.annualTaxes" />
              </FormItem>
            </Col>
          </Row>

          <Row :gutter="36"></Row>
        </div>
      </div>
      <!-- 22222222222222222222222 -->
      <div class="rubbish-disposition-form">
        <p class="title">项目信息</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="24">
              <FormItem label="建设项目名称:" prop="projectName">
                <Input v-model="form.projectName" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="拟建设地址:" prop="getLandBuildingAddress">
                <Input v-model="form.getLandBuildingAddress" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="主要建设内容及规模（生产能力）:" prop="mainBuildingContent">
                <Input type="textarea" :rows="5" v-model="form.mainBuildingContent" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="亩均效绩介（A类、B类、C类、D类）:" prop="areaPerformance">
                <Input type="textarea" :rows="5" v-model="form.areaPerformance" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="主要原料:" prop="mainMaterial">
                <Input v-model="form.mainMaterial" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="消耗量或产出量:" prop="materialCost">
                <Input v-model="form.materialCost" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="主要产品:" prop="mainProduct">
                <Input v-model="form.mainProduct" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="消耗量或产出量:" prop="productOutput">
                <Input v-model="form.productOutput" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="水、电等配套情况:" prop="waterElec">
                <Input type="textarea" :rows="5" v-model="form.waterElec" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="环保、消防等措施:" prop="greenFire">
                <Input type="textarea" :rows="5" v-model="form.greenFire" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="总用地面积（m²）:" prop="allUseArea">
                <Input v-model="form.allUseArea" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="新征用地面积（m²）:" prop="newUseArea">
                <Input v-model="form.newUseArea" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="拿地建设面积（m²）:" prop="rentBuildArea">
                <Input v-model="form.rentBuildArea" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="所属行业:" prop="industrySectorValue">
                <Select v-model="form.industrySectorValue" placeholder>
                  <Option
                    v-for="(item, key) in dict.industrySectorValueExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="建设起止年限:">
                <DatePicker
                  type="daterange"
                  placement="bottom-end"
                  style="width: 100%"
                  v-model="form.startAndEndDate"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="拿地面积（m²）:" prop="gainArea">
                <Input v-model="form.gainArea" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="是否人才项目:" prop="isTalentProject">
                <RadioGroup v-model="form.isTalentProject">
                  <Radio label="1">
                    <span>是</span>
                  </Radio>
                  <Radio label="2">
                    <span>否</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
      <!-- 3333333333333333333333333333333 -->
      <div class="rubbish-disposition-form">
        <p class="title">投资情况</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="项目总投资（万元）:" prop="investAmount">
                <Input v-model="form.investAmount" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="其中项目用汇（万美元）:" prop="projectUseInvest">
                <Input v-model="form.projectUseInvest" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label=" 注册资本（万元）:" prop="registerCapital">
                <Input v-model="form.registerCapital" />
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="是否外资:" prop="isForeignCapital">
                <RadioGroup v-model="form.isForeignCapital">
                  <Radio label="1">
                    <span>是</span>
                  </Radio>
                  <Radio label="2">
                    <span>否</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="固定资产投资（万元）:" prop="fixedAssetInvest">
                <Input v-model="form.fixedAssetInvest" />
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="土建:" prop="civilWork">
                <Input v-model="form.civilWork" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="安装:" prop="install">
                <Input v-model="form.install" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设备:" prop="device">
                <Input v-model="form.device" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="工程建设其他费用:" prop="projectBuilding">
                <Input v-model="form.projectBuilding" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="预备费:" prop="budget">
                <Input v-model="form.budget" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="建设期利息:" prop="buildingInterest">
                <Input v-model="form.buildingInterest" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="铺底流动资金:" prop="bottomWorkingCapital">
                <Input v-model="form.bottomWorkingCapital" />
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="自有资金:" prop="freeCapital">
                <Input v-model="form.freeCapital" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="股票/债券" prop="sharesBond">
                <Input v-model="form.sharesBond" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="银行贷款:" prop="bankLoan">
                <Input v-model="form.bankLoan" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="其他:" prop="otherCapital">
                <Input v-model="form.otherCapital" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="新增销售收入（万元）:" prop="newSale">
                <Input v-model="form.newSale" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="新增利润（万元）:" prop="newProfit">
                <Input v-model="form.newProfit" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="新增税金（万元）:" prop="newTax">
                <Input v-model="form.newTax" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="创汇（万美元）:" prop="foreignEarning">
                <Input v-model="form.foreignEarning" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="项目申请理由简述:" prop="applyReason">
                <Input type="textarea" :rows="5" v-model="form.applyReason" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem
                class="form-item-no-float"
                label="项目工艺流程（图示式）及说明:"
                prop="projectTechnologyFlow"
              >
                <Editor v-model="form.content" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="备注:" prop="remark">
                <Input type="textarea" :rows="5" v-model="form.remark" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="附件:">
                <uploader @change="getAddFiles"></uploader>
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
    <div class="form-btn-zzz">
      <Button type="default" class="next-btn" @click="handleSubmitStaging">暂存</Button>
      <Button type="error" class="next-btn" @click="handleSubmit">提交</Button>
      <Button v-if="dev" type="warning" class="next-btn" @click="editMyForm">编辑(获取一张暂存表单)</Button>
    </div>
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import qs from "querystring";
import moment from "moment";
import { initDictOptions } from "@/api/dict"; //字典步骤1
import rules from "./rules.js";
import Editor from "@/components/Editor";
import { mixinPage } from "@/utils/mixin";
import uploader from "@/components/uploader";
export default {
  name: "RubbishDispositionStep1",
  components: { Editor, uploader },
  mixins: [mixinPage],
  data() {
    return {
      form: {},
      ruleValidate: rules,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      dict: {
        //字典步骤2
        companyRegisterTypeExt: [],
        industrySectorValueExt: [],
        custList: []
      },
      editBool: false,
      statusBool: false
    };
  },
  //
  created() {
    getAction("/park.customer/baseCustomer/listAll").then(res => {
      for (const item of res.result.records) {
        if (this.$store.state.User.custId == item.custId) {
          // this.form.fillUnit = item.customerName;
          this.$set(this.form, "fillUnit", item.customerName);
        }
      }
    });
    getAction("/park.customer/baseCustomer/listAll").then(res => {
      this.dict.custList = res.result.records;
      console.log(this.dict.custList);
    });
    initDictOptions("mgr-attr-addpl-companyRegisterType").then(res => {
      //字典步骤3    ////字典步骤4是在select中v-for遍历出字典
      if (res.code === 0 && res.success) {
        this.dict.companyRegisterTypeExt = res.result;
        console.log(this.dict.companyRegisterTypeExt);
      }
    });
    initDictOptions("industrySectorValue").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result;
        console.log(this.dict.industrySectorValueExt);
      }
    });
  },
  methods: {
    getAddFiles(fileList) {
      this.form.addDocFiles = fileList;
      console.log("父组件拿到了地址");
      console.log(this.form.addDocFiles);
    },
    handleSubmit() {
      console.log(this.form.startAndEndDate);
      this.$refs.form.validate(valid => {
        if (valid) {
          //直接获取form现有数据
          let formData = this.form;
          //处理时间格式
          formData.buildingBeginDate =
            formData.startAndEndDate[0] != formData.startAndEndDate[1]
              ? moment(formData.startAndEndDate[0]).format("YYYY-MM-DD")
              : null;
          formData.buildingEndDate =
            formData.startAndEndDate[0] != formData.startAndEndDate[1]
              ? moment(formData.startAndEndDate[1]).format("YYYY-MM-DD")
              : null;
          //便于提交表单的临时设置
          if (this.statusBool) {
            formData.status = 0;
          } else {
            formData.status = 1;
          }
          this.statusBool = false;
          formData.parkId = this.parkId;
          formData.custId = this.custId;
          // if (!this.editBool) {
          //   formData.projectName = "前台数据" + formData.projectName;
          // }
          formData = qs.stringify(formData);
          if (!this.editBool) {
            postAction(
              "/park.project/mgrProjectInfo/addProject",
              formData
            ).then(res => {
              if (res.code === 200 && res.success) {
                this.$Message.success("表单提交成功！");
                this.next();
              } else {
                this.$Message.error("表单提交失败！");
              }
            });
          } else {
            putAction(
              "/park.project/mgrProjectInfo/editProject",
              formData
            ).then(res => {
              if (res.code === 200 && res.success) {
                this.$Message.success("表单提交成功！");
                this.next();
              } else {
                this.$Message.error("表单提交失败！");
              }
            });
          }
        } else {
          this.$Message.error("请填写所有必填项！");
        }
      });
    },
    //暂存，区别是
    handleSubmitStaging() {
      //状态为0时，为暂存
      this.statusBool = true;
      this.handleSubmit();
    },
    //根据拿到的projectId来请求内容并填入表单
    editMyForm(record) {
      this.editBool = true;
      let projectId = this.projectIdTESTLANG;
      getAction("/park.project/mgrProjectInfo/queryProjectById", {
        projectId: projectId
      }).then(res => {
        let record = res.result;
        //后端部分数据不能直接获取，在此做处理
        if (record.mgrProjectCust) {
          record.totalAsset = record.mgrProjectCust.totalAsset;
          record.legalTel = record.mgrProjectCust.legalTel;
          record.companyDescription = record.mgrProjectCust.companyDescription;
          record.updateUserName = record.mgrProjectCust.updateUserName;
          record.createUserName = record.mgrProjectCust.createUserName;
          record.updateTime = record.mgrProjectCust.updateTime;
          record.fillUnit = record.mgrProjectCust.fillUnit;
          record.version = record.mgrProjectCust.version;
          record.unitAddress = record.mgrProjectCust.unitAddress;
          record.companyRegisterType =
            record.mgrProjectCust.companyRegisterType;
          record.createBy = record.mgrProjectCust.createBy;
          record.creditCode = record.mgrProjectCust.creditCode;
          record.createTime = record.mgrProjectCust.createTime;
          record.updateBy = record.mgrProjectCust.updateBy;
          record.legalPerson = record.mgrProjectCust.legalPerson;
          record.fixedAsset = record.mgrProjectCust.fixedAsset;
          record.registerMoney = record.mgrProjectCust.registerMoney;
          record.teamMemberDescription =
            record.mgrProjectCust.teamMemberDescription;
          record.setUpYear = record.mgrProjectCust.setUpYear;
          record.email = record.mgrProjectCust.email;
        }
        if (record.mgrProjectInvest) {
          record.isForeignCapital = record.mgrProjectInvest.isForeignCapital;
          record.fixedAssetInvest = record.mgrProjectInvest.fixedAssetInvest;
          record.newProfit = record.mgrProjectInvest.newProfit;
          record.remark = record.mgrProjectInvest.remark;
          record.createUserName = record.mgrProjectInvest.createUserName;
          record.projectUseInvest = record.mgrProjectInvest.projectUseInvest;
          record.newTax = record.mgrProjectInvest.newTax;
          record.freeCapital = record.mgrProjectInvest.freeCapital;
          record.addDocFiles = record.mgrProjectInvest.addDocFiles;
          record.updateBy = record.mgrProjectInvest.updateBy;
          record.civilWork = record.mgrProjectInvest.civilWork;
          record.otherCapital = record.mgrProjectInvest.otherCapital;
          record.budget = record.mgrProjectInvest.budget;
          record.bankLoan = record.mgrProjectInvest.bankLoan;
          record.sharesBond = record.mgrProjectInvest.sharesBond;
          record.updateUserName = record.mgrProjectInvest.updateUserName;
          record.updateTime = record.mgrProjectInvest.updateTime;
          record.foreignEarning = record.mgrProjectInvest.foreignEarning;
          record.version = record.mgrProjectInvest.version;
          record.createBy = record.mgrProjectInvest.createBy;
          record.registerCapital = record.mgrProjectInvest.registerCapital;
          record.install = record.mgrProjectInvest.install;
          record.projectBuilding = record.mgrProjectInvest.projectBuilding;
          record.createTime = record.mgrProjectInvest.createTime;
          record.investAmount = record.mgrProjectInvest.investAmount;
          record.bottomWorkingCapital =
            record.mgrProjectInvest.bottomWorkingCapital;
          record.newSale = record.mgrProjectInvest.bottomWorkingCapital;
          record.device = record.mgrProjectInvest.device;
          record.buildingInterest = record.mgrProjectInvest.buildingInterest;
        }
        delete record.mgrProjectCust;
        delete record.mgrProjectInvest;
        delete record.mgrProjectInvestLease;
        record.startAndEndDate = [
          record.buildingBeginDate,
          record.buildingEndDate
        ];
        this.form = record;
        console.log(this.form);
      });
    },

    next() {
      this.$router.push({ name: "NewLandProjectStep2" });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-col-span-12 {
  height: 90px;
}
</style>
<style lang="less">
.form-btn-zzz {
  text-align: center;
  button + button {
    margin-left: 20px;
  }
}
.ivu-form-item {
  .ivu-radio-group {
    width: 100%;
    // margin-bottom: -2px;
    color: #515a6e;
  }
}
.rubbish-disposition-step1 {
  margin: 100px auto;
  width: 95%;
  .title {
    text-align: left;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }

  .schedule {
    width: 60%;
    margin: 30px auto 0;

    .ivu-steps-item {
      text-align: left;

      .ivu-steps-head-inner {
        border-color: #999999;

        .ivu-steps-icon {
          color: #999999;
        }
      }
    }
  }

  .rubbish-disposition-form {
    text-align: left;
    width: 80%;
    margin: 30px auto 0;

    .title {
      color: #797979;
      font-weight: 500;
    }

    .rubbish-disposition-form-body {
      width: 60%;
      margin: 30px auto 0;

      .form-box {
        margin-top: 30px;
        p {
          color: #515a6e;
        }
        .form-radio {
          margin-top: 20px;

          .zj-radio {
            color: #999999;
          }
        }

        .must {
          color: red;
        }
      }

      .next-btn {
        margin-top: 30px;
        padding: 0 30px;
        height: 38px;
        line-height: 38px;
      }
    }
  }
}
</style>
