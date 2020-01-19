import { getAction, postAction, putAction, deleteAction } from '@/api/manage'
import qs from 'qs'

const url = {
  architectureProject: {
    list: '/park.architecture/baseArchitectureProject/queryByParkId',
  },
  architectureBuilding: {
    list: '/park.architecture/baseArchitectureBuilding/queryBuildingList',
  },
  architectureFloor: {
    list: '/park.architecture/baseArchitectureFloor/queryByBuildingId',
  },
  advertisingPlace: {
    list: '/park.service/baseAdvertsInfo/list',
    view: '/park.service/baseAdvertsInfo/queryById',
    add: '/park.service/baseAdvertsInfo/add',
    edit: '/park.service/baseAdvertsInfo/edit',
    delete: '/park.service/baseAdvertsInfo/delete',
    deleteBatch: '/park.service/baseAdvertsInfo/deleteBatch',
  },
  advertisingEvent: {
    list: '/park.service/mgrAdvertsRequest/list',
    view: '/park.service/mgrAdvertsRequest/queryById',
    add: '/park.service/mgrAdvertsRequest/add',
    edit: '/park.service/mgrAdvertsRequest/edit',
    delete: '/park.service/mgrAdvertsRequest/delete',
    deleteBatch: '/park.service/mgrAdvertsRequest/deleteBatch',
    calc: '/park.service/mgrAdvertsRequest/calculate',
  },
  meetingRoom: {
    list: '/park.service/baseMeetingroomInfo/list',
    view: '/park.service/baseMeetingroomInfo/queryById',
    add: '/park.service/baseMeetingroomInfo/add',
    edit: '/park.service/baseMeetingroomInfo/edit',
    delete: '/park.service/baseMeetingroomInfo/delete',
    deleteBatch: '/park.service/baseMeetingroomInfo/deleteBatch',
  },
  meetingEvent: {
    view: '/park.service/mgrMeetingroomRequest/queryById',
    list: '/park.service/mgrMeetingroomRequest/listUser',
    add: '/park.service/mgrMeetingroomRequest/add',
    edit: '/park.service/mgrMeetingroomRequest/edit',
    delete: '/park.service/mgrMeetingroomRequest/delete',
    deleteBatch: '/park.service/mgrMeetingroomRequest/deleteBatch',
  },
  book: {
    list: '/park.service/mgrAdvertsRequest/list',
    review: '/park.service/mgrAdvertsRequest/review',
  },
}

/** 厂房项目列表-通过园区id查询- */
const listProject = params => getAction(url.architectureProject.list, params)
/** 楼宇列表-通过项目id查询 */
const listBuilding = params => getAction(url.architectureBuilding.list, params)
/** 楼层列表-通过楼宇id查询 */
const listFloor = params => getAction(url.architectureFloor.list, params)
/** 广告位建档-添加 */
const addAdPlace = params => postAction(url.advertisingPlace.add, qs.stringify(params))
/** 广告位建档-编辑 */
const editAdPlace = params => putAction(url.advertisingPlace.edit, qs.stringify(params))
/** 会议室建档-通过id查询 */
const viewAdPlace = params => getAction(url.advertisingPlace.view, params)
/** 广告位建档-分页列表查询 */
const listAdPlace = params => getAction(url.advertisingPlace.list, params)
/** 广告位预定-添加 */
const addAdEvent = params => postAction(url.advertisingEvent.add, qs.stringify(params))
/** 广告位预定-编辑 */
const editAdEvent = params => putAction(url.advertisingEvent.edit, qs.stringify(params))
/** 广告位预定-通过id查询 */
const viewAdEvent = params => getAction(url.advertisingEvent.view, params)
/** 广告位预定-计算总价格 */
const calcPriceAdEvent = params => getAction(url.advertisingEvent.calc, params)
/** 会议室建档-添加 */
const addMeetingRoom = params => postAction(url.meetingRoom.add, qs.stringify(params))
/** 会议室建档-编辑 */
const editMeetingRoom = params => putAction(url.meetingRoom.edit, qs.stringify(params))
/** 会议室建档-通过id查询 */
const viewMeetingRoom = params => getAction(url.meetingRoom.view, params)
/** 会议室建档-分页列表查询 */
const listMeetingRoom = params => getAction(url.meetingRoom.list, params)
/** 会议室预定-全部查询 */
const listMeetingEvent = params => getAction(url.meetingEvent.list, params)
/** 会议室预定-添加 */
const addMeetingEvent = params => postAction(url.meetingEvent.add, qs.stringify(params))
/** 会议室预定-编辑 */
const editMeetingEvent = params => putAction(url.meetingEvent.edit, qs.stringify(params))
/** 会议室预定-删除 */
const deleteMeetingEvent = params => deleteAction(url.meetingEvent.delete, params)
/** 会议室预定-通过id查询 */
const viewMeetingEvent = params => getAction(url.meetingEvent.view, params)
/** 会议室设备-列表 */
const listRoomEquipment = deviceGroupId => getAction('/park.middletables/pubLabelGroup/queryById', { id: deviceGroupId } )
/** 空间预订-分页查询 */
const listBook = params => getAction(url.book.list, params)
/** 空间预订-审核 */
const reviewBook = params => putAction(url.book.review, qs.stringify(params))

export {
  url,
  listProject,
  listBuilding,
  listFloor,
  addAdPlace,
  editAdPlace,
  viewAdPlace,
  listAdPlace,
  addAdEvent,
  editAdEvent,
  viewAdEvent,
  calcPriceAdEvent,
  listMeetingRoom,
  addMeetingRoom,
  editMeetingRoom,
  viewMeetingRoom,
  listMeetingEvent,
  addMeetingEvent,
  editMeetingEvent,
  deleteMeetingEvent,
  viewMeetingEvent,
  listRoomEquipment,
  listBook,
  reviewBook,
}
