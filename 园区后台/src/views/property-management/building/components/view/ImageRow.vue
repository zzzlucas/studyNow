<template>
  <div class="yq-building-image-row">
    <a-divider orientation="left">房间图片</a-divider>
    <!--suppress CheckTagEmptyBody-->
    <yq-image
      v-for="(item, key) in images"
      class="image-item"
      size="100"
      :key="key"
      :src="getImage(item.url)"
      @click="openImage(item.url)"></yq-image>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import { getOneImage } from '@utils/util'

  export default {
    name: 'ImageRow',
    components: { YqImage },
    props: {
      images: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    methods: {
      getImage(url) {
        return getOneImage(url)
      },
      openImage(url) {
        window.open(window._CONFIG['imgDomainURL'] + url)
      }
    }
  }
</script>

<style lang="less">
  .yq-building-image-row {
    margin-top: 24px;

    .image-item {
      width: 100%;
      min-height: 300px;
      cursor: pointer;

      & + .image-item {
        margin-top: 16px;
      }
    }
  }
</style>