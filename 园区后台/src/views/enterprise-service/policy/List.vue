<template>
  <a-card :bordered="false" class="policy-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="政策标题" v-model="queryParam.keyword"></a-input>
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
            <a-button style="float:right;margin-left: 8px" type="primary" @click="AddAInfoForm">发布政策</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="政策类别">
              <a-checkbox-group @change="searchQueryCheckBox" v-model="queryParam.typeGroups">
                <a-checkbox value="alltypeGroups" class="ant-radio-button-wrapper">不限</a-checkbox>
                <a-checkbox
                  class="ant-radio-button-wrapper"
                  v-for="(item, key) in dict.talentPolicy"
                  :key="key"
                  :value="item.value"
                >{{ item.text || item.label }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="发布部门">
              <!-- 在不限按钮按下时，状态Flag为true,加载时判断状态为true，就会自动清空对应参数 -->
              <!-- <a-button @click="searchQueryNoParma">不限</a-button> -->

              <a-checkbox-group @change="searchQueryCheckBox" v-model="queryParam.deptGroups">
                <a-checkbox value="alldeptGroups" class="ant-radio-button-wrapper">不限</a-checkbox>
                <a-checkbox
                  class="ant-radio-button-wrapper"
                  v-for="(item, key) in dict.publishingDepartment"
                  :key="key"
                  :value="item.value"
                >{{ item.text || item.label }}</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="16" :sm="8">
            <a-form-item label="发布状态">
              <a-radio-group
                @change="searchQuery"
                v-model="queryParam.isPublic"
                buttonStyle="solid"
              >
                <a-radio-button value>不限</a-radio-button>
                <a-radio-button value="1">已发布</a-radio-button>
                <a-radio-button value="0">未发布</a-radio-button>
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
        rowKey="policyId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="titile" slot-scope="text, record">
          <span>{{record.titile}}</span>
          <a-icon v-if="record.sortOrder>0" type="fire" />
          <a-icon v-if="record.sortOrder>1" type="fire" />
          <a-icon v-if="record.sortOrder>2" type="fire" />
          <a-icon v-if="record.sortOrder>3" type="fire" />
          <a-icon v-if="record.sortOrder>4" type="fire" />
        </span>
        <span slot="action" slot-scope="text, record" @click.stop>
          <a-popconfirm
            v-if="record.isPublic == 0"
            title="确定发布吗?"
            @confirm="() => changeInfoForm(record, ...arguments)"
          >
            <a>发布</a>
          </a-popconfirm>
          <a-divider v-if="record.isPublic == 0" type="vertical" />

          <a v-if="true" @click.stop="EditInfoForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.policyId)">
            <a>删除</a>
          </a-popconfirm>
          <!-- <a v-if="true" @click.stop="handleDelete(record.policyId)">删除</a> -->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-a-info-form ref="AddAInfoForm" @reload="loadData"></add-a-info-form>
  </a-card>
</template>

<script>
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import AddAInfoForm from './AddAInfoForm'
import { getAction, putAction, deleteAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import _ from 'lodash'

export default {
  name: 'IndustrialParksList',
  components: { AddAInfoForm },
  mixins: [JeecgListMixin, mixinList],
  data() {
    return {
      description: '',
      dict: {},
      btn: [],
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'titile',
          scopedSlots: { customRender: 'titile' }
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'publishTime',
          width: 180,
          customRender: text => {
            return moment(text).format('YYYY-MM-DD HH:mm')
          }
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'isPublic',
          width: 150,
          customRender: text => {
            if (text == '0') {
              return '未发布'
            } else if (text == '1') {
              return '已发布'
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
        list: '/park.service/mgrPolicyInfo/list',
        delete: '/park.service/mgrPolicyInfo/delete',
        batchDel: '/park.service/mgrPolicyInfo/deleteBatch',
        deleteBatch: '/park.service/mgrPolicyInfo/deleteBatch'
      },
      deleteKey: 'policyId',
      queryParam: {
        // typeGroups: '',
        // deptGroups: ''
      },
      temprow: '',
      rightShow: false,
      searchQueryNoParmaFlag: false
    }
  },
  computed: { ...mapGetters(['industrialParkId']) },
  created() {},
  methods: {
    moment,
    // btnClick(key, value){
    //   const btn = _.clone(this.btn)
    //   if(_.get(btn, `[${key}]`)){
    //     _.unset(btn)
    //     this.btn = btn
    //   } else {
    //     _.set(btn, `[${key}]`, value)
    //   }
    // },
    initConfig() {
      initDictOptions('policy_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.talentPolicy = res.result
        }
      })
      initDictOptions('publishing_department').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.publishingDepartment = res.result
        }
      })
    },
    // batchDel() {
    //   console.log(this.selectedRowKeys)
    //   let policyIdS = []
    //   for (const item of this.selectedRowKeys) {
    //     policyIdS.push(this.dataSource[item].policyId)
    //   }
    //   policyIdS = policyIdS.toString()
    //   let parma = { ids: policyIdS }
    //   deleteAction(this.url.batchDel, parma).then(res => {
    //     if (res.success) {
    //       this.$message.success(res.message)
    //       this.loadData()
    //     } else {
    //       this.$message.warning(res.message)
    //     }
    //   })
    // },
    handleDelete(record) {
      deleteAction(this.url.delete, { id: record }).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.loadData()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    loadData() {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      // console.log(this.searchQueryNoParmaFlag)
      // if (this.searchQueryNoParmaFlag) {
      //   this.queryParam.deptGroups = []
      // }
      var params = this.getQueryParams()
      console.log('33 params')
      console.log(_.cloneDeep(params))
      if (params) {
        console.log(typeof params.deptGroups)
      }
      console.log(params.deptGroups instanceof Array)
      //流程到这里时候，已经是一个字符串了？？？why   字符串、数组、对象   2019-11-28
      console.log(params.deptGroups)
      if (params.deptGroups == 'alldeptGroups') {
        params.deptGroups = []
      }
      if (params.typeGroups == 'alltypeGroups') {
        params.typeGroups = []
      }
      if (params.deptGroups) {
        params.deptGroups = params.deptGroups.toString()
      }
      if (params.typeGroups) {
        params.typeGroups = params.typeGroups.toString()
      }
      this.loading = true
      this.initConfig()
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        } else {
          //筛选条件下无内容的情况，清空表格
          if (res.result == null) {
            this.dataSource = null
          }
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            //拿到id
            this.$router.push({
              name: 'enterprise-service-policy-detail-@id',
              params: { id: row.policyId }
            })
          }
        }
      }
    },
    //发布
    changeInfoForm(record) {
      //解决俩类别需要提交的问题
      //先从后端给的数组中获取组合成自己的数组
      //1
      let typeGroups = []
      for (const item of record.types) {
        typeGroups.push(item.labelNo)
      }
      typeGroups = typeGroups.toString()
      //2
      let deptGroups = []
      for (const item of record.depts) {
        deptGroups.push(item.labelNo)
      }
      deptGroups = deptGroups.toString()
      let params = { isPublic: '1', policyId: record.policyId, typeGroups, deptGroups }
      params = qs.stringify(params)
      putAction('/park.service/mgrPolicyInfo/edit', params).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    searchQueryNoParma() {
      this.searchQueryNoParmaFlag = !this.searchQueryNoParmaFlag
      this.loadData(1)
    },
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.loadData(1)
    },
    searchQuery() {
      this.loadData(1)
    },
    searchQueryCheckBox(values) {
      //这个实现方式不如后来在前台写的好
      //部门全查
      if (values.indexOf('alldeptGroups') !== -1) {
        this.queryParam.deptGroups = ['alldeptGroups']
      }
      //类别全查
      if (values.indexOf('alltypeGroups') !== -1) {
        this.queryParam.typeGroups = ['alltypeGroups']
      }
      this.loadData(1)
    },
    AddAInfoForm() {
      this.$refs.AddAInfoForm.Add()
    },
    EditInfoForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddAInfoForm.detail(row)
    }
  }
}
</script>
<style lang="scss">
.policy-list {
  @mixin group {
    .ant-radio-button-wrapper {
      border-radius: 4px;
      border: 1px solid #d9d9d9;
      margin-bottom: 8px;
      & + .ant-radio-button-wrapper {
        margin-left: 8px;
      }
      &:before {
        display: none;
      }
    }
  }
  .ant-radio-group {
    @include group;
    .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
      box-shadow: unset;
      border-color: #1890ff;
      &:hover {
        border-color: #40a9ff;
      }
      &:active {
        border-color: #096dd9;
      }
    }
    & + .ant-radio-group {
      margin-left: 8px;
    }
  }
  .ant-checkbox-group {
    display: inline;
    @include group;
    .ant-radio-button-wrapper {
      .ant-checkbox .ant-checkbox-inner {
        display: none;
      }
      & > span:last-of-type {
        padding: 0;
      }
      &.ant-checkbox-wrapper-checked {
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        &:hover {
          background-color: #40a9ff;
          border-color: #40a9ff;
        }
        &:active {
          background-color: #096dd9;
          border-color: #096dd9;
        }
      }
    }
  }
}
</style>
<style lang="less">
@import '../../../assets/less/common.less';
.policy-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>