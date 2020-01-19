<template>
  <div class="advertising-apply-step2">
    <h1 class="title">物业报修</h1>
    <div class="schedule">
      <Steps :current="1" status="error">
        <Step title="填写订单"></Step>
        <Step title="提交成功"></Step>
      </Steps>
    </div>
    <div class="advertising-apply-form">
      <i class="iconfont iconchenggong message-icon"></i>
      <p class="message-title">提交成功</p>
      <div class="btn-box">
        <Button class="home-btn" @click="goHome">返回首页</Button>
        <Button class="work-btn">我的工单</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TenementAppealStep3',
  data () {
    return {
    }
  },
  methods: {
    goHome () {
      this.$router.push({name: 'HomeIndex'})
    }

  }
}
</script>

<style lang="less">
  .advertising-apply-step2 {
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
    .advertising-apply-form {
      .message-title {
        font-size: 20px;
      }
      text-align: center;
      .message-icon {
        color: red;
        font-size: 10rem;
      }

      .btn-box {
        margin-top: 30px;
        .home-btn, .work-btn {
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
