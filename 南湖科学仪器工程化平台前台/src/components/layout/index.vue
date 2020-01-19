<template>
  <div class="layout">
    <zj-header></zj-header>
    <div v-if="show">
      <router-view class="layout-view" />
    </div>
    <zj-footer></zj-footer>
  </div>
</template>

<script>
import ZjHeader from "../layout/header";
import ZjFooter from "../layout/footer";
// import { mapGetters } from "vuex";

export default {
  name: "LayoutIndex",
  components: {
    ZjHeader,
    ZjFooter
  },
  created() {
    this.isMobile();
  },
  data() {
    return {
      show: true,
      //菜单模式，名字没取好，意义就是true时为PC端，也就是内容更会被渲染出来，移动端简约点
      menuMode: true
    };
  },
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      if (!flag) {
        this.menuMode = true;
      } else {
        this.menuMode = false;
      }
      //将这个状态通过vuex传递
      //PC为true，手机为false
      this.$store.commit("SET_MENUMODE", this.menuMode);
      console.log("this.menuMode");
      console.log(this.menuMode);
    }
  },
  computed: {
    // ...mapGetters(["parkId"])
  },
  watch: {
    // //v-if为false时，router-view内组件被清空
    // async parkId(newVal, oldVal) {
    //   if (!oldVal) {
    //     return;
    //   }
    //   // (re)load router view by toggle show status
    //   this.show = false;
    //   await this.$nextTick();
    //   this.show = true;
    // }
  }
};
</script>

<style lang="less">
.layout-view {
  min-height: 700px;
  padding-top: 80px;
  // padding-top: 140px;
  padding-bottom: 30px;
  // background-color: rgba(246, 246, 246, 1);
}
</style>
