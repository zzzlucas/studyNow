<template>
  <div>
    <Row>
      <Col span="12">
        <div style="margin: 15px;">
          <span style="font-size: 20px;">申请租赁项目</span>
          <Button style="background: red;Color: #fff;float: right;" @click="addnew">继续录入</Button>
        </div>
      </Col>
      <div style="margin-top: 20px;">
        <Col span="12" style="margin-top: 20px;">
          <span style="font-size: 15px;">基本信息</span>
        </Col>
        <Col span="12">
          <span>编号：{{basicList.contactName}}</span>
        </Col>
        <Col span="12">
          <span>企业名称：{{basicList.title}}</span>
        </Col>
        <Col span="12">
          <span>经办人：{{basicList.principalUser}}</span>
        </Col>
        <Col span="12">
          <span>联系方式：{{basicList.mobile}}</span>
        </Col>
        <Col span="12">
          <span>申请挖掘或占用期限</span>
        </Col>
        <Col span="12">
          <span>项目名称:{{basicList.title}}</span>
        </Col>
        <Col span="12">
          <span>附件</span>
        </Col>
      </div>
      <div style="margin-top: 20px;">
        <Col span="12" style="margin-top: 20px;">
          <span style="font-size: 15px;">工单进度</span>
        </Col>
        <ul v-for="item in list" style="margin: 10px;">
          <li>{{list.createTime}}</li>
          <li>{{list.remark}}</li>
        </ul>
      </div>
    </Row>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";

export default {
  data() {
    return {
      id: "",
      list: {},
      basicList: {}
    };
  },
  created() {
    console.log(this.$route.query.orderId);
    this.id = this.$route.query.orderId;
    this.getMessage();
    this.getBasic();
  },
  methods: {
    getMessage() {
      let id = this.id;
      console.log(id);
      getAction(`park.workorder/mgrOrderOperate/list2?orderId=${id}`).then(
        res => {
          if (res.success && res.code == 200) {
            let data = res.result;
            data.forEach(item => {
              console.log(item);
              this.list = item;
              console.log(this.list);
            });
          }
        }
      );
    },
    getBasic() {
      let id = this.id;
      console.log(id);
      getAction(`workorder/mgrWorkorderInfo/showDetail?orderId=${id}`).then(
        res => {
          if (res.success && res.code == 200) {
            console.log(res.result);
            this.basicList = res.result;
          }
        }
      );
    },
    addnew() {
      console.log(this.id);
      this.$router.push({
        name: "asd",
        query: {
          orderId: this.id
        }
      });
    }
  }
};
</script>

<style>
</style>