<template>
  <a-modal
    class="advertising-event-view-modal"
    title="广告申请详情"
    v-model="modal"
    :footer="noFooter ? null : undefined"
    @ok="close"
    @cancel="close">
    <detail-list :col="1">
      <detail-list-item term="预定时间">{{ data.begDate }} - {{ data.endDate }}</detail-list-item>
      <detail-list-item term="联系人">{{ data.requestPerson }}</detail-list-item>
      <detail-list-item term="公司/企业">{{ data.companyName }}</detail-list-item>
      <detail-list-item term="手机号码">{{ data.telephone }}</detail-list-item>
      <detail-list-item term="邮箱">{{ data.email }}</detail-list-item>
      <detail-list-item term="联系地址">{{ data.contactAddress }}</detail-list-item>
      <detail-list-item term="需求描述">{{ data.remark }}</detail-list-item>
      <detail-list-item term="附件">
        <image-list :data="data.addDocFiles" preview-key="image" height="200px" />
      </detail-list-item>
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
  import ImageList from '@comp/image-list/ImageList'
  const DetailListItem = DetailList.Item

  export default {
    mixins: [
      ViewAsideMixin,
    ],
    components: {
      DetailList,
      DetailListItem,
      ImageList,
    },
    props: {
      noFooter: {
        type: Boolean,
        default: false,
      }
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
