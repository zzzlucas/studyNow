<template>
  <div class="slider">
    <!-- v-model="value2" -->
    <Carousel autoplay loop :autoplay-speed="4000">
      <CarouselItem v-for="(item,i) in data" :key="item.id">
        <!-- <a :href="item.url"> -->
            <router-link :to="item.url">
          <img class="slider-img" :src="getImgPre(item.imageList)" />
          </router-link>
      </CarouselItem>
    </Carousel>
    <!-- <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <img class="slider-img" :src="getImgPre('images/iu95.jpg')" />
        <img class="slider-img" :src="getImgPre('images/iu98.jpg')" />
        <img class="slider-img" :src="getImgPre('images/iu116.jpg')" />
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>-->
  </div>
</template>
<script>
import { mixin } from "@/utils/mixin";
import { getAction } from "@/api/manage";
export default {
  name: "Carrousel",
  mixins: [mixin],
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      url: {
        list: "/platformPictures/platformPictures/display"
      },
      data: []
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    loadList() {
      getAction(this.url.list).then(res => {
        for (const item of res.result) {
          if (item.status == "true") {
            this.data.push(item);
          }
        }
        // this.data = res.result;
        console.log(this.data);
      });
    },
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
.slider {
  .slider-img {
    width: 100%;
    // height: 800px;
    object-fit: cover;
  }

  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
}
</style>
