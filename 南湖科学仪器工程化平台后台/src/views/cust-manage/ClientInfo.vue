<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!-- <a-col :md="6" :sm="8">
            <a-form-item label="项目">
              <a-input placeholder v-model="queryParam.caseId"></a-input>
            </a-form-item>
          </a-col>-->
          <a-col :md="6" :sm="8">
            <a-form-item label="楼宇">
              <a-input placeholder v-model="queryParam.buidling"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行业类型">
              <a-select v-model="queryParam.industryCategory" placeholder="请选择">
                <!-- <a-select v-decorator="['industryCategory']" placeholder="请选择"> -->
                <a-select-option
                  v-for="(item, key) in dict.industryCategoryExt"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
              <!-- <a-input placeholder v-model="queryParam.industryCategory"></a-input> -->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关键字">
              <a-input placeholder="请输入客户名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-radio-group defaultValue="" v-model="queryParam.status">
                <a-radio value="1">在园</a-radio>
                <a-radio value="0">离园</a-radio>
                <!-- <a-radio :style="radioStyle" :value="2">离园</a-radio> -->
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="8" style="float:right;">
            <span
              style="float:right;overflow: hidden;width:auto;"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <a-button
                type="primary"
                style="float:right;margin-left: 8px"
                @click="showZero"
                icon="search"
              >登记新客户</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record">
          <a @click.stop="showConfirm(record, ...arguments)">迁动</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <show-zero ref="ShowZero" @reload="loadData"></show-zero>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import ShowZero from './modules/ShowZeroD'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import { filterObj } from '@/utils/util'


export default {
  name: '',
  components: { ShowZero },
  mixins: [JeecgListMixin],
  data() {
    return {
      description: '企业管理-客户信息列表页',
      dict: {
        merchantManagerExt: [{ value: '' }],
        servicerExt: [{ value: '' }],
        unitNatureExt: [{ value: '' }],
        industryCategoryExt: [{ value: '' }],
        organizationalExt: [{ value: '' }],
        technicalFieldExt: [{ value: '' }],
        enterpriseRatingExt: [{ value: '' }],
        registrationTypeExt: [{ value: '' }]
      },
      columns: [
        // {
        //   title: '序号',
        //   align: 'center',
        //   dataIndex: 'custId'
        // },
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'customerName'
        },
        {
          title: '注册资本',
          align: 'center',
          dataIndex: 'baseCustomerBusiness.registeredCapital'
        },
        {
          title: '成立日期',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '联系方式',
          align: 'center',
          dataIndex: 'telephone'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          customRender: function(text) {
            if (text == 1) {
              return '在园'
            } else if (text == 0) {
              return '离园'
            } else {
              return text
            }
          }
          // customRender: text => {
          //   return filterDictText(this.statusDictOptions, text)
          // }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.customer/baseCustomer/list',
        // list: '/park.base/basePark/list',
        queryParam: '/park.customer/baseCustomer/queryById'
        // delete: '/park.base/basePark/delete',
        // deleteBatch: '/park.base/basePark/deleteBatch',
        // exportXlsUrl: 'park.base/basePark/exportXls',
        // importExcelUrl: 'park.base/basePark/importExcel'
      },
      temprow: '',
      // rightShow: false,
      // custId: '',
      status: '1'
    }
  },
  computed: {
    // importExcelUrl: function() {
    //   return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    // }
  },
  mounted() {
    //这个status基本不能从筛选处获取，要自己手写写一次，但又不能写死，要能够被筛选处覆写
    // this.status = this.queryParam.status
    // console.log('this.status')
    // console.log(this.status)
  },
  created() {
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryCategoryExt = res.result
      }
    })
  },
  methods: {
    //本地定制化加载
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()
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
    getQueryParams() {
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }

      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      // this.status = this.queryParam.status
      //如何获取到status，在页面刚进来时候  钩子函数
      // param.status = this.status
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            console.log(row.custId)
            this.cusId = row.custId
            //拿到id
            this.$router.push({ name: 'cust-manage-detail-@id', params: { id: row.custId } })
          }
        }
      }
    },
    // handleImportExcel() {},
    showZero() {
      this.$refs.ShowZero.add()
    },
    handleOut() {},
    handleEdit(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.temprow = row
      console.log(this.temprow)
      // this.$refs.form.edit(row)
    },
    showConfirm(row, e) {
      const that = this
      this.$confirm({
        title: '确认迁出',
        content: '确认要迁出吗？',
        onOk() {
          return new Promise((resolve, reject) => {
            //如何获得custid
            let params = { custId: row.custId, status: row.status }
            params = qs.stringify(params)
            putAction('/park.customer/baseCustomer/editStatus', params).then(res => {
              if (res.code === 200) {
                that.loadData()
                console.log('迁入迁出成功')
                resolve()
              } else {
                reject(new Error(res.message))
                this.$message.error(res.message)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/common.less';
</style>