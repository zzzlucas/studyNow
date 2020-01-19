<template>
  <div>
    <!--  -->
    <Modal
      v-model="modal1"
      title="添加法人股东"
      ok-text="提交"
      width="600"
      @on-ok="ok"
      @on-cancel="cancel"
      :inline="true"
    >
      <Form ref="form" :model="form">
        <Row :gutter="36">
          <Col span="24">
            <FormItem label="职务:" prop="position">
              <Input v-model="form.position" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="姓名:" prop="memberName">
              <Input v-model="form.memberName" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="出生年月:" prop="birthday">
              <DatePicker style="width: 100%" v-model="form.birthday"></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="学历:" prop="educationBackground">
              <Input v-model="form.educationBackground" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="是否海归:" prop="isReturnee">
              <RadioGroup v-model="form.isReturnee">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="2">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="附件:" prop="addDocFiles">
              <uploader @change="getAddFiles"></uploader>
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
import uploader from "@/components/uploader";

export default {
  components: { uploader },
  mixins: [mixinPage],
  data() {
    return {
      modal1: false,
      activityId: "",
      form: {
        position: "",
        memberName: "",
        birthday: "",
        educationBackground: "",
        isReturnee: "",
        addDocFiles: ""
      }
    };
  },
  created() {},
  methods: {
    getAddFiles(fileList) {
      this.form.addDocFiles = fileList;
    },
    //详情页里
    check() {
      //   this.form.title = record.title;
      //   this.form.startAndEndDate = [record.begDate, record.endDate];
      //   this.activityId = record.activityId;
      this.modal1 = true;
    },
    ok() {
      console.log(this.form.birthday);
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = this.form;
          //为啥不报错。。。
          if (this.form.birthday) {
            formData.birthday = moment(this.form.birthday).format("YYYY-MM-DD");
          }
          //用的是一个已有的id
          formData.projectId = this.projectIdTESTLANG;
          formData.custId = this.custId;
          formData.memberType = "3";
          formData.parkId = this.parkId;
          formData = qs.stringify(formData);
          postAction("/project/mgrCustTeamMember/add", formData).then(res => {
            if (res.code === 200 && res.success) {
              this.cancel();
              this.$Message.success("表单提交成功！");
              this.$emit("reload");
            } else {
              this.$Message.error("表单提交失败！");
            }
          });
        }
      });
    },
    cancel() {
      this.$refs.form.resetFields();
      this.modal1 = false;
    }
  }
};
</script>

<style lang='less' scoped>
// .ivu-form {
//   padding: 10px 20px;
//   .ivu-form-item {
//     label {
//       width: 100px !important;
//     }
//     .ivu-form-item-label {
//       width: 100px !important;
//     }
//   }
//   .ivu-input-wrapper {
//     width: 70%;
//     float: right;
//   }
//   .ivu-date-picker {
//     width: 70%;
//     float: right;
//   }
// }
</style>