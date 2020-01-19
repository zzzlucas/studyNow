<template>
  <Form class="rubbish-disposition-step1">
    <h1 class="title">二次填写新建项目申请</h1>
    <div class="schedule">
      <Steps :current="0" status="error">
        <Step title="二次填写新建项目申请(租赁)"></Step>
        <Step title="二次填写新建项目申请(租赁)成功"></Step>
      </Steps>
    </div>
    <Form ref="form" :model="form" :rules="ruleValidate">
      <!-- :rules="ruleValidate" :label-width="80" -->
      <div class="rubbish-disposition-form">
        <p class="title">公司注册信息</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="拟注册公司名称:" prop="custName">
                <Input v-model="form.custName" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="拟注册资本:" prop="registerAssets">
                <Input v-model="form.registerAssets" />
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
              <FormItem label="联系方式:" prop="telephone">
                <Input v-model="form.telephone" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="36">
            <Col span="24">
              <FormItem label="经办人:" prop="agentPerson">
                <Input v-model="form.agentPerson" />
              </FormItem>
            </Col>
            <!-- <Col span="12">
              <FormItem label="联系电话（经办人）:" prop="agentTel">
                <Input v-model="form.agentTel" />
              </FormItem>
            </Col>-->
          </Row>
          <!-- <FormItem label="电子信箱:" prop="email">
            <Input v-model="form.email" />
          </FormItem>-->
          <FormItem label="拟注册地址:" prop="registerAddress">
            <Input v-model="form.registerAddress" type="textarea" :rows="5" />
          </FormItem>
          <FormItem label="经营范围:" prop="businessScope">
            <Input v-model="form.businessScope" type="textarea" :rows="5" />
          </FormItem>
        </div>
      </div>
      <!-- 22222222222222222222222 -->
      <div class="rubbish-disposition-form">
        <p class="title">法人股东</p>
        <div class="rubbish-disposition-form-body">
          <Button @click="addModalOne()">添加法人股东</Button>
          <Table :columns="tableA" :data="dataA">
            <template slot-scope="{ row, index }" slot="action">
              <span>
                <!-- <a @click="ShowOne(record)">编辑</a>
                <a-divider type="vertical" />-->
                <a @click="handelDelete(row)">删除</a>
              </span>
            </template>
          </Table>
        </div>
      </div>
      <div class="rubbish-disposition-form">
        <p class="title">个人股东</p>
        <div class="rubbish-disposition-form-body">
          <Button @click="addModalTwo()">添加个人股东</Button>
          <Table :columns="tableB" :data="dataB">
            <template slot-scope="{ row, index }" slot="action">
              <span>
                <a @click="handelDelete(row)">删除</a>
              </span>
            </template>
          </Table>
        </div>
      </div>
      <div class="rubbish-disposition-form">
        <p class="title">团队成员信息</p>
        <div class="rubbish-disposition-form-body">
          <Button @click="addModalThree()">添加团队成员信息</Button>
          <Table :columns="tableC" :data="dataC">
            <template slot-scope="{ row, index }" slot="action">
              <span>
                <a @click="handelDelete(row)">删除</a>
              </span>
            </template>
          </Table>
        </div>
      </div>
      <div class="rubbish-disposition-form">
        <p class="title">生产工艺情况</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="24">
              <FormItem label="单位产品原材料消耗（吨/吨产品）:" prop="unitProductMaterialCost">
                <Input v-model="form.unitProductMaterialCost" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="生产工艺流程:" prop="produceFlow">
                <Input v-model="form.produceFlow" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="安全生产:" prop="produceSafe">
                <Select v-model="form.produceSafe" placeholder>
                  <Option
                    v-for="(item, key) in dict.produceSafeExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="技术来源:" prop="technologySource">
                <Select v-model="form.technologySource" placeholder>
                  <Option
                    v-for="(item, key) in dict.technologySourceExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="引进:" prop="introduce">
                <Select v-model="form.introduce" placeholder>
                  <Option value="1">国内</Option>
                  <Option value="2">国外</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="专利号:" prop="patentNo">
                <Input v-model="form.patentNo" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="颁证年月:" prop="issueDate">
                <DatePicker v-model="form.issueDate" type="date" style="width: 100%"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="品牌名称:" prop="productName">
                <Input v-model="form.productName" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="颁证单位:" prop="issueAuthority">
                <Input v-model="form.issueAuthority" />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
      <div class="rubbish-disposition-form">
        <p class="title">环保安全卫生</p>
        <div class="rubbish-disposition-form-body radio-bgu">
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="污染所属类型:" prop="pollutionType">
                <Select v-model="form.pollutionType" placeholder>
                  <Option
                    v-for="(item, key) in dict.pollutionTypeExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="废物排放种类:" prop="wasteDischargeType">
                <Select v-model="form.wasteDischargeType" placeholder>
                  <Option
                    v-for="(item, key) in dict.wasteDischargeTypeExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="污水管网是否接通:" prop="isSewerLine">
                <RadioGroup v-model="form.isSewerLine">
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
              <FormItem label="污水管网计划接通时间:" prop="planSewerLineTime">
                <DatePicker v-model="form.planSewerLineTime" type="date" style="width: 100%"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="使用锅炉情况:" prop="boilerUse">
                <Select v-model="form.boilerUse" placeholder>
                  <Option
                    v-for="(item, key) in dict.boilerUseExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="项目与敏感点方位距离（米）:" prop="projectToPointDistance">
                <Input v-model="form.projectToPointDistance" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="在一年内，环保、安全生产（消防）方面是否发生过重大事件:" prop="isHappenAccent">
                <RadioGroup v-model="form.isHappenAccent">
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
      <div class="rubbish-disposition-form">
        <p class="title">资源年消耗量</p>
        <div class="rubbish-disposition-form-body">
          <Row :gutter="36">
            <Col span="12">
              <FormItem label="水（吨）:" prop="waterConsume">
                <Input v-model="form.waterConsume" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="原煤（吨）:" prop="coalConsume">
                <Input v-model="form.coalConsume" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="电（万千瓦时）:" prop="powerConsume">
                <Input v-model="form.powerConsume" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="蒸汽（吨）:" prop="steamConsume">
                <Input v-model="form.steamConsume" />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
    <div class="form-btn-zzz">
      <Button type="error" class="next-btn" @click="handleSubmit">提交</Button>
      <!-- <Button type="warning" class="next-btn" @click="editMyForm">编辑(获取一张暂存表单)</Button> -->
    </div>
    <modal-one ref="modalOne" @reload="getListA"></modal-one>
    <modal-two ref="modalTwo" @reload="getListB"></modal-two>
    <modal-three ref="modalThree" @reload="getListC"></modal-three>
  </Form>
</template>

<script>
import { getAction, putAction, postAction, deleteAction } from "@/api/manage";
import qs from "querystring";
import moment from "moment";
import { initDictOptions } from "@/api/dict";
import rules from "./rules.js";
import Editor from "@/components/Editor";
import modalOne from "@page/serve/NextModalForm/modalOne";
import modalTwo from "@page/serve/NextModalForm/modalTwo";
import modalThree from "@page/serve/NextModalForm/modalThree";
import { mixinPage } from "@/utils/mixin";

export default {
  name: "RubbishDispositionStep1",
  mixins: [mixinPage],
  components: { Editor, modalOne, modalTwo, modalThree },
  data() {
    return {
      form: {},
      ruleValidate: rules,
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      editBool: false,
      tableA: [
        {
          title: "序号",
          dataIndex: "",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [h("strong", params.index + 1)]);
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "memberName"
        },
        {
          title: "股权占比",
          align: "center",
          key: "equrityRatio"
        },
        {
          title: "已授权发明专利数",
          align: "center",
          key: "inventPatentMount"
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          slot: "action"
        }
      ],
      tableB: [
        {
          title: "序号",
          dataIndex: "",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [h("strong", params.index + 1)]);
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "memberName"
        },
        {
          title: "股权占比",
          align: "center",
          key: "equrityRatio"
        },
        {
          title: "学历",
          align: "center",
          key: "educationBackground"
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          slot: "action"
        }
      ],
      tableC: [
        {
          title: "序号",
          dataIndex: "",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [h("strong", params.index + 1)]);
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "memberName"
        },
        {
          title: "职务",
          align: "center",
          key: "position"
        },
        {
          title: "出生年月",
          align: "center",
          key: "birthday"
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          slot: "action"
        }
      ],
      dataA: [],
      dataB: [],
      dataC: [],
      dict: {
        produceSafeExt: [],
        technologySourceExt: [],
        pollutionTypeExt: [],
        wasteDischargeTypeExt: [],
        boilerUseExt: []
      }
    };
  },
  //
  created() {
    this.getListA();
    this.getListB();
    this.getListC();
    initDictOptions("technology_source").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.technologySourceExt = res.result;
      }
    });
    initDictOptions("pollution_type").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.pollutionTypeExt = res.result;
      }
    });
    initDictOptions("waste_discharge_type").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.wasteDischargeTypeExt = res.result;
      }
    });
    initDictOptions("boiler_use").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.boilerUseExt = res.result;
      }
    });
    initDictOptions("produce_safe").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.produceSafeExt = res.result;
      }
    });
  },
  methods: {
    handelDelete(row) {
      let param = { id: row.teamId };
      deleteAction("/project/mgrCustTeamMember/delete", param).then(res => {
        this.$Message.success(res.message);
      });
      this.getListA();
      this.getListB();
      this.getListC();
    },
    //获取  重载
    getListA() {
      getAction("/project/mgrCustTeamMember/queryById", {
        projectId: "1204345933098123264",
        // projectId: this.$route.params.id,
        memberType: "1"
      }).then(res => {
        if (res.success) {
          this.dataA = res.result;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getListB() {
      getAction("/project/mgrCustTeamMember/queryById", {
        projectId: "1204345933098123264",
        memberType: "2"
      }).then(res => {
        if (res.success) {
          this.dataB = res.result;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getListC() {
      getAction("/project/mgrCustTeamMember/queryById", {
        projectId: "1204345933098123264",
        memberType: "3"
      }).then(res => {
        if (res.success) {
          this.dataC = res.result;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    addModalOne() {
      //从个人中心拿到projectId
      //传projectId进去
      this.$refs.modalOne.check();
    },
    addModalTwo() {
      //从个人中心拿到projectId
      //传projectId进去
      this.$refs.modalTwo.check();
    },
    addModalThree() {
      //从个人中心拿到projectId
      //传projectId进去
      this.$refs.modalThree.check();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //直接获取form现有数据
          let formData = this.form;
          //便于提交表单的临时设置
          formData.parkId = this.parkId;
          formData.projectId = this.projectIdTESRENTAL;
          formData.planSewerLineTime = formData.planSewerLineTime
            ? moment(formData.planSewerLineTime).format("YYYY-MM-DD")
            : null;
          formData.issueDate = formData.issueDate
            ? moment(formData.issueDate).format("YYYY-MM-DD")
            : null;
          // if (!this.editBool) {
          //   formData.projectName = "前台数据" + formData.projectName;
          // }
          formData = qs.stringify(formData);
          // if (!this.editBool) {
          putAction("/park.project/mgrProjectInfo/secondApply", formData).then(
            res => {
              if (res.code === 200 && res.success) {
                this.$Message.success("表单提交成功！");
                this.next();
              } else {
                this.$Message.error("表单提交失败！");
              }
            }
          );
          // } else {
          //   putAction(
          //     "/park.project/mgrProjectInfo/editProject",
          //     formData
          //   ).then(res => {
          //     if (res.code === 200 && res.success) {
          //       this.$Message.success("表单提交成功！");
          //       this.next();
          //     } else {
          //       this.$Message.error("表单提交失败！");
          //     }
          //   });
          // }
        } else {
          this.$Message.error("请填写所有必填项！");
        }
      });
    },
    //暂存，区别是
    handleSubmitStaging() {
      //具备该字段的情况下，表单内容会被认为暂不生效
      this.form.stage = 1;
      this.handleSubmit(form);
    },
    //根据拿到的projectId来请求内容并填入表单
    editMyForm(record) {
      this.editBool = true;
      //当前没有数据record传入 ， 写死一个projectId  ,暂存后的编辑只获取此记录
      let projectId = "1203149197071613952";
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
      this.$router.push({ name: "RubbishDispositionStep2" });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  }
};
</script>

<style lang="less">
.form-btn-zzz {
  text-align: center;
}
.radio-bgu .ivu-form-item {
  .ivu-radio-group {
    width: 100%;
    margin-bottom: -2px;
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
