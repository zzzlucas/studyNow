<template>
  <div class="activity-view-one">
    <div class="activity-bread-box">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/activity/index">活动</BreadcrumbItem>
        <BreadcrumbItem>{{ data.title }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="info">
      <div class="info-left">
        <img :src="geImgPreview(data.addDocFiles)" alt />
      </div>
      <div class="info-right">
        <div class="title">
          {{ data.title }}
          <span class="status">{{ filterDictText(dict.activityStatus,data.status) }}</span>
        </div>
        <p>
          活动时间：
          <span>{{ moment(data.begDate).format('YYYY-MM-DD HH:mm') }} ~ {{ moment(data.endDate).format('YYYY-MM-DD HH:mm') }}</span>
        </p>
        <p>
          活动地点：
          <span>{{ data.address }}</span>
        </p>
        <p>
          人数限额：
          <span>{{ data.applyMembersMax }}人</span>
          <span style="color:red" v-if="data.num == data.applyMembersMax">已满</span>
        </p>
        <p>
          报名人数：
          <span>{{ data.num?data.num:0 }}人</span>
        </p>
        <p>
          主办单位：
          <span>{{ data.hostUnit }}</span>
        </p>
        <Button
          :disabled="data.status!='1'||data.num == data.applyMembersMax"
          class="apply-button"
          type="error"
          @click="addModalForm"
        >报名</Button>
      </div>
    </div>

    <div class="introduce">
      <h4 class="title">活动详情</h4>
      <p v-html="data.context"></p>
    </div>
    <modal-form ref="modalForm"></modal-form>
  </div>
</template>

<script>
import { getAction } from "@/api/manage";
import { mixinPage } from "@/utils/mixin";
import modalForm from "./modalForm";
import { initDictOptions } from "@/api/dict";

export default {
  name: "ActivityView",
  mixins: [mixinPage],
  components: { modalForm },
  data() {
    return {
      data: {},
      dict: {
        activityStatus: []
      }
    };
  },
  created() {
    this.init(this.$route.params.id);
    initDictOptions("activity_status").then(res => {
      if (res.code === 0 && res.success) {
        this.dict.activityStatus = res.result;
      }
    });
  },
  methods: {
    geImgPreview(files) {
      if (files) {
        return this.BASR_IMG_URL + files.split(",")[0];
      } else {
        return this.DEFAULT_IMG;
      }
    },
    addModalForm() {
      this.$refs.modalForm.check(this.data);
    },
    init(id) {
      getAction("/park.service/mgrActivityInfo/queryById", {
        activityId: id
      }).then(res => {
        if (res.success && res.code === 200) {
          this.data = res.result;
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  },
  watch: {
    "$route.params.id": function(id) {
      this.init(id);
    }
  }
};
</script>

<style lang="less">
.activity-view-one {
  margin: 85px auto 0;
  width: 1260px;
  overflow: hidden;

  // background-color: rgba(246, 246, 246, 1);
  .activity-bread-box {
    // width: 90%;
    margin: auto;
    .ivu-breadcrumb {
      text-align: left;
      padding: 10px;
      border: 1px solid rgba(228,228,228,1);
      background-color: #fff;
    }
  }
  .info {
    margin: 20px auto 0;
    border: 1px solid rgba(228,228,228,1);
    text-align: left;
    background-color: #fff;
    // width: 90%;
    padding: 20px 10px 30px 10px;
    display: flex;
    .info-left {
      width: 30%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .info-right {
      width: 70%;
      padding-left: 30px;
      .title {
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        font-weight: 600;
        position: relative;
        .status {
          padding: 3px 10px;
          background-color: red;
          font-size: 12px;
          margin-left: 10px;
          -webkit-border-radius: 2em 2em 2em 0;
          -moz-border-radius: 2em 2em 2em 0;
          border-radius: 2em 2em 2em 0;
          color: #fff;
        }
      }
      p {
        margin: 10px 0;
        color: #999;
        span {
          color: #000;
          margin-left: 15px;
        }
      }
      .apply-button {
        width: 86px;
        height: 32px;
        margin-top: 8px;
      }
    }
  }

  .introduce {
    word-break: break-all;
    margin: 20px auto;
    border: 1px solid rgba(228,228,228,1);
    text-align: left;
    background-color: #fff;
    // width: 90%;
    padding: 20px 30px 30px 30px;
    .title {
      font-size: 18px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    p {
      margin: 20px 0;
    }
  }
}
</style>
