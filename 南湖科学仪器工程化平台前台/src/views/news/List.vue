<template>
  <div class="news">
    <!-- div简易组件 -->
    <div class="zj-inner-bg"></div>
    <div class="zj-inner-body">
      <div class="left" v-if="this.$store.state.menuMode">
        <Card class="card">
          <p slot="title" class="red" style="font-size:18px;font-weight:600">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            资讯动态
          </p>
          <Menu :active-name="$route.query.type-1" @on-select="changeCategory">
            <!-- 绑定的i不起效 -->
            <MenuItem v-for="(item,i) in categoryList" :name="i">{{item.categoryName}}</MenuItem>
          </Menu>
        </Card>
      </div>
      <div class="right">
        <news-item
          style="margin-bottom: 12px;"
          v-for="(item,i) in newsList"
          :newsId="item.id"
          :newsTitle="item.newsTitle"
          :content="item.text"
          :time="item.createTime"
          :imageList="item.imageList"
          :imgBool="$store.state.menuMode"
        ></news-item>
        <!-- page -->
        <div class="content-page pageclass">
          <Page
            :total="pageTotal"
            :page-size="pageSize"
            :current="pageNo"
            @on-change="pageCurrentFun"
            @on-page-size-change="pageSizeFun"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newsItem from "@/components/newsItem";
import { getAction } from "@/api/manage";
// import { mixin } from "@/utils/mixin";
export default {
  components: { newsItem },
  // mixins: [mixin],
  data() {
    return {
      url: {
        list: "/platform/platformNews/controller/queryNewsTitle",
        categoryUrl: "/platform/platformNews/controller/queryCategorys"
      },
      categoryList: [],
      categoryId: "",
      newsList: [],
      pageTotal: 0,
      pageSize: 5,
      pageNo: 1
    };
  },
  watch: {
    "$route.query"() {
      this.categorys();
    }
  },
  created() {
    this.categorys();
    //初加载 此时有this.$route.query.type - 1 了
  },
  destroyed() {
    console.log("i am die.");
  },
  methods: {
    pageCurrentFun(e) {
      this.pageNo = e;
      this.getNewsList();
    },
    pageSizeFun(e) {
      this.pageSize = e;
      this.getNewsList();
    },
    changeCategory(e) {
      this.$router.push({ path: "/news", query: { type: e + 1 } });
      this.categoryId = this.categoryList[e].categoryId;
      //跟上面效果相同
      // this.categoryId = this.categoryList[this.$route.query.type - 1].categoryId;
      this.getNewsList(1);
    },
    categorys() {
      getAction(this.url.categoryUrl).then(res => {
        this.categoryList = res.result;
        this.categoryId = this.categoryList[
          this.$route.query.type - 1
        ].categoryId;
        //获取第一分类内容
        this.getNewsList();
      });
    },
    getNewsList(arg) {
      if (arg == 1) {
        this.pageNo = 1;
      }
      let params = {
        // categoryId: this.$route.query.id,
        categoryId: this.categoryId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      getAction(this.url.list, params).then(res => {
        this.newsList = res.result.records;
        this.pageTotal = res.result.total;
        for (const item of this.newsList) {
          if (item.content) {
            item.text = item.content;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 150) + "......";
            item.text = item.text.trim();
          }
          if (!this.$store.state.menuMode) {
            item.text = item.text.slice(0, 30) + "......";
          }
          item.createTime = item.createTime.slice(0, 10);
        }
      });
    }
  }
};
</script>
<style lang="less">
.news .zj-inner-body {
  padding-top: 40px;
  // background-color: #eee;
  max-width: 1200px;
  // height: 1400px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  .left {
    width: 25%;
    .card {
      width: 100%;
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
    // .news-item + .news-item {
    // }
    margin-left: 1%;
    width: 74%;
    .content-page {
      width: 100%;
      text-align: center;
      padding: 20px 0;
    }
    .news-item {
      margin-bottom: 12px;
      //   width: 50%;
      border: 1px solid #ddd;
      padding: 28px;
      display: flex;
      justify-content: space-between;
      .news-item-left {
        margin-right: 20px;
        width: 250px;
        height: 190px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .news-item-right {
        width: 520px;
        .title {
          display: flex;
          justify-content: space-between;
          .bt {
            color: #333;
            font-size: 20px;
            margin-right: 20px;
          }
          .fk {
            height: 60px;
            min-width: 70px;
            width: 70px;
            // width: 100px;
            background-color: rgba(76, 188, 175, 1);
            color: #fff;
            padding: 6px;
          }
        }
        .body {
          padding-top: 20px;
          color: #999;
          line-height: 28px;
        }
      }
    }
  }
}
</style>