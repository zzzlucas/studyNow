<template>
  <div class="case">
    <!-- div简易组件 -->
    <div class="zj-inner-bg"></div>
    <div class="zj-inner-body">
      <div class="left" v-if="this.$store.state.menuMode">
        <Card class="card">
          <p slot="title"  class="red" style="font-size:18px;font-weight:600">
            <!-- <Icon type="ios-film-outline"></Icon> -->
            成功案例
          </p>
          <Menu :active-name="$route.query.type-1" @on-select="changeCategory">
            <!-- 绑定的i不起效 -->
            <MenuItem v-for="(item,i) in categoryList" :name="i">{{item.categoryName}}</MenuItem>
          </Menu>
        </Card>
      </div>
      <div class="right">
        <Card>
          <Breadcrumb separator=">" slot="title">
            <BreadcrumbItem to="/">
              <Icon size="18" type="ios-home" />首页
            </BreadcrumbItem>
            <BreadcrumbItem>成功案例</BreadcrumbItem>
            <BreadcrumbItem>{{categoryList[$route.query.type - 1]?categoryList[$route.query.type - 1].categoryName:null}}</BreadcrumbItem>
          </Breadcrumb>
          <div class="productItem" v-for="(item,i) in newsList" style="padding-top:14px;">
            <router-link :to="'/case-detail/'+item.id">
              <!-- <Icon type="ios-arrow-forward" /> -->
              <Icon type="ios-arrow-dropright-circle" style="margin-right:5px" />
              <p>{{item.productName}}</p>
              <p>
                <span v-if="item.createrUnit||item.productCreater">（</span>
                {{item.createrUnit}}
                {{item.productCreater}}
                <span
                  v-if="item.createrUnit||item.productCreater"
                >）</span>
              </p>
              <Divider />
            </router-link>
          </div>
        </Card>

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
import { getAction } from "@/api/manage";
export default {
  data() {
    return {
      url: {
        list: "/platform/platformProduct/controller/queryProduct",
        categoryUrl: "/platform/platformProduct/controller/queryCategorys"
      },
      categoryList: [],
      categoryId: "",
      newsList: [],
      pageTotal: 0,
      pageSize: 10,
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
      this.$router.push({ path: "/case", query: { type: e + 1 } });
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
      });
    }
  }
};
</script>
<style lang="less">
.case .zj-inner-body {
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
    margin-left: 1%;
    width: 74%;
    .productItem {
      p {
        display: inline-block;
        color: #666;
      }
      // height: 60px;
      // line-height: 0px;
      font-size: 16px;
      color: #666;
    }
    .content-page {
      width: 100%;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>