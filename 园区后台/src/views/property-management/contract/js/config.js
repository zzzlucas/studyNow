import { filterDictText } from '@comp/dict/JDictSelectUtil'
import numeral from 'numeral'

export const columns = function() {
  return [
    {
      title: '合同编号',
      dataIndex: 'contractNo'
    },
    {
      title: '客户名称',
      dataIndex: 'custName'
    },
    {
      title: '甲方',
      dataIndex: 'firstParty',
      customRender: (text) => {
        return filterDictText(this.dict.firstParty, text)
      }
    },
    {
      title: '保证金',
      dataIndex: 'deposit',
      customRender: text => numeral(text).format('0.00')
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
      title: '操作',
      key: 'action',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]
}
