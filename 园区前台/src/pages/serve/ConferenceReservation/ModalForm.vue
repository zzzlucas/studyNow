<template>
  <div>
    <!--  -->
    <Modal
      v-model="modal1"
      title="预定会议室"
      ok-text="预定"
      width="600"
      @on-ok="ok"
      @on-cancel="cancel"
      :inline="true"
    >
      <Form ref="form" :model="form" :rules="ruleValidate">
        <Row :gutter="36">
          <Col span="24">
            <FormItem label="名称:" prop="roomName">
              <Input disabled v-model="form.roomName" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="预约时间:" prop="creditCode">
              <DatePicker
                placement="bottom-end"
                type="datetimerange"
                v-model="form.startAndEndDate"
                format="yyyy-MM-dd HH:mm"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="申请人:" prop="requestPerson">
              <Input v-model="form.requestPerson" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="联系电话:" prop="telephone">
              <Input v-model="form.telephone" />
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
import { phone } from "../../../../config/regex";

export default {
  props: {
    roomNameTemp: { type: String, default: "default-roomName" },
    roomNameTempX: String
  },
  data() {
    return {
      ruleValidate: {
        telephone: [
          {
            pattern: phone,
            message: "请填写正确手机号",
            trigger: "blur"
          }
        ]
      },
      modal1: false,
      roomId: "",
      form: {
        roomName: ""
      }
    };
  },
  created() {},
  methods: {
    //出现了子组件拿不到父组件传值的情况
    //原因是：add逻辑路线的组件是实例化之后的另一个子组件
    add(record) {
      console.log("hello,I am the biggst one.");
      this.check(record);
    },
    check(record) {
      console.log(this.roomNameTemp);
      console.log(this.roomNameTempX);
      console.log(record);
      if (this.$store.getters.isLogin) {
      } else {
        this.$Message.error("当前处于未登录状态，请先登录账号！");
        return;
      }
      let begDate = "";
      let endDate = "";
      if (record.begDate) {
        //如果传入参数存在begDate，意味着是从详情日历视图打开
        begDate = record.begDate;
        endDate = record.endDate;
        this.form.roomName = this.roomNameTempX;
      } else {
        begDate = moment()
          .format("YYYY-MM-DD")
          .concat(" 08:00:00");
        endDate = moment()
          .format("YYYY-MM-DD")
          .concat(" 16:00:00");
        this.form.roomName = record.roomName;
      }
      this.form.startAndEndDate = [begDate, endDate];
      this.roomId = record.roomId;
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
          formData.roomId = this.roomId;
          formData.parkId = "1193719771573518336";
          formData = qs.stringify(formData);
          postAction("/park.service/mgrMeetingroomRequest/add", formData).then(
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