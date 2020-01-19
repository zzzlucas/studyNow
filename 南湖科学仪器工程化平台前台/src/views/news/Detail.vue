<template>
  <div class="news-detail">
    <Card>
      <div slot="title">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            <Icon size="18" type="ios-home" />首页
          </BreadcrumbItem>
          <!-- 跳转对应新闻分类 -->
          <!-- 园区是有query参数的，这个没有，也没有params，是通过@click事件直接改参数，这样不对，不好跳转回去，且列表页刷新会默认加载第一页 -->
          <!-- 所以路由参数是必须被使用到的 -->
          <BreadcrumbItem :to="'/news?type=' + index">{{categoryName}}</BreadcrumbItem>
          <BreadcrumbItem>详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="body">
        <p class="body-title">{{info.newsTitle}}</p>
        <p class="body-time">{{moment(info.createTime).format('YYYY-MM-DD HH:mm')}}</p>
        <Divider />
        <p class="body-body content" v-html="info.content"></p>
      </div>
    </Card>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
import moment from "moment";
export default {
  data() {
    return {
      url: {
        categoryUrl: "/platform/platformNews/controller/queryCategorys",
        content: "/platform/platformNews/controller/queryContent"
      },
      info: {},
      categoryName: "",
      categoryList: [],
      index: 0
    };
  },
  created() {
    this.loadContent();
  },
  methods: {
    moment,
    loadContent() {
      getAction(this.url.content, { id: this.$route.params.id }).then(res => {
        this.info = res.result;
        this.loadCategoryName();
      });
    },
    //获取种类在种类数组里的下标位置
    loadCategoryName() {
      getAction(this.url.categoryUrl).then(res => {
        this.categoryList = res.result;
        for (const item of this.categoryList) {
          if (item.categoryId == this.info.categoryId) {
            this.categoryName = item.categoryName;
          }
        }
        //此处使用原生for循环获取i
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].categoryId == this.info.categoryId) {
            return (this.index = i + 1);
          }
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.news-detail {
  max-width: 1200px;
  margin: auto;
  .ivu-card:hover {
    box-shadow: none;
  }
  .ivu-card {
    margin-top: 40px;
  }
  .body {
    .body-title {
      text-align: center;
      color: #555;
      font-size: 28px;
      font-weight: bold;
    }
    .body-time {
      text-align: center;
      color: #999;
      font-size: 16px;
    }
    .body-body {
      font-size: 16px;
      padding: 20px;
    }
  }
}
</style>