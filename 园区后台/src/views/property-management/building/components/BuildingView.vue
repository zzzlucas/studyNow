<template>
  <div class="yq-building-view">
    <!-- 厂房列表 -->
    <!--suppress CheckTagEmptyBody-->
    <block-list
      v-if="model.status === 'block'"
      :list="model.list"
      @delete="deleteBtn"
      @edit="editBtn"
      @change="onChange"></block-list>

    <!-- 详细内容 -->
    <!--suppress CheckTagEmptyBody-->
    <info-row v-else :type="model.status" :info="model.info"></info-row>

    <!-- 表格 -->
    <!--suppress CheckTagEmptyBody-->
    <list-table
      v-if="['block', 'room'].indexOf(model.status) === -1"
      :type="model.status"
      :list="model.list"
      @change="onChange"
      @delete="deleteBtn"
      @edit="editBtn"></list-table>

    <!-- 图片 -->
    <!--suppress CheckTagEmptyBody-->
    <image-row v-if="model.status === 'room'" :images="model.images"></image-row>
  </div>
</template>

<script>
  import YqImage from '@comp/extend/YqImage'
  import BlockList from './view/BlockList'
  import InfoRow from './view/InfoRow'
  import ListTable from './view/ListTable'
  import ImageRow from './view/ImageRow'

  export default {
    name: 'BuildingView',
    components: { ImageRow, ListTable, InfoRow, BlockList, YqImage },
    props: {
      model: {
        type: Object,
        default() {
          return {
            status: 'empty'
          }
        }
      }
    },
    methods: {
      deleteBtn() {
        this.$emit('delete', ...arguments)
      },
      editBtn() {
        this.$emit('edit', ...arguments)
      },
      onChange(){
        this.$emit('change', ...arguments)
      }
    }
  }
</script>
