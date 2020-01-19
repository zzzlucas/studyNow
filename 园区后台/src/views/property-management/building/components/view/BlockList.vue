<template>
  <a-row class="yq-building-block-row">
    <a-col span="12" class="block-item" v-for="(item, key) in list" :key="key">
      <header class="block">
        <div class="title" v-text="item.projectName"></div>
        <div class="header-right">
          <a-button size="small" @click="editBtn('block', item.buildingProjectId, item)">编辑</a-button>
          <a-button
            class="delete-btn"
            size="small"
            type="danger"
            @click="deleteBtn('block', item.buildingProjectId, key, item.projectName)">
            删除
          </a-button>
        </div>
      </header>
      <main class="block" @click="onChange(item.buildingProjectId)">
        <div class="image-box">
          <yq-image class="block-image" size="40" :src="getImage(item.addDocFiles)"></yq-image>
        </div>
        <div class="info-box">
          <p>楼宇总数：{{ item.totalBuildings }} 栋</p>
          <p>建筑总面积：{{ item.buildingArea || 0 }} ㎡</p>
          <p>楼层：共 {{ item.allFloor }} 层</p>
          <p>房间：共 {{ item.allRoom }} 间，剩余 {{ item.remainRoom }} 间</p>
        </div>
      </main>
    </a-col>
  </a-row>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import { getOneImage } from '@utils/util'
  import _ from 'lodash'

  export default {
    name: 'BlockList',
    components: { YqImage },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getImage(json) {
        const list = JSON.parse(json)
        let url = _.get(list, '[0].url', '')
        return getOneImage(url)
      },
      deleteBtn() {
        this.$emit('delete', ...arguments)
      },
      editBtn() {
        this.$emit('edit', ...arguments)
      },
      onChange(id) {
        this.$emit('change', 'tower', id)
      }
    }
  }
</script>

<style lang="less">
  @import "../../less/function";
  @import "~@/assets/less/clearFloat";

  .yq-building-block-row {
    .block-item {
      header.block {
        width: 100%;
        padding: 10px;
        background-color: #d9d9d9;
        font-size: 16px;

        .title {
          float: left;
          height: 25px;
          line-height: 25px;
        }

        .header-right {
          float: right;

          .delete-btn {
            margin-left: 8px;
          }
        }

        .clearFloat();
      }

      main.block {
        border: 1px solid #d9d9d9;
        padding: 8px;
        cursor: pointer;

        .image-box {
          width: 38%;
          float: left;

          .block-image {
            height: 130px;
          }
        }

        .info-box {
          width: 62%;
          float: left;
          padding-left: 8px;

          p:last-of-type {
            margin-bottom: 0;
          }
        }

        .clearFloat();
      }

      .buildBlock();
    }
  }
</style>
