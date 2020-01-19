import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import Layout from '@comp/layout/index'
import HomeIndex from '@page/home/index'
import LoginIndex from '@page/login/index'
import ActivityIndex from '@page/activity/index'
import MessageIndex from '@page/message/MessageIndex'
import MessageDetail from '@page/message/MessageDetail'
import RecruitmentIndex from '@page/message/RecruitmentIndex'
import RecruitmentDetail from '@page/message/RecruitmentDetail'
import PolicyIndex from '@page/policy/index'
import PolicyDetail from '@page/policy/Detail'
import ActivityView from '@page/activity/view'
import TenementRepairsStep1 from '@page/serve/TenementRepairs/step1'
import TenementRepairsStep2 from '@page/serve/TenementRepairs/step2'
import TenementAppealStep1 from '@page/serve/TenementAppeal/step1'
import TenementAppealStep2 from '@page/serve/TenementAppeal/step2'
import DemandSubmissionStep1 from '@page/serve/DemandSubmission/step1'
import DemandSubmissionStep2 from '@page/serve/DemandSubmission/step2'
import ParkingApplyStep1 from '@page/serve/ParkingApply/step1'
import ParkingApplyStep2 from '@page/serve/ParkingApply/step2'
import ItRepairsStep1 from '@page/serve/ItRepairs/step1'
import ItRepairsStep2 from '@page/serve/ItRepairs/step2'
import AdvertisingApplyStep1 from '@page/serve/AdvertisingApply/step1'
import AdvertisingApplyStep2 from '@page/serve/AdvertisingApply/step2'
import PublicFacilitiesStep1 from '@page/serve/PublicFacilities/step1'
import PublicFacilitiesStep2 from '@page/serve/PublicFacilities/step2'
import EnterprisesRecordStep1 from '@page/serve/EnterprisesRecord/step1'
import EnterprisesRecordStep2 from '@page/serve/EnterprisesRecord/step2'
import RubbishDispositionStep1 from '@page/serve/RubbishDisposition/step1'
import RubbishDispositionStep2 from '@page/serve/RubbishDisposition/step2'
import UrbanRoadStep1 from '@page/serve/UrbanRoad/step1'
import UrbanRoadStep2 from '@page/serve/UrbanRoad/step2'
import NewLandProjectStep1 from '@page/serve/NewLandProject/step1'
import NewLandProjectStep2 from '@page/serve/NewLandProject/step2'
import NextLandProjectStep1 from '@page/serve/NextLandProject/step1'
import NextLandProjectStep2 from '@page/serve/NextLandProject/step2'
import NextRentalProjectStep1 from '@page/serve/NextRentalProject/step1'
import NextRentalProjectStep2 from '@page/serve/NextRentalProject/step2'

import NewRentalProjectStep1 from '@page/serve/NewRentalProject/step1'
import NewRentalProjectStep2 from '@page/serve/NewRentalProject/step2'
import NewTechProjectStep1 from '@page/serve/NewTechProject/step1'
import NewTechProjectStep2 from '@page/serve/NewTechProject/step2'
import ConferenceReservation from '@page/serve/ConferenceReservation/List'
import ConferenceReservationDetail from '@page/serve/ConferenceReservation/Detail'
import AdvertisingReservation from '@page/serve/AdvertisingReservation/List'
import PersonCenter from '@page/person/PersonCenter'
import PersonCenterActivityList from '@page/person/pages/ActivityList'
import PersonCenterEventBook from '@page/person/pages/EventBook'
import PersonCenterMessageList from '@page/person/pages/MessageList'
import PersonCenterProjectList from '@page/person/pages/ProjectList'
import PersonCenterServiceRecord from '@page/person/pages/ServiceRecord'
import PersonCenterSurveyList from '@page/person/pages/SurveyList'
import PersonCenterParkManage from '@page/person/pages/ParkManage'
import PersonCenterAccountSetting from '@page/person/pages/AccountSetting'
import FAQ from '@page/FAQ/List'

import serList from '@page/person/pages/serList'
import proDeta from '@page/person/pages/proListDetail'
import ParkDetail from '@page/person/pages/ParkDetail'
import survertDetail from '@page/person/pages/survertDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: { name: 'HomeIndex' },
      children: [
        { path: '', name: 'HomeIndex', component: HomeIndex },
        { path: 'login/index', name: 'LoginIndex', component: LoginIndex },
        //活动
        { path: 'activity/index', name: 'ActivityIndex', component: ActivityIndex },
        { path: 'activity/view/:id', name: 'ActivityView', component: ActivityView },
        //新闻资讯
        { path: 'message/index/:id', name: 'MessageIndex', component: MessageIndex },
        { path: 'message/detail/:id', name: 'MessageDetail', component: MessageDetail },
        //招聘
        { path: 'message/RecruitmentIndex', name: 'RecruitmentIndex', component: RecruitmentIndex },
        { path: 'message/RecruitmentDetail/:id', name: 'RecruitmentDetail', component: RecruitmentDetail },
        //政策
        { path: 'policy/index', name: 'PolicyIndex', component: PolicyIndex },
        { path: 'policy/detail/:id', name: 'PolicyDetail', component: PolicyDetail },
        //物业报修
        { path: 'serve/TenementRepairs/step1', name: 'TenementRepairsStep1', component: TenementRepairsStep1 },
        { path: 'serve/TenementRepairs/step2', name: 'TenementRepairsStep2', component: TenementRepairsStep2 },
        //物业申诉
        { path: 'serve/TenementAppeal/step1', name: 'TenementAppealStep1', component: TenementAppealStep1 },
        { path: 'serve/TenementAppeal/step2', name: 'TenementAppealStep2', component: TenementAppealStep2 },
        //需求申请
        { path: 'serve/DemandSubmission/step1', name: 'DemandSubmissionStep1', component: DemandSubmissionStep1 },
        { path: 'serve/DemandSubmission/step2', name: 'DemandSubmissionStep2', component: DemandSubmissionStep2 },
        //停车位
        { path: 'serve/ParkingApply/step1', name: 'ParkingApplyStep1', component: ParkingApplyStep1 },
        { path: 'serve/ParkingApply/step2', name: 'ParkingApplyStep2', component: ParkingApplyStep2 },
        //IT报修
        { path: 'serve/ItRepairs/step1', name: 'ItRepairsStep1', component: ItRepairsStep1 },
        { path: 'serve/ItRepairs/step2', name: 'ItRepairsStep2', component: ItRepairsStep2 },
        //广告服务申请
        { path: 'serve/AdvertisingApply/step1/:id', name: 'AdvertisingApplyStep1', component: AdvertisingApplyStep1 },
        { path: 'serve/AdvertisingApply/step2', name: 'AdvertisingApplyStep2', component: AdvertisingApplyStep2 },
        //公共设施
        { path: 'serve/PublicFacilities/step1', name: 'PublicFacilitiesStep1', component: PublicFacilitiesStep1 },
        { path: 'serve/PublicFacilities/step2', name: 'PublicFacilitiesStep2', component: PublicFacilitiesStep2 },
        //施工企业备案
        { path: 'serve/EnterprisesRecord/step1', name: 'EnterprisesRecordStep1', component: EnterprisesRecordStep1 },
        { path: 'serve/EnterprisesRecord/step2', name: 'EnterprisesRecordStep2', component: EnterprisesRecordStep2 },
        //建筑垃圾
        { path: 'serve/RubbishDisposition/step1', name: 'RubbishDispositionStep1', component: RubbishDispositionStep1 },
        { path: 'serve/RubbishDisposition/step2', name: 'RubbishDispositionStep2', component: RubbishDispositionStep2 },
        //占用道路
        { path: 'serve/UrbanRoad/step1', name: 'UrbanRoadStep1', component: UrbanRoadStep1 },
        { path: 'serve/UrbanRoad/step2', name: 'UrbanRoadStep2', component: UrbanRoadStep2 },
        //新增拿地
        { path: 'serve/NewLandProject/step1', name: 'NewLandProjectStep1', component: NewLandProjectStep1 },
        { path: 'serve/NewLandProject/step2', name: 'NewLandProjectStep2', component: NewLandProjectStep2 },
        //拿地二次申请
        { path: 'serve/NextLandProject/step1', name: 'NextLandProjectStep1', component: NextLandProjectStep1 },
        { path: 'serve/NextLandProject/step2', name: 'NextLandProjectStep2', component: NextLandProjectStep2 },
        //新增租赁
        { path: 'serve/NewRentalProject/step1', name: 'NewRentalProjectStep1', component: NewRentalProjectStep1 },
        { path: 'serve/NewRentalProject/step2', name: 'NewRentalProjectStep2', component: NewRentalProjectStep2 },
        //租赁二次申请
        { path: 'serve/NextRentalProject/step1', name: 'NextRentalProjectStep1', component: NextRentalProjectStep1 },
        { path: 'serve/NextRentalProject/step2', name: 'NextRentalProjectStep2', component: NextRentalProjectStep2 },
        //新增技改
        { path: 'serve/NewTechProject/step1', name: 'NewTechProjectStep1', component: NewTechProjectStep1 },
        { path: 'serve/NewTechProject/step2', name: 'NewTechProjectStep2', component: NewTechProjectStep2 },
        //会议室
        { path: 'serve/ConferenceReservation', name: 'ConferenceReservation', component: ConferenceReservation },
        { path: 'serve/ConferenceReservationDetail/:id', name: 'ConferenceReservationDetail', component: ConferenceReservationDetail },
        //广告位
        { path: 'serve/AdvertisingReservation', name: 'AdvertisingReservation', component: AdvertisingReservation },
        //FAQ
        { path: 'FAQ', name: 'FAQ', component: FAQ },
        //用户中心
        {
          path: 'user-center',
          name: 'UserCenter',
          component: PersonCenter,
          children: [
            { path: 'activity-list', name: 'UserCenterActivityList', component: PersonCenterActivityList },
            { path: 'event-book', name: 'UserCenterBookList', component: PersonCenterEventBook },
            { path: 'message-list', name: 'UserCenterMessageList', component: PersonCenterMessageList },
            { path: 'project-list', name: 'UserCenterProjectList', component: PersonCenterProjectList },
            { path: 'service-record', name: 'UserCenterServiceRecord', component: PersonCenterServiceRecord },
            { path: 'survey-list', name: 'UserCenterSurveyList', component: PersonCenterSurveyList },
            { path: 'park-manage', name: 'UserCenterParkManage', component: PersonCenterParkManage },
            { path: 'account-setting', name: 'UserCenterAccountSetting', component: PersonCenterAccountSetting },

            { path: 'ser-list', name: 'serList', component: serList },
            { path: 'proDeta', name: 'proDeta', component: proDeta },
            { path: 'ParkDetail', name: 'ParkDetail', component: ParkDetail },
            { path: 'survertDetail', name: 'survertDetail', component: survertDetail }
          ],
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Redirect to HomeIndex if user isLogin = true already on LoginIndex
  if (to.name === 'LoginIndex' && store.getters.isLogin) {
    next({ name: 'HomeIndex' })
    return
  }
  // Redirect to LoginIndex if user isLogin = false on UserCenter*
  if (to.name.indexOf('UserCenter') === 0 && !store.getters.isLogin) {
    next({ name: 'LoginIndex', query: { redirect: to.fullPath } })
    return
  }
  next()
})

export default router
