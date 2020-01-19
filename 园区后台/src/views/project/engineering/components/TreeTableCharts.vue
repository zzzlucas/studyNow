<template>
  <a-card class="tree-table-charts" :title="title">
    <a-button slot="extra" type="primary" @click="formAdd">新增节点</a-button>
    <a-row>
      <a-col span="10">
        <a-table
          size="small"
          class="chart-table"
          bordered
          :expanded-row-keys="expandRows"
          :data-source="list"
          :columns="columns"
          :custom-row="customRow"
          :pagination="false">
          <template slot="planned" slot-scope="{ planStartDate, planEndDate }">
            <span>
              开始：{{ planStartDate }}<br>
              结束：{{ planEndDate }}
            </span>
          </template>
          <template slot="actual" slot-scope="{ actualStartDate, actualEndDate }">
            <span>
              开始：{{ actualStartDate }}<br>
              结束：{{ actualEndDate }}
            </span>
          </template>
        </a-table>
      </a-col>
      <a-col span="14">
        <div class="chart-gantt" v-resize="resize"></div>
      </a-col>
    </a-row>
    <tree-node-modal ref="form" :list="list" @close="reset"></tree-node-modal>
  </a-card>
</template>

<script>
  import Echarts from 'echarts'
  import Dom7 from 'dom7'
  import { chartAxis, chartData, startEndMinMax } from '../js/utils'
  import _ from 'lodash'
  import { getAction } from '@api/manage'
  import { mapState } from 'vuex'
  import moment from 'moment'
  import TreeNodeModal from '../modules/TreeNodeModal'

  export default {
    name: 'TreeTableCharts',
    components: { TreeNodeModal },
    props: {
      id: {
        type: [Number, String],
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        chart: null,
        show: false,
        columns: [
          { title: '名称', dataIndex: 'title' },
          {
            title: '计划时间',
            key: 'planned',
            align: 'center',
            width: 125,
            scopedSlots: { customRender: 'planned' },
            class: 'time-col'
          },
          {
            title: '实际时间',
            key: 'actual',
            align: 'center',
            width: 125,
            scopedSlots: { customRender: 'actual' },
            class: 'time-col'
          }
        ],
        requestData: [],
        list: [],
        expandRows: []
      }
    },
    computed: mapState('industrialPark', {
      parkId: state => state.id
    }),
    mounted() {
      this.show = true

      // noinspection SpellCheckingInspection,JSCheckFunctionSignatures
      this.chart = Echarts.init(Dom7('.tree-table-charts .chart-gantt')[0], null, {
        width: 10,
        height: 10
      })

      this.init()
    },
    methods: {
      http(params, callback) {
        params.parkId = this.parkId
        params.projectId = this.id
        getAction('/park.engineering/mgrEngineeringNode/list', params).then(res => {
          if (res.success && res.code === 200) {
            callback(true, res.result)
          } else {
            callback(false, res.message)
          }
        })
      },
      init() {
        this.http({ pageNo: 1, pageSize: 100 }, (bool, data) => {
          let list = _.compact(_.map(data, row => {
            if (row.parentID) {
              return null
            }

            let res = {
              key: row.nodeId,
              nodeId: row.nodeId,
              parentID: '',
              title: row.title,
              planStartDate: row.planStartDate,
              planEndDate: row.planEndDate,
              planDays: row.planDays || '',
              actualStartDate: row.actualStartDate || '---',
              actualEndDate: row.actualEndDate || '---',
              actualDays: row.actualDays || ''
            }
            this.requestData[res.nodeId] = res

            let children = []
            _.map(data, item => {
              if (res.nodeId === item.parentID) {
                let cRow = {
                  key: item.nodeId,
                  nodeId: item.nodeId,
                  parentID: item.parentID,
                  title: item.title,
                  planStartDate: item.planStartDate,
                  planEndDate: item.planEndDate,
                  planDays: item.planDays || '',
                  actualStartDate: item.actualStartDate || '---',
                  actualEndDate: item.actualEndDate || '---',
                  actualDays: item.actualDays || ''
                }
                this.requestData[cRow.nodeId] = cRow
                children.push(cRow)
              }
            })

            if (children.length > 0) {
              this.expandRows.push(res.nodeId)
              res.children = children
            }

            return res
          }))

          this.list = list

          setTimeout(() => {
            // 主要是切换高度，顺带确认宽度
            this.chart.resize({
              width: Dom7('.chart-gantt').width(),
              height: 36.8 + (_.values(this.requestData).length * Dom7('.chart-table .ant-table-row td').height()) + 55
            })

            if (list.length <= 0) {
              this.chart.setOption({
                title: {
                  text: '项目进度',
                  left: 'center',
                  top: 0
                },
                grid: {
                  top: 36.8,
                  right: '3%',
                  height: list.length * Dom7('.chart-table .ant-table-row td').height()
                },
                dataZoom: [],
                xAxis: {
                  type: 'category',
                  data: []
                },
                calculable: true,
                yAxis: {
                  data: []
                },
                series: [
                  {
                    type: 'custom',
                    encode: {
                      x: [1, 2],
                      y: 0
                    },
                    data: []
                  }
                ]
              })
            } else {
              // 开始时间和结束时间
              let { start, end } = startEndMinMax(_.values(this.requestData), (arr, item, i) => {
                arr.push({
                  index: i,
                  key: 'planStartDate',
                  unix: moment(item.startTime).unix()
                })
                arr.push({
                  index: i,
                  key: 'planEndDate',
                  unix: moment(item.endTime).unix()
                })
              })
              // X轴坐标
              let axis = chartAxis(start, end, (date, i) => {
                list = _.map(_.values(this.requestData), (item) => {
                  let startTime = moment(item.planStartDate)
                  if (date.format('YYYY-MM-DD') === startTime.format('YYYY-MM-DD')) {
                    item.start = i
                  }

                  let endTime = moment(item.planEndDate)

                  if (date.format('YYYY-MM-DD') === endTime.format('YYYY-MM-DD')) {
                    item.end = i
                  }

                  return item
                })
              })
              // 图表数据
              let data = chartData(_.reverse(_.values(this.requestData)))

              this.chart.setOption({
                title: {
                  text: '项目进度',
                  left: 'center',
                  top: 0
                },
                tooltip: {
                  formatter: function(params) {
                    return params.marker + params.name + ': ' + params.value[3] + ' 天<br>' + params.value[4] + params.value[5]
                  }
                },
                grid: {
                  top: 36.8,
                  right: '3%',
                  height: _.values(this.requestData).length * Dom7('.chart-table .ant-table-row td').height()
                },
                dataZoom: [
                  {
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    bottom: 10,
                    height: 10,
                    borderColor: 'transparent',
                    backgroundColor: '#e2e2e2',
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                    handleSize: 15,
                    handleStyle: {
                      shadowBlur: 6,
                      shadowOffsetX: 1,
                      shadowOffsetY: 2,
                      shadowColor: '#aaa'
                    },
                    labelFormatter: ''
                  },
                  {
                    type: 'inside',
                    filterMode: 'weakFilter'
                  }
                ],
                xAxis: {
                  type: 'category',
                  min: 0,
                  scale: true,
                  axisLabel: {
                    formatter: function(val, index) {
                      return axis[index].label
                    }
                  },
                  splitLine: {
                    show: true
                  },
                  data: axis
                },
                calculable: true,
                yAxis: {
                  data: _.reverse(_.map(_.values(this.requestData), item => _.get(item, 'title')))
                },
                series: [
                  {
                    type: 'custom',
                    itemStyle: {
                      normal: {
                        opacity: 0.8
                      }
                    },
                    encode: {
                      x: [1, 2],
                      y: 0
                    },
                    renderItem(params, api) {
                      let categoryIndex = api.value(0)
                      let start = api.coord([api.value(1), categoryIndex])
                      let end = api.coord([api.value(2), categoryIndex])
                      let height = api.size([0, 1])[1] * 0.6

                      let rectShape = Echarts.graphic.clipRectByRect({
                        x: start[0],
                        y: start[1] - height / 2,
                        width: end[0] - start[0],
                        height: height
                      }, {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                      })

                      return {
                        type: 'rect',
                        shape: rectShape,
                        style: {
                          fill: 'rgba(28,149,255,0.8)'
                        },
                        styleEmphasis: {
                          fill: 'rgba(28,149,255,0.9)'
                        }
                      }
                    },
                    data
                  }
                ]
              })
            }
          }, 300)
        })
      },
      resize(size) {
        this.chart.resize({
          width: size.width
        })
      },
      customRow() {
        return {
          on: {
            click: (e) => {
              let id = Dom7(e.currentTarget).data('row-key')
              this.$refs.form.edit(_.merge({}, this.requestData[id]))
            }
          }
        }
      },
      formAdd() {
        this.$refs.form.add({
          parkId: this.parkId,
          projectId: this.id
        })
      },
      reset(bool) {
        if (bool) {
          this.init()
        }
      }
    },
    watch: {
      'id'(id) {
        if (id === '') {
          this.$message.warning('没有拿到项目ID')
          this.list = []
        } else {
          if (this.show) {
            this.init()
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .tree-table-charts {
    .chart-table {
      .ant-table-row {
        cursor: pointer;

        .ant-table-row-expand-icon {
          display: none;
        }

        td.time-col {
          font-size: 13px;
        }
      }
    }
  }
</style>
