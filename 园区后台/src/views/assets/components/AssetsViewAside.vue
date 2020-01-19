<template>
  <a-drawer
    class="assets-view-aside"
    closable
    width="65%"
    :title="title"
    :mask-closable="true"
    :visible="show"
    @close="close">
    <div class="assets-view-content">
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
    </div>
  </a-drawer>
</template>

<script>
  import { view } from '../mixins'
  import '../style/view.less'

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
        title: '详细信息',
      }
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
