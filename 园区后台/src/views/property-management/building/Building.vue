<template>
  <a-row :gutter="8">
    <a-col span="4">
      <a-card>
        <!--suppress CheckTagEmptyBody -->
        <a-tree
          show-line
          :tree-data="tree"
          :load-data="loadTree"
          :selectedKeys.sync="selectKeys"
          :expandedKeys.sync="expandedKeys"
          @select="onTreeSelect"></a-tree>
      </a-card>
    </a-col>
    <a-col span="20">
      <a-card class="yq-building-card" :loading="loading">
        <template slot="title">
          <span>楼宇房源</span>
          <a-button style="margin-left: 8px;" v-if="the.type !== ''" @click="cardBack">
            反回首页
          </a-button>
        </template>
        <template slot="extra">
          <a-button type="primary" @click="addBlock" v-if="type === 'block'">新建厂房</a-button>
          <a-button
            v-if="['block', 'tower'].indexOf(type) !== -1"
            :type="type === 'tower' ? 'primary' : 'default'"
            :class="type === 'block' ? 'margin-left' : ''"
            @click="addTower">新建楼宇
          </a-button>
          <a-button
            v-if="['block', 'floor'].indexOf(type) !== -1"
            :type="type === 'floor' ? 'primary' : 'default'"
            :class="type === 'block' ? 'margin-left' : ''"
            @click="addFloor">新建楼层
          </a-button>
          <a-button
            v-if="['block', 'rooms'].indexOf(type) !== -1"
            :type="type === 'rooms' ? 'primary' : 'default'"
            :class="type === 'block' ? 'margin-left' : ''"
            @click="addRoom">新建房间
          </a-button>
          <a-button class="margin-left" v-if="type !== 'block'" @click="cardEdit">编辑</a-button>
          <a-button class="margin-left" v-if="type !== 'block'" @click="cardDel">删除</a-button>
        </template>
        <!--suppress CheckTagEmptyBody -->
        <building-view :model="model" @delete="onDelete" @edit="onEdit" @change="onChange"></building-view>
      </a-card>
    </a-col>

    <!-- 表单 -->
    <!--suppress CheckTagEmptyBody -->
    <building-block-form ref="block" @ok="onOk"></building-block-form>
    <!--suppress CheckTagEmptyBody -->
    <building-tower-form ref="tower" @ok="onOk"></building-tower-form>
    <!--suppress CheckTagEmptyBody -->
    <building-floor-form ref="floor" @ok="onOk"></building-floor-form>
    <!--suppress CheckTagEmptyBody -->
    <building-room-form ref="room" @ok="onOk"></building-room-form>
  </a-row>
</template>

<script>
  import BuildingView from './components/BuildingView'
  import { deleteAction, getAction } from '@/api/manage'
  import _ from 'lodash'
  import BuildingBlockForm from './components/form/BuildingBlockForm'
  import BuildingTowerForm from './components/form/BuildingTowerForm'
  import BuildingFloorForm from './components/form/BuildingFloorForm'
  import BuildingRoomForm from './components/form/BuildingRoomForm'
  import { getTreeNodeOfKey } from '@utils/util'
  import { mapState } from 'vuex'

  export default {
    name: 'Building',
    components: { BuildingRoomForm, BuildingFloorForm, BuildingTowerForm, BuildingBlockForm, BuildingView },
    data() {
      return {
        type: '',
        model: {},
        loading: true,
        the: {
          type: '',
          id: ''
        },
        url: {
          list: {
            block: {
              url: '/park.architecture/baseArchitectureProject/queryByParkId',
              id: 'parkId'
            },
            tower: {
              url: '/park.architecture/baseArchitectureBuilding/queryBuildingList',
              id: 'buildingProjectId'
            },
            floor: {
              url: '/park.architecture/baseArchitectureFloor/queryByBuildingId',
              id: 'buildingId'
            },
            rooms: {
              url: '/park.architecture/baseArchitectureRoom/queryByFloorId',
              id: 'floorId'
            }
          },
          info: {
            block: {
              url: '/park.architecture/baseArchitectureProject/queryById',
              id: 'id'
            },
            tower: {
              url: '/park.architecture/baseArchitectureProject/queryById',
              id: 'id'
            },
            floor: {
              url: '/park.architecture/baseArchitectureBuilding/queryById',
              id: 'buildingId'
            },
            rooms: {
              url: '/park.architecture/baseArchitectureFloor/queryById',
              id: 'floorId'
            },
            room: {
              url: '/park.architecture/baseArchitectureRoom/queryById',
              id: 'id'
            }
          },
          delete: {
            block: {
              url: '/park.architecture/baseArchitectureProject/delete',
              id: 'id'
            },
            tower: {
              url: '/park.architecture/baseArchitectureBuilding/delete',
              id: 'id'
            },
            floor: {
              url: '/park.architecture/baseArchitectureFloor/delete',
              id: 'id'
            },
            rooms: {
              url: '/park.architecture/baseArchitectureRoom/delete',
              id: 'id'
            }
          },
          tree: {
            block: {
              url: '/park.architecture/baseArchitectureBuilding/queryBuildingList',
              id: 'buildingProjectId'
            },
            tower: {
              url: '/park.architecture/baseArchitectureFloor/queryByBuildingId',
              id: 'buildingId'
            },
            floor: {
              url: '/park.architecture/baseArchitectureRoom/queryByFloorId',
              id: 'floorId'
            }
          }
        },
        tree: [],
        selectKeys: [],
        expandedKeys: []
      }
    },
    created() {
      this.type = 'block'

      this.$nextTick(() => {
        this.loadData('block', this.parkId).then(list => {
          this.model = {
            status: 'block',
            list
          }

          this.tree = _.map(list, obj => {
            return {
              title: obj.projectAbbr,
              key: obj.buildingProjectId,
              type: 'block'
            }
          })
        }).catch(err => {
          console.log('载入厂房数据：' + err)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    methods: {
      /**
       * 加载列表
       * @param type
       * @param id
       * @returns {Promise<unknown>}
       */
      loadData(type, id) {
        return new Promise((resolve, reject) => {
          const config = this.url.list[type]
          getAction(config.url, { [config.id]: id }).then(res => {
            if (res.code === 200 && res.success) {
              resolve(res.result)
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },
      /**
       * 加载info
       * @param type
       * @param id
       * @returns {Promise<unknown>}
       */
      getInfo(type, id) {
        return new Promise((resolve, reject) => {
          const config = this.url.info[type]
          getAction(config.url, { [config.id]: id }).then(res => {
            if (res.code === 200 && res.success) {
              resolve(res.result)
            } else {
              this.$message.error(res.message)
            }
          }).catch(err => {
            reject(err)
          })
        })
      },

      // Tree 相关
      /**
       * 点击tree
       * @param keys
       * @param info
       */
      onTreeSelect(keys, info) {
        if (keys.length > 0) {
          const data = info.node.dataRef
          const types = { block: 'tower', tower: 'floor', floor: 'rooms', rooms: 'room' }
          this.onChange(types[data.type], data.key)
        } else {
          this.onChange('block')
        }
      },
      /**
       * Tree 懒加载
       * @param node
       * @returns {Promise<boolean>}
       */
      loadTree(node) {
        return new Promise((resolve, reject) => {
          let type = node.dataRef.type
          const config = this.url.tree[type]
          const query = {}

          query[config.id] = node.dataRef.key
          getAction(config.url, query).then(res => {
            if (res.success && res.code === 200) {
              if (res.result) {
                node.dataRef.children = this.getTreeData(type, res.result)
                this.tree = [...this.tree]
              } else {
                node.dataRef.isLeaf = true
              }
              resolve()
            } else {
              this.$message.error(res.message)
              reject(res.message)
            }
          })
        })
      },
      getTreeData(type, list) {
        switch (type) {
          case 'block':
            return _.map(list, obj => {
              return { title: obj.buildingName, key: obj.buildingId, type: 'tower' }
            })
          case 'tower':
            return _.map(list, obj => {
              return { title: obj.floorName, key: obj.floorId, type: 'floor' }
            })
          case 'floor':
            return _.map(list, obj => {
              return { title: obj.roomName, key: obj.roomId, type: 'rooms', isLeaf: true }
            })
          default:
            return []
        }
      },

      // 新建表单
      addBlock() {
        this.$refs.block.add()
      },
      addTower() {
        let data = _.merge({}, this.model)
        if(this.type === 'tower'){
          this.$refs.tower.add({
            project: data.info.buildingProjectId
          })
        } else {
          this.$refs.tower.add()
        }
      },
      addFloor() {
        let data = _.merge({}, this.model)
        if (this.type === 'floor') {
          this.$refs.floor.add({
            project: data.info.buildingProjectId,
            build: data.info.buildingId
          })
        } else {
          this.$refs.floor.add()
        }
      },
      addRoom() {
        let data = _.merge({}, this.model)
        if (this.type === 'rooms') {
          this.$refs.room.add({
            project: data.info.buildingProjectId,
            build: data.info.buildingId,
            floor: data.info.floorId
          })
        } else {
          this.$refs.room.add()
        }
      },

      // 子组件事件冒泡
      onDelete(type, id, key, name) {
        const types = {
          block: '厂房',
          tower: '楼宇',
          floor: '楼层',
          rooms: '房间'
        }

        this.$confirm({
          title: '询问',
          content: `是否删除${types[type]}：${name}`,
          onOk: () => {
            const config = this.url.delete[type]

            deleteAction(config.url, { [config.id]: id }).then(res => {
              if (res.success && res.code === 200) {
                this.$message.success(res.message)
                let path = getTreeNodeOfKey(this.tree, id, 'key')
                path = _.map(path, i => `[${i}]`)
                let tree = _.cloneDeep(this.tree)
                _.unset(tree, path.join('.children'))
                this.tree = tree

                if (typeof key === 'function') {
                  key()
                } else {
                  this.$delete(this.model.list, key)
                }
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      onEdit(type, id, obj) {
        const data = _.merge({}, obj)
        switch (type) {
          case 'block':
            this.$refs.block.edit(data)
            break
          case 'tower':
            this.$refs.tower.edit(data, {
              project: data.buildingProjectName
            })
            break
          case 'floor':
            this.$refs.floor.edit(data, {
              project: data.buildingProjectName,
              build: data.buildingName
            })
            break
          case 'rooms':
            this.$refs.room.edit(data, {
              project: data.buildingProjectName,
              build: data.buildingName,
              floor: data.floorName
            })
            break
          default:
            this.$message.error('没有对应的修改方式')
            break
        }
      },
      onOk(type, id, pids) {
        switch (type) {
          case 'block':
            this.type = 'block'
            this.loadData('block', this.parkId).then(list => {
              this.model = {
                status: 'block',
                list
              }

              let tree = _.map(list, obj => {
                return {
                  title: obj.projectAbbr,
                  key: obj.buildingProjectId,
                  type: 'tower'
                }
              })

              this.tree = _.merge([], this.tree, tree)
            }).catch(err => {
              console.log('载入厂房数据：' + err)
            })
            break
          case 'tower' : {
            let path = getTreeNodeOfKey(this.tree, id, 'key')
            if (path.length > 0) {
              this.type = 'tower'
              let p1 = this.getInfo(type, id)
              let p2 = this.loadData(type, id)

              Promise.all([p1, p2]).then(([info, list]) => {
                this.model = {
                  status: type,
                  info,
                  list
                }
                this.selectKeys = [id]

                this.openTree(id)

                path = _.map(path, i => `[${i}]`)
                path = path.join('.children') + '.children'

                let tree = _.set([], path, this.getTreeData('block', list))
                tree = _.merge([], _.cloneDeep(this.tree), tree)
                this.tree = tree
              })
            }
            break
          }
          case 'floor' : {
            let path = getTreeNodeOfKey(this.tree, id, 'key')

            if (path.length > 0) {
              this.type = 'floor'
              let p1 = this.getInfo(type, id)
              let p2 = this.loadData(type, id)

              Promise.all([p1, p2]).then(([info, list]) => {
                this.model = {
                  status: type,
                  info,
                  list
                }
                this.selectKeys = [id]

                _.map(pids, pid => {
                  this.openTree(pid)
                })

                path = _.map(path, i => `[${i}]`)
                path = path.join('.children') + '.children'

                let tree = _.set([], path, this.getTreeData('tower', list))
                tree = _.merge([], _.cloneDeep(this.tree), tree)
                this.tree = tree
              })
            }
            break
          }
          case 'rooms' : {
            let path = getTreeNodeOfKey(this.tree, id, 'key')
            if (path.length > 0) {
              this.type = 'rooms'
              let p1 = this.getInfo(type, id)
              let p2 = this.loadData(type, id)

              Promise.all([p1, p2]).then(([info, list]) => {
                this.model = {
                  status: type,
                  info,
                  list
                }
                this.selectKeys = [id]

                _.map(pids, pid => {
                  this.openTree(pid)
                })

                path = _.map(path, i => `[${i}]`)
                path = path.join('.children') + '.children'

                let tree = _.set([], path, this.getTreeData('floor', list))
                tree = _.merge([], _.cloneDeep(this.tree), tree)
                this.tree = tree
              })
            }
            break
          }
        }
      },
      onChange(type, id) {
        this.loading = true
        this.type = type

        if (id) {
          this.the = { type, id }
          this.selectKeys = [id]
          this.openTree(id)

          if (type === 'room') {
            this.$nextTick(() => {
              this.getInfo('room', id).then(info => {
                this.loading = false
                this.model = {
                  status: 'room',
                  info,
                  images: JSON.parse(info.addDocFiles)
                }
              })
            })
          } else {
            this.$nextTick(() => {
              const p1 = this.getInfo(type, id)
              const p2 = this.loadData(type, id)

              Promise.all([p1, p2]).then(([info, list]) => {
                this.model = {
                  status: type,
                  info,
                  list
                }
              }).finally(() => {
                this.loading = false
              })
            })
          }
        } else {
          this.the = { type: '', id: '' }
          this.selectKeys = []

          this.$nextTick(() => {
            this.loadData('block', this.parkId).then(list => {
              this.model = {
                status: 'block',
                list
              }
            }).catch(err => {
              console.log('载入厂房数据：' + err)
            }).finally(() => {
              this.loading = false
            })
          })
        }
      },

      // card 头部按钮
      cardEdit() {
        const types = { tower: 'block', floor: 'tower', rooms: 'floor', room: 'rooms' }
        this.onEdit(types[this.the.type], this.the.id, this.model.info)
      },
      cardDel() {
        const types = { tower: 'block', floor: 'tower', rooms: 'floor', room: 'rooms' }
        const names = { tower: 'projectName', floor: 'buildingName', rooms: 'floorName', room: 'roomName' }
        const type = types[this.the.type]
        this.onDelete(type, this.the.id, () => {
          this.onChange('block')
        }, this.model.info[names[this.the.type]])
      },
      cardBack() {
        this.onChange('block', null)
      },

      // 其他
      openTree(key) {
        let tree = _.clone(this.expandedKeys)
        tree.push(key)
        this.expandedKeys = _.uniq(tree)
      }
    },
    computed: mapState({
      parkId: state => state.industrialPark.id
    })
  }
</script>

<style lang="less">
  .yq-building-card {
    .margin-left {
      margin-left: 8px;
    }
  }
</style>
