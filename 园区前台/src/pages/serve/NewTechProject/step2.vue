<template>
  <div class="rubbish-disposition-step2">
    <h1 class="title">新建技改项目申请</h1>
    <div class="schedule">
      <Steps :current="1" status="error">
        <Step title="新建技改项目申请"></Step>
        <Step title="新建技改项目申请成功"></Step>
      </Steps>
    </div>
    <div class="rubbish-disposition-form">
      <i class="iconfont iconchenggong message-icon"></i>
      <div class="btn-box">
        <Button class="home-btn" @click="goHome">返回首页</Button>
        <Button class="work-btn" @click="goMyList">我的工单</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({ name: "HomeIndex" });
    },
    goMyList() {
      this.$router.push({ name: "UserCenterProjectList" });
    }
  }
};
</script>

<style lang="less">
.rubbish-disposition-step2 {
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
    text-align: center;
    .message-icon {
      color: red;
      margin-top: 50px;
      font-size: 10rem;
    }

    .btn-box {
      .home-btn,
      .work-btn {
        width: 140px;
        height: 40px;
        line-height: 40px;
        margin: 0 10px;
        color: #fff;
      }
      .home-btn {
        background-color: #c40000;
      }
      .work-btn {
        background-color: #d7d7d7;
      }
    }
  }
}
</style>
