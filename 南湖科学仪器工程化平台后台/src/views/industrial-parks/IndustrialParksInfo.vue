<template>
  <a-card :bordered="false" :loading="loading" :title="info.parkName" :bodyStyle="{padding: loading ? '12px' : 0}">
    <div class="industrial-parks-info">
      <a-tabs>
        <a-tab-pane tab="概括" key="1" class="generalize-pane">
          <a-row>
            <a-col span="18">
              <!--面积，地址-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>总建筑面积：</span>
                  <span>{{ info.totalBulidingArea }} ㎡</span>
                </a-col>
                <a-col span="12" class="info-box">
                  <span>地址：</span>
                  <span v-text="info.address"></span>
                </a-col>
              </a-row>
              <!--工位数量和收费-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>工位总数：</span>
                  <span>{{ info.totalWorkstation }} 个</span>
                </a-col>
                <a-col span="12" class="info-box">
                  <span>工位收费标准：</span>
                  <span>{{ info.feeScale }} {{ filterDictText(dict.parksStationExt, info.feeScaleUnit) }}</span>
                </a-col>
              </a-row>
              <!--空间数量和收费-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>独立空间总数：</span>
                  <span>{{ info.totalRoom }} 个</span>
                </a-col>
                <a-col span="12" class="info-box">
                  <span>独立空间收费标准：</span>
                  <span>{{ info.feeScaleRoom }} {{ filterDictText(dict.parksInterspaceExt, info.feeScaleRoomUnit) }}</span>
                </a-col>
              </a-row>
              <!--经纬度-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>经度：</span>
                  <span v-text="info.lng"></span>
                </a-col>
                <a-col span="12" class="info-box">
                  <span>纬度：</span>
                  <span v-text="info.lat"></span>
                </a-col>
              </a-row>
              <!--得房率，联系电话-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>得房率：</span>
                  <span>{{ info.roomRate }} %</span>
                </a-col>
                <a-col span="12" class="info-box">
                  <span>联系电话：</span>
                  <span v-text="info.telephone"></span>
                </a-col>
              </a-row>
              <!--设备-->
              <a-row class="item">
                <a-col span="12" class="info-box">
                  <span>具备设备：</span>
                  <span v-text="info.deviceGroupId"></span>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="园区简介" key="2">
          <article v-html="info.content"></article>
        </a-tab-pane>
        <a-tab-pane tab="优惠政策" key="3">
          <article v-html="info.policy"></article>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
  import { getAction } from '@/api/manage'
  import { initDictOptions, filterDictText } from '@comp/dict/JDictSelectUtil'
  import Numeral from 'numeral'

  export default {
    name: 'IndustrialParksInfo',
    data() {
      return {
        loading: true,
        info: {},
        dict: {
          parksStationExt: [],
          parksInterspaceExt: []
        }
      }
    },
    async created() {
      if (typeof this.$route.params.id !== 'string') {
        this.$router.back()
        this.$message.warning('ID不正确')
        return false
      }

      const DictParksStationExt = await initDictOptions('parks_station_ext')
      if (DictParksStationExt.code === 0 && DictParksStationExt.success) {
        this.dict.parksStationExt = DictParksStationExt.result
      }
      const DictParksInterspaceExt = await initDictOptions('parks_interspace_ext')
      if (DictParksInterspaceExt.code === 0 && DictParksInterspaceExt.success) {
        this.dict.parksInterspaceExt = DictParksInterspaceExt.result
      }


      getAction('/park.park/basePark/queryById', { id: this.$route.params.id }).then(res => {
        if (res.code === 200) {
          this.loading = false
          const info = res.result
          info.feeScaleRoom = Numeral(info.feeScaleRoom).format('0,0.00')
          info.feeScale = Numeral(info.feeScale).format('0,0.00')
          this.info = info
        } else {
          this.$router.back()
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      filterDictText
    }
  }
</script>

<style lang="less">
  .industrial-parks-info {
    .ant-tabs-tabpane {
      padding: 0 15px 15px;
    }

    .generalize-pane {
      .item {
        .info-box {
          span {
            display: inline-block;
            line-height: 35px;
          }
        }

        & + .item {
          border-top: 1px solid #00A0E9;
        }
      }
    }
  }
</style>