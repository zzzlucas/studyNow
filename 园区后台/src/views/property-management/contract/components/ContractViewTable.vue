<template>
  <div>
    <a-table
      class="contract-table"
      style="background-color: #fff;"
      size="small"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false">
      <template v-slot:cost="row">
        &yen; {{ toFixed(row.cost) }} {{ filterDictText(unit, row.costUnit) }}
      </template>
    </a-table>
  </div>
</template>

<script>
  import numeral from 'numeral'
  import { ajaxGetDictItems } from '@api/api'
  import { filterDictText } from '@comp/dict/JDictSelectUtil'

  export default {
    name: 'ContractViewTable',
    props: {
      title: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        load: true,
        columns: [
          {
            title: '#',
            width: 50,
            align: 'center',
            dataIndex: 'index'
          },
          {
            title: '物业位置',
            dataIndex: 'roomName',
            width: 330
          },
          {
            title: '面积(㎡)',
            dataIndex: 'area',
            width: 200
          },
          {
            title: '付费类型',
            dataIndex: 'costType',
            width: 150,
            customRender(text){
              return [null, '付费期', '免租期'][Number(text)]
            }
          },
          {
            title: '开始日期',
            dataIndex: 'startDate'
          },
          {
            title: '结束日期',
            dataIndex: 'endDate'
          },
          {
            title: '费用',
            key: 'cost',
            width: 180,
            scopedSlots: {
              customRender: 'cost'
            }
          }
        ],
        dataSource: [],
        unit: []
      }
    },
    async created() {
      let defaultRow = _.merge({ type: this.type, index: 1 }, this.defaultRow)
      this.defaultRow = defaultRow
      this.dataSource = [_.merge({}, defaultRow)]

      let res = await ajaxGetDictItems('contract_room_fee_unit')
      if (res.success) {
        this.load = false
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
      filterDictText,
      toFixed(number){
        return numeral(number).format('0.00')
      }
    },
    watch: {
      'list'(list){
        this.dataSource = this.load ? [] : list
      },
      'unit'(){
        this.dataSource = this.list
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
