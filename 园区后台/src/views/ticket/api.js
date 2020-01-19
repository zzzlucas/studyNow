import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  info: {
    list: '/workorder/mgrWorkorderInfo/list',
    add: '/workorder/mgrWorkorderInfo/add_{:id}', // Need replace {:id} to order type
    edit: '/workorder/mgrWorkorderInfo/edit',
    delete: '/workorder/mgrWorkorderInfo/delete',
    deleteBatch: '/workorder/mgrWorkorderInfo/deleteBatch',
    view: '/workorder/mgrWorkorderInfo/showDetail',
    detail: '/workorder/mgrWorkorderInfo/queryById',
    changeStatus: '/workorder/mgrWorkorderInfo/changeStatus',
  },
  operate: {
    listProcess: '/park.workorder/mgrOrderOperate/list1',
    listFeedback: '/park.workorder/mgrOrderOperate/list2',
    viewProcess: '/park.workorder/mgrOrderOperate/list1',
    viewFeedback: '/park.workorder/mgrOrderOperate/list2',
    view: '/park.workorder/mgrOrderOperate/queryById',
    addProcess: '/park.workorder/mgrOrderOperate/add',
    addFeedback: '/park.workorder/mgrOrderOperate/addRemark',
    edit: '/park.workorder/mgrOrderOperate/edit',
  },
}

/** 工单基本信息-新建**工单 */
const addInfo = (type, params) => postAction(url.info.add.replace('{:id}', type), qs.stringify(params))
/** 工单基本信息-编辑 */
const editInfo = params => putAction(url.info.edit, qs.stringify(params))
/** 工单基本信息-工单详情 */
const viewInfo = params => getAction(url.info.view, params)
/** 工单基本信息-工单状态管理 */
const changeStatusInfo = params => putAction(url.info.changeStatus, qs.stringify(params))
/** 工单处理记录-查询 */
const listOperateProcess = params => getAction(url.operate.listProcess, params)
/** 工单处理记录-查询 */
const listOperateFeedback = params => getAction(url.operate.listFeedback, params)
/** 工单处理记录-添加 */
const addOperateProcess = params => postAction(url.operate.addProcess, qs.stringify(params))
/** 工单反馈记录-添加 */
const addOperateFeedback = params => postAction(url.operate.addFeedback, qs.stringify(params))

export {
  url,
  addInfo,
  editInfo,
  viewInfo,
  changeStatusInfo,
  listOperateProcess,
  listOperateFeedback,
  addOperateProcess,
  addOperateFeedback,
}