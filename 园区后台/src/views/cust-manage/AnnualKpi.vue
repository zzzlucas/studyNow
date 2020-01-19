<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="goAnnualKpiAddForm()" type="primary" icon="plus">新增预算指标</a-button>
      <a-button
        style="margin-left: 8px"
        type="danger"
        icon="delete"
        @click="batchDel"
        v-if="selectedRowKeys.length > 0"
      >批量删除</a-button>
    </div>

    <!-- table区域-begin -->
    <div class="annual-kpi-list">
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
          <a @click.stop="showAnnualKpiAddForm(record, ...arguments)">编辑</a>
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
    <annual-kpi-add-form ref="AnnualKpiAddForm" @loaddata="loadData"></annual-kpi-add-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AnnualKpiAddForm from './modules/AnnualKpiAddForm'
import { postAction, putAction, getAction } from '@/api/manage'
import qs from 'querystring'
import Dom7 from 'dom7'
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'IndustrialParksList',
  components: { AnnualKpiAddForm },
  mixins: [JeecgListMixin, mixinList],
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
          dataIndex: 'year'
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
        {
          title: '地区生产总值',
          align: 'center',
          dataIndex: 'originalLeader'
        },
        {
          title: '规模以上工业总产值',
          align: 'center',
          dataIndex: 'industrialOutput'
        },
        {
          title: '全社会固定资产投资额',
          align: 'center',
          dataIndex: 'allFixedInvest'
        },
        {
          title: '工业固定资产投资额',
          align: 'center',
          dataIndex: 'industrialFiexedInvest'
        },
        {
          title: '智能制造产业收入',
          align: 'center',
          dataIndex: 'intelligentIndustrialIncome'
        },
        {
          title: '一般预算收入',
          align: 'center',
          dataIndex: 'generalBudgetIncome'
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
        list: '/park.indicators/baseIndicatorsMsg/list',
        delete: '/park.indicators/baseIndicatorsMsg/delete',
        deleteBatch: '/park.indicators/baseIndicatorsMsg/deleteBatch'
      },
      deleteKey: 'id',
      rightShow: false,
      yearGroup: []
    }
  },
  created() {
    this.loadData()
  },
  computed: { ...mapGetters(['industrialParkId']) },
  methods: {
    loadData() {
      this.loading = true
      let param = {}
      // param.pageNo = this.ipagination.current
      // param.pageSize = this.ipagination.pageSize
      param.parkId = this.industrialParkId
      param.type = 'YS'
      getAction(this.url.list, param).then(res => {
        if (res.success) {
          this.dataSource = _.merge([], res.result)
          for (const item of this.dataSource) {
            item.year = item.year + '年'
          }
          for (const item of res.result) {
            this.yearGroup.push(item.year)
          }
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    goAnnualKpiAddForm() {
      this.$refs.AnnualKpiAddForm.add(this.yearGroup)
    },
    showAnnualKpiAddForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AnnualKpiAddForm.edit(row)
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

// .annual-kpi-list {

// }
</style>