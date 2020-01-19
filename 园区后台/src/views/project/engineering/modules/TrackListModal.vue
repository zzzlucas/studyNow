<template>
  <a-modal title="工程项目跟踪记录" width="800px" :visible="visible" @cancel="close" :footer="null">
    <a-form-item label="项目名称" :label-col="{span: 3}" :wrapper-col="{span: 21}">{{ projectName }}</a-form-item>
    <a-table
      size="small"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :expandedRowKeys="tableExpended"
      @change="tableChange" @expandedRowsChange="tableExpendChange">
      <template v-slot:action="row">
        <a-popconfirm title="是否删除该记录" @confirm="tableDel(row.recordId)">
          <a>删除</a>
        </a-popconfirm>
      </template>
      <template v-slot:expandedRowRender="row">
        <p>当前进展：{{ row.process }}</p>
        <p>遇到的问题：{{ row.issue }}</p>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
  import _ from 'lodash'
  import { deleteAction, getAction } from '@api/manage'
  import { ajaxGetDictItems } from '@api/api'
  import { filterDictText } from '@comp/dict/JDictSelectUtil'

  export default {
    name: 'TrackListModal',
    data() {
      return {
        visible: false,
        id: '',
        dataSource: [],
        columns: [
          { title: '跟踪日期', dataIndex: 'trackDate' },
          {
            title: '跟踪人', key: 'tracker', customRender: (row) => {
              return filterDictText(this.userDict, row.tracker)
            }
          },
          { title: '进展', dataIndex: 'process' },
          { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
        ],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        loading: false,
        projectName: '',
        userDict: [],
        tableExpended: []
      }
    },
    created() {
      ajaxGetDictItems('sys_user,realname,id').then(res => {
        if (res.success) {
          this.userDict = res.result
        } else {
          this.$message.error('用户数据获取失败')
        }
      })
    },
    methods: {
      open(id) {
        this.id = id
        this.pagination.current = 1
        this.change(1)
        this.visible = true
      },
      change(page) {
        this.loading = true
        getAction('/park.engineering/mgrEngineeringTrace/list', {
          projectId: this.id,
          pageNo: page,
          pageSize: this.pagination.pageSize
        }).then(res => {
          this.loading = false
          if (res.success) {
            this.dataSource = res.result.iPage.records
            this.pagination.total = res.result.iPage.total
            this.projectName = res.result.projectName
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      tableChange({ current }) {
        this.pagination.current = current
        this.change(current)
      },
      tableExpendChange(rows) {
        if (rows.length > 0) {
          this.tableExpended = _.xor(this.tableExpended, rows)
        } else {
          this.tableExpended = []
        }
      },
      tableDel(id) {
        deleteAction('/park.engineering/mgrEngineeringTrace/delete', { id }).then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.change(this.pagination.current)
          } else {
            this.$message.error(res.message)
          }
        })
      },
      close() {
        this.visible = false
      }
    }
  }
</script>
