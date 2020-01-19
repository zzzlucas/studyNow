<template>
  <div>
    <a-card :bordered="false">
      <a-form :form="form">
        <a-row>
          <a-col :span="4">
            <a-form-item label="跟踪日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="开始" v-model="ff.beginDate" />
              <!-- dateFormat  放这个干吗？ -->
              <!-- <a-date-picker v-decorator="['beginDate']" /> -->
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="结束" v-model="ff.endDate" />
              <!-- <a-date-picker v-decorator="['endDate']" /> -->
            </a-form-item>
          </a-col>

          <a-col :span="5">
            <a-form-item label="跟踪人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="ff.keyword">
                <!-- <a-select v-decorator="['keyword']"> -->
                <a-select-option
                  v-for="(item, key) in dict.trackerDictOptions"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="5">
            <a-form-item label="跟踪方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="ff.trackMethod">
                <!-- <a-select v-decorator="['trackMethod']"> -->
                <a-select-option
                  v-for="(item, key) in dict.trackMethodDictOptions"
                  :value="item.value"
                  :key="key"
                >{{ item.text }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="6" :sm="8"> -->
          <a-col :span="6">
            <span style="overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchReset" icon="reload">重置</a-button>
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <a-button
            @click="ShowZeroAdd()"
            type="primary"
            icon="plus"
            style="float:left;margin-left:0"
          >新增</a-button>
        </a-row>
        <a-table
          ref="table"
          size="default"
          bordered
          rowKey="recordId"
          :columns="columns"
          :dataSource="dataSourceSTM"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <!-- :customRow="customRow" -->
          <span slot="action" slot-scope="text, record">
            <a v-if="record.trackMethod!='0'" @click="ShowZero(record, ...arguments)">编辑</a>
            <a-divider v-if="record.trackMethod!='0'" type="vertical" />
            <a @click="showCard(record, ...arguments)">查看</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-form>
    </a-card>
    <show-card ref="ShowCard"></show-card>
    <!-- @ok="rrreload" -->
    <show-zero ref="ShowZero" @reload="loadData"></show-zero>
  </div>
</template>

<script>
//父组件已有，子组件不需要
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ShowCard from '@/views/project/attract/modules/ShowTwoMCard'
import ShowZero from './ShowZeroD'
import Dom7 from 'dom7'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  mixins: [JeecgListMixin],
  name: '',
  components: { ShowCard, ShowZero },
  // props: {
  //   ipaginationSTM: ''
  // },
  data() {
    return {
      //
      ff: {},
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '跟踪记录',
      record: {},
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
      dataSourceSTM: [],
      visible: false,
      loading: false,
      bodyStyle: {
        padding: '0',
        height: window.innerHeight * 0.8 + 'px',
        'overflow-y': 'auto'
      },
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      trackerDictOptions: '',
      trackMethodDictOptions: '',
      dict: {
        trackerDictOptions: [{ value: '1' }],
        trackMethodDictOptions: [{ value: '1' }]
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
          title: '跟踪日期',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '跟踪人员',
          align: 'center',
          dataIndex: 'tracker',
          customRender: text => {
            return filterDictText(this.dict.trackerDictOptions, text)
          }
        },
        {
          title: '跟踪纪要',
          align: 'center',
          dataIndex: 'content',
          customRender: text => {
            // return typeof text
            if (text > 0 && text < 10) {
              //纯数字情况下代表只是状态转换
              return '转为' + filterDictText(this.dict.projectStatusDictOptions, text)
            } else {
              return text
            }
          }
        },
        {
          title: '跟踪方式',
          align: 'center',
          dataIndex: 'trackMethod',
          customRender: text => {
            return filterDictText(this.dict.trackMethodDictOptions, text)
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      deleteKey: 'recordId',
      url: {
        list: '/park.project/mgrProjectTrace/list',
        delete: '/park.project/mgrProjectTrace/delete'
      },
      searchFlag: false
    }
  },
  created() {
    console.log('test start-------------')
    this.initDictConfig()
    this.loadData()
    // this.getProjectTrace()
  },
  //本页面相对于原modal的修改
  //1、去掉modal，改为div
  //2.初始数据获取上，原本detail事件触发,改为creat钩子
  methods: {
    moment,
    searchQuery() {
      this.getProjectTrace(1)
    },
    searchReset() {
      this.queryParam = {}
      this.ff = {}
      this.loadData(1)
    },
    handleTableChange(pagination, filters, sorter) {
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      if (this.searchFlag) {
        console.log('查询翻页')
        this.getProjectTrace()
      } else {
        console.log('加载翻页')
        this.loadData()
      }
    },
    //获取查询条件
    getQueryParams() {
      if (this.ff.beginDate) {
        this.ff.beginDate = this.ff.beginDate ? moment(this.ff.beginDate).format('YYYY-MM-DD') : null
      }
      if (this.ff.endDate) {
        this.ff.endDate = this.ff.endDate ? moment(this.ff.endDate).format('YYYY-MM-DD') : null
      }
      var param = Object.assign({}, this.ff)
      param.projectId = this.$route.params.id
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    //表格跟踪记录获取  通过projectId查询

    //第一个获取方法  列表获取
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      this.searchFlag = false
      let params = {
        projectId: this.$route.params.id,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      this.loading = true
      getAction('/park.project/mgrProjectTrace/getById', params).then(res => {
        if (res.success) {
          this.dataSourceSTM = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },

    //第二个获取方法，查询获取
    getProjectTrace(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      this.searchFlag = true
      let params = this.getQueryParams()
      this.loading = true
      getAction('/park.project/mgrProjectTrace/list', params).then(res => {
        if (res.success) {
          this.dataSourceSTM = res.result.records
          this.ipagination.total = res.result.total
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },

    initDictConfig() {
      initDictOptions('tracker').then(res => {
        if (res.success) {
          this.dict.trackerDictOptions = res.result
        }
      })
      initDictOptions('track_method').then(res => {
        if (res.success) {
          this.dict.trackMethodDictOptions = res.result
        }
      })
      initDictOptions('project_status').then(res => {
        if (res.success) {
          this.dict.projectStatusDictOptions = res.result
        }
      })
    },
    //要给卡片传recordid
    showCard(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      // console.log(row.__key)
      this.$refs.ShowCard.detail(row)
    },
    //其实最后调用是showzero   这里需要modal内对应行的数据，ok
    ShowZero(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      // console.log(row.__key)
      // this.$emit('showOneToZeroEdit', row)
      this.$refs.ShowZero.detailDDD(row)
    },

    //这里需要list对应行的数据  不在这里给
    ShowZeroAdd() {
      //获得当前modal的projectId
      // console.log('----------');
      // console.log(this.record.projectId);
      // this.$emit('showOneToZeroAdd', this.record)
      this.$refs.ShowZero.partDetailDDD()
    },
    handleCancel() {
      this.visible = false
    },
    deleteeee() {}
  }
}
</script>

<style lang="less">
.announcementCustomModal {
  .ant-modal-header {
    border: none;
    display: inline-block;
    position: absolute;
    z-index: 1;
    right: 56px;
    padding: 0;
    .ant-modal-title {
      .custom-btn {
        width: 56px;
        height: 56px;
        border: none;
        box-shadow: none;
      }
    }
  }
  .daily-article {
    border-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.ant-btn {
  margin-left: 30px;
  margin-bottom: 30px;
  float: right;
}
.daily-article {
  .article-button {
    font-size: 1.2rem !important;
  }
  .ant-card-body {
    padding: 18px !important;
  }
  .ant-card-head {
    padding: 0 1rem;
  }
  .ant-card-meta {
    margin-bottom: 1rem;
  }
  .article-content {
    p {
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: initial;
      white-space: normal;
      font-size: 0.9rem !important;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
