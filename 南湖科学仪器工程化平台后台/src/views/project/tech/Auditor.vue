<template>
  <!-- 项目登记 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="审核阶段">
              <a-select v-model="queryParam.sex" placeholder="全部">
                <a-select-option value="1">全部</a-select-option>
                <a-select-option value="2">部门审核</a-select-option>
                <a-select-option value="3">分管领导审核</a-select-option>
                <a-select-option value="4">主要领导审核</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-item label="发布人">
              <a-input placeholder="请输入发布人" v-model="queryParam.sender"></a-input>
            </a-form-item>
          </a-col>-->

          <a-col>
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

          <a-col>
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
          </a-col>

          <!-- 右侧新建项目 -->
          <a-col :span="4" style="float: right">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="AuditorAddForm">添加审核人</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- <div class="table-operator">
      <a-button type="primary" @click="readAll" icon="book">全部标注已读</a-button>
    </div>-->

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
        @change="handleTableChange"
      ></a-table>
      <!-- :customRow="customRow" -->
    </div>
    <auditor-add-form @reload="loadData" ref="AuditorAddForm"></auditor-add-form>

    <show-announcement ref="ShowAnnouncement"></show-announcement>
  </a-card>
</template>
<script>
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import ShowAnnouncement from '@/components/tools/ShowAnnouncement'
import AuditorAddForm from './modules/AuditorAddFormM'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
export default {
  name: 'UserAnnouncementList',
  mixins: [JeecgListMixin],
  components: {
    ShowAnnouncement,
    AuditorAddForm
  },
  data() {
    return {
      description: '',
      queryParam: {},
      rowSelection: {},
      columns: [
        {
          title: '审核部门',
          align: 'center',
          dataIndex: 'msgCategory'
          //不存在
        },
        {
          title: '审核人',
          align: 'center',
          dataIndex: 'userId'
        },
        {
          //不存在，咋整
          title: ' 审核阶段',
          align: 'center',
          dataIndex: 'readFlag',
          customRender: function(text) {
            if (text == '1') {
              return '已审核'
            } else if (text == '2') {
              return '未审核'
            } else {
              return '未审核'
            }
          }
        }
      ],
      url: {
        list: '/park.workflow/baseWorkFlowProject/list'
      },
      loading: false
    }
  },
  created() {},
  methods: {
    AuditorAddForm() {
      this.$refs.AuditorAddForm.add()
    },

    showAnnouncement(record) {
      putAction(this.url.editCementSend, { anntId: record.anntId }).then(res => {
        if (res.success) {
          this.loadData()
        }
      })
      this.$refs.ShowAnnouncement.detail(record)
    }
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