<template>
  <a-card class="contract-relet-page" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="厂房">
              <a-select defaultValue="选择厂房">
                <a-select-option value="选择厂房">选择厂房</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="楼宇">
              <a-select defaultValue="选择楼宇">
                <a-select-option value="选择楼宇">选择楼宇</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="楼层">
              <a-select defaultValue="选择楼层">
                <a-select-option value="选择楼宇">1</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="房间">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="合同编号">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="合同状态">
                <a-select defaultValue="选择楼层">
                  <a-select-option value="1">不限</a-select-option>
                  <a-select-option value="2">退回</a-select-option>
                  <a-select-option value="3">暂存</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新建合同</a-button>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>
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
      @change="handleTableChange">
      <template v-slot:action="row">
        <a @click.stop="onEdit(row.contractId, false)">编辑</a>
        <a-divider type="vertical"/>
        <a @click.stop="onEdit(row.contractId, true)">续租</a>
        <a-divider type="vertical"/>
        <a @click.stop="surrender(row.contractId)">退租</a>
      </template>
    </a-table>
    <new-form ref="modalForm" @change="onFormChange"></new-form>
    <surrender-form ref="surrender" @change="onFormChange"></surrender-form>
    <contract-view ref="view"></contract-view>
  </a-card>
</template>

<script>
  import NewForm from './form/NewForm'
  import SurrenderForm from './form/SurrenderForm'
  import ContractView from './view/ContractView'
  import Dom7 from 'dom7'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { columns } from './js/config'
  import { mapState } from 'vuex'
  import { initDictOptions } from '@comp/dict/JDictSelectUtil'

  export default {
    name: 'ReletContract',
    mixins: [JeecgListMixin],
    components: { ContractView, SurrenderForm, NewForm },
    data() {
      return {
        deleteKey: 'contractId',
        columns: columns.call(this),
        url: {
          list: '/park.lease/mgrLeaseContract/list',
          deleteBatch: '/park.lease/mgrLeaseContract/deleteBatch'
        },
        dict: {
          firstParty: []
        }
      }
    },
    computed: mapState('industrialPark', {
      parkId: state => state.id
    }),
    methods: {
      initDictConfig() {
        initDictOptions('contract_first_party').then(res => {
          if (res.success) {
            this.dict.firstParty = res.result
          }
        })
      },
      buildQueryParams() {
        this.queryParam['parkId'] = this.parkId
        this.queryParam['type'] = 4
      },
      onEdit(id, bool) {
        this.$refs.modalForm.edit(id, bool)
      },
      surrender(id) {
        this.$refs.surrender.open(id)
      },
      onFormChange() {
        this.loadData()
      },
      customRow() {
        return {
          on: {
            click: (e) => {
              let index = Dom7(e.currentTarget).data('row-key')
              let row = _.merge({}, this.dataSource[index])
              this.$refs.view.open(row.contractId)
            }
          }
        }
      }
    }
  }
</script>
