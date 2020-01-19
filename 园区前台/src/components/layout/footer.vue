<template>
  <div class="page-footer">
    <div class="page-footer-inner">
      <div class="footer-menu">
        <div class="footer-menu-left">
          <div class="footer-menu-left-logo">
            <img src="http://img5.imgtn.bdimg.com/it/u=1994691428,56001411&fm=26&gp=0.jpg" alt />
          </div>
          <p>工作时间：9:30-18:00</p>
          <h1>400 810 8220</h1>
        </div>
        <div class="footer-menu-center">
          <ul>
            <h4 class="title">关于我们</h4>
            <li>嘉善XXX信息服务有限公司</li>
            <li>浙江XXXX有限公司</li>
          </ul>
          <ul>
            <h4 class="title">快速通道</h4>
            <li>
              <router-link to="/message/index/2">通知公告</router-link>
            </li>
            <li>
              <router-link to="/message/index/3">新闻动态</router-link>
            </li>
            <li>
              <router-link :to="{name: 'ActivityIndex'}">活动</router-link>
            </li>
            <li>
              <router-link :to="{name: 'RecruitmentIndex'}">人才招聘</router-link>
            </li>
          </ul>
          <ul>
            <h4 class="title">帮助中心</h4>
            <li @click="$Message.warning('请联系管理员！')">找回密码</li>
            <li>
              <router-link :to="{name: 'FAQ'}">常见问题</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-menu-right">
          <h1>关注公众号</h1>
          <div class="footer-menu-right-img">
            <img src="http://img5.imgtn.bdimg.com/it/u=1994691428,56001411&fm=26&gp=0.jpg" alt />
          </div>
        </div>
      </div>
      <div style="background-color: rgba(0,0,0,0.5);height: 1px; width: 100%;"></div>
      <div class="footer-message">
        <p>
          <span>Copyright ©2017-2019 www.8888888.cn</span>
          <span>|</span>
          <span>嘉善XXX信息服务有限公司</span>
          <span>|</span>
          <a href="http://beian.miit.gov.cn" style="color:#ccc;">
            <span>沪ICP备188888444号-1</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.page-footer {
  width: 100%;
  background-color: #333333;

  .page-footer-inner {
    width: 100%;
    // width: 90%;
    margin: 0 auto;
  }

  .footer-menu {
    height: 247px;
    width: 1260px;
    margin:0 auto;
    display: flex;
    .footer-menu-left {
      color: #cccccc;
      width: 20%;
      text-align: center;
      .footer-menu-left-logo {
        width: 80px;
        height: 80px;
        margin: 40px auto 20px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .footer-menu-center {
      width: 54%;
      margin: 50px;
      display: flex;
      border-left: 1px solid #bbbbbb;
      border-right: 1px solid #bbbbbb;
      ul {
        width: 33%;
        margin-left: 20px;
        text-align: left;

        .title {
          font-size: 16px;
          color: #fff;
          margin-bottom: 10px;
        }

        li,
        li > a {
          color: #ccc;
          height: 35px;
          line-height: 35px;
          list-style: none;
          cursor: pointer;
        }

        li > a:hover {
          color: #fff;
        }
      }
    }
    .footer-menu-right {
      width: 18%;
      text-align: left;
      h1 {
        color: #fff;
        text-align: left;
        font-size: 18px;
        margin-top: 50px;
        margin-bottom: 10px;
      }
      .footer-menu-right-img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer-message {
    height: 67px;
    background-color: #333333;
    text-align: center;
    color: #cccccc;
    p {
      padding-top: 20px;
      span {
        margin: 0 15px;
      }
    }
  }
}
</style>
