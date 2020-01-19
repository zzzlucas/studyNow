<template>
  <a-card :bordered="false" class="client-allot-list">
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
              <a-select v-model="queryParam.bulidingId" notFoundContent="请先选择所属厂房" placeholder="请选择楼宇">
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
                <!--  有五个查询子项目，干脆一起查吧 -->
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
        <span slot="action" slot-scope="text, record">
          <a @click.stop="showAllot(record, ...arguments)">分配</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <show-allot ref="ShowAllot" @reload="loadData"></show-allot>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import ShowAllot from './modules/ShowAllotD'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: { ShowAllot },
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
        // {
        //   title: '物业位置',
        //   align: 'center'
        //   // dataIndex: 'baseCustomerBusiness.registeredCapital'
        // },
        {
          title: '法人',
          align: 'center',
          dataIndex: 'legalPerson'
        },
        {
          title: '注册资本',
          align: 'center',
          dataIndex: 'baseCustomerBusiness.rCToRMB'
        },
        {
          title: '引进日期',
          align: 'center',
          dataIndex: 'merchantDate'
        },
        {
          title: '服务人员',
          align: 'center',
          dataIndex: 'servicer'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      form: this.$form.createForm(this),
      url: {
        list: '/park.customer/baseCustomer/list',
        // list: '/park.base/basePark/list',
        queryParam: '/park.customer/baseCustomer/queryById'
        // delete: '/park.base/basePark/delete',
        // deleteBatch: '/park.base/basePark/deleteBatch',
        // exportXlsUrl: 'park.base/basePark/exportXls',
        // importExcelUrl: 'park.base/basePark/importExcel'
      },
      info: {},
      temprow: '',
      rightShow: false,
      cusId: ''
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
    this.getBlockList()
  },
  methods: {
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.loadData(1)
    },
    getBlockList() {
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
    getBuildingList(e) {
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
    //
    showAllot(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowAllot.detail(row)
    },
    handleEdit(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.temprow = row
      console.log(this.temprow)
      // this.$refs.form.edit(row)
    }
  }
}
</script>
<style lang="less">
@import '../../assets/less/common.less';
.client-allot-list {
  .ant-table-row {
    cursor: pointer;
  }
}
</style>