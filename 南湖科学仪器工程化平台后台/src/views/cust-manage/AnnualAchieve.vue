<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator annual">
      <a-form :form="form" :layout="formLayout">
        <a-form-item label="区分" :label-col="formItem.label" :wrapper-col="formItem.value">
          <!-- <a-form-item label="区分"  label-col="6" wrapper-col="10"> -->
          <a-select
            style="width: 120px"
            @change="handleChange"
            v-decorator="['type',{initialValue: ''}]"
          >
            <a-select-option value>不限</a-select-option>
            <a-select-option value="YS">预算</a-select-option>
            <a-select-option value="SJ">实际</a-select-option>
          </a-select>

          <a-button
            style="margin-left:15px"
            @click="goAnnualAchieveAddForm()"
            type="primary"
            icon="plus"
          >新增完成情况</a-button>
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
        </a-form-item>
      </a-form>
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
          <a @click.stop="showAnnualAchieveAddForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <annual-achieve-add-form ref="AnnualAchieveAddForm" @loaddata="loadData"></annual-achieve-add-form>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AnnualAchieveAddForm from './modules/AnnualAchieveAddForm'
import { postAction, putAction, getAction } from '@/api/manage'
import qs from 'querystring'
import Dom7 from 'dom7'

export default {
  name: 'IndustrialParksList',
  components: { AnnualAchieveAddForm },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '',
      // 表头
      // type:'',
      form: this.$form.createForm(this),
      formLayout: 'horizontal',
      queryform: {},
      typee: null,
      formItem: {
        label: { span: 1 },
        value: { span: 5 }
      },
      columns: [
        {
          title: '年度',
          align: 'center',
          dataIndex: 'year',
          width: 100
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
        listN: '/park.indicators/baseIndicatorsMsg/list',
        listM: '/park.indicators/baseIndicatorsMsg/listFinish',
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
  //
  // watch: {
  //   typee: function(e) {}
  // },
  methods: {
    handleChange(e) {
      // console.log('eeeeeeeeeeeeeeeeeee')
      // console.log(e)
      // console.log(typeof e)
      // this.typee = e
      if (e == 'YS') {
        getAction(this.url.listN, { type: 'YS' }).then(res => {
          if (res.success) {
            console.log('预算筛选成功')
            this.dataSource = res.result
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      }
      if (e == 'SJ') {
        getAction(this.url.listN, { type: 'SJ' }).then(res => {
          if (res.success) {
            console.log('实际筛选成功')
            this.dataSource = res.result
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      }
      if (e == '') {
        let params = { parkId: 555 }
        getAction(this.url.listM, params).then(res => {
          if (res.success) {
            console.log('不限筛选成功')
            this.dataSource = res.result
            this.ipagination.total = res.result.total
          }
          if (res.code === 510) {
            this.$message.warning(res.message)
          }
          this.loading = false
        })
      }
      // this.loadData()
    },
    loadData() {
      console.log('ahhahahahah');
      // if (this.typee == 'YS' || this.typee == 'SJ') console.log('hahahaahahh')
      // let params = { type: this.typee }
      let params = { parkId: 555 }
      //当type为不限时，走listM的api / type筛选时，走最简单的listN
      getAction(this.url.listM, params).then(res => {
        if (res.success) {
          this.dataSource = res.result
          //分页查询未在此实现
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },

    goAnnualAchieveAddForm() {
      this.$refs.AnnualAchieveAddForm.add()
    },
    showAnnualAchieveAddForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AnnualAchieveAddForm.edit(row)
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
<style lang="less" scope>
@import '../../assets/less/common.less';
.annual {
  .ant-form-item-label {
    width: auto;
  }
}
</style>