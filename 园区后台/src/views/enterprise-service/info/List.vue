<template>
  <a-card :bordered="false" class="info-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="资讯名称" v-model="queryParam.keyword"></a-input>
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
            <a-button style="float:right;margin-left: 8px" type="primary" @click="AddInfoForm">发布资讯</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="发布状态">
              <a-radio-group @change="searchQuery" v-model="queryParam.isPublic">
                <a-radio-button value>不限</a-radio-button>
                <a-radio-button value="0">未发布</a-radio-button>
                <a-radio-button value="1">已发布</a-radio-button>
                <a-radio-button value="2">已撤销</a-radio-button>
              </a-radio-group>
              <!-- <a-checkbox-group @change="searchQuery" v-model="queryParam.isPublic">
                <a-checkbox value>不限</a-checkbox>
                <a-checkbox value="1">已发布</a-checkbox>
                <a-checkbox value="0">未发布</a-checkbox>
              </a-checkbox-group>-->
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="类别">
              <a-radio-group @change="searchQuery" v-model="queryParam.type">
                <a-radio-button value="2">新闻</a-radio-button>
                <a-radio-button value="3">通知公告</a-radio-button>
              </a-radio-group>
              <!-- <a-checkbox-group @change="searchQuery" v-model="queryParam.type">
                <a-checkbox value="2">通知公告</a-checkbox>
                <a-checkbox value="3">新闻</a-checkbox>
              </a-checkbox-group>-->
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
        rowKey="newId"
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
          <a-popconfirm
            v-if="record.isPublic == 1"
            title="确定撤销吗?"
            @confirm="() => changeInfoFormD(record, ...arguments)"
          >
            <a>撤销</a>
          </a-popconfirm>
          <!-- <a v-if="record.isPublic == 0" @click.stop="changeInfoForm(record, ...arguments)">发布</a> -->
          <!-- <a v-if="record.isPublic == 1" @click.stop="changeInfoFormD(record, ...arguments)">撤销</a> -->
          <a-divider v-if="record.isPublic == 0" type="vertical" />
          <a-divider v-if="record.isPublic == 1" type="vertical" />

          <a v-if="true" @click.stop="EditInfoForm(record, ...arguments)">编辑</a>
          <a-divider type="vertical" />
          <!-- <a v-if="true" @click.stop="EditInfoForm(record, ...arguments)">删除</a> -->
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-info-form ref="AddInfoForm" @reload="loadData"></add-info-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import AddInfoForm from './AddInfoForm'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import moment from 'moment'
import { mixinList } from '@/utils/mixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'IndustrialParksList',
  components: { AddInfoForm },
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
        //
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
          title: '类别',
          align: 'center',
          dataIndex: 'type',
          width: 150,
          // customRender: function(text) {    此处必须是用箭头函数，箭头函数不产生自己的作用域，没有自己的this
          customRender: text => {
            return filterDictText(this.dict.newsTypeExt, text)
          }
        },
        {
          title: '资讯状态',
          align: 'center',
          dataIndex: 'isPublic',
          width: 150,
          customRender: text => {
            if (text == '0') {
              return '未发布'
            } else if (text == '1') {
              return '已发布'
            } else {
              return '已撤销'
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
        list: '/park.service/mgrNewsInfo/list',
        delete: '/park.service/mgrNewsInfo/delete',
        deleteBatch: '/park.service/mgrNewsInfo/deleteBatch'
      },
      deleteKey: 'newId',
      queryParam: {
        type: '4'
      },
      temprow: '',
      rightShow: false,
      cusId: ''
    }
  },
  computed: {},
  created() {
    // console.log(this.queryParam)
  },
  methods: {
    loadData() {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      var params = this.getQueryParams()
      this.loading = true
      initDictOptions('news_type').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.newsTypeExt = res.result
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
        }
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            //拿到id
            this.$router.push({
              name: 'enterprise-service-info-detail-@id',
              params: { id: row.newId }
            })
          }
        }
      }
    },
    //发布
    changeInfoForm(record) {
      let params = { isPublic: '1', newId: record.newId }
      params = qs.stringify(params)
      putAction('/park.service/mgrNewsInfo/edit', params).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    //撤销
    changeInfoFormD(record) {
      let params = { isPublic: '2', newId: record.newId }
      params = qs.stringify(params)
      putAction('/park.service/mgrNewsInfo/edit', params).then(res => {
        if (res.code === 200) {
          this.$message.success('撤销成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    searchReset() {
      this.queryParam = { type: '4' }
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
<style lang="less" >
@import '../../../assets/less/common.less';
.info-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>