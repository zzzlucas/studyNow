<template>
  <div class="page-header">
    <div class="page-header-inner">
      <div class="header-left">
        <ul class="menu">
          <li style="margin-left: -20px;">
            <img
              class="logo"
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3615831237,1510664097&fm=26&gp=0.jpg"
            />
          </li>
          <!-- <li>
            <a href="javascript:void(0)">当前园区</a>
          </li>-->
          <div class="park-select">
            <Select v-model="parkCurrent" style="width:140px" @on-change="changeParkCurrent">
              <Option
                v-for="item in parkList"
                :value="item.parkId"
                :key="item.parkId"
              >{{ item.parkName }}</Option>
            </Select>
          </div>
          <template class="menu-real">
            <li>
              <router-link :class="{ischeck: $route.path == '/'}" :to="{name: 'HomeIndex'}">首页</router-link>
            </li>
            <li>
              <router-link
                :class="{ischeck: $route.path.includes('/activity')}"
                :to="{name: 'ActivityIndex'}"
              >活动</router-link>
            </li>
            <li class="serve-box" @mouseenter="showServeMenu" @mouseleave="hideServeMenu">
              <a href="javascript:void(0)" :class="{ischeck: $route.path.includes('/serve')}">服务</a>
              <!--下拉菜单-->
              <div class="serve-menu" v-show="serveMenuShow">
                <div class="serve-menu-triangle"></div>
                <ul>
                  <p class="serve-menu-title">入驻</p>
                  <li @click="goRouter('TenementRepairsStep1')">物业报修</li>
                  <li @click="goRouter('TenementAppealStep1')">物业申诉</li>
                  <li @click="goRouter('DemandSubmissionStep1')">需求提报</li>
                  <li @click="goRouter('ParkingApplyStep1')">停车位申请</li>
                  <li @click="goRouter('ItRepairsStep1')">IT报修</li>
                  <li @click="goRouter('AdvertisingApplyStep1')">广告服务申请</li>
                </ul>
                <ul>
                  <p class="serve-menu-title">园区管理</p>
                  <li @click="goRouter('PublicFacilitiesStep1')">公共设施</li>
                  <li @click="goRouter('EnterprisesRecordStep1')">施工企业备案</li>
                  <li @click="goRouter('RubbishDispositionStep1')">建筑垃圾处置</li>
                  <li @click="goRouter('UrbanRoadStep1')">临时占用道路</li>
                </ul>
                <ul>
                  <p class="serve-menu-title">项目申请</p>
                  <li @click="goRouter('NewRentalProjectStep1')">新项目申请（租凭）</li>
                  <li @click="goRouter('NewLandProjectStep1')">新项目申请（拿地）</li>
                  <li @click="goRouter('NewTechProjectStep1')">技改项目申请</li>
                </ul>
                <ul>
                  <p class="serve-menu-title">空间</p>
                  <router-link tag="li" to="/serve/ConferenceReservation">会议室预定</router-link>
                  <router-link tag="li" to="/serve/AdvertisingReservation">广告位预定</router-link>
                </ul>
              </div>
            </li>
            <li
              class="information-box"
              @mouseenter="showInformationMenu"
              @mouseleave="hideInformationMenu"
            >
              <router-link to="/message/index/2">
                <a href="javascript:void(0)" :class="{ischeck: $route.path.includes('/message')}">资讯</a>
              </router-link>
              <div class="information-menu" v-show="informationMenuShow">
                <div class="information-menu-triangle"></div>
                <ul>
                  <router-link tag="li" to="/message/index/2">新闻动态</router-link>
                  <router-link tag="li" to="/message/index/3">通知公告</router-link>
                  <router-link tag="li" to="/message/RecruitmentIndex">人才招聘</router-link>
                </ul>
              </div>
            </li>
            <li>
              <router-link
                :class="{ischeck: $route.path.includes('/policy')}"
                :to="{name: 'PolicyIndex'}"
              >政策</router-link>
            </li>
          </template>
        </ul>
      </div>
      <div class="header-right">
        <div class="header-right-box">
          <div class="search">
            <Input
              search
              placeholder="输入搜索关键词"
              v-model="searchKeyword"
              @on-click="goSearch"
              @on-enter="goSearch"
            />
          </div>
        </div>
        <!-- User buttons -->
        <div class="header-right-action-container">
          <template v-if="isLogin">
            <router-link :to="{ name: 'UserCenterMessageList' }" class="right-icon" title="消息中心">
              <i class="iconfont iconxiaoxi"></i>
            </router-link>
            <!-- <router-link :to="{ name: 'UserCenterAccountSetting' }" class="right-icon" title="账户设置">
              <i class="iconfont iconshezhi"></i>
            </router-link>-->
            <Dropdown transfer>
              <router-link :to="{ name: 'UserCenter' }" class="right-icon" title="用户中心">
                <i class="iconfont iconxingmingyonghumingnicheng"></i>
              </router-link>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="goRouter('UserCenter')">用户中心</DropdownItem>
                <DropdownItem @click.native="goRouter('UserCenterAccountSetting')">账户设置</DropdownItem>
                <DropdownItem @click.native="logout">退出系统</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
          <template v-else>
            <router-link :to="{name: 'LoginIndex'}" class="right-icon">登录</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getAction } from "@/api/manage";

export default {
  data() {
    return {
      // hignLightCurrent: "",
      searchKeyword: "",
      serveMenuShow: false,
      informationMenuShow: false,
      parkMenuShow: false,
      parkList: [],
      parkCurrent: ""
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    // hignLight(e) {
    //   this.hignLightCurrent = e;
    //   console.log(this.$route);
    // },
    ...mapActions("User", ["setPark"]),
    changeParkCurrent(parkId) {
      // const map = {}
      // this.parkList.forEach((item, index) => {
      //   map[item.parkId] = index
      // })
      this.setPark({ parkId });
    },
    loadParkList() {
      //当刷新页面时候，重新加载园区列表，根据缓存的值来设定当前parkId
      getAction("/park.park/basePark/list").then(res => {
        if (res.success) {
          this.parkList = res.result.records;
          let data = JSON.parse(localStorage.getItem("PublicPlatform_store"));
          // if (data.User.parkId) {
          if (data) {
            console.log("1");
            if (data.User.parkId) {
              console.log("1.1");
              this.parkCurrent = data.User.parkId;
            } else {
              console.log("2");
              this.parkCurrent = this.parkList[0].parkId;
            }
          }
          this.setPark({ parkId: this.parkCurrent });
          //需要在主页面loaddata执行前获取到parkid
          //获取到后再自动刷新一遍
          this.$emit("flashHeader");
        }
      });
    },
    goSearch() {
      // console.log(this.searchKeyword)
      // console.log(this.$route.params)
      if (this.searchKeyword.trim() == "") return;
      //作为搜索活动的关键字
      this.$router.push({
        name: "ActivityIndex",
        query: { keyword: this.searchKeyword }
      });
      this.searchKeyword = "";
    },
    showServeMenu() {
      this.serveMenuShow = true;
    },
    hideServeMenu() {
      this.serveMenuShow = false;
    },
    showInformationMenu() {
      this.informationMenuShow = true;
    },
    hideInformationMenu() {
      this.informationMenuShow = false;
    },
    showparkMenu() {
      this.parkMenuShow = true;
    },
    hideparkMenu() {
      this.parkMenuShow = false;
    },
    goRouter(route, type) {
      if (this.$store.getters.isLogin) {
        this.$router.push({ name: route, params: { type } });
        this.serveMenuShow = false;
        // this.hignLightCurrent = 3;
      } else {
        this.$Message.error("当前处于未登录状态，请先登录账号！");
      }
    },
    async logout() {
      await this.$store.dispatch("User/logout");
      this.$Message.success("已注销");
      this.$router.replace({ name: "HomeIndex" });
    }
  },
  created() {
    this.loadParkList();
  }
};
</script>

<style lang="less">
.park-select {
  height: 80px;
  line-height: 80px;
  margin-right: 20px;
  .ivu-select-item {
    height: 32px !important;
    line-height: 32px !important;
  }
}
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(52, 52, 52, 1);
  z-index: 999;
  // .menu-real{
  //   a{
  //     width: 140px!important;
  //   }
  // }
  .page-header-inner {
    width: 1260px;
    // width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .header-left {
    width: 100%;
    height: 80px;

    .menu {
      display: flex;
      line-height: 80px;
      padding: 0;
      margin: 0;

      .logo {
        margin-top: 15px;
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      li {
        padding: 0;
        width: 120px;
        // width: 100%;
        height: 80px;
        line-height: 80px;
        list-style-type: none;
        text-decoration: none;
        text-align: center;

        a {
          color: #fff;
          text-decoration: none;
          display: block;
          height: 100%;
          width: 100%;
          font-weight: 700;
        }

        a:hover {
          background-color: #000;
          color: red;
        }

        .ischeck {
          background-color: #000;
          color: red;
        }
      }

      .serve-box {
        position: relative;

        .serve-menu {
          display: flex;
          width: 892px;
          height: 406px;
          background-color: #fff;
          position: absolute;
          top: 80px;
          // left: -80px;
          left: -100px;
          padding: 20px 20px;
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
          .serve-menu-triangle {
            width: 0;
            height: 0;
            border-width: 0 12px 12px;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: -12px;
            left: 146px;  //算出来148，但是看着146更居中
            // left: 135px;
          }
          ul {
            width: 200px;
            text-align: left;
            margin-left: 20px;
            .serve-menu-title {
              height: 45px;
              line-height: 40px;
              font-size: 14px;
              font-weight: 600;
              border-bottom: 1px solid rgba(233, 233, 233, 1);
              padding: 0;
              margin: 0;
            }
            li,
            li > a {
              width: 180px;
              height: 50px;
              line-height: 50px;
              text-align: left;
              color: #999999;
              cursor: pointer;
              a:hover {
                background-color: unset;
              }
            }
          }
        }
      }

      .information-box {
        position: relative;

        .information-menu {
          display: flex;
          width: 168px;
          height: 175px;
          background-color: #fff;
          position: absolute;
          top: 80px;
          // left: 10px;
          left: -10px;
          padding: 20px 20px;
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
          .information-menu-triangle {
            width: 0;
            height: 0;
            border-width: 0 12px 12px;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: -12px;
            left: 57px;
            // left: 45px;
          }
          ul {
            width: 168px;
            text-align: left;
            li {
              height: 50px;
              line-height: 50px;
              text-align: left;
              color: #999999;
              cursor: pointer;
            }
          }
        }
      }
      .park-box {
        position: relative;

        .park-menu {
          display: flex;
          width: 168px;
          height: 175px;
          background-color: #fff;
          position: absolute;
          top: 80px;
          // left: 10px;
          left: -10px;
          padding: 20px 20px;
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
          .park-menu-triangle {
            width: 0;
            height: 0;
            border-width: 0 12px 12px;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: -12px;
            left: 45px;
          }
          ul {
            width: 168px;
            text-align: left;
            li {
              height: 50px;
              line-height: 50px;
              text-align: left;
              color: #999999;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .header-right {
    width: 40%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .header-right-box {
      .search {
        width: 100%;
      }
    }
    .header-right-action-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .right-icon {
        display: block;
        margin-left: 35px;
        font-size: 16px;
        color: #999;
      }

      a:hover {
        color: red;
      }
    }
  }
}
</style>
