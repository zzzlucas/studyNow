<template>
  <div class="zj-home">
    <zj-slider></zj-slider>
    <Row type="flex" justify="center">
      <Col :xs="24" :sm="24" :md="24" :lg="12">
        <div class="ptdw">
          <h1>平台定位</h1>
          <p>以专业的技术、专业的服务、坚实的条件搭建仪器研制科学家与仪器应用/生产产业界之间的桥梁。</p>
          <p>为仪器科学家提供专业、对口、高水平的科学仪器应用及工程化服务，使仪器样机能够真正走出实验室，发挥更大的效益；</p>
          <p>为仪器科学家发掘、梳理重要的应用需求，为仪器的应用和改进提供重要参考。</p>
        </div>
      </Col>
    </Row>
    <div class="cgal">
      <h1>成功案例</h1>
      <p>平台转化成果展示</p>
      <div class="box">
        <Row type="flex" justify="center" style="width:100%">
          <Col :xs="24" :sm="24" :md="24" :lg="12">
            <div class="left">
              <img :src="getImgLocalPre('images/u71.png')" alt />
            </div>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12" style="padding: 0 10px 0 10px;">
            <div class="right">
              <div class="cg-item" v-for="item in caseList">
                <div class="left-2">
                  <p style="font-size:18px">{{item.inventTime.slice(0,4)}}</p>
                  <span>{{item.inventTime.slice(5,12)}}</span>
                </div>
                <Divider type="vertical" />
                <router-link :to="'/case-detail/'+item.id">
                  <div class="right-2">
                    <p>{{item.productName}}</p>
                    <span>{{item.createrUnit}} {{item.productCreater}}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Button
        class="more phone-wide"
        type="primary"
        size="large"
        ghost
        :to="'/case?type=' + 1"
      >MORE></Button>
    </div>
    <div class="zxdt">
      <h1>资讯动态</h1>
      <p>掌握第一手资讯和行业的相关信息</p>
      <div class="box">
        <Row :gutter="12">
          <!-- <Row  :lg="{gutter:12}" :xs="{gutter:0}"> -->
          <Col :xs="24" :sm="24" :md="24" :lg="12" v-for="(item,i) in newsList">
            <news-item
              style="margin-bottom: 12px;"
              :newsId="item.id"
              :newsTitle="item.newsTitle"
              :content="item.text"
              :time="item.createTime"
              :imageList="item.imageList"
              :imgBool="true"
            ></news-item>
          </Col>
        </Row>
      </div>
      <Button class="more" type="primary" size="large" ghost :to="'/news?type=' + 1">MORE></Button>
    </div>
  </div>
</template>

<script>
import ZjSlider from "@/components/slider/index";
import newsItem from "@/components/newsItem";
import { getAction } from "@/api/manage";

export default {
  name: "home",
  components: {
    ZjSlider,
    newsItem
  },
  data() {
    return {
      url: {
        newsList: "/platform/platformNews/controller/queryNewsTitle",
        newsCategoryUrl: "/platform/platformNews/controller/queryCategorys",
        caseList: "/platform/platformProduct/controller/queryProduct",
        caseCategoryUrl: "/platform/platformProduct/controller/queryCategorys"
      },
      categoryList: [],
      categoryId: "",
      newsList: [],
      pageTotal: 0,
      pageSize: 4,
      pageNo: 1,

      categoryListC: [],
      categoryIdC: "",
      caseList: [],
      pageTotalC: 0,
      pageSizeC: 3,
      pageNoC: 1
    };
  },
  created() {
    this.categorys();
    this.categorysCase();
  },
  methods: {
    getImgLocalPre(file) {
      return process.env.BASE_URL + file;
    },
    categorys() {
      getAction(this.url.newsCategoryUrl).then(res => {
        this.categoryList = res.result;
        this.categoryId = this.categoryList[0].categoryId;
        //获取第一分类内容
        this.getNewsList();
      });
    },
    getNewsList() {
      let params = {
        categoryId: this.categoryId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      getAction(this.url.newsList, params).then(res => {
        for (const item of res.result.records) {
          if (item.content) {
            item.text = item.content;
            item.text = item.text.replace(/<\/?.+?>/g, "");
            item.text = item.text.replace(/&nbsp;/g, "");
            item.text = item.text.slice(0, 80) + "......";
            item.text = item.text.trim();
          }
          if (!this.$store.state.menuMode) {
            item.text = item.text.slice(0, 30) + "......";
          }
          item.createTime = item.createTime.slice(0, 10);
          this.newsList.push(item);
        }
        this.pageSize = this.pageSize - res.result.total;
        console.log(this.pageSize);
        //如果第一次请求不够四条新闻，就再请求一次
        if (this.pageSize > 0) {
          this.categoryId = this.categoryList[1].categoryId;
          this.getNewsList();
        }
      });
    },
    categorysCase() {
      getAction(this.url.caseCategoryUrl).then(res => {
        this.categoryListC = res.result;
        this.categoryIdC = this.categoryListC[0].categoryId;
        //获取第一分类内容
        console.log("this.categoryIdC");
        console.log(this.categoryIdC);
        this.getCaseList();
      });
    },
    getCaseList() {
      let params = {
        categoryId: this.categoryIdC,
        pageNo: this.pageNoC,
        pageSize: this.pageSizeC
      };
      getAction(this.url.caseList, params).then(res => {
        for (const item of res.result.records) {
          this.caseList.push(item);
        }
        console.log("this.caseList");
        console.log(this.caseList);
        this.pageSizeC = this.pageSizeC - res.result.total;
        console.log(this.pageSizeC);
        //如果第一次请求不够三条案例，就再请求一次
        if (this.pageSizeC > 0) {
          this.categoryIdC = this.categoryListC[1].categoryId;
          this.getCaseList();
        }
      });
    }
  }
};
</script>
<style lang="less">
.zj-home {
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: normal;
  }
  p {
    color: #999;
    font-size: 16px;
    line-height: 30px;
  }
  .box {
    margin: 30px auto;
  }
  .ptdw {
    padding-top: 30px;
    // height: 200px;
    span {
      display: block;
    }
  }
  .cgal {
    padding-top: 30px;
    // height: 660px;
    // height: 700px;
    .box {
      max-width: 1200px;
      // height: 400px;
      display: flex;
      justify-content: space-between;
      // background-color: yellow;
      .left {
        // width: 600px;
        margin: auto;
        overflow: hidden;
      }
      .right {
        max-width: 580px;
        border-top: 1px solid #eee;
        .cg-item {
          padding-left: 20px;
          height: 120px;
          display: flex;
          border-bottom: 1px solid #eee;
          align-items: center;
          .ivu-divider-vertical {
            margin: auto 20px;
          }
          // justify-content: space-between;
          // .left-2 {
          // }
          .right-2 {
            text-align: left;
          }
        }
      }
    }
  }
  .zxdt {
    padding-top: 30px;
    // height: 630px;
    .box {
      text-align: left;
      max-width: 1200px;
      height: 360px;
      // background-color: #eee;
      .news-item {
        float: left;
        width: 100%;
        // width: 49%;
        height: 170px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        .news-item-left {
          margin-right: 20px;
          width: 250px;
          height: 100%;
          img {
            width: 100%;
            // width: 185px;
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
              font-size: 18px;
              margin-right: 10px;
              max-height: 64px;
              overflow: hidden;
            }
            .fk {
              height: 60px;
              width: 70px;
              min-width: 70px;
              background-color: rgba(76, 188, 175, 1);
              color: #fff;
              padding: 5px;
              line-height: 26px;
            }
          }
          .body {
            font-size: 14px;
            padding-top: 5px;
            color: #999;
            line-height: 28px;
            max-height: 90px;
            overflow: hidden;
          }
        }
      }
      .news-item:nth-child(odd) {
        margin-right: 2%;
      }
      .news-item:nth-child(1),
      .news-item:nth-child(2) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
