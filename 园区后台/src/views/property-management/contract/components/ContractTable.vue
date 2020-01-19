<template>
  <div>
    <a-table
      class="contract-table"
      style="background-color: #fff;"
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false">

      <template v-slot:title>
        <h3 v-text="title" class="table-title"></h3>
      </template>
      <!--物业位置-->
      <template v-slot:roomName="row">
        <a-input
          placeholder="单击选择房间"
          :value="row.roomName"
          @click="openGetRoom(row.index)"/>
      </template>
      <!--面积-->
      <template v-slot:area="row">
        <a-input disabled :value="row.area"/>
      </template>
      <!--付费方式-->
      <template v-slot:costType="row">
        <a-select :value="row.costType || '1'" @change="onChange(row.index, 'costType', ...arguments)">
          <a-select-option value="1">付费期</a-select-option>
          <a-select-option value="2">免租期</a-select-option>
        </a-select>
      </template>
      <!--开始时间-->
      <template v-slot:startDate="row">
        <a-date-picker
          :value="date2Moment(row.startDate)"
          @change="onChange(row.index, 'startDate', ...arguments)"></a-date-picker>
      </template>
      <!--结束时间-->
      <template v-slot:endDate="row">
        <a-date-picker
          :value="date2Moment(row.endDate)"
          @change="onChange(row.index, 'endDate', ...arguments)"></a-date-picker>
      </template>
      <!--费用-->
      <template v-slot:cost="row">
        <a-input :value="row.cost" @change="onChange(row.index, 'cost', ...arguments)">
          <template v-slot:addonAfter>
            <a-select
              style="width: 90px;"
              :value="row.costUnit || unit[0].value"
              @change="onChange(row.index, 'costUnit', ...arguments)">
              <a-select-option v-for="(item, key) in unit" :value="item.value" :key="key">{{ item.text }}
              </a-select-option>
            </a-select>
          </template>
        </a-input>
      </template>
      <!--删除按钮-->
      <template v-slot:delete="row">
        <a-popconfirm
          placement="topLeft"
          arrowPointAtCenter
          autoAdjustOverflow
          :title="`是否删除第 ${row.index} 行`"
          @confirm="deleteRow(row.index)">
          <a href="javascript:">
            <a-icon type="delete"/>
          </a>
        </a-popconfirm>
      </template>
      <template v-slot:addIcon>
        <a-icon
          type="plus-circle"
          theme="filled"
          style="font-size: 16px; color: #00A0E9; cursor: pointer;"
          @click="addRow"/>
      </template>
    </a-table>
    <yq-get-room v-model="roomShow" @close="roomClose" @change="getRoom"></yq-get-room>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  import { ajaxGetDictItems } from '@api/api'
  import YqGetRoom from '@comp/extend/YqGetRoom'

  export default {
    name: 'ContractTable',
    components: { YqGetRoom },
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        defaultRow: {
          roomName: '',
          area: '',
          costType: '',
          startDate: '',
          endDate: '',
          cost: '',
          costUnit: '',
          _error_: []
        },
        columns: [
          {
            title: '#',
            width: 50,
            align: 'center',
            dataIndex: 'index'
          },
          {
            title: '物业位置',
            key: 'roomName',
            scopedSlots: {
              customRender: 'roomName'
            },
            customCell: this.cellOptions.bind(this, 'roomName')
          },
          {
            title: '面积(㎡)',
            key: 'area',
            width: 200,
            scopedSlots: {
              customRender: 'area'
            }
          },
          {
            title: '付费类型',
            key: 'costType',
            width: 150,
            scopedSlots: {
              customRender: 'costType'
            }
          },
          {
            title: '开始日期',
            key: 'startDate',
            width: 180,
            scopedSlots: {
              customRender: 'startDate'
            },
            customCell: this.cellOptions.bind(this, 'startDate')
          },
          {
            title: '结束日期',
            key: 'endDate',
            width: 180,
            scopedSlots: {
              customRender: 'endDate'
            },
            customCell: this.cellOptions.bind(this, 'endDate')
          },
          {
            title: '费用',
            key: 'cost',
            width: 360,
            scopedSlots: {
              customRender: 'cost'
            },
            customCell: this.cellOptions.bind(this, 'cost')
          },
          {
            key: 'delete',
            width: 60,
            align: 'center',
            scopedSlots: {
              customRender: 'delete'
            },
            slots: { title: 'addIcon' }
          }
        ],
        dataSource: [],
        unit: [],
        roomShow: false,
        roomIndex: 0
      }
    },
    async created() {
      let defaultRow = _.merge({ type: this.type, index: 1 }, this.defaultRow)
      this.defaultRow = defaultRow
      this.dataSource = [_.merge({}, defaultRow)]

      let res = await ajaxGetDictItems('contract_room_fee_unit')
      if (res.success) {
        this.unit = res.result
      } else {
        this.$notification.error({
          description: '费用单位获取失败',
          onClose: () => {
            this.$emit('close')
          }
        })
      }
    },
    methods: {
      date2Moment(date) {
        if (date === '' || date === null || date === undefined) {
          return null
        }

        return moment(date)
      },
      addRow() {
        let index = _.get(_.last(this.dataSource), 'index', 1)
        let row = _.merge({}, this.defaultRow)
        row.index = index + 1
        this.$set(this.dataSource, index, row)
      },
      deleteRow(index) {
        let data = _.merge({}, this.dataSource)
        data = _.filter(data, row => {
          return row.index !== index
        })
        let i = 1
        _.map(data, row => {
          row.index = i++
          return row
        })
        this.dataSource = data
      },
      onChange: function(index, type, ...arg) {
        const setValue = value => {
          let row = _.merge({}, this.dataSource[index - 1])
          if (row._error_.indexOf(type) !== -1) {
            row._error_ = _.pull(row._error_, type)
            this.$set(this.dataSource[index - 1], '_error_', row._error_)
          }
          this.$set(this.dataSource[index - 1], type, value)
        }

        switch (type) {
          case 'roomName': {
            let [namePath, roomId] = arg
            setValue(namePath)
            this.$set(this.dataSource[index - 1], 'roomId', roomId)
            break
          }
          case 'area': {
            let [area] = arg
            setValue(area)
            break
          }
          case 'cost': {
            let [e] = arg
            setValue(e.currentTarget.value)
            break
          }
          case 'costUnit':
          case 'costType': {
            let [value] = arg
            setValue(value)
            break
          }
          case 'startDate':
          case 'endDate': {
            let [date] = arg
            setValue(date)
            break
          }
        }
      },
      cellOptions: (key, row) => {
        if (row._error_.indexOf(key) !== -1) {
          return {
            class: 'has-error'
          }
        }

        return {}
      },
      openGetRoom(index) {
        this.roomIndex = index
        this.roomShow = true
      },
      roomClose() {
        this.roomIndex = 0
      },
      getRoom(namePath, idPath, room) {
        this.onChange(this.roomIndex, 'roomName', namePath, idPath.roomId)
        this.onChange(this.roomIndex, 'area', room.chargingArea)
      },
      getData() {
        let list = []
        try {
          list = _.merge([], this.dataSource)
          _.map(list, row => {
            if (row.roomName === '') {
              row._error_.push('roomName')
            }
            if (!moment.isMoment(row.startDate)) {
              row._error_.push('startDate')
            }
            if (!moment.isMoment(row.endDate)) {
              row._error_.push('endDate')
            }
            if (row.cost === '') {
              row._error_.push('cost')
            }
            return row
          })

          _.map(list, row => {
            if (row._error_.length > 0) {
              throw new Error('请填写完整')
            }
          })
          return _.map(_.merge([], this.dataSource), row => {
            row.startDate = row.startDate.format('YYYY-MM-DD')
            row.endDate = row.endDate.format('YYYY-MM-DD')
            return row
          })
        } catch (e) {
          console.error(e)
          this.dataSource = list
          return false
        }
      }
    },
    watch: {
      'list'(list) {
        if (list) {
          this.dataSource = []
          this.$nextTick(() => {
            this.dataSource = _.merge([], _.map(this.list, row => {
              row.startDate = moment(row.startDate)
              row.endDate = moment(row.endDate)
              row._error_ = []
              return row
            }))
          })
        } else {
          this.dataSource = [_.merge({}, this.defaultRow)]
        }
      }
    }
  }
</script>

<style lang="less">
  .contract-table {
    .table-title {
      margin: 0;
      padding-left: 1em;
    }

    .ant-select, .ant-calendar-picker {
      width: 100%;
    }

    .ant-table-row {
      .anticon.anticon-delete {
        display: none;
        cursor: pointer;
        color: #00A0E9;
      }

      &:hover {
        .anticon.anticon-delete {
          display: inline-block;
        }
      }
    }
  }
</style>
