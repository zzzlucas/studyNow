<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="园区名称/ID">
              <a-input placeholder="请输入园区名称/ID" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <a-button
                style="margin-left: 8px"
                type="danger"
                icon="delete"
                @click="batchDel"
                v-if="selectedRowKeys.length > 0"
              >批量删除</a-button>
            </span>
          </a-col>
          <a-col :md="6" :sm="8" style="float:right;">
            <a-button style="float:right;" @click="rightShow = true" type="primary" icon="plus">新增</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <!-- <div class="table-operator"> -->
    <!-- <a-button type="primary" icon="download" @click="handleExportXls('园区信息')">导出</a-button> -->
    <!-- </div> -->

    <!-- table区域-begin -->
    <div class="industrial-parks-list">
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="parkId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a @click="handleEdit(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
          <!-- <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
              </a-menu-item>
            </a-menu>
          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <parks-add-form ref="form" v-model="rightShow" @submit="onSubmit" @edit="onEdit"></parks-add-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ParksAddForm from '@views/industrial-parks/components/ParksAddForm'
import { postAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'

export default {
  name: 'IndustrialParksList',
  components: { ParksAddForm },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '园区信息管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '园区ID',
          align: 'center',
          dataIndex: 'parkId'
        },
        {
          title: '园区名称',
          align: 'center',
          dataIndex: 'parkName'
        },
        {
          title: '总建筑面积',
          align: 'center',
          dataIndex: 'totalBulidingArea'
        },
        {
          title: '地址',
          align: 'center',
          dataIndex: 'address'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.park/basePark/list',
        add: '/park.park/basePark/add',
        edit: '/park.park/basePark/edit',
        delete: '/park.park/basePark/delete',
        deleteBatch: '/park.park/basePark/deleteBatch',
        exportXlsUrl: 'park.park/basePark/exportXls',
        importExcelUrl: 'park.park/basePark/importExcel'
      },
      deleteKey: 'parkId',
      rightShow: false
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    onSubmit(data) {
      data = qs.stringify(data)
      postAction(this.url.add, data).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onEdit(data) {
      console.log(data)
      data = qs.stringify(data)
      putAction(this.url.edit, data).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$router.push({ name: 'industrial-parks-info-@id', params: { id: row.parkId } })
          }
        }
      }
    },
    handleEdit(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.form.edit(row)
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/common.less';

.industrial-parks-list {
  .ant-table-row {
    cursor: pointer;
  }
}
</style>