<template>
  <a-modal
    title="选择房间"
    wrap-class-name="yq-get-room-modal"
    :visible="show"
    :footer="null"
    :destroy-on-close="true"
    @cancel="close">
    <a-spin size="large" tip="拼命加载中..." :spinning="loading">
      <a-form-item label="厂房" :labelCol="formItem.label" :wrapperCol="formItem.wrapper">
        <a-radio-group buttonStyle="solid" v-model="select.check" @change="radioChange('check')">
          <a-radio-button v-for="(item, key) in checks" :value="item" :key="key">
            {{ item.projectAbbr || item.projectName }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="楼宇" :labelCol="formItem.label" :wrapperCol="formItem.wrapper">
        <a-radio-group buttonStyle="solid" v-model="select.build" @change="radioChange('build')">
          <a-radio-button v-for="(item, key) in builds" :value="item" :key="key">
            {{ item.buildingName }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-divider/>
      <div class="floor-box" v-if="floors.length > 0">
        <a-form-item
          v-for="(floor, floorKey) in floors"
          :label="floor.floorName"
          :labelCol="formItem.label"
          :wrapperCol="formItem.wrapper"
          :key="floorKey">
          <a-button-group>
            <a-button
              class="room-button"
              v-for="(room, roomKey) in floor.rooms"
              v-text="room.roomName"
              :key="roomKey"
              @click="getRoom(floor, room)"></a-button>
          </a-button-group>
        </a-form-item>
      </div>
      <div class="empty-box" v-else>
        <a-icon type="frown" theme="twoTone" style="font-size: 3em;"/>
        <span>没有找到房间</span>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { mapState } from 'vuex'
  import { getAction } from '@api/manage'

  export default {
    name: 'YqGetRoom',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'show',
      event: 'close'
    },
    data() {
      return {
        first: true,
        loading: false,
        formItem: {
          label: { span: 3 },
          wrapper: { span: 21 }
        },
        select: {
          check: {
            buildingProjectId: ''
          },
          build: {
            buildingId: ''
          }
        },
        checks: [],
        builds: [],
        floors: [],
        url: {
          check: {
            url: '/park.architecture/baseArchitectureProject/queryByParkId',
            id: 'parkId'
          },
          build: {
            url: '/park.architecture/baseArchitectureBuilding/queryBuildingList',
            id: 'buildingProjectId'
          },
          floor: {
            url: '/park.architecture/baseArchitectureFloor/buildToFloor',
            id: 'id'
          }
        }
      }
    },
    computed: mapState('industrialPark', {
      parkId: state => state.id
    }),
    async created() {
      this.init()
    },
    methods: {
      async init() {
        this.loading = true

        const closeLoading = () => {
          this.loading = false
          return false
        }

        // 请求厂房数据
        let checkRes = await getAction(this.url.check.url, { [this.url.check.id]: this.parkId })
        if (!checkRes.success) {
          return closeLoading()
        }
        this.checks = checkRes.result
        if (checkRes.result.length < 1) {
          return closeLoading()
        }
        this.select.check = checkRes.result[0]

        // 请求第一厂房的楼宇数据
        this.checkToBuild(checkRes.result[0].buildingProjectId).then(id => {
          this.buildToFloor(id).finally(() => {
            closeLoading()
          })
        }).catch(() => {
          closeLoading()
        })
      },
      close() {
        this.$emit('close')
        setTimeout(() => {
          this.select = {
            check: {
              buildingProjectId: ''
            },
            build: {
              buildingId: ''
            }
          }
          this.checks = []
          this.builds = []
          this.floors = []
        }, 100)
      },
      radioChange(type) {
        this.loading = true
        if (type === 'check') {
          this.checkToBuild(this.select.check.buildingProjectId).then(id => {
            this.buildToFloor(id).finally(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        } else if (type === 'build') {
          this.buildToFloor(this.select.build.buildingId).finally(() => {
            this.loading = false
          })
        }
      },
      async checkToBuild(id) {
        let buildRes = await getAction(this.url.build.url, {
          [this.url.build.id]: id
        })
        if (!buildRes.success) {
          throw new Error('流程中断')
        }
        this.builds = buildRes.result
        if (buildRes.result.length < 1) {
          throw new Error('流程中断')
        }
        this.select.build = buildRes.result[0]
        return buildRes.result[0].buildingId
      },
      async buildToFloor(id) {
        let floorRes = await getAction(this.url.floor.url, {
          [this.url.floor.id]: id
        })
        if (!floorRes.success) {
          throw new Error('流程中断')
        }
        this.floors = floorRes.result || []
        return true
      },
      getRoom(floor, room) {
        let check = this.select.check
        let idPath = {
          parkId: this.parkId,
          buildingProjectId: check.buildingProjectId,
          buildingId: this.select.build.buildingId,
          floorId: floor.floorId,
          roomId: room.roomId
        }
        let namePath = check.projectAbbr || check.projectName
        namePath += '/' + this.select.build.buildingName + '/' + floor.floorName + '/'
        namePath += room.roomName

        this.$emit('change', namePath, idPath, room)
        this.close()
      }
    },
    watch: {
      'show'(bool) {
        if (bool && !this.first) {
          this.init()
        }
        if (this.first) {
          this.first = false
        }
      }
    }
  }
</script>

<style lang="less">
  .yq-get-room-modal {
    .ant-form-item {
      margin-bottom: 8px;
    }

    .empty-box {
      display: flex;
      padding: 14px;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .anticon.anticon-frown {
        margin-bottom: 8px;
      }
    }
  }
</style>
