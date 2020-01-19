<template>
  <div>
    <!--  -->
    <Modal
      v-model="modal1"
      title="活动报名"
      ok-text="确认"
      width="600"
      @on-ok="ok"
      @on-cancel="cancel"
      :inline="true"
    >
      <Form ref="form" :model="form" :rules="ruleValidate">
        <Row :gutter="36">
          <Col span="24">
            <FormItem label="活动名称:" prop="title">
              <Input disabled v-model="form.title" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="活动时间:" prop="startAndEndDate">
              <DatePicker
                disabled
                placement="bottom-end"
                type="datetimerange"
                v-model="form.startAndEndDate"
                format="yyyy-MM-dd HH:mm"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="报名人:" prop="personName">
              <Input v-model="form.personName" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="参加人数:" prop="num">
              <Input v-model="form.num" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="联系电话:" prop="telephone">
              <Input v-model="form.telephone" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="邮箱:" prop="email">
              <Input v-model="form.email" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="备注:" prop="remark">
              <Input type="textarea" :rows="5" v-model="form.remark" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getAction, putAction, postAction } from "@/api/manage";
import moment from "moment";
import qs from "querystring";
import { mixinPage } from "@/utils/mixin";
import { phone, email } from "../../../config/regex";

export default {
  mixins: [mixinPage],
  data() {
    return {
      ruleValidate: {
        telephone: [
          {
            pattern: phone,
            message: "请填写正确手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: email,
            message: "请填写正确邮箱",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      activityId: "",
      form: {}
    };
  },
  created() {},
  methods: {
    check(record) {
      //判断是否登录
      if (this.$store.getters.isLogin) {
        console.log("已登陆");
      } else {
        console.log("未登录");
        //请登陆后提交
        this.$Message.error("当前处于未登录状态，请先登录账号！");
        return;
      }
      this.form.title = record.title;
      this.form.startAndEndDate = [record.begDate, record.endDate];
      this.activityId = record.activityId;
      this.modal1 = true;
    },
    ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = this.form;
          formData.begDate =
            formData.startAndEndDate[0] != formData.startAndEndDate[1]
              ? moment(formData.startAndEndDate[0])
                  .format("YYYY-MM-DD HH:mm")
                  .concat(":00")
              : null;
          formData.endDate =
            formData.startAndEndDate[0] != formData.startAndEndDate[1]
              ? moment(formData.startAndEndDate[1])
                  .format("YYYY-MM-DD HH:mm")
                  .concat(":00")
              : null;
          formData.activityId = this.activityId;
          //增加审核状态和报名时间
          formData.signupDate = moment().format("YYYY-MM-DD");
          formData.auditStatus = 0;
          formData.parkId = this.parkId;
          formData.custId = this.custId;
          // formData.custId = this.$store.getters.custId;
          formData = qs.stringify(formData);
          postAction("/park.service/mgrActivitySignup/add", formData).then(
            res => {
              if (res.code === 200 && res.success) {
                this.modal1 = false;
                this.$Message.success("表单提交成功！");
              } else {
                this.$Message.error("表单提交失败！");
              }
            }
          );
        }
      });
    },
    cancel() {
      this.modal1 = false;
      this.$refs.form.resetFields();
      this.form = {};
    }
  }
};
</script>

<style lang='less' scoped>
.ivu-form-item {
  /deep/ .ivu-form-item-error-tip {
    margin-left: 110px;
    margin-top: 32px;
  }
}
.ivu-form {
  padding: 10px 20px;
  .ivu-form-item {
    label {
      width: 80px !important;
    }
    .ivu-form-item-label {
      width: 80px !important;
    }
  }
  .ivu-input-wrapper {
    width: 80%;
    float: right;
  }
  .ivu-date-picker {
    width: 80%;
    float: right;
  }
}
</style>