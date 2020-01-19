<template>
  <div>
    <div class="zj-inner-bg"></div>
    <div class="zj-inner-body-search">
      <!-- <List>
        <ListItem>
          <ListItemMeta
            v-for="item in data"
            :title="item.contentTitle"
            :description="item.content"
          />
        </ListItem>
      </List>-->
      <Card>
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            <Icon size="18" type="ios-home" />首页
          </BreadcrumbItem>
          <BreadcrumbItem>搜索结果</BreadcrumbItem>
        </Breadcrumb>
      </Card>
      <Card style="padding-top:14px;">
        <div class="productItem" v-for="(item,i) in data">
          <router-link :to="'/search-detail/'+item.id">
            <!-- <Icon type="ios-arrow-forward" /> -->
            <Icon type="ios-arrow-dropright-circle" style="margin-right:5px" />
            <p>{{item.contentTitle}}</p>
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
</template>

<script>
import { getAction } from "@/api/manage";
export default {
  data() {
    return {
      data: [],
      url: {
        search: "/platform/platformBody.controller/explore"
      },
      pageTotal: 0,
      pageSize: 10,
      pageNo: 1
    };
  },
  created() {
    this.getSearchResult();
  },
  methods: {
    pageCurrentFun(e) {
      this.pageNo = e;
      this.getSearchResult();
    },
    pageSizeFun(e) {
      this.pageSize = e;
      this.getSearchResult();
    },
    getSearchResult() {
      let params = {
        keyword: this.$route.query.keyword,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      getAction(this.url.search, params).then(res => {
        this.data = res.result.records;
        this.pageTotal = res.result.total;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.zj-inner-body-search {
  padding-top: 40px;
  // background-color: #eee;
  max-width: 1200px;
  margin: auto;
  //   display: flex;
  //   justify-content: space-between;
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
</style>