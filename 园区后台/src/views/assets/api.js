import { getAction, postAction, putAction } from '@/api/manage'
import qs from 'qs'

const url = {
  category: {
    list: '/park.asset/baseAssetCategory/list',
    treeList: '/park.asset/baseAssetCategory/treeList',
    add: '/park.asset/baseAssetCategory/add',
    edit: '/park.asset/baseAssetCategory/edit',
    delete: '/park.asset/baseAssetCategory/delete',
    deleteBatch: '/park.asset/baseAssetCategory/deleteBatch',
  },
  info: {
    list: '/park.asset/baseAssetInfo/list',
    add: '/park.asset/baseAssetInfo/add',
    edit: '/park.asset/baseAssetInfo/edit',
    delete: '/park.asset/baseAssetInfo/delete',
    deleteBatch: '/park.asset/baseAssetInfo/deleteBatch',
    exportXlsUrl: '/park.asset/baseAssetInfo/exportXls',
    importExcelUrl: '/park.asset/baseAssetInfo/importExcel',
  },
  opertion: {
    list: '/park.asset/mgrAssetOpertion/list',
    view: '/park.asset/mgrAssetOpertion/queryById',
    add: '/park.asset/mgrAssetOpertion/add',
    edit: '/park.asset/mgrAssetOpertion/edit',
    delete: '/park.asset/mgrAssetOpertion/delete',
    deleteBatch: '/park.asset/mgrAssetOpertion/deleteBatch',
  },
  consumingDetail: {
    view: '/park.asset/mgrAssetConsumingDetail/queryByOpertionId',
  }
}

/** 资产类别-查询所有树中类别 */
const treeListCategory = params => getAction(url.category.treeList, params)
/** 资产类别-添加 */
const addCategory = params => postAction(url.category.add, qs.stringify(params))
/** 资产类别-编辑 */
const editCategory = params => putAction(url.category.edit, qs.stringify(params))
/** 资产建档-添加 */
const addInfo = params => postAction(url.info.add, qs.stringify(params))
/** 资产建档-编辑 */
const editInfo = params => putAction(url.info.edit, qs.stringify(params))
/** 资产使用基本信息--查询 */
const viewOpertion = params => getAction(url.opertion.view, params)
/** 资产使用基本信息--通过id查询 */
const addOpertion = params => postAction(url.opertion.add, qs.stringify(params))
/** 资产使用基本信息--编辑 */
const editOpertion = params => putAction(url.opertion.edit, qs.stringify(params))
/** 资产使用明细-通过id查询 */
const viewConsumingDetail = params => getAction(url.consumingDetail.view, params)

export {
  url,
  treeListCategory,
  addCategory,
  editCategory,
  addInfo,
  editInfo,
  viewOpertion,
  addOpertion,
  editOpertion,
  viewConsumingDetail,
}
