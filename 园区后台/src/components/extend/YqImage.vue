<template>
  <div class="yq-image" @click="onClick">
    <div class="image-text" v-if="error">
      <a-icon type="picture" :style="{fontSize: size + 'px'}" />
    </div>
    <img class="this-image" v-else :src="src" alt="图片" @error="imageErr" :style="{objectFit: fit}" />
  </div>
</template>

<script>
export default {
  name: 'YqImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'conver'
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    imageErr() {
      this.error = true
    },
    onClick(e) {
      this.$emit('click', e)
    }
  },
  watch: {
    src: function() {
      this.error = false
    }
  }
}
</script>

<style lang="less">
.yq-image {
  // width: 100%;
  // height: 100%;
  display: block;
  background-color: #f2f2f2;
  overflow: hidden;
  position: relative;

  .image-text {
    width: 100%;
    height: 100%;
    color: #6e6e6e;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }

  .this-image {
    display: block;
    width: 77.77%;
    margin: 10px auto;
    // width: 100%;
    // height: 100%;
    object-fit: fill;
  }
}
</style>
