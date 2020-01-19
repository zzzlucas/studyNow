<template>
  <a-modal
    :width="modalWidth"
    :visible="visible"
    :title="title"
    @ok="handleSubmit"
    @cancel="close"
    cancelText="关闭"
    style="margin-top: -70px"
    wrapClassName="ant-modal-cust-warp"
  >
    <a-row :gutter="10" style="background-color: #ececec; padding: 10px; margin: -10px">
      <a-col>
        <a-card :bordered="false">
          企业名称:
          <a-input-search
            :style="{width:'250px',marginBottom:'15px'}"
            placeholder="请输入企业名称"
            v-model="queryParam.keyword"
            @search="onSearch"
          ></a-input-search>
          <a-button @click="searchReset(1)" style="margin-left: 20px" icon="redo">重置</a-button>
          <!--用户列表-->
          <a-table
            ref="table"
            bordered
            size="middle"
            rowKey="id"
            :scroll="scrollTrigger"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio'}"
            @change="handleTableChange">
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { queryUserRoleMap } from '@/api/api'
  import { mapGetters } from 'vuex'
  import { getAction } from '@api/manage'

  export default {
    name: 'YqEnterpriseModal',
    components: {},
    props: {
      modalWidth: {
        type: [Number, String],
        default: 600
      }
    },
    data() {
      return {
        queryParam: {
          keyword: ''
        },
        columns: [
          {
            title: '企业名',
            dataIndex: 'customerName'
          },
          {
            title: '所在园区',
            dataIndex: 'parkName'
          }
        ],
        scrollTrigger: {},
        dataSource: [],
        userNameArr: [],
        departName: '',
        userRolesMap: {},
        title: '选择企业',
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },
        isorter: {
          column: 'createTime',
          order: 'desc'
        },
        selectedRowKeys: [],
        selectionRows: [],
        visible: false,
        form: this.$form.createForm(this)
      }
    },
    computed: mapGetters({
      park: 'industrialPark'
    }),
    created() {
      // 该方法触发屏幕自适应
      this.resetScreenSize()
      this.queryUserRoleMap()
    },
    methods: {
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        let params = this.getQueryParams()//查询条件
        getAction('/park.customer/baseCustomer/list', params).then(res => {
          if (res.success) {
            this.dataSource = res.result.records
            this.assignRoleName(this.dataSource)
            this.ipagination.total = res.result.total
          }
        })
      },
      queryUserRoleMap() {
        queryUserRoleMap().then((res) => {
          if (res.success) {
            this.userRolesMap = res.result
            this.loadData()
          }
        })
      },
      // 触发屏幕自适应
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        if (screenWidth < 500) {
          this.scrollTrigger = { x: 800 }
        } else {
          this.scrollTrigger = {}
        }
      },
      showModal() {
        this.visible = true
        this.assignRoleName(this.dataSource)
        this.queryDepartTree()
        this.form.resetFields()
      },
      getQueryParams() {
        let param = Object.assign({}, this.queryParam, this.isorter)
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        param.parkId = this.park.id
        return filterObj(param)
      },
      getQueryField() {
        let str = 'id,'
        for (let a = 0; a < this.columns.length; a++) {
          str += ',' + this.columns[a].dataIndex
        }
        return str
      },
      searchReset(num) {
        let that = this
        if (num !== 0) {
          that.queryParam = {}
          that.loadData(1)
        }
        that.selectedRowKeys = []
        that.userNameArr = []
      },
      close() {
        this.searchReset(0)
        this.visible = false
      },
      handleTableChange(pagination, filters, sorter) {
        //TODO 筛选
        if (Object.keys(sorter).length > 0) {
          this.isorter.column = sorter.field
          this.isorter.order = 'ascend' === sorter.order ? 'asc' : 'desc'
        }
        this.ipagination = pagination
        this.loadData()
      },
      handleSubmit() {
        let cust = this.dataSource[this.selectedRowKeys[0]]
        this.$emit('ok', cust.customerName, cust.custId)
        this.close()
      },
      onSelectChange(selectedRowKeys, selectionRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectionRows = selectionRows
      },
      onSearch() {
        this.loadData(1)
      },
      // 传入用户id,找到匹配的角色名称
      queryUserRole(userId) {
        let map = this.userRolesMap
        let roleName = []
        for (var key in map) {
          if (userId === key) {
            roleName.push(map[key])
          }
        }
        return roleName.join(',')
      },
      queryDepartTree() {
        this.departTree = [
          { title: this.park.name, key: this.park.id }
        ]
      },
      // 为角色名称赋值
      assignRoleName(data) {
        let userId = ''
        let role = ''
        for (let i = 0, length = data.length; i < length; i++) {
          userId = this.dataSource[i].id
          role = this.queryUserRole(userId)
          this.dataSource[i].roleName = role
        }
      },
      modalFormOk() {
        this.loadData()
      }
    }
  }
</script>

<style lang="less">
  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
</style>
