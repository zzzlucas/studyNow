<template>
  <div class="slider">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <img class="slider-img" src="../../assets/images/b01.png" />
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "Carrousel",
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
      }
    };
  }
};
</script>
<style lang="less">
.slider {
  .slider-img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
}
</style>
