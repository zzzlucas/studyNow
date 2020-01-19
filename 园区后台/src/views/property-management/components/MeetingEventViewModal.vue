<template>
  <a-modal
    class="meeting-event-view-modal"
    title="会议详情"
    :footer="noFooter ? null : undefined"
    v-model="modal"
    @ok="close"
    @cancel="close">
    <detail-list :col="1">
      <detail-list-item term="地址">{{ address }}</detail-list-item>
      <detail-list-item term="时间">{{ data.begDate }} - {{ data.endDate }}</detail-list-item>
      <detail-list-item term="发起人">{{ data.requestPerson }}</detail-list-item>
      <detail-list-item term="参与人">{{ data.participants }}</detail-list-item>
      <detail-list-item term="备注">{{ data.remark }}</detail-list-item>
    </detail-list>
    <template slot="footer">
      <template v-if="!noFooter">
        <a-button key="submit" type="primary" @click="handleEdit">修改</a-button>
        <a-popconfirm title="确定删除吗?" @confirm="handleDelete">
          <a-button key="back">删除</a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-modal>
</template>

<script>
  import ViewAsideMixin from '@/mixins/ViewAside'
  import DetailList from '@/components/tools/DetailList'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewAsideMixin,
    ],
    components: {
      DetailList,
      DetailListItem
    },
    props: {
      noFooter: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      address() {
        const room = this.data.baseMeetingroom
        if (!room) {
          return ''
        }
        return `${room.projectName}/${room.buildingName}/${room.floorName}/${room.address}`
      },
    },
    methods: {
      handleEdit() {
        this.$emit('edit', this.data)
        this.close()
      },
      handleDelete() {
        this.$emit('delete', this.data)
        this.close()
      },
    }
  }
</script>

<style lang="less">

</style>
