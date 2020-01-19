<template>
  <div class="page-header">
    <div class="zj-home-inner-bg">
      <div class="page-header-up">
        <div>
          <p class="title">南湖科学仪器工程化平台</p>
        </div>
        <div class="search">
          <Input
            search
            icon="ios-search"
            placeholder="输入搜索关键词"
            v-model="searchKeyword"
            @on-click="goSearch"
            @on-enter="goSearch"
            v-if="$store.state.menuMode"
          />
        </div>
      </div>
    </div>
    <div class="page-header-inner">
      <div class="header-one">
        <div class="flex-box">
          <div>
            <!-- <Icon type="ios-backspace-outline " /> -->
            <Icon
              type="ios-arrow-back"
              color="#fff"
              size="30"
              @click="$router.back(-1)"
              v-if="!$store.state.menuMode && $route.path!= '/'"
            />
          </div>
          <div>
            <Icon
              type="ios-search-outline"
              color="#fff"
              size="30"
              v-if="!$store.state.menuMode"
              @click="searchStatus=!searchStatus"
              style="margin-right:20px;"
            />
            <Icon
              type="md-menu"
              color="#fff"
              size="30"
              v-if="!$store.state.menuMode"
              @click="menuStatus=!menuStatus"
            />
          </div>
        </div>
        <!-- <Button @click="$router.back(-1)" v-if="!$store.state.menuMode">回退</Button> -->
        <Input
          search
          icon="ios-search"
          placeholder="输入搜索关键词后按下回车键"
          size="large"
          v-model="searchKeyword"
          @on-click="goSearch"
          @on-enter="goSearch"
          v-show="!$store.state.menuMode && searchStatus"
        />
        <Menu
          :mode="menuMode"
          theme="primary"
          active-name="1"
          width="100%"
          v-show="$store.state.menuMode||menuStatus"
          accordion
          @on-select="menuStatus=!menuStatus"
        >
          <MenuItem
            name="1"
            to="/"
            class="ivu-menu-submenu-title"
            :class="{ischeck: $route.path=='/'}"
          >首页</MenuItem>
          <Submenu
            name="2"
            :class="{ischeck:$route.path.includes('/about')&&$route.query.type == 1 }"
          >
            <!-- $route.path.includes('/about')|| -->
            <!-- &&$route.query.query.type == 1 -->
            <template slot="title">平台简介</template>
            <MenuItem
              v-for="(item,i) in menu.pt1"
              :name="item.id"
              @click.native="goRouter1(i)"
            >{{item.contentTitle}}</MenuItem>
          </Submenu>
          <Submenu
            name="3"
            :class="{ischeck:$route.path.includes('/about')&&$route.query.type == 2 }"
          >
            <template slot="title">平台功能</template>
            <MenuItem
              v-for="(item,i) in menu.pt2"
              :name="item.id"
              @click.native="goRouter2(i)"
            >{{item.contentTitle}}</MenuItem>
          </Submenu>
          <Submenu
            name="4"
            :class="{ischeck:$route.path.includes('/about')&&$route.query.type == 3 }"
          >
            <template slot="title">条件优势</template>
            <MenuItem
              v-for="(item,i) in menu.pt3"
              :name="item.id"
              @click.native="goRouter3(i)"
            >{{item.contentTitle}}</MenuItem>
          </Submenu>

          <Submenu name="5" :class="{ischeck: $route.path.includes('/case')}">
            <template slot="title">成功案例</template>
            <MenuItem
              v-for="(item,i) in menu.case"
              :name="item.categoryId"
              @click.native="goRouterCase(i)"
            >{{item.categoryName}}</MenuItem>
          </Submenu>

          <Submenu name="6" :class="{ischeck: $route.path.includes('/news')}">
            <template slot="title">资讯动态</template>
            <MenuItem
              v-for="(item,i) in menu.news"
              :name="item.categoryId"
              @click.native="goRouterNews(i)"
            >{{item.categoryName}}</MenuItem>
          </Submenu>

          <Submenu
            name="7"
            :class="{ischeck:$route.path.includes('/about')&&$route.query.type == 4 }"
          >
            <template slot="title">关于我们</template>
            <MenuItem
              v-for="(item,i) in menu.pt4"
              :name="item.id"
              @click.native="goRouter4(i)"
            >{{item.contentTitle}}</MenuItem>
          </Submenu>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { getAction } from "@/api/manage";
import { mixin } from "@/utils/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      searchKeyword: "",
      menuMode: "horizontal",
      searchStatus: false,
      menuStatus: false
    };
  },
  created() {
    console.log(this.$route);
    if (this.$store.state.menuMode) {
      this.menuMode = "horizontal"; //状态为true，则为水平
    } else {
      this.menuMode = "vertical";
    }
  },
  methods: {
    // changeSearchStatus() {
    //   this.searchStatus =
    // },
    goRouterNews(i) {
      this.$router.push({ path: "/news", query: { type: i + 1 } });
    },
    goRouterCase(i) {
      this.$router.push({ path: "/case", query: { type: i + 1 } });
    },
    goSearch(e) {
      console.log(e);
      if (this.searchKeyword.trim() == "") return;
      //作为搜索活动的关键字
      this.$router.push({
        name: "SearchResult",
        query: { keyword: this.searchKeyword }
      });
      this.searchKeyword = "";
    }
  }
};
</script>

<style lang="less">
.page-header-inner {
  .ivu-menu-vertical {
    width: 100%;
  }
}

.search {
  .ivu-icon {
    cursor: pointer;
  }
}
.park-select {
  height: 64px;
  line-height: 64px;
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
  // height: 64px;
  background-color: #fff;

  // background-color: rgba(52, 52, 52, 1);
  z-index: 999;
  .page-header-up {
    max-width: 1200px;
    height: 76px;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 36px;
      color: #2c50a4;
      font-weight: bold;
    }
    .search {
      width: 280px;
    }
  }
  .page-header-inner {
    background-color: #2d8cf0;
    // background-color: rgba(25, 158, 216, 1);  //777
    width: 100%;
    margin: 0 auto;
    display: block;
    // display: flex;
    // justify-content: space-between;
  }

  .header-one {
    max-width: 1200px;
    // width: 1200px;
    margin: 0 auto;
    // width: 60%;
    height: 64px;
    .ivu-menu-submenu {
      text-align: center;
    }
    .ivu-menu-submenu-title {
      text-align: center;
    }

    .ivu-menu-vertical {
      border: 1px solid rgba(10, 10, 10, 0.2);
      .ivu-menu-submenu .ivu-menu-item {
        padding-left: 24px !important;
      }
    }
    //这是一些比较han的导航栏修改样式，集中至这里吧  01.14
    .ivu-menu-horizontal {
      .ischeck {
        background-color: rgba(251, 140, 0, 1) !important;
      }
      .ivu-select-dropdown {
        background-color: #333;
        .ivu-menu-item {
          color: #fff !important;
        }
        .ivu-menu-item:hover {
          background: inherit !important;
          color: rgba(192, 0, 0, 1) !important;
        }
      }
    }
    // 没法保存状态，可惜liao,放弃这个方式
    // .ivu-menu-horizontal > .ivu-menu-item-active,
    // .ivu-menu-child-item-active {
    //   background-color: rgba(251, 140, 0, 1) !important;
    // }
  }
}
</style>
