import _ from 'lodash'
import moment from 'moment'

export function chartAxis(start, end, callback) {
  let len = Math.ceil(moment(end).add(1, 'd').diff(moment(start), 'd', true))

  let arr = new Array(len)
  let date = moment(start)
  date.hours(0)
  date.minutes(0)
  date.seconds(0)
  date.milliseconds(0)

  arr = _.map(arr, (a, i) => {
    let label = date.format('YYYY-MM-DD')

    let data = {
      value: i,
      label
    }

    callback(date, i, moment)

    date.add(1, 'd')
    return data
  })

  return arr
}

export function startEndMinMax(list, callback) {
  let arr = []
  _.map(list, (item, i) => {
    callback(arr, item, i, moment)
  })

  let arr2 = _.sortBy(arr, 'unix')

  let start = list[_.head(arr2).index][_.head(arr2).key]
  let end = list[_.last(arr2).index][_.last(arr2).key]

  return { start, end }
}

export function chartData(list) {
  let arr = []
  _.map(list, (item, i) => {
    arr.push({
      name: item.title,
      value: [
        i,
        item.start,
        item.end,
        item.end - item.start,
        '开始时间：' + item.planStartDate + '<br>',
        '结束时间：' + item.planEndDate + '<br>'
      ],
      itemStyle: {
        normal: {
          color: 'rgb(28,149,255)'
        }
      }
    })
  })

  return arr
}
