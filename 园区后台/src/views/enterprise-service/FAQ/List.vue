<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="问题描述" v-model="queryParam.keyword"></a-input>
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
            <a-button style="float:right;margin-left: 8px" type="primary" @click="AddQForm">添加问题</a-button>
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
        rowKey="newId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record">
          <a v-if="true" @click.stop="EditQForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <!-- <a v-if="true" @click.stop="EditQForm(record, ...arguments)">删除</a> -->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-q-form ref="AddQForm" @reload="loadData"></add-q-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import AddQForm from './AddQForm'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import { mixinList } from '@/utils/mixin'

export default {
  name: 'IndustrialParksList',
  components: { AddQForm },
  mixins: [JeecgListMixin, mixinList],
  data() {
    return {
      description: '',
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
        {
          title: '编号',
          dataIndex: '',
          key: 'rowIndex',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        // {
        //   title: '编号',
        //   align: 'center',
        //   dataIndex: 'newId',
        //   width: 200
        // },
        {
          title: '问题描述',
          align: 'center',
          dataIndex: 'titile'
        },
        // {
        //   title: '发布人',
        //   align: 'center',
        //   dataIndex: 'legalPerson'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      //资讯type是写在queryParam中的，这次尝试写死在地址里，更方便
      url: {
        list: '/park.service/mgrNewsInfo/list?type=1',
        delete: '/park.service/mgrNewsInfo/delete',
        deleteBatch: '/park.service/mgrNewsInfo/deleteBatch'
      },
      deleteKey: 'newId',
      temprow: '',
      rightShow: false
    }
  },
  computed: {},
  created() {
    initDictOptions('industry_gategory').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industryCategoryExt = res.result
      }
    })
  },
  methods: {
    customRow(row) {
      return {
        on: {
          click: () => {
            // console.log(row.custId)
            // this.cusId = row.custId
            //拿到id
            // this.$router.push({
            //   name: 'enterprise-service-campus-activities-detail-@id',
            //   params: { id: row.activityId }
            // })
          }
        }
      }
    },
    EditQForm(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.AddQForm.detail(row)
    },
    AddQForm() {
      this.$refs.AddQForm.Add()
    },
    showAllot(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowAllot.detail(row)
    }
    // handleEdit(row, e) {
    //   row.__key = Dom7(e.currentTarget)
    //     .parents('.ant-table-row')
    //     .data('row-key')
    //   this.temprow = row
    //   console.log(this.temprow)
    //   // this.$refs.form.edit(row)
    // }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/common.less';
</style>