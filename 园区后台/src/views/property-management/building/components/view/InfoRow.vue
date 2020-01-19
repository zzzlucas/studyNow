<template>
  <div class="yq-building-info-row">
    <a-row>
      <a-col span="6" class="image-box">
        <yq-image :src="getImage(image)"></yq-image>
      </a-col>
      <a-col span="18" class="info-box">
        <a-row>
          <a-col class="title-item" span="24">{{ title }}名称：{{ info[nameKey] }}</a-col>
          <a-col class="info-item" span="12" v-for="(txt, key) in list" :key="key" v-text="txt"></a-col>
          <a-col class="remark-item" span="24">备注：{{ info.remark }}</a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import { getOneImage as getImage } from '@utils/util'
  import _ from 'lodash'

  export default {
    name: 'InfoRow',
    components: { YqImage },
    props: {
      type: {
        type: String,
        default: ''
      },
      info: {
        type: Object,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        image: '',
        list: []
      }
    },
    created() {
      const data = JSON.parse(this.info.addDocFiles)
      this.image = _.get(data, '[0].url', '')
      this.list = this.getList(this.type, this.info)
    },
    methods: {
      getImage,
      getList(type, info) {
        // TODO: 等接口好了，这里要改
        switch (type) {
          case 'tower':
            return this.getTower(info)
          case 'floor':
            return this.getFloor(info)
          case 'rooms':
            return this.getRooms(info)
          case 'room':
            return this.getRoom(info)
          default:
            return []
        }
      },
      getTower(info) {
        return [
          '楼宇总数：' + info.totalBuildings + ' 栋',
          '建筑总面积：' + (info.buildingArea || 0) + ' ㎡',
          '楼层：共 ' + info.allFloor + ' 层',
          '房间：共 ' + info.allRoom + ' 间，剩余 ' + info.remainRoom + ' 间'
        ]
      },
      getFloor(info) {
        return [
          '楼层总数：' + info.allFloor,
          '地上层数：' + info.groundFloor,
          '地下层数：' + info.undergroundFloor,
          '建筑总面积：' + info.estimateArea + ' ㎡',
          '是否虚拟：' + (info.isVirtual === 'true' ? '是' : '否'),
          '房间：147 间'
        ]
      },
      getRooms(info) {
        return [
          '楼层面积：' + info.allarea + ' ㎡',
          '层高：' + info.height + ' 米',
          '承重：' + info.bearing + ' KN/㎡',
          '是否虚拟：' + (info.isVirtual === 'true' ? '是' : '否')
        ]
      },
      getRoom(info) {
        return [
          '房间面积：' + info.actualArea + ' ㎡',
          '是否可租：' + (info.isRented === 'true' ? '是' : '否'),
          '是否自用：' + (info.isSelfUse === 'true' ? '是' : '否'),
          '是否虚拟：' + (info.isVirtual === 'true' ? '是' : '否')
        ]
      }
    },
    computed: {
      title() {
        switch (this.type) {
          case 'tower':
            return '厂房'
          case 'floor':
            return '楼宇'
          case 'rooms':
            return '楼层'
          case 'room':
            return '房间'
          default:
            return ''
        }
      },
      nameKey() {
        switch (this.type) {
          case 'tower':
            return 'projectName'
          case 'floor':
            return 'buildingName'
          case 'rooms':
            return 'floorName'
          case 'room':
            return 'roomName'
          default:
            return ''
        }
      }
    },
    watch: {
      'info'(info) {
        const data = JSON.parse(info.addDocFiles)
        this.image = _.get(data, '[0].url', '')

        this.$nextTick(() => {
          this.list = this.getList(this.type, info)
        })
      }
    }
  }
</script>

<style lang="less">
  .yq-building-info-row {
    .info-box {
      padding-left: 16px;

      .title-item {
        margin-bottom: 16px;
      }

      .info-item {
        height: 2em;
        line-height: 2em;
      }

      .remark-item {
        margin-top: 16px;
      }
    }
  }
</style>
