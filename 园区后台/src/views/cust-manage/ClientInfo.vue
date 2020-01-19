<template>
  <a-card :bordered="false" class="client-allot-info">
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
            <a-form-item label="厂房">
              <a-select v-model="queryParam.caseId" @change="getBuildingList" placeholder="请选择厂房">
                <a-select-option
                  v-for="item in info.BlockList"
                  :value="item.buildingProjectId"
                >{{item.projectName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="楼宇">
              <a-select
                v-model="queryParam.bulidingId"
                notFoundContent="请先选择所属厂房"
                placeholder="请选择楼宇"
              >
                <a-select-option
                  v-for="item in info.BuildingList"
                  :value="item.buildingId"
                >{{item.buildingName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="行业类型">
              <a-select v-model="queryParam.industryCategory" placeholder="请选择行业类型">
                <a-select-option
                  v-for="(item, key) in dict.industryCategoryExt"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关键字">
              <a-input placeholder="请输入企业名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-radio-group defaultValue v-model="queryParam.status" @change="searchQuery">
                <!-- @change="searchQuery" 有五个查询子项目，干脆一起查吧 -->
                <a-radio-button value="1">在园</a-radio-button>
                <a-radio-button value="0">离园</a-radio-button>
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
                icon="plus"
              >登记新客户</a-button>
              <!-- <a-button
                type="primary"
                style="float:right;margin-left: 8px"
                @click="showUserList"
                icon="user"
              >用户维护</a-button> -->
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
        rowKey="custId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a v-if="record.status == 1" @click.stop="showConfirm(record, ...arguments)">迁出</a>
          <a-divider v-if="record.status == 1" type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
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
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'

export default {
  name: '',
  components: { ShowZero },
  mixins: [JeecgListMixin, mixinList],
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
      info: {},
      form: this.$form.createForm(this),
      deleteKey: 'custId',
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
          dataIndex: 'customerName',
          width: 600
        },
        {
          title: '注册资本',
          align: 'center',
          dataIndex: 'baseCustomerBusiness.registeredCapital'
        },
        {
          title: '成立日期',
          align: 'center',
          dataIndex: 'registDate'
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
          width: 180,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.customer/baseCustomer/list',
        queryParam: '/park.customer/baseCustomer/queryById',
        delete: '/park.customer/baseCustomer/delete'
        // deleteBatch: '/park.base/basePark/deleteBatch',
      },
      temprow: '',
      // rightShow: false,
      // custId: '',
      status: '1'
    }
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryCategoryExt = res.result
      }
    })
    getAction('/park.architecture/baseArchitectureProject/queryByParkId', { parkId: this.industrialParkId }).then(
      res => {
        if (res.success) {
          this.info.BlockList = res.result
          this.$nextTick(() => {
            this.form.setFieldsValue()
          })
        } else {
          console.log('获取厂房列表失败')
        }
      }
    )
  },
  methods: {
    showUserList() {
      console.log('showUserList')
      this.$refs.UserList.show()
    },
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.loadData(1)
    },
    getBuildingList(e) {
      // console.log('e')
      // console.log(e)
      getAction('/park.architecture/baseArchitectureBuilding/queryBuildingList', { buildingProjectId: e }).then(res => {
        if (res.success) {
          this.info.BuildingList = res.result
          this.$nextTick(() => {
            this.form.setFieldsValue()
          })
        } else {
          console.log('获取楼宇列表失败')
        }
      })
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          //获取对象里的日期
          for (const item of res.result.records) {
            if (item.baseCustomerBusiness) {
              item.registDate = item.baseCustomerBusiness.registDate
            }
          }
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
      var param = Object.assign({}, this.queryParam, this.isorter, this.filters)
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
                that.$message.error(res.message)
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
.client-allot-info {
  .ant-table-row {
    cursor: pointer;
  }
}
</style>
