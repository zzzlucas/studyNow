<template>
  <div class="zj-login">
    <div style="height: 50px;"></div>
    <Form class="login-box" @submit="login">
      <h1 class="login-title">用户登录</h1>
      <div class="login-box-input">
        <i class="iconfont iconxingmingyonghumingnicheng login-icon"></i>
        <Input v-model="form.username"></Input>
      </div>
      <div class="login-box-input">
        <i class="iconfont iconmima login-icon"></i>
        <Input type="password" v-model="form.password" @on-enter="login"></Input>
      </div>
      <Button type="error" class="login-button" long @click="login">登录</Button>
      <router-link to="/" class="login-forget">忘记密码?</router-link>
    </Form>
  </div>
</template>

<script>
  import { login, currentPark } from '@/api/login'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        setToken: 'App/setToken',
        setUserInfo: 'User/login',
      }),
      async requestLogin() {
        const res = await login(this.form)
        if (!res.success) {
          throw new Error(res.message)
        }
        return res.result
      },
      async fetchPark() {
        const res = await currentPark()
        if (!res.success) {
          throw new Error(res.message)
        }
        return res.result
      },
      async login() {
        try {
          const userInfo = await this.requestLogin()
          this.setToken(userInfo.token)
          const parkInfo = await this.fetchPark()
          userInfo.parkId = parkInfo.parkId
          userInfo.custId = parkInfo.custId
          this.setUserInfo(userInfo)
          let pushTo = { name: 'HomeIndex' }
          if (this.$route.query.redirect) {
            pushTo = this.$route.query.redirect
          }
          this.$router.push(pushTo)
          this.$Message.success('登录成功')
        } catch (e) {
          this.$Message.error(e.message)
        }
      }
    }
  }
</script>

<style lang="less">
  .zj-login {
    margin-top: 80px;
    width: 100%;
    padding-bottom: 100px;
    background-color: #f6f6f6;
    background-image: url('../../assets/images/login-bg.jpeg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .login-box {
      background-color: #fff;
      width: 35%;
      border: 1px solid #eee;
      padding: 50px 50px 60px;
      margin: 50px auto;
      border-radius: 6px;
      .login-title {
        font-size: 20px;
        margin-bottom: 50px;
        color: rgb(153, 153, 153);;
      }
      .login-box-input {
        border: 1px solid #eee;
        height: 50px;
        text-align: left;
        display: flex;
        margin: 30px auto;
        .login-icon {
          line-height: 50px;
          padding: 0 20px;
          font-size: 20px;
        }
        input {
          border: none;
          width: 100%;
          height: 100%;
          border-left: 1px solid #eee;
          padding-left: 10px;
        }
      }
      .login-button {
        height: 50px;
        background-color: #f95d59;
      }
      .login-forget {
        text-align: left;
        display: block;
        color: rgb(153, 153, 153);
        margin-top: 20px;
      }
    }
  }
</style>
