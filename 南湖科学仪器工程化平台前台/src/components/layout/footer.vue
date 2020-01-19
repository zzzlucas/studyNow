<template>
  <div class="page-footer">
    <div class="page-footer-inner">
      <div class="footer-menu">
        <div class="footer-menu-left">
          <p class="footer-menu-left-p" style="color:#eee">
            联系我们
            <span style="font-size:14px;color:#eee">Contact</span>
          </p>
          <div v-html="content" class="content"></div>
        </div>

        <div class="footer-menu-right" v-if="this.$store.state.menuMode">
          <my-map id="amap"></my-map>
        </div>
      </div>
      <div style="background-color: rgba(0,0,0,0.5);height: 1px; width: 100%;"></div>
      <div class="footer-message">
        <Row type="flex" justify="center">
          <p>
            <Col :xs="24" :sm="24" :md="8" :lg="9">
              <span>Copyright ©2020 www.8888888.org</span>
            </Col>
            <Col :md="1" :lg="1" v-if="this.$store.state.menuMode">
              <span>|</span>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="6">
              <span>南湖科学仪器工程化平台</span>
            </Col>
            <Col :md="1" :lg="1" v-if="this.$store.state.menuMode">
              <span>|</span>
            </Col>
            <Col :xs="24" :sm="24" :md="8" :lg="7">
              <a href="http://beian.miit.gov.cn" style="color:#ccc;">
                <span>浙ICP备88888888号</span>
              </a>
            </Col>
          </p>
        </Row>
      </div>
      <!-- fix-div -->
      <div class="fix-div" v-if="$store.state.menuMode">
        <div class="scroll-top" v-show="btnFlag" @click="backTop">
          <Icon type="md-arrow-up" size="30" />
          <p>返回顶部</p>
        </div>
        <div
          class="touch"
          @mouseenter="touchFlag = !touchFlag"
          @mouseleave="touchFlag = !touchFlag"
        >
          <Icon type="ios-apps-outline" size="30" />
          <p>关注我们</p>
        </div>
      </div>
      <div class="fix-div-2" v-show="touchFlag">
        <div>
          <div class="flex-box">
            <img class="wechat" :src="getImgPreLocal('images/wechat.png')" />
            <div>
              <p style="color:#333;font-weight:bold;font-size:14px">关注微信公众号</p>
              <p>获取最新分享内容</p>
            </div>
          </div>
          <img :src="getImgPre(infoImg)" alt style="width:130px;height:auto;margin:auto" />
          <p>微信扫一扫关注</p>
          <p>
            或搜索关注：
            <span style="color:#2d8cf0">南湖科学仪器平台</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyMap from "./map";
import { getAction } from "@/api/manage";
export default {
  components: { MyMap },
  data() {
    return {
      url: {
        content: "/platform/platformBody.controller/queryContent"
      },
      content: "",
      infoImg: "",
      touchFlag: false,
      btnFlag: false
    };
  },
  created() {
    this.loadList();
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    getImgPreLocal(file) {
      return process.env.BASE_URL + file;
    },
    getImgPre(file) {
      file = file.split(",")[0];
      return window._CONFIG.imgDomainURL + file;
    },
    loadList() {
      getAction(this.url.content, {
        title: "关于我们",
        contentTitle: "联系我们"
      }).then(res => {
        this.content = res.result.content;
        this.infoImg = res.result.imageList;
      });
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  }
};
</script>
<style lang="less">
.page-footer {
  position: relative;
  width: 100%;
  background-color: #333333;
  .fix-div {
    right: 20px;
    bottom: 20px;
    z-index: 10000;
    position: fixed;
    height: 170px;
    width: 74px;
    // background-color: pink;
    p {
      color: #666;
    }
    div {
      border: 1px solid rgba(20, 20, 20, 0.1);
      background-color: rgba(245, 245, 245, 1);
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .scroll-top {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .touch {
      bottom: 0px;
      position: absolute;
    }
  }
  .fix-div-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 104px;
    bottom: 20px;
    z-index: 10000;
    position: fixed;
    height: 240px;
    width: 200px;
    border: 1px solid rgba(20, 20, 20, 0.1);
    background-color: rgba(245, 245, 245, 1);
    text-align: center;
    .flex-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .wechat {
      width: 30px;
      height: 30px;
      margin-right:10px;
    }
    p {
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  }
  .content {
    margin-top: 20px;
    span,
    p {
      color: #ccc !important;
      line-height: 2em;
    }
  }
  p {
    color: #cccccc;
  }
  .page-footer-inner {
    width: 100%;
    // width: 90%;
    margin: 0 auto;
  }
  .footer-menu {
    max-width: 1200px;
    margin: auto;
    height: 360px;
    display: flex;
    padding-top: 50px;
    .footer-menu-left {
      color: #cccccc;
      width: 50%;
      text-align: left;
      .footer-menu-left-p {
        font-size: 20px;
        line-height: 32px;
      }
      .footer-menu-left-span {
        font-size: 14px;
        display: block;
        line-height: 32px;
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
      width: 50%;
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
    // height: 67px;
    background-color: #333333;
    text-align: center;
    color: #cccccc;
    p {
      max-width: 900px; //
      width: 70%; //
      // padding-top: 20px;
      span {
        line-height: 40px;
        // margin: 0 15px;
      }
    }
  }
}
</style>
