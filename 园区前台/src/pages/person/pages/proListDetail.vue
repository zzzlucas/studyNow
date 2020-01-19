<template>
  <div :model="asd">
    <span>{{this.projectName}}</span>
    <Button @click="goForm">继续录入</Button>
    <div class="basictitle" :data="databasic">
      <h1>基本信息</h1>
      <Row :gutter="16">
        <Col span="8">
          <div>项目单位：{{databasic.agentPerson}}</div>
        </Col>
        <Col span="8">
          <div>组织机构代码：{{databasic.projectName}}</div>
        </Col>
        <Col span="8">
          <div>单位地址：</div>
        </Col>
        <Col span="8">
          <div>成立年份：</div>
        </Col>
        <Col span="8">
          <div>企业登记注册类型：</div>
        </Col>
        <Col span="8">
          <div>注册资金（万元）：</div>
        </Col>
        <Col span="8">
          <div>企业总资产（万元）：</div>
        </Col>
        <Col span="8">
          <div>固定资产净值（万元）：</div>
        </Col>
        <Col span="8">
          <div>法定代表人：</div>
        </Col>
        <Col span="8">
          <div>法定代表人：</div>
        </Col>
        <Col span="8">
          <div>经办人：</div>
        </Col>
        <Col span="8">
          <div>联系电话（法人）：</div>
        </Col>
        <Col span="8">
          <div>电子信箱：</div>
        </Col>
        <Col span="8">
          <div>联系电话（经办人）：</div>
        </Col>
        <Col span="16">
          <div>公司概况：</div>
        </Col>
        <Col span="16">
          <div>团队成员情况：</div>
        </Col>
        <Col span="16">
          <div>年产值（万元）：</div>
        </Col>
        <Col span="16">
          <div>年税金（万元）：</div>
        </Col>
      </Row>
    </div>
    <!--项目信息-->
    <div class="message" :data="dataMessage" style="margin-left: 20%;">
      <h1>项目信息</h1>
      <Row :gutter="16">
        <Col span="16">
          <div>建设项目名称：</div>
        </Col>
        <Col span="16">
          <div>拟建设地址：</div>
        </Col>
        <Col span="16">
          <div>主要建设内容以及规模：</div>
        </Col>
        <Col span="16">
          <div>亩均绩效介（A类.B类.C类.D类）：</div>
        </Col>
        <Col span="8">
          <div>主要原料：</div>
        </Col>
        <Col span="8">
          <div>消耗量或产出两量：</div>
        </Col>
        <Col span="8">
          <div>主要产品：</div>
        </Col>
        <Col span="8">
          <div>水.电等配套情况：</div>
        </Col>
        <Col span="8">
          <div>建设起止年限：</div>
        </Col>
        <Col span="16">
          <div>环保.消防等措施：</div>
        </Col>
        <Col span="8">
          <div>经总用地面积：</div>
        </Col>
        <Col span="8">
          <div>新征用地面积：</div>
        </Col>
        <Col span="16">
          <div>租赁建设面积（平方米）：</div>
        </Col>
        <Col span="8">
          <div>所属行业：</div>
        </Col>
        <Col span="8">
          <div>建设起止年限：</div>
        </Col>
        <Col span="8">
          <div>是否人才项目：</div>
        </Col>
        <Col span="8">
          <div>拿地面积：</div>
        </Col>
      </Row>
    </div>
    <!--项目投资-->
    <div class="money" :data="dataMoney" style="margin-left: 20%;">
      <h1>项目投资</h1>
      <Row :gutter="16">
        <Col span="8">
          <div>项目总投资（万元）：</div>
        </Col>
        <Col span="8">
          <div>其中项目用汇（万美元）：</div>
        </Col>
        <Col span="8">
          <div>注册资本（万元）：</div>
        </Col>
        <Col span="8">
          <div>是否外资：</div>
        </Col>
        <Col span="16">
          <div>固定资产投资：</div>
        </Col>
        <Col span="8">
          <div>土建：</div>
        </Col>
        <Col span="8">
          <div>安装：</div>
        </Col>
        <Col span="8">
          <div>设备：</div>
        </Col>
        <Col span="8">
          <div>工程建设其他费用：</div>
        </Col>
        <Col span="16">
          <div>预备费：</div>
        </Col>
        <Col span="8">
          <div>建设期利息：</div>
        </Col>
        <Col span="16">
          <div>铺底流动资金：</div>
        </Col>
        <Col span="8">
          <div>自有资金：</div>
        </Col>
        <Col span="8">
          <div>股票/债券：</div>
        </Col>
        <Col span="8">
          <div>银行贷款：</div>
        </Col>
        <Col span="8">
          <div>其他：</div>
        </Col>
        <Col span="8">
          <div>新增利润（万元）：</div>
        </Col>
        <Col span="8">
          <div>新增销售收入（万元）：</div>
        </Col>
        <Col span="8">
          <div>新增税金（万元）：</div>
        </Col>
        <Col span="8">
          <div>创汇（万美元）：</div>
        </Col>
        <Col span="16">
          <div>项目申请理由简述：</div>
        </Col>
        <Col span="16">
          <div>项目工艺流程（图示式）及说明：</div>
        </Col>
        <Col span="16">
          <div>备注：</div>
        </Col>
        <Col span="16">
          <div>附件：</div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
export default {
  data() {
    return {
      asd: {},
      databasic: {},
      dataMessage: {},
      dataMoney: {},
      id: {}
    };
  },
  created() {
    console.log(this.$route.query.projectId);
    let id = this.$route.query.projectId;
    console.log(id);
    this.id = id;
    console.log(this.$route.query.projectName);
    this.projectName = this.$route.query.projectName;
    this.getBasic();
  },
  methods: {
    goForm() {
      console.log('goForm');
      console.log(this.databasic.projectId);
      console.log(this.databasic.projectType);
      if (this.databasic.projectType == "1") {
        this.$router.push({
          name: "NextLandProjectStep1",
          params: { id: this.databasic.projectId }
        });
      } else if (this.databasic.projectType == "2") {
        this.$router.push({
          name: "NextRentalProjectStep1",
          params: { id: this.databasic.projectId }
        });
      }
    },
    getBasic() {
      console.log("asd");
      console.log(this.id);
      let id = this.id;
      getAction(
        `park.project/mgrProjectInfo/queryProjectById?projectId=${id}`
      ).then(res => {
        if (res.success && res.code === 200) {
          console.log(res.result);
          console.log(res.result.mgrProjectCust);
          console.log(res.result.mgrProjectInvest);
          this.databasic = res.result;
          this.dataMessage = res.result.mgrProjectCust;
          this.dataMoney = res.result.mgrProjectInvest;
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>

<style>
.basictitle {
}
</style>