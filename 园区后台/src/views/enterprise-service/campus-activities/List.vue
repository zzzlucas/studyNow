<template>
  <a-card :bordered="false" class="campus-activities-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label>
              <a-input placeholder="活动名称" v-model="queryParam.keyword"></a-input>
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
            <a-button
              style="float:right;margin-left: 8px"
              type="primary"
              @click="AddActivitiesForm"
            >发布活动</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="活动状态">
              <a-radio-group @change="searchQuery" v-model="queryParam.status">
                <a-radio-button value="0">未发布</a-radio-button>
                <!-- 发布后到报名结束 -->
                <a-radio-button value="1">报名中</a-radio-button>
                <!-- 报名结束到活动结束 -->
                <a-radio-button value="2">进行中</a-radio-button>
                <a-radio-button value="3">已结束</a-radio-button>
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
        rowKey="activityId"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a-popconfirm
            v-if="record.status == 0"
            title="确定发布吗?"
            @confirm="() => changeInfoForm(record)"
          >
            <a>发布</a>
          </a-popconfirm>
          <!-- <a v-if="record.status == 0" @click.stop="changeInfoForm(record)">发布</a> -->
          <a-popconfirm
            v-if="record.status == 1"
            title="确定停止报名吗?"
            @confirm="() => changeInfoFormD(record)"
          >
            <a>停止报名</a>
          </a-popconfirm>
          <a-popconfirm
            v-if="record.status == 2"
            title="确定结束活动吗?"
            @confirm="() => changeInfoFormZ(record)"
          >
            <a>结束活动</a>
          </a-popconfirm>
          <!-- <a v-if="record.status == 1" @click.stop="changeInfoFormD(record)">停止报名</a> -->
          <a-divider
            v-if="(record.status == 0)||(record.status == 1)||(record.status == 2)"
            type="vertical"
          />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-activities-form ref="AddActivitiesForm" @reload="loadData"></add-activities-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Config from '@/defaultSettings'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import AddActivitiesForm from './AddActivitiesForm'
import { getAction, putAction } from '@/api/manage'
import qs from 'qs'
import Dom7 from 'dom7'
import moment from 'moment'
import { mixinList } from '@/utils/mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'IndustrialParksList',
  components: { AddActivitiesForm },
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
          title: '活动名称',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '活动时间',
          align: 'center',
          dataIndex: 'begDate',
          width: 300
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'publishDate'
        },
        {
          title: '点击数',
          align: 'center',
          dataIndex: 'click',
          customRender: text => {
            if (text) {
              return text
            } else {
              return 0
            }
          }
        },
        {
          title: '报名数',
          align: 'center',
          dataIndex: 'num',
          customRender: text => {
            if (text) {
              return text
            } else {
              return 0
            }
          }
        },
        // {
        //   title: '评论数',
        //   align: 'center',
        //   dataIndex: ''
        // },
        {
          title: '活动状态',
          align: 'center',
          dataIndex: 'status',
          //这个真的需要字典管理
          customRender: text => {
            return filterDictText(this.dict.activityStatus, text)
            // if (text == 0) {
            //   return '未发布'
            // } else if (text == 1) {
            //   return '已发布'
            // }
          }
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
        list: '/park.service/mgrActivityInfo/list',
        delete: '/park.service/mgrActivityInfo/delete',
        deleteBatch: '/park.service/mgrActivityInfo/deleteBatch'
      },
      deleteKey: 'activityId',
      rightShow: false
    }
  },
  computed: { ...mapGetters(['industrialParkId']) },
  created() {
    initDictOptions('activity_status').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.activityStatus = res.result
      }
    })
  },
  methods: {
    //本地化处理活动日期字段显示问题
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          for (const item of res.result.records) {
            item.begDate =
              moment(item.begDate).format('MM-DD HH:mm') + ' ~ ' + moment(item.endDate).format('MM-DD HH:mm')
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
    searchReset() {
      this.queryParam = { parkId: this.industrialParkId }
      this.loadData(1)
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            // console.log(row.custId)
            // this.cusId = row.custId
            //拿到id
            this.$router.push({
              name: 'enterprise-service-campus-activities-detail-@id',
              params: { id: row.activityId }
            })
          }
        }
      }
    },
    //发布
    changeInfoForm(record) {
      let params = { status: '1', activityId: record.activityId }
      params = qs.stringify(params)
      putAction('/park.service/mgrActivityInfo/changeStatus', params).then(res => {
        if (res.code === 200) {
          this.$message.success('发布成功')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    //停止报名
    changeInfoFormD(record) {
      let params = { status: '2', activityId: record.activityId }
      params = qs.stringify(params)
      putAction('/park.service/mgrActivityInfo/changeStatus', params).then(res => {
        if (res.code === 200) {
          this.$message.success('报名已截止')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    changeInfoFormZ(record) {
      let params = { status: '3', activityId: record.activityId }
      params = qs.stringify(params)
      putAction('/park.service/mgrActivityInfo/changeStatus', params).then(res => {
        if (res.code === 200) {
          this.$message.success('活动已结束')
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    AddActivitiesForm() {
      this.$refs.AddActivitiesForm.Add()
    }
    // showAllot(row, e) {
    //   row.__key = Dom7(e.currentTarget)
    //     .parents('.ant-table-row')
    //     .data('row-key')
    //   this.$refs.ShowAllot.detail(row)
    // },
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
.campus-activities-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>