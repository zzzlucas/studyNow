<template>
  <!-- 跟踪记录表单  下拉1-->
  <a-modal
    :title="title"
    :width="1300"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="关闭"
    destroyOnClose
    :footer="null"
  >
    <a-card :bordered="false">
      <a-form :form="form">
        <a-row>
          <a-col :span="4">
            <a-form-item label="跟踪日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="开始" v-model="ff.beginDate" :format="dateFormat" />
              <!-- <a-date-picker placeholder="开始" v-decorator="['beginDate']" :format="dateFormat" /> -->
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker placeholder="结束" v-model="ff.endDate" :format="dateFormat" />
              <!-- <a-date-picker placeholder="结束" v-decorator="['endDate']" :format="dateFormat" /> -->
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
            @click="twoShowOneAdd()"
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
            <!-- 这个判断不够健壮，后端应当把转换状态的跟踪方式设为0的字典，不然后续增加跟踪方式会使逻辑破坏 -->
            <a v-if="record.trackMethod!='0'" @click="twoShowOne(record, ...arguments)">编辑</a>
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
  </a-modal>
</template>

<script>
//父组件已有，子组件不需要
import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import moment from 'moment'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ShowCard from '@/views/project/attract/modules/ShowTwoMCard'
import Dom7 from 'dom7'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

export default {
  mixins: [JeecgListMixin],
  name: '',
  components: { ShowCard },
  data() {
    return {
      //
      ff: {},
      dateFormat: 'YYYY-MM-DD',
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
      }
    }
  },
  created() {
    console.log('test start-------------')
    this.initDictConfig()
    // this.getProjectTrace()
  },
  methods: {
    moment,
    detail(record) {
      this.queryParam = {}
      this.ff = {}
      this.visible = true
      this.record = record
      //this.record.projectId 获取到了，在get请求前传入值
      console.log(this.record.projectId)
      this.loadData()
    },
    searchQuery() {
      this.loadData(1)
    },
    searchReset() {
      this.queryParam = {}
      this.ff = {}
      this.loadData(1)
    },
    //获取查询条件
    getQueryParams() {
      // console.log(this.ff.beginDate)
      this.ff.beginDate = this.ff.beginDate ? moment(this.ff.beginDate).format('YYYY-MM-DD') : null
      this.ff.endDate = this.ff.endDate ? moment(this.ff.endDate).format('YYYY-MM-DD') : null
      let param = Object.assign({}, this.ff)
      param.projectId = this.record.projectId
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    //表格跟踪记录获取  通过projectId查询

    //loadData被拆分，至少第一个坏处是：翻页时会走loadData逻辑，如何纠错

    //第一个获取方法  列表获取
    // loadData() {
    //   //还要带分页相关参数
    //   let params = {
    //     projectId: this.record.projectId,
    //     pageNo: this.ipagination.current,
    //     pageSize: this.ipagination.pageSize
    //   }
    //   this.loading = true
    //   getAction('/park.project/mgrProjectTrace/getById', params).then(res => {
    //     if (res.success) {
    //       this.dataSourceSTM = res.result.records
    //       this.ipagination.total = res.result.total
    //     }
    //     if (res.code === 510) {
    //       this.$message.warning(res.message)
    //     }
    //     this.loading = false
    //   })
    // },

    //第二个获取方法，查询获取
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
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
    twoShowOne(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      // console.log(row.__key)
      this.$emit('showOneToZeroEdit', row)
    },

    //这里需要list对应行的数据  不在这里给
    twoShowOneAdd() {
      //获得当前modal的projectId
      // console.log('----------');
      // console.log(this.record.projectId);
      this.$emit('showOneToZeroAdd', this.record)
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
