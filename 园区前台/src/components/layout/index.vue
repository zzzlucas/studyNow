<template>
  <div class="layout">
    <zj-header @flashHeader="flash"></zj-header>
    <div v-if="show">
      <router-view class="layout-view" />
    </div>
    <zj-footer></zj-footer>
  </div>
</template>

<script>
import ZjHeader from "../layout/header";
import ZjFooter from "../layout/footer";
import { mapGetters } from "vuex";

export default {
  name: "LayoutIndex",
  components: {
    ZjHeader,
    ZjFooter
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    async flash() {
      this.show = false;
      await this.$nextTick();
      this.show = true;
      console.log('flash');
    }
  },
  computed: {
    ...mapGetters(["parkId"])
  },
  watch: {
    //v-if为false时，router-view内组件被清空
    async parkId(newVal, oldVal) {
      if (!oldVal) {
        return;
      }
      // (re)load router view by toggle show status
      this.show = false;
      await this.$nextTick();
      this.show = true;
    }
  }
};
</script>

<style lang="less">
.layout-view {
  min-height: 700px;
  padding-bottom: 30px;
  // background-color: rgba(246, 246, 246, 1);
}
</style>
