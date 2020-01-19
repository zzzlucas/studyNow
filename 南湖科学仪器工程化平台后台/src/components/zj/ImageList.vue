<template>
  <a-row class="image-list-container" :gutter="gutter">
    <a-col class="image-list-column" :span="span" v-for="(image, i) in images" :key="i">
      <div class="image-list-box">
        <img
          class="image-list-image"
          :src="image.url"
          :alt="image.alt"
          :preview="previewKey"
          :style="imageStyle">
      </div>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: 'ImageList',
    props: {
      span: {
        type: [Number, Object],
        default: 6,
      },
      gutter: {
        type: Number,
        default: 24,
      },
      data: {
        type: [String, Array],
        default: '',
      },
      split: {
        type: String,
        default: ',',
      },
      previewKey: {
        type: String,
        default: '',
      },
      height: {
        type: String,
        default: '',
      },
      mode: {
        type: String,
        default: 'cover',
      }
    },
    data() {
      return {
        baseUrl: window._CONFIG['imgDomainURL'],
      }
    },
    computed: {
      images() {
        let data = this.data
        if (typeof this.data === 'string') {
          data = data.split(this.split)
        }
        return data.map(item => {
          return {
            url: this.baseUrl + item,
            alt: '',
          }
        })
      },
      imageStyle() {
        let _ = []
        if (this.height) {
          _.push({ height: this.height })
        }
        if (this.mode) {
          _.push({ objectFit: this.mode })
        }
        return _
      },
    },
  }
</script>

<style lang="less">
  .image-list-container {
    .image-list-image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>
