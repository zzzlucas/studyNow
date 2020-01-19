<template>
  <div class="tenement-repairs-step2">
    <h1 class="title">物业报修</h1>
    <div class="schedule">
      <Steps :current="1" status="error">
        <Step title="填写报修申请单"></Step>
        <Step title="申请成功"></Step>
      </Steps>
    </div>
    <div class="tenement-repairs-form">
      <i class="iconfont iconchenggong message-icon"></i>
      <div class="btn-box">
        <Button class="home-btn" @click="goHome">返回首页</Button>
        <Button class="work-btn">我的工单</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TenementRepairs',
  data () {
    return {
      form: {
        oneself: 0,
        public: 0,
        text: '',
        type: '',
        site: '',
        name: '',
        company: '',
        email: '',
        phone: '',
        relationSite: '',
        describe: ''
      },
      defaultList: [
      ],
      imgName: '',
      visible: false,
      uploadList: []
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
  .tenement-repairs-step2 {
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
    .tenement-repairs-form {
      text-align: center;
      .message-icon {
        color: red;
        margin-top: 50px;
        font-size: 10rem;
      }

      .btn-box {
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
