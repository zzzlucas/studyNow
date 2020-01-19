<template>
  <div class="person-index">
    <div class="person-index-box">
      <Breadcrumb separator=">">
        <BreadcrumbItem :to="{ name: 'HomeIndex' }">首页</BreadcrumbItem>
        <BreadcrumbItem>个人中心</BreadcrumbItem>
      </Breadcrumb>
      <div class="content">
        <Row>
          <Col span="5">
            <Menu active-name="UserCenterBookList" @on-select="switchMenuItem">
              <div style="padding-top: 15px;">
                <div>
                  <Avatar icon="ios-person" :src="userInfo.avatar" size="large" style="float: left;margin-left: 25px;"/>
                  <span style="margin:30px;">{{ userInfo.name }}</span>
                  <br><span style="padding-top: 30px;margin-left: 30px;">经理</span>
                </div>
                <br><span style="margin-left: 15px;">XXXXXXXXXX有限公司</span>
                <br>
                <Icon type="md-phone-portrait" size="large" style="margin-left: 15px;"/>
                {{ userInfo.phone }}
              </div>
              <MenuItem name="UserCenterBookList">资源预定</MenuItem>
              <MenuItem name="UserCenterActivityList">我的活动</MenuItem>
              <MenuItem name="UserCenterMessageList">消息中心</MenuItem>
              <MenuItem name="UserCenterServiceRecord">服务记录</MenuItem>
              <MenuItem name="UserCenterProjectList">我的项目</MenuItem>
              <MenuItem name="UserCenterSurveyList">问卷调查</MenuItem>
              <MenuItem name="UserCenterParkManage">园区管理</MenuItem>
<!--              <MenuItem name="UserCenterAccountSetting">!账号设置</MenuItem>-->
            </Menu>
          </Col>
          <Col>
            <router-view/>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      name: 'UserCenterBookList'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    switchMenuItem (name) {
      this.name = name
      this.$router.push({
        name
      })
    }
  },
  created () {
    this.switchMenuItem(this.name)
  }
}
</script>

<style lang="less">
  .person-index {
    margin-top: 90px;
    width: 100%;
    background-color: rgba(246, 246, 246, 1);

    .person-index-box {
      width: 90%;
      margin: auto;

      .ivu-breadcrumb {
        text-align: left;
        padding: 10px;
        border: 1px solid #eee;
        background-color: #fff;
      }

      .content {
        margin-top: 15px;
        text-align: left;
      }
    }
  }
</style>
