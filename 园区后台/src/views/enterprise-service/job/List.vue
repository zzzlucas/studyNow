<template>
  <a-card :bordered="false" class="job-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="行业领域">
              <a-select placeholder="请选择行业领域" v-model="queryParam.jobType">
                <a-select-option
                  v-for="(item, key) in dict.industryGategory"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="关键字">
              <a-input placeholder="职位名称/企业名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="8">
            <span class="table-page-search-submitButtons">
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

          <a-col :md="8" :sm="8" style="float:right;">
            <a-button style="float:right;margin-left: 8px" type="primary" @click="AddInfoForm">新增职位</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="发布状态">
              <a-radio-group @change="searchQuery" v-model="queryParam.isPublic">
                <a-radio-button value>不限</a-radio-button>
                <a-radio-button value="0">未发布</a-radio-button>
                <a-radio-button value="1">已发布</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
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
        rowKey="recruitId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="actionA" slot-scope="text, record" @click.stop>
          <a v-if="record.status==1" @click.stop="showConfirm(record)">待审核</a>
          <span v-if="record.status==2" @click.stop>已通过</span>
          <span v-if="record.status==0" @click.stop>已拒绝</span>
        </span>
        <span slot="action" slot-scope="text, record" @click.stop>
          <a-popconfirm
            v-if="(record.status==2)&&(record.isPublic==0)"
            title="确定发布吗?"
            @confirm="() => changeInfoForm(record)"
          >
            <a>发布</a>
          </a-popconfirm>
          <a-divider v-if="(record.status==2)&&(record.isPublic==0)" type="vertical" />
          <a @click.stop="EditInfoForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-info-form ref="AddInfoForm" @reload="loadData"></add-info-form>
    <detail-drawer ref="DetailDrawer" :DDindustryGategory="dict.industryGategory"></detail-drawer>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import AddInfoForm from './AddInfoForm'
import DetailDrawer from './DetailDrawer'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import { mixinList } from '@/utils/mixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'IndustrialParksList',
  components: { AddInfoForm, DetailDrawer },
  mixins: [JeecgListMixin, mixinList],
  data() {
    return {
      description: '',
      dict: {},
      columns: [
        // {
        //   title: '序号',
        //   dataIndex: '',
        //   key: 'rowIndex',
        //   width: 60,
        //   align: 'center',
        //   customRender: function(t, r, index) {
        //     return parseInt(index) + 1
        //   }
        // },
        {
          title: '职位名',
          align: 'center',
          dataIndex: 'jobName'
        },
        {
          title: '招聘人数',
          align: 'center',
          dataIndex: 'jobNum',
          width: 180
        },
        {
          title: '薪资',
          align: 'center',
          dataIndex: 'monthlySalary',
          width: 180,
          customRender: text => {
            return filterDictText(this.dict.monthlySalary, text)
          }
        },
        {
          title: '学历',
          align: 'center',
          dataIndex: 'educationType',
          width: 180,
          customRender: text => {
            return filterDictText(this.dict.educationType, text)
          }
        },
        {
          title: '经验',
          align: 'center',
          dataIndex: 'expType',
          width: 180,
          customRender: text => {
            return filterDictText(this.dict.expType, text)
          }
        },
        {
          title: '审核状态',
          dataIndex: 'actionA',
          align: 'center',
          scopedSlots: { customRender: 'actionA' },
          width: 150
        },
        // {
        //   title: '审核状态',
        //   align: 'center',
        //   dataIndex: 'publishTime',
        //   width: 180,
        //   customRender: text => {
        //     if (text == '0') {
        //       return '审核通过'
        //     } else if (text == '1') {
        //       return '审核未通过'
        //     }
        //   }
        // },
        {
          title: '发布状态',
          align: 'center',
          dataIndex: 'isPublic',
          width: 150,
          customRender: text => {
            // return filterDictText(this.dict.recruitStatus, text)
            if (text == '0') {
              return '未发布'
            } else if (text == '1') {
              return '已发布'
            } else {
              return 'XX'
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 200
        }
      ],
      url: {
        list: '/park.service/mgrRecruitInfo/list',
        delete: '/park.service/mgrRecruitInfo/delete',
        deleteBatch: '/park.service/mgrRecruitInfo/deleteBatch'
      },
      deleteKey: 'recruitId',
      // queryParam: {
      // },
      temprow: '',
      rightShow: false,
      cusId: ''
    }
  },
  computed: {},
  async created() {
    //确保三条必要字典先加载
    await this.init()
    this.loadData()
    this.initNext()
  },
  methods: {
    init() {
      initDictOptions('education_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.educationType = res.result
        }
      })
      initDictOptions('exp_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.expType = res.result
        }
      })
      initDictOptions('monthly_salary').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.monthlySalary = res.result
        }
      })
      //
    },
    initNext() {
      initDictOptions('industry_gategory').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.industryGategory = res.result
        }
      })
      initDictOptions('recruit_status').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.recruitStatus = res.result
        }
      })
      initDictOptions('is_public').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.isPublic = res.result
        }
      })
    },
    changeInfoForm(record) {
      let params = { isPublic: '1', recruitId: record.recruitId }
      params = qs.stringify(params)
      putAction('/park.service/mgrRecruitInfo/publicRecruit', params).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showConfirm(row, e) {
      const that = this
      this.$confirm({
        okText: '通过',
        cancelText: '拒绝',
        title: '审核招聘信息',
        content: '确认通过此条招聘信息吗？',
        onOk() {
          return new Promise((resolve, reject) => {
            let params = { recruitId: row.recruitId, status: '2' }
            params = qs.stringify(params)
            putAction('/park.service/mgrRecruitInfo/audit', params).then(res => {
              if (res.code === 200) {
                that.loadData()
                resolve()
              } else {
                reject()
                that.$message.error(res.message)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {
          return new Promise((resolve, reject) => {
            let params = { recruitId: row.recruitId, status: '0' }
            params = qs.stringify(params)
            putAction('/park.service/mgrRecruitInfo/audit', params).then(res => {
              if (res.code === 200) {
                that.loadData()
                resolve()
              } else {
                reject()
                that.$message.error(res.message)
              }
            })
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    // loadData() {
    //   var params = this.getQueryParams()
    //   this.loading = true
    //   getAction(this.url.list, params).then(res => {
    //     if (res.success) {
    //       this.dataSource = res.result.records
    //       this.ipagination.total = res.result.total
    //     }
    //     if (res.code === 510) {
    //       this.$message.warning(res.message)
    //     }
    //     this.loading = false
    //   })
    // },
    customRow(row) {
      return {
        on: {
          click: () => {
            //拿到id
            this.$refs.DetailDrawer.show(row)
          }
        }
      }
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    searchQuery() {
      this.loadData(1)
    },
    AddInfoForm() {
      this.$refs.AddInfoForm.Add()
    },
    EditInfoForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddInfoForm.detail(row)
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/common.less';
.job-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>