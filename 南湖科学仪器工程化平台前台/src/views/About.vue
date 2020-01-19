<template>
  <div class="about">
    <!-- div简易组件,意义在于背景图配置在css全局属性中 -->
    <div class="zj-inner-bg"></div>
    <div class="zj-inner-body">
      <div class="left" v-if="this.$store.state.menuMode">
        <Card class="card">
          <p slot="title" class="red" style="font-size:18px;font-weight:600">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            {{breadTitle}}
          </p>
          <Menu :active-name="$route.query.id" v-if="$route.query.type == 1">
            <MenuItem
              v-for="(item,i) in menu.pt1"
              :name="i"
              @click.native="goRouter1(i)"
            >{{item.contentTitle}}</MenuItem>
          </Menu>
          <Menu :active-name="$route.query.id" v-if="$route.query.type == 2">
            <MenuItem
              v-for="(item,i) in menu.pt2"
              :name="i"
              @click.native="goRouter2(i)"
            >{{item.contentTitle}}</MenuItem>
          </Menu>
          <Menu :active-name="$route.query.id" v-if="$route.query.type == 3">
            <MenuItem
              v-for="(item,i) in menu.pt3"
              :name="i"
              @click.native="goRouter3(i)"
            >{{item.contentTitle}}</MenuItem>
            <!-- <MenuItem name="1">仪器需求与行业对接</MenuItem> -->
          </Menu>
          <Menu :active-name="$route.query.id" v-if="$route.query.type == 4">
            <MenuItem
              v-for="(item,i) in menu.pt4"
              :name="i"
              @click.native="goRouter4(i)"
            >{{item.contentTitle}}</MenuItem>
          </Menu>
        </Card>
      </div>
      <div class="right">
        <div>
          <!-- <Card></Card> -->
        </div>
        <Card>
          <Breadcrumb separator=">" slot="title">
            <BreadcrumbItem to="/">
              <Icon size="18" type="ios-home" />首页
            </BreadcrumbItem>
            <BreadcrumbItem>{{breadTitle}}</BreadcrumbItem>
            <BreadcrumbItem>{{info.contentTitle}}</BreadcrumbItem>
          </Breadcrumb>
          <div class="content" v-html="info.content"></div>
          <div v-if="info.imageList" style="margin-top:20px;">
            <p style="font-weight:bold;">平台公众号</p>
            <div>
              <img :src="getImgPre(info.imageList)" alt style="width:150px;height:auto" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import newsItem from "@/components/newsItem";
import { getAction } from "@/api/manage";
import { mixin } from "@/utils/mixin";
export default {
  components: { newsItem },
  mixins: [mixin],
  data() {
    return {
      url: {
        list: ""
      }
    };
  },
  created() {
    // console.log("hi");
    // console.log(this.$route.query);
    //获取二级列表   header也有一次这个请求的，应该怎么安排？   //现在先两处都写吧，后面改vuex试试手  //或者mixin也还可以，先mixin吧
  },
  // computed: {
  //   isFollow() {
  //     return this.$store.state.info; //需要监听的数据
  //   }
  // },
  watch: {
    // isFollow(newVal, oldVal) {
    //   this.info = this.$store.state.info;
    // },
    // $route.query 只变一次 ，无法落实
    "$route.query"() {
      if (this.$route.query.type == 1) {
        this.getInfo1();
      } else if (this.$route.query.type == 2) {
        this.getInfo2();
      } else if (this.$route.query.type == 3) {
        this.getInfo3();
      } else if (this.$route.query.type == 4) {
        this.getInfo4();
      }
    }
  },
  methods: {
    getImgPre(file) {
      console.log(file);
      if (file) {
        file = file.split(",")[0];
        return window._CONFIG.imgDomainURL + file;
      } else {
        return process.env.BASE_URL + "images/iu95.jpg";
      }
    }
  }
};
</script>
<style lang="less">
.about {
  .zj-inner-body {
    padding-top: 40px;
    // background-color: #eee;
    max-width: 1200px;
    // height: 1400px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 25%;
      // height: 1200px;
      .card {
        // height: 1000px;
        .ivu-card-body {
          padding: 0;
          .ivu-menu {
            width: 100% !important;
            .ivu-menu-item {
              font-size: 15px;
            }
          }
        }
      }
    }
    .right {
      margin-left: 1%;
      width: 74%;
      .ivu-card-body {
        ul,
        ol {
          margin-left: 30px;
        }
      }
      // .card {
      //   // height: 1000px;
      //   .div1 {
      //     padding-left: 20px;
      //     .div2 {
      //       padding-left: 20px;
      //     }
      //   }
      //   span {
      //     display: block;
      //     line-height: 30px;
      //   }
      // }
    }
  }
}
</style>