<template>
  <a-card :bordered="false" class="client-allot-info">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @submit.prevent="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入账号名/真实姓名查询" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="手机号码">
              <a-input placeholder="请输入手机号码查询" v-model="queryParam.phone"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="邮箱">
              <a-input placeholder="请输入邮箱查询" v-model="queryParam.email"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table
        :columns="columns"
        :rowKey="id"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a @click.stop="handleEdit(record)">编辑</a>
        </span>
      </a-table>
      <add-form ref="AddForm" @reload="loadData"></add-form>
    </div>
  </a-card>
</template>

<script>
import { getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AddForm from './modules/AddUserForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [JeecgListMixin],
  components: { AddForm },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      url: {
        list: '/park.park/basePark/userList'
      },
      dataSource: [],
      columns: [
        {
          title: '用户账号',
          dataIndex: 'username',
          //   sorter: true,
          width: '20%'
        },
        {
          title: '真实姓名',
          dataIndex: 'realname',
          //   filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
          width: '20%'
        },
        {
          title: '手机号码',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  created() {},
  methods: {
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = {
        parkId: this.industrialParkId,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    handleOk() {
      this.$refs.AddForm.add()
    },
    handleEdit(row) {
      this.$refs.AddForm.edit(row)
    },
    handleCancel() {
      // this.loadData()
      this.visible = false
    },
    show() {
      this.visible = true
    }
  }
}
</script>

<style lang='scss' scoped>
</style>