<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="goTaxAddForm()" type="primary" icon="plus">新增纳税情况</a-button>
      <a-button
        style="margin-left: 8px"
        type="danger"
        icon="delete"
        @click="batchDel"
        v-if="selectedRowKeys.length > 0"
      >批量删除</a-button>
    </div>

    <!-- table区域-begin -->
    <div class="tax-list">
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
        :pagination="false"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a v-if="record.year!='总和'" @click.stop="showTaxAddForm(record, ...arguments)">编辑</a>
          <a-divider v-if="record.year!='总和'" type="vertical" />
          <a-popconfirm
            v-if="record.year!='总和'"
            title="确定删除吗?"
            @confirm="() => handleDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!-- <parks-add-form ref="form" v-model="rightShow" @submit="onSubmit" @edit="onEdit"></parks-add-form> -->
    <tax-add-form ref="TaxAddForm" @reload="loadData"></tax-add-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import TaxAddForm from './modules/TaxAddForm'
import { postAction, putAction, getAction, deleteAction } from '@/api/manage'
import qs from 'querystring'
import Dom7 from 'dom7'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: '',
  components: { TaxAddForm },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '',
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
        list: '/park.indicators/baseIndicatorsTaxes/listFinish',
        delete: '/park.indicators/baseIndicatorsTaxes/delete',
        deleteBatch: '/park.indicators/baseIndicatorsTaxes/deleteBatch'
      },
      deleteKey: 'id',
      rightShow: false,
      yearGroup: [],
      yearGroupM: []
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  methods: {
    //本地删除
    handleDelete: function(data) {
      var that = this
      deleteAction(that.url.delete, { id: data[this.deleteKey ? this.deleteKey : 'id'] }).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    loadData() {
      //分页参数
      this.loading = true
      getAction('/park.indicators/baseIndicatorsTaxes/listFinish', { parkId: this.industrialParkId }).then(res => {
        if (res.success) {
          this.dataSource = _.merge([], res.result)
          for (const item of res.result) {
            this.yearGroup.push(item.year)
          }
          let yearGroupM = []
          for (const item of res.result) {
            let monthGroup = []
            for (const ITEM of item.children) {
              if (ITEM.year.includes('月')) {
                monthGroup.push(ITEM.year.replace('月', ''))
              }
            }
            yearGroupM.push(monthGroup)
          }
          this.yearGroupM = yearGroupM
          for (const item of this.dataSource) {
            item.year = item.year + '年'
          }
          this.loading = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    goTaxAddForm() {
      console.log(this.yearGroup)
      console.log(this.yearGroupM)
      this.$refs.TaxAddForm.add(this.yearGroup, this.yearGroupM)
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

// .tax-list {

// }
</style>