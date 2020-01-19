<template>
  <div class="case-detail">
    <Card>
      <div slot="title">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            <Icon size="18" type="ios-home" />首页
          </BreadcrumbItem>
          <BreadcrumbItem :to="'/case?type=' + index">{{categoryName}}</BreadcrumbItem>
          <BreadcrumbItem>详情</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="body">
        <p class="body-title">{{info.productName}}</p>
        <p class="body-time">{{info.createrUnit}} {{info.productCreater}}</p>
        <!-- <p class="body-time">{{moment(info.createTime).format('YYYY-MM-DD HH:mm')}}</p> -->
        <Divider />
        <div>
          <img v-for="item in imageListReal" :src="getImgPreEvery(item)" alt />
        </div>
        <p class="body-body content" v-html="info.productIntroduce"></p>
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
        categoryUrl: "/platform/platformProduct/controller/queryCategorys",
        content: "/platform/platformProduct/controller/queryContent"
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
    moment,
    loadContent() {
      getAction(this.url.content, { id: this.$route.params.id }).then(res => {
        this.imageListReal = res.result.imageList.split(",");
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
.case-detail {
  max-width: 1200px;
  margin: auto;
  .ivu-card {
    margin-top: 40px;
  }
  .ivu-card:hover {
    box-shadow: none;
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