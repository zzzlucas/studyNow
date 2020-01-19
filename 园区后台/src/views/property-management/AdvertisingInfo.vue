<template>
  <page-layout :title="data.advertName">
    <template slot="action">
      <a-button type="primary" @click="handleEdit">编辑</a-button>
    </template>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}">
      <template v-if="activeTabKey === 'basic'">
        <detail-list>
          <detail-list-item term="广告位名称">{{ data.advertName }}</detail-list-item>
          <detail-list-item term="所属建筑项目">{{ data.buildingName }}</detail-list-item>
          <detail-list-item term="详细地址">{{ data.projectName }}/{{ data.buildingName }}/{{ data.floorName }}/{{ data.address }}</detail-list-item>
          <detail-list-item term="占地面积">{{ data.chargingArea }}m<sup>2</sup></detail-list-item>
        </detail-list>
        <detail-list v-if="data.price">
          <detail-list-item term="收费单价">{{ data.price }}</detail-list-item>
          <detail-list-item term="收费单位">{{ unit }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="联系人">{{ data.contactPerson }}</detail-list-item>
          <detail-list-item term="联系电话">{{ data.contactTel }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="预定须知">{{ data.remarks }}</detail-list-item>
        </detail-list>
        <detail-list>
          <detail-list-item term="广告位详情">{{ data.summary }}</detail-list-item>
        </detail-list>
      </template>
    </a-card>
    <!-- Add/Edit form -->
    <advertising-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </page-layout>
</template>

<script>
  import PageLayout from '@/components/page/PageLayout'
  import DetailList from '@/components/tools/DetailList'
  import JUpload from '@/components/jeecg/JUpload'
  import AdvertisingEditForm from './components/AdvertisingEditForm'
  import ViewMixin, { lifeCycle as ViewLifeCycle } from '@/mixins/View'
  import { url } from './api'
  import { filterDictText } from '@comp/dict/JDictSelectUtil'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewMixin,
      ViewLifeCycle,
    ],
    components: {
      PageLayout,
      DetailList,
      DetailListItem,
      JUpload,
      AdvertisingEditForm,
    },
    data() {
      return {
        // Types
        dictesCreateFields: ['advert_price_unit'],
        // Url
        url: url.advertisingPlace,
        // Tab
        tabList: [
          {
            key: 'basic',
            tab: '基本信息'
          },
        ],
        activeTabKey: 'basic',
      }
    },
    computed: {
      unit() {
        if (!this.types.advert_price_unit || !this.data.unit) {
          return ''
        }
        return filterDictText(this.types.advert_price_unit, this.data.unit)
      },
    },
    methods: {
      // Route
      getRouteParams() {
        return { id: this.$route.params.id }
      },
      // Edit submit
      async handleEditSubmit() {
        this.loadData()
      },
    },
  }
</script>
