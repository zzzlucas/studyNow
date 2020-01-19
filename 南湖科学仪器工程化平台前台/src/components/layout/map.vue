<template>
  <div class="amap-page-container">
    <div :style="{width:'530px',height:'260px'}">
       <!-- :plugin="plugin" -->
      <el-amap
        vid="amap"
        class="amap-demo"
        :zoom="zoom"
        :center="center"
        :scrollWheel="true"
      >
        <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker.position"
          :draggable="marker.draggable"
          :vid="index"
        ></el-amap-marker>
        <!-- <el-amap-text
          v-for="text in texts"
          :text="text.text"
          :offset="text.offset"
          :position="text.position"
          :events="text.events"
        ></el-amap-text> -->
      </el-amap>
    </div>
  </div>
</template>
<script>
export default {
  //  name: "amap-page",
  data() {
    return {
      center: [120.82815, 30.73191],
      zoom: 15,
      markers: [
        {
          position: [120.82815, 30.73191],
          // events: {
          //   click: () => {
          //     alert("click marker");
          //   }
          // },
          visible: true,
          draggable: false,
          template: "<span>1</span>",
          text: "1111"
        }
      ],
      texts: [
        {
          position: [120.82815, 30.73191],
          text: "浙江省嘉兴市南湖区亚太路906号科创CBD-17号楼",
          offset: [0, 20],
          events: {
            click: () => {
              alert("click text");
            }
          }
        }
      ]
    };
  }
};
</script>
<style>
.amap-demo {
  height: 300px;
}
.amap-page-container {
  float: right;
}
</style>

