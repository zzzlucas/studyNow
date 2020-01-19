<template>
  <div class="news-item">
    <div class="news-item-left">
    <!-- <div class="news-item-left" v-if="imgBool"> -->
      <img :src="getImgPre(imageList)" alt />
    </div>
    <div class="news-item-right">
      <div class="title">
        <router-link :to="'/news-detail/'+newsId">
          <p class="bt">{{newsTitle}}</p>
        </router-link>
        <p class="fk">
          <span style="font-size:20px;font-weight:400">{{time.slice(8,10)}}</span>
          <br />
          <span>{{time.slice(0,7)}}</span>
        </p>
      </div>
      <p class="body" v-text="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsId: String,
    newsTitle: String,
    content: String,
    time: { type: String, default: "2020-01-01" },
    imageList: String,
    imgBool: { type: Boolean, default: true }
  },
  data() {
    return {};
  },
  created() {},
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

<style lang='less'>
.bt {
  margin-top: 5px;
}
</style>