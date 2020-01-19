<template>
  <a-modal
    class="assets-view-modal"
    width="80%"
    :title="title"
    :footer="null"
    v-model="modal"
    @ok="close"
    @cancel="close">
    <a-row class="assets-view-row" :gutter="24">
      <template v-for="column in columns">
        <!-- Text -->
        <template v-if="column.type === 'text' || column.type == null">
          <a-col :xl="12">
            {{ column.name }}：{{ getFieldValue(column.value) }}
          </a-col>
        </template>
        <!-- Remark -->
        <template v-if="column.type === 'remark'">
          <a-col :xl="24">
            {{ column.name }}：
          </a-col>
          <a-col :xl="24">
            {{ getFieldValue(column.value) }}
          </a-col>
        </template>
        <!-- Table -->
        <template v-if="column.type === 'table'">
          <a-col :xl="24">
            <a-table
              :columns="column.value.columns"
              :dataSource="assetsDataSource"
              :pagination="false"
              bordered />
          </a-col>
        </template>
        <!-- Files -->
        <template v-if="column.type === 'files'">
          <a-col :xl="24">
            {{ column.name }}：
          </a-col>
          <a-col :xl="24">
            <template v-for="image in getFieldValueWithSplit(column.value)">
              <img :src="urlDownload + image" />
              <br>
            </template>
          </a-col>
        </template>
      </template>
    </a-row>
  </a-modal>
</template>

<script>
  import { view } from '../mixins'

  export default {
    mixins: [
      view,
    ],
    props: {
      columns: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        title: '借用详情',
      }
    },
    computed: {
      assetsDataSource() {
        let { assertName, assetModel, assetNumber, qty, useStatus } = this.data
        return [
          {
            assetName: assertName,
            assetModel,
            assetNumber,
            qty,
            useStatus
          }
        ]
      },
    },
    methods: {
      getFieldValue(field) {
        return this.data[field]
      },
      getFieldValueWithSplit(field, spec = ',') {
        const value = this.data[field]
        if (!value) {
          return []
        }
        return this.data[field].split(spec)
      },
    },
  }
</script>

<style lang="less">
  .assets-view-modal {
    .assets-view-row {
      > div {
        margin: 5px 0;
      }
    }
  }
</style>
