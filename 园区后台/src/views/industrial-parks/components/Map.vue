<template>
  <a-modal
    title="获取经纬度"
    :width="780"
    :visible="visible"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭"
    okText="填入"
    destroyOnClose
  >
    <div :style="{width:'730px',height:'400px'}" style="margin:0 auto">
      <!--      -->
      <el-amap
        vid="amap"
        :plugin="plugin"
        class="amap-demo"
        :center="center"
        :zoom="zoom"
        :scrollWheel="true"
      >
        <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker.position"
          :events="marker.events"
          :draggable="marker.draggable"
          :vid="index"
        ></el-amap-marker>
      </el-amap>
    </div>
    <div class="toolbar">
      <br />
      <span v-if="loaded">经度 ： {{ lng }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;纬度 ：{{ lat }}</span>
      <span v-else>正在定位...</span>
    </div>
    <!-- <div v-on:click="req_post()">查询周边</div> -->
  </a-modal>
</template>
<script>
export default {
  data() {
    const self = this
    return {
      lng: 0,
      lat: 0,
      loaded: false,
      visible: false,
      // center: [121.82815, 31.73191],
      center: [120.82815, 30.73191],
      zoom: 15,
      markers: [
        {
          // position: [121.82815, 31.73191],
          position: [120.82815, 30.73191],
          visible: true,
          draggable: true,
          template: '<span>1</span>',
          text: '1111',
          events: {
            dragend: e => {
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
              console.log(this.markers[0].position)
              self.lng = e.lnglat.lng
              self.lat = e.lnglat.lat
            }
          }
        }
      ],
      plugin: [
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(instance) {
              console.log(instance)
            }
          }
        },
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          // zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result)
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  //点开时候marker一定在当前定位头顶  @zzzlucas 2020.01.19
                  self.markers[0].position = [result.position.lng, result.position.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]

      // texts: [
      //   {
      //     position: [120.82815, 30.73191],
      //     text: '浙江省嘉兴市南湖区亚太路906号科创CBD-17号楼',
      //     offset: [0, 20],
      //     events: {
      //       click: () => {
      //         alert('click text')
      //       }
      //     }
      //   }
      // ]
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      //此处是否要归位
    },
    handleOk() {
      this.$emit('getMapData', [this.lng, this.lat])
      this.handleCancel()
    }
  }
}
</script>
<style>
.amap-demo {
  height: 300px;
}
.amap-page-container {
  float: right;
}
</style>

