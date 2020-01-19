<template>
  <div class="search-detail">
    <Card>
      <div slot="title">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            <Icon size="18" type="ios-home" />首页
          </BreadcrumbItem>
          <!-- <BreadcrumbItem :to="'/news?type=' + index">搜索结果</BreadcrumbItem> -->
          <BreadcrumbItem>详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="body">
        <p class="body-title">{{info.contentTitle||info.newsTitle||info.productName}}</p>
        <Divider />
        <!-- <div>
          <img v-for="item in imageListReal" :src="getImgPreEvery(item)" alt />
        </div> -->
        <p class="body-body" v-html="info.content||info.productIntroduce"></p>
      </div>
    </Card>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
// import moment from "moment";
export default {
  data() {
    return {
      url: {
        content: "/platform/platformBody.controller/selectById"
      },
      info: {},
      categoryName: "",
      categoryList: [],
      index: 0,
      imageListReal: []
    };
  },
  created() {
    this.loadContent();
  },
  methods: {
    getImgPreEvery(file) {
      console.log(file);
      if (file) {
        return window._CONFIG.imgDomainURL + file;
      }
    },
    // moment,
    loadContent() {
      getAction(this.url.content, { id: this.$route.params.id }).then(res => {
        this.info = res.result[0];
        this.imageListReal = this.info.imageList.split(",");
      });
    }
  }
};
</script>

<style lang='less' scoped>
.search-detail {
  max-width: 1200px;
  margin: auto;
  // padding-top:30px;
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