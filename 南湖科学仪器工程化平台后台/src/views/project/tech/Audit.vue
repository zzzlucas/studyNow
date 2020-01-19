<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="关键字">
              <a-input placeholder="输入园区名称" v-model="queryParam.titile"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="8">
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
      </a-form>
    </div>

    <a-table
      ref="table"
      size="default"
      bordered
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="AuditorForm(record,...arguments)">审核</a>
        <a-divider type="vertical" />
        <a @click="EditTechProject(record,...arguments)">项目维护</a>
      </span>
    </a-table>

    <auditor-form ref="AuditorForm"></auditor-form>
    <add-tech-project ref="AddTechProject"></add-tech-project>
  </a-card>
</template>
<script>
// import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import AddTechProject from './modules/AddTechProject'
import AuditorForm from './modules/AuditorFormM'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Dom7 from 'dom7'

export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin], //居然很重要
  components: {
    AddTechProject,
    AuditorForm
  },
  data() {
    return {
      description: '',
      queryParam: {},
      columns: [
        {
          title: '序号',
          align: 'center',
          dataIndex: 'titile' //数据绑定项目
        },
        {
          title: '项目单位',
          align: 'center',
          dataIndex: 'msgCategory'
        },
        {
          title: '经办人',
          align: 'center',
          dataIndex: 'priority'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '所属行业',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '项目状态',
          align: 'center',
          dataIndex: 'readFlag',
          customRender: function(text) {
            if (text == '1') {
              //返回此页的数据目前是 undefined？
              return '已审核'
            } else if (text == '2') {
              return '未审核'
            } else {
              return '未审核'
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectLand/list',
        // editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId'
        // readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      loading: false
    }
  },
  created() {},
  methods: {
    AuditorForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AuditorForm.add(row)
    },
    AddTechProject() {
      this.$refs.AddTechProject.add()
    },
    EditTechProject(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddTechProject.edit(row)
    }

    // goAdd(record) {
    //   this.$router.push({ path: '/project/tech/addproject', query: { id: record } })
    // }
  }
}
</script>
<style scoped>
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