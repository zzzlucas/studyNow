<template>
  <div>
    <Tabs>
      <TabPane label="我的活动">
        <Row>
          <Col span="2" style="margin-left: 15px;">活动状态：</Col>
          <Col span="20">
            <RadioGroup
              type="button"
              style="margin: 7px;"
              v-model="activeGroup"
              @on-change="changes"
            >
              <Radio label="全部" value="0" border style="margin-left: 10px;" @click="data1"></Radio>
              <Radio label="未开始" value="1" border style="margin-left: 10px;"></Radio>
              <Radio label="进行中" value="2" border style="margin-left: 10px;"></Radio>
              <Radio label="已结束" value="3" border style="margin-left: 10px;"></Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Table border :columns="columns" :data="dataSource" @on-row-click="goDetail">
            <template slot-scope="{ row }" slot="name"></template>
            <template slot-scope="{ row, index }" slot="action">
              <a style="margin-right: 5px" @click="delte(row)">取消</a>
            </template>
          </Table>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getAction, deleteAction } from "@/api/manage";

export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "活动名称"
        },
        {
          title: "开始日期"
        },
        {
          title: "报名人数"
        },
        {
          title: "报名时间",
          key: "createTime"
        },
        {
          title: "审核状态",
          key: "address"
        },
        {
          title: "活动状态",
          key: "status_dictText"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      dataSource: [],
      activeGroup: "全部"
    };
  },
  methods: {
    //zj-fix
    goDetail(e) {
      this.$router.push({
        name: "ActivityView",
        params: { id: e.activityId }
      });
    },
    fetchActivity() {
      const { keyword, parkId, pageNo, pageSize } = this;
      getAction("park.platform/userCenter/activitySignUp", {
        keyword,
        parkId,
        pageNo,
        pageSize
      }).then(res => {
        if (res.success && res.code === 200) {
          let rese = res.result.records;
          this.dataSource = rese;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    delte(row) {
      console.log(row.id);
      let delCount = row.id;
      deleteAction(`park.platform/userCenter/signupDelete?id=${delCount}`).then(
        res => {
          if (res.success && res.code === 200) {
            console.log("asd");
          } else {
            this.$Message.error(res.message);
          }
        }
      );
    },
    data1() {},
    changes(data) {
      console.log("data", data);
      (this.dataSource = []), (this.activeGroup = data);
      const { keyword, parkId, pageNo, pageSize } = this;
      getAction("park.platform/userCenter/activitySignUp", {
        keyword,
        parkId,
        pageNo,
        pageSize
      }).then(res => {
        if (res.success && res.code === 200) {
          let rese = res.result.records;
          console.log(rese);
          rese.forEach(item => {
            if (item.status_dictText == data) {
              //          		this.dataSource.push(item)
              console.log(item);
              this.dataSource.push(item);
            } else if (data == "全部") {
              this.dataSource.push(item);
            }
          });
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  },
  created() {
    this.fetchActivity();
  }
};
</script>