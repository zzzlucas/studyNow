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
            <FormItem label="姓名:" prop="memberName">
              <Input v-model="form.memberName" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="股权占比(百分比):" prop="equrityRatio">
              <Input v-model="form.equrityRatio" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="已授权发明专利数:" prop="inventPatentMount">
              <Input v-model="form.inventPatentMount" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="是否为高新技术企业:" prop="isTechnologyCust">
              <RadioGroup v-model="form.isTechnologyCust">
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
              <!-- <Input v-model="form.addDocFiles" /> -->
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
  mixins: [mixinPage],
  components: { uploader },
  data() {
    return {
      modal1: false,
      activityId: "",
      form: {
        memberName: "",
        equrityRatio: "",
        inventPatentMount: "",
        isTechnologyCust: "",
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
      this.$refs.form.validate(valid => {
        if (valid) {
          let formData = this.form;
          //用的是一个已有的id
          formData.projectId = this.projectIdTESTLANG;
          formData.custId = this.custId;
          formData.memberType = "1";
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