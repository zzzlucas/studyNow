
<template>
  <!-- 该模块通过$emit传递两个数据：意向房源组ID，以及拼接成的意向房源组文本 -->
  <!-- 可租不可租暂时未生效，后端给的api或许需要改 -->
  <a-modal
    :title="title"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOK"
    cancelText="关闭"
    destroyOnClose
    :zIndex="1002"
  >
    <a-card :bordered="false" style="margin-bottom:10px" class="property-position-add-form-m">
      <a-form-item label>
        <!-- resourceGroupId -->
        <a-checkbox-group @change="changeFinallyRoom" v-model="FINALLYROOM">
          <a-checkbox :value="item" v-for="(item,i) in FINALLYROOM">已选房间：{{ item.name }}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-card>
    <a-card :bordered="false">
      <a-form :form="form" layout="inline">
        <a-row class="property-position-add-form-m-k">
          <a-col span="24">
            <!-- 这个选项是不是可以不要 -->
            <a-form-item label="房间状态">
              <a-checkbox-group v-model="query.isCould">
                <a-checkbox value="1" class="ant-radio-button-wrapper">可租</a-checkbox>
                <!-- <a-checkbox value="2">已租</a-checkbox> -->
              </a-checkbox-group>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="厂房">
              <a-radio-group @change="loadDataBuilding" v-model="query.block" buttonStyle="solid">
                <!-- :defaultValue="buildingInfo.block[1].buildingProjectId" -->
                <!-- 更合理的方法应当是v-model绑定数据，给数据设置默认值 -->
                <a-radio-button
                  v-for="item in buildingInfo.block"
                  :value="item.buildingProjectId"
                >{{ item.projectName }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="24">
            <a-form-item label="楼宇">
              <a-radio-group @change="loadDataFloor" v-model="query.building" buttonStyle="solid">
                <a-radio-button
                  v-for="item in buildingInfo.building"
                  :value="item.buildingId"
                >{{ item.buildingName }}</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <!-- 楼层+房间显示方式 -->
          <!-- 虽然加了item.rooms!== undefined这个判断不在报错，但是哪里有item.rooms未定义出现了诶 -->
          <!--  v-if="" -->
          <a-col span="24">
            <div
              v-for="(item,i) in buildingInfo.floor"
              v-if="floorFlag&&item.rooms!== undefined&&item.rooms.length > 0"
              :key="item.floorId"
              @click="beforeHandleGet(item.floorId,i)"
              class="property-position-add-form-m-b"
            >
              <div class="m-b">
                <span class="floor-name">{{ item.floorName }}</span>
                <a-checkbox-group v-model="query.room" @change="handleGet">
                  <a-checkbox
                    class="ant-radio-button-wrapper"
                    v-for="itemA in item.rooms"
                    :value="itemA.roomId"
                  >{{itemA.roomName}}</a-checkbox>
                </a-checkbox-group>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script>
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Dom7 from 'dom7'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'

export default {
  // mixins: [JeecgListMixin],
  name: '',
  components: {},

  data() {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false,
      title: '物业位置',
      record: {},
      labelCol: {
        span: 18
      },
      wrapperCol: {
        span: 16
      },
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      queryform: {},
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      url: {
        list: '/park.project/mgrProjectTrace/list'
      },
      //
      buildingInfo: {},
      query: {
        isCould: ['1'],
        block: '',
        building: '',
        room: []
      },
      FINALLYROOM: [],
      FINALLYROOMGROUPID: [],
      Index: '',
      FINALLYROOMAAA: [],
      floorFlag: true
      // FINALLYROOMMODEL: [],
    }
  },
  created() {
    this.loadDataBlock()
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  methods: {
    changeFinallyRoom(e) {
      console.log('e2')
      console.log(e)
      this.FINALLYROOM = e

      //query.room是roomid数组
      //e是房源文本的数组
      // this.query.room = e
      let eee = []
      for (const item of e) {
        eee.push(item.index)
      }
      this.query.room = eee
    },

    //展示功能的实现思路：
    //1要获取到完整文本段
    //2要获取到floor/room
    //3要展示在上方
    //4要互相影响
    beforeHandleGet(e, i) {
      this.query.floor = e
      this.query.floorIndex = i
    },
    handleGet(e) {
      // console.log('e1')
      // console.log(e)
      // this.beforeHandleGet()
      let paramName = ''
      let blockName = ''
      let buildingName = ''
      let floorName = ''
      let roomName = ''
      //遍历比对获取到文本
      for (const item of this.buildingInfo.block) {
        if (item.buildingProjectId == this.query.block) {
          blockName = item.projectName
        }
      }
      for (const item of this.buildingInfo.building) {
        if (item.buildingId == this.query.building) {
          buildingName = item.buildingName
        }
      }
      //先得到floor的值以及i   this.query.floor
      for (const item of this.buildingInfo.floor) {
        if (item.floorId == this.query.floor) {
          floorName = item.floorName
        }
      }
      //room依附于floor获得
      for (const item of this.buildingInfo.floor[this.query.floorIndex].rooms) {
        if (item.roomId == this.query.room[this.query.room.length - 1]) {
          roomName = item.roomName
        }
      }
      paramName = blockName + '>' + buildingName + '>' + floorName + '>' + roomName
      // param = this.query.block + '>' + this.query.building + '>' + this.query.floor + '>' + this.query.room[this.query.room.length-1]
      // param = this.query.room[this.query.room.length - 1]
      console.log(paramName)
      this.FINALLYROOMGROUPID = e

      //方法二：清空FINALLYROOM ， 循环添加
      //但是清空数组再循环的话，e只有room的id组，没有厂房、楼宇、楼层的前缀，依旧是不可能获取完整字段的，故不采取
      //this.FINALLYROOM = []

      //方法三：判断前后差异  拿上一次的状态，也就是当前上面的FINALLYROOM来比较
      //FINALLYROOM的循环中，若index与e相等，可以保留  依旧是通过e来辨识：上次操作产生的FINALLYROOM中留存的部分，间接获取到可用文本段
      // this.FINALLYROOM = []
      //
      this.FINALLYROOMAAA = []
      for (const iteme of e) {
        for (const item of this.FINALLYROOM) {
          if (item.index == iteme) {
            this.FINALLYROOMAAA.push(item)
            // console.log('1')
          }
        }
      }
      console.log(this.FINALLYROOMAAA)
      //虽然这里重新赋值了，但是这本就是之前具备的，所以可以覆盖
      this.FINALLYROOM = this.FINALLYROOMAAA
      //判断，如果比之前少，就不走原先的方法一了 => 即可变相达到分辨change真实动作的效果  12.05
      if (this.FINALLYROOMAAA.length < e.length) {
        //方法一：change的时候一定push了。。。   无法得知change所传递的  12.04
        let ee = e[e.length - 1].toString()
        this.FINALLYROOM.push({ name: paramName, index: ee })
      }
    },
    detail() {
      this.visible = true
    },
    // 1/5 点开modal自查  park查block
    loadDataBlock() {
      let params = { parkId: this.industrialParkId }
      this.loading = true
      getAction('/park.architecture/baseArchitectureProject/queryByParkId', params).then(res => {
        if (res.success) {
          this.buildingInfo.block = res.result
          // console.log(this.buildingInfo.block)
          //目前通过这个方式来刷新表单项，不确定是否规范   12.02
          // this.$nextTick(() => {
          //   this.form.setFieldsValue()
          // })

          this.query.block = this.buildingInfo.block[0].buildingProjectId //默认值

          this.loadDataBuilding(this.query.block)
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    // 2/5 用block查building
    loadDataBuilding(record) {
      let params = {}
      if (record.target) {
        params = { buildingProjectId: record.target.value }
        // console.log('1111111')
      } else {
        params = { buildingProjectId: record }
        // console.log('22222222')
      }
      this.loading = true
      getAction('/park.architecture/baseArchitectureBuilding/queryBuildingList', params).then(res => {
        if (res.success) {
          this.buildingInfo.building = res.result
          console.log('buildingId----')
          console.log(this.buildingInfo.building)
          // console.log(this.buildingInfo.building)
          // this.$nextTick(() => {
          //   this.form.setFieldsValue()
          // })
          this.query.building = this.buildingInfo.building[0].buildingId
          this.loadDataFloor(this.query.building)
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    // 3/5 用building查floor
    // 12-10以来的切换慢一拍BUG原因，应当在此    // 后端莫名其妙变慢了吗    //之前获取的数据内容被改写了吗
    // 如何确保渲染的完整且正确
    // 房间渲染是对的，但是楼层渲染得不对
    // 为什么偏偏楼层的渲染慢一拍，是因为是用div渲染的吗
    loadDataFloor(record) {
      let params = {}
      if (record.target) {
        params = { buildingId: record.target.value }
      } else {
        params = { buildingId: record }
      }
      this.loading = true
      getAction('/park.architecture/baseArchitectureFloor/queryByBuildingId', params).then(res => {
        if (res.success) {
          console.log(this.buildingInfo.floor)
          //数据拿到了，如何在此刻渲染新的dom？并且为什么上面区块切换时候楼宇变化就很流畅呢？为什么以前下面变化也蛮流畅现在却这样呢？   12-17
          //有什么更好的写法可以避免这种问题吗  12-17

          this.buildingInfo.floor = res.result
          // this.$nextTick(() => {this.buildingInfo.floor = res.result})
          for (const item of res.result) {
            console.log('floorId----' + item.floorId)
            // getAction('/park.architecture/baseArchitectureRoom/remainRoomList', { floorId: item.floorId }).then(
            // getAction('/park.architecture/baseArchitectureRoom/rentedRoomList', { floorId: item.floorId }).then(
            getAction('/park.architecture/baseArchitectureRoom/queryByFloorId', { floorId: item.floorId }).then(
              resA => {
                if (resA.success) {
                  item.rooms = resA.result ? resA.result : []
                  //目前是通过销毁再创建来强制刷新   12-17
                  //性能低且遇到选择空楼会出现bug
                  this.floorFlag = false
                  this.$nextTick(() => {
                    this.floorFlag = true
                  })
                  //楼层顺序正确，房间获取顺序错误
                  //虽然发出了循环的房间请求，但是返回速度有快慢，所以顺序有可能不正确，不过有item区分，似乎渲染时候没什么关系
                  console.log(item.rooms)
                }
              }
            )
          }
        } else {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    handleCancel() {
      console.log('handleCancel')
      this.visible = false
    },
    handleOK() {
      console.log('handleOK')
      //此处向父组件传递 房源组文本字段（FINALLYROOM即resourceGroupNames） 及 房源组id （FINALLYROOMGROUPID即roomIds）
      let FINALLYROOMGROUPNAMES = []
      for (const item of this.FINALLYROOM) {
        FINALLYROOMGROUPNAMES.push(item.name)
      }
      this.$emit('getResourceGroupId', FINALLYROOMGROUPNAMES, this.FINALLYROOMGROUPID)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.property-position-add-form-m-b {
  /deep/ .ant-checkbox {
    display: none;
  }
}
.ant-card-wider-padding .ant-card-body {
  padding: 0;
}
.property-position-add-form-m {
  .ant-checkbox-group {
    width: 100%;
    /deep/ .ant-checkbox {
      display: none;
    }
  }
  .ant-checkbox-wrapper {
    display: block;
    padding: 6px;
    border: 1px solid #eee;
    margin: 4px auto;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px;
  }
}
.property-position-add-form-m-k {
  .ant-checkbox-group {
    width: 100%;
    /deep/ .ant-checkbox {
      display: none;
    }
  }
  @mixin group {
    .ant-radio-button-wrapper {
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      margin-bottom: 8px;
      & + .ant-radio-button-wrapper {
        margin-left: 8px;
      }
      &:before {
        display: none;
      }
    }
  }
  .ant-radio-group {
    @include group;
    .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
      box-shadow: unset;
      border-color: #1890ff;
      &:hover {
        border-color: #40a9ff;
      }
      &:active {
        border-color: #096dd9;
      }
    }
    & + .ant-radio-group {
      margin-left: 8px;
    }
  }
  .ant-checkbox-group {
    display: inline;
    @include group;
    .ant-radio-button-wrapper {
      .ant-checkbox .ant-checkbox-inner {
        display: none;
      }
      & > span:last-of-type {
        padding: 0;
      }
      &.ant-checkbox-wrapper-checked {
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        &:hover {
          background-color: #40a9ff;
          border-color: #40a9ff;
        }
        &:active {
          background-color: #096dd9;
          border-color: #096dd9;
        }
      }
    }
  }
}
.property-position-add-form-m-b {
  // padding: 6px;
  // border: 1px solid #eee;
  margin: 4px auto;
  background-color: rgba(242, 242, 242, 1);
  .floor-name {
    background-color: #e5f6fe;
    margin-right: 10px;
    padding: 6px;
    text-align: center;
    margin-left: -5px;
    display: inline-block;
    width: 60px;
    line-height: 40px;
  }
}
</style>
