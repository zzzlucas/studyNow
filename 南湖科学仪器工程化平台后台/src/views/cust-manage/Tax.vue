<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="goTaxAddForm()" type="primary" icon="plus">新增纳税情况</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click.stop="showTaxAddForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!-- <parks-add-form ref="form" v-model="rightShow" @submit="onSubmit" @edit="onEdit"></parks-add-form> -->
    <tax-add-form ref="TaxAddForm" @loaddata="loadData"></tax-add-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TaxAddForm from './modules/TaxAddForm'
import { postAction, putAction, getAction } from '@/api/manage'
import qs from 'querystring'
import Dom7 from 'dom7'

export default {
  name: 'IndustrialParksList',
  components: { TaxAddForm },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '园区信息管理页面',
      // 表头
      columns: [
        // {
        //   title: '#',
        //   dataIndex: '',
        //   key:'rowIndex',
        //   width:60,
        //   align:"center",
        //   customRender:function (t,r,index) {
        //     return parseInt(index)+1;
        //   }
        // },
        {
          title: '年度',
          align: 'center',
          dataIndex: 'year',
          width: 150
        },
        {
          title: '区分',
          align: 'center',
          dataIndex: 'type',
          customRender: function(t, r, index) {
            // console.log(t);
            if (t == 'YS') return '预算'
            if (t == 'SJ') return '实际'
            // return parseInt(index) + 1
          }
        },
        // {
        //   title: '月份',
        //   align: 'center',
        //   dataIndex: 'month'
        // },
        {
          title: '企业所得税',
          align: 'center',
          dataIndex: 'corporateIncomeTax'
        },
        {
          title: '个人所得税',
          align: 'center',
          dataIndex: 'individualIncomeTax'
        },
        {
          title: '城建税',
          align: 'center',
          dataIndex: 'cityTax'
        },
        {
          title: '增值税',
          align: 'center',
          dataIndex: 'addedValueTax'
        },
        {
          title: '其它税',
          align: 'center',
          dataIndex: 'otherTax'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.indicators/baseIndicatorsTaxes/listFinish?parkId=555',
        delete: '/park.park/basePark/delete',
        deleteBatch: '/park.park/basePark/deleteBatch'
      },
      deleteKey: 'parkId',
      rightShow: false
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    loadData() {
      //分页参数
      getAction(this.url.list).then(res => {
        if (res.success) {
          this.dataSource = res.result
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    goTaxAddForm() {
      this.$refs.TaxAddForm.edit()
    },
    showTaxAddForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.TaxAddForm.edit(row)
    },
    //都是提交   post
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
    //都是提交   put
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
          // click: () => {
          //   this.$router.push({ name: 'industrial-parks-info-@id', params: { id: row.parkId } })
          // }
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