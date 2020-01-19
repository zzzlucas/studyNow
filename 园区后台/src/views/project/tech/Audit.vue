<template>
  <a-card :bordered="false" class="audit-list">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="关键字">
              <a-input placeholder="输入关键字" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="4">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>

          <a-col :span="8" style="float: right">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="AddTechProject()">新建项目</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin:20px 10px">
          <a-radio-group @change="handleChange" v-model="ff.AS">
            <!-- <a-radio-group @change="handleChange" v-decorator="['auditStatus']"> -->
            <a-radio-button value="1">部门审核</a-radio-button>
            <a-radio-button value="2">分管领导审核</a-radio-button>
            <a-radio-button value="3">主要领导审核</a-radio-button>
            <a-radio-button value="4">审核通过</a-radio-button>
            <a-radio-button value="5">审核未通过</a-radio-button>
          </a-radio-group>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="default"
      bordered
      rowKey="projectWorkFlowId"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
      :customRow="customRow"
    >
      <span slot="actionA" slot-scope="text, record">
        <a v-if="record.auditStatus == 2" @click.stop="showRecord(record)">待审核</a>
        <a v-if="record.auditStatus == 1" @click.stop="showRecord(record)">审核通过</a>
        <a v-if="record.auditStatus == 3" @click.stop="showRecord(record)">审核未通过</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="record.auditStatus==2" @click.stop="AuditForm(record,...arguments)">审核</a>
        <a-divider v-if="record.auditStatus==2" type="vertical" />
        <a @click.stop="EditTechProject(record,...arguments)">项目维护</a>
      </span>
    </a-table>

    <audit-form ref="AuditForm" @reload="loadData"></audit-form>
    <add-tech-project ref="AddTechProject" @reload="loadData"></add-tech-project>
    <audit-record ref="AuditRecord"></audit-record>
  </a-card>
</template>
<script>
// import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import AddTechProject from './modules/AddTechProject'
import AuditForm from './modules/AuditFormM'
import AuditRecord from './modules/AuditRecord'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import Dom7 from 'dom7'
import { filterObj } from '@/utils/util'
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin, mixinList],
  components: {
    AddTechProject,
    AuditForm,
    AuditRecord
  },
  data() {
    return {
      description: '',
      queryParam: {},
      auditStatusDictOptions: '',
      industrySectorValue: '',
      //筛选条件
      ff: {
        AS: '',
        auditStatus: '',
        workFlowNextNodeIndex: ''
      },
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '项目单位',
          align: 'center',
          dataIndex: 'fillUnit'
        },
        {
          title: '经办人',
          align: 'center',
          dataIndex: 'agentPerson'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'agentTel'
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'projectName'
        },
        {
          title: '所属行业',
          align: 'center',
          dataIndex: 'industrySectorValue',
          customRender: text => {
            return filterDictText(this.industrySectorValueDictOptions, text)
          }
        },
        // {
        //   title: '进度test',
        //   align: 'center',
        //   dataIndex: 'workFlowNextNodeIndex',
        //   customRender: function(text) {
        //     if (text == '0') {
        //       return '部门审核'
        //     } else if (text == '1') {
        //       return '分管领导审核'
        //     } else {
        //       return '主要领导审核'
        //     }
        //   }
        // },
        {
          title: '项目状态',
          align: 'center',
          dataIndex: 'auditStatus',
          scopedSlots: { customRender: 'actionA' }
          // customRender: text => {
          //   return filterDictText(this.auditStatusDictOptions, text)
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
        list: '/park.project/mgrProjectLand/list'
        // editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId'
        // readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('industry_sector_value').then(res => {
      if (res.code === 0 && res.success) {
        this.industrySectorValueDictOptions = res.result
      }
    })
    initDictOptions('audit_status').then(res => {
      if (res.code === 0 && res.success) {
        this.auditStatusDictOptions = res.result
      }
    })
  },
  methods: {
    showRecord(record) {
      this.$refs.AuditRecord.detail(record)
    },

    handleChange(e) {
      if (e) {
        switch (e.target.value) {
          case '1':
            this.ff.auditStatus = '2'
            this.ff.workFlowNextNodeIndex = '0'
            break
          case '2':
            this.ff.auditStatus = '2'
            this.ff.workFlowNextNodeIndex = '1'
            break
          case '3':
            this.ff.auditStatus = '2'
            this.ff.workFlowNextNodeIndex = '2'
            break
          case '4':
            this.ff.auditStatus = '1'
            this.ff.workFlowNextNodeIndex = null
            break
          case '5':
            this.ff.auditStatus = '3'
            this.ff.workFlowNextNodeIndex = null
            break
        }
      }
      console.log('this.ff')
      console.log(this.ff)
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          for (const item of res.result.records) {
            item.fillUnit = item.mgrProjectCust.fillUnit
            item.agentPerson = item.mgrProjectInfo.agentPerson
            item.agentTel = item.mgrProjectInfo.agentTel
            item.projectName = item.mgrProjectInfo.projectName
            item.industrySectorValue = item.mgrProjectInfo.industrySectorValue
            item.auditStatus = item.mgrProjectInfo.auditStatus
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
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
      }
      //1.往 queryform 塞进 ff
      this.queryform = Object.assign(this.ff)
      //2.往 param 塞进 queryform（即ff）  queryParam
      var param = Object.assign(this.queryform, this.queryParam)
      // console.log(this.queryParam)
      // console.log('object----', param)
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    searchQuery() {
      this.handleChange()
    },
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.ff = {}
      this.loadData()
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          //过两天我应该还会来加判断条件，避免无对象获取情况的报错
          for (const item of res.result.records) {
            item.fillUnit = item.mgrProjectCust.fillUnit
            item.agentPerson = item.mgrProjectInfo.agentPerson
            item.agentTel = item.mgrProjectInfo.agentTel
            item.projectName = item.mgrProjectInfo.projectName
            item.industrySectorValue = item.mgrProjectInfo.industrySectorValue
            item.auditStatus = item.mgrProjectInfo.auditStatus
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
    //走编辑
    AuditForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AuditForm.edit(row)
      // console.log('row');
      // console.log(row);
    },
    AddTechProject() {
      this.$refs.AddTechProject.add()
    },
    EditTechProject(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddTechProject.edit(row)
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$router.push({ name: 'project-tech-detail-@id', params: { id: row.projectId } })
          }
        }
      }
    }

    // goAdd(record) {
    //   this.$router.push({ path: '/project/tech/addproject', query: { id: record } })
    // }
  }
}
</script>
<style lang="less">
.audit-list {
  .ant-table-row {
    cursor: pointer;
  }
}
.ant-card-body .table-operator {
  margin-bottom: 18px;
}
.anty-row-operator button {
  margin: 0 5px;
}
.ant-btn-danger {
  background-color: #ffffff;
}
z .ant-modal-cust-warp {
  height: 100%;
}
.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}
.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}
</style>