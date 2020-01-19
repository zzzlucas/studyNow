<template>
  <!-- 项目登记 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="关键字">
              <a-input placeholder="输入项目名称" v-model="queryParam.keyword"></a-input>
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
          <!-- 右侧新建项目 -->
          <a-col :span="8" style="float: right">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="goAddLand()">新建项目（拿地）</a-button>
              <a-button type="primary" @click="goAddLease()" style="margin-left: 8px">新建项目（租赁）</a-button>
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
      :customRow="customRow"
    >
      <span slot="actionA" slot-scope="text, record">
        <a @click.stop="showCard(record, ...arguments)">查看</a>
      </span>

      <span slot="action" slot-scope="text, record">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.stop="showZeroAdd(record, ...arguments)">
            跟踪登记
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click.stop="showTwo(record, ...arguments)">跟踪记录</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为重点跟进吗?" @confirm="() => handleDelete(record.projectId)">
                <a>转为重点跟进</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为拟落地吗?" @confirm="() => handleDelete(record.projectId)">
                <a>转为拟落地</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a @click="goLuoDi(record.projectId)">转为落地</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定转为留存吗?" @confirm="() => handleDelete(record.projectId)">
                <a>转为留存</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.projectId)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <!-- 写一个三元表达式判断对应表单类型？-->
        <a @click.stop="showWeihu(record, ...arguments)">项目维护</a>

        <a-divider type="vertical" />
        <a @click.stop="showOne(record)">项目分配</a>
      </span>
    </a-table>

    <!-- 表单区域 -->
    <show-zero ref="ShowZero" @reload="loadData()"></show-zero>

    <show-two @showOneToZeroEdit="showZeroEdit" @showOneToZeroAdd="showZeroAdd" ref="ShowTwo"></show-two>

    <show-one ref="ShowOne" @reload="loadData()"></show-one>
    <show-card ref="ShowCard"></show-card>
    <add-project-land ref="ShowAddProjectLand" @reload="loadData()"></add-project-land>
    <add-project-lease ref="ShowAddProjectLease" @reload="loadData()"></add-project-lease>
  </a-card>
</template>
<script>
//
// function stopDefault(e) {
//   e.stopPropagation()
// }
import qs from 'querystring'

import { filterObj } from '@/utils/util'
import { getAction, putAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

// import Config from '@/defaultSettings'
// import RegisterForm from './modules/RegisterForm'
// import MgrProjectTraceDrawer from './modules/mgrProjectTraceDrawer'
import ShowCard from './modules/ShowTwoMCard'
import ShowOne from './modules/ShowOneD'
import ShowTwo from './modules/ShowTwoM'
import ShowZero from './modules/ShowZeroD'
import AddProjectLand from './modules/AddProjectLand'
import AddProjectLease from './modules/AddProjectLease'

//数据字典使用步骤0
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import Dom7 from 'dom7'

export default {
  name: '',
  mixins: [JeecgListMixin],
  components: {
    ShowOne,
    ShowTwo,
    ShowZero,
    filterDictText,
    ShowCard,
    AddProjectLand,
    AddProjectLease
    // RegisterForm,
    // MgrProjectTraceDrawer
  },
  data() {
    return {
      description: '招商项目列表页',
      // 数据字典使用步骤1
      projectTypeDictOptions: '',
      industrySectorValueDictOptions: '',
      statusDictOptions: '',
      pagination: '',
      columns: [
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'projectName'
        },
        //用数据字典过滤，便于维护人员操作       数据字典使用步骤2
        {
          title: '项目类别',
          align: 'center',
          dataIndex: 'projectType',
          customRender: text => {
            return filterDictText(this.projectTypeDictOptions, text)
          }
        },
        {
          title: '行业类别',
          align: 'center',
          dataIndex: 'industrySectorValue',
          customRender: text => {
            return filterDictText(this.industrySectorValueDictOptions, text)
          }
        },
        {
          title: '总投资（万元）',
          align: 'center',
          dataIndex: 'sendTime'
        },
        {
          title: '项目联系人',
          align: 'center',
          dataIndex: 'agentPerson'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'agentTel'
        },
        // {
        //   title: '项目状态',
        //   align: 'center',
        //   dataIndex: 'status',
        //   customRender: text => {
        //     return filterDictText(this.statusDictOptions, text)
        //   }
        // },
        {
          title: '拿地面积（m²）',
          align: 'center',
          dataIndex: 'getArea'
          //暂改
        },
        {
          title: '最近跟踪纪要',
          align: 'center',
          dataIndex: 'actionA',
          scopedSlots: { customRender: 'actionA' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/park.project/mgrProjectInfo/list',
        // list: '/park.project/mgrProjectInfo/list?status=1',

        add: '/park.project/mgrProjectTrace/addMgrProjectTrace',
        edit: '/park.project/mgrProjectTrace/edit',

        editCementSend: 'sys/sysAnnouncementSend/editByAnntIdAndUserId',
        readAllMsg: 'sys/sysAnnouncementSend/readAll'
      },
      confirmLoading: false

      // mixin中已定义
      // loading: false,
      // queryParam: {
      //   projectName: ''
      // }
      // rightShow: false
    }
  },
  mounted() {
    // console.log(this.columns)
  },
  async beforeRouteEnter(to, from, next) {
    const projectTypeDictOptions = await initDictOptions('projectType')
    if (!projectTypeDictOptions.success) {
      console.log('error')
    }

    const industrySectorValueDictOptions = await initDictOptions('industrySectorValue')
    if (!industrySectorValueDictOptions.success) {
      console.log('error')
    }

    const statusDictOptions = await initDictOptions('project_status')
    if (!statusDictOptions.success) {
      console.log('error')
    }
    next(vm => {
      vm.projectTypeDictOptions = projectTypeDictOptions.result
      vm.industrySectorValueDictOptions = industrySectorValueDictOptions.result
      vm.statusDictOptions = statusDictOptions.result
    })
  },
  created() {
    // //尝试不经过url.list获取到数据，但是考虑到不走url.list方式，其他操作的数据如何传递
    // let formData = { pageNo: '1', pageSize: '10', status: '2' }
    // //此处进行qs转换反而错误
    // // formData = qs.stringify(formData)
    // getAction('/park.project/mgrProjectInfo/list', formData).then(res => {
    //   if (res.code === 200) {
    //     console.log('test strat')
    //     // const info = res.result
    //     // console.log(info)
    //     this.dataSource = res.result.records
    //     this.ipagination.total = res.result.total
    //     console.log('test end')
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // })
  },
  methods: {
    customRow(row) {
      return {
        on: {
          click: () => {
            // console.log(row.projectId)
            //拿到id
            this.$router.push({ name: 'project-attract-detail-@id', params: { id: row.projectId } })
          }
        }
      }
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
      console.log('searchReset本页面')
    },

    goAddLand() {
      //原先的新打开页面
      // this.$router.push({ path: '/project/attract/addprojectland' })
      //现在的drawer
      this.$refs.ShowAddProjectLand.add()
    },
    //项目维护
    showWeihu(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      row.projectType == 1 ? this.$refs.ShowAddProjectLand.detail(row) : this.$refs.ShowAddProjectLease.detail(row)
    },

    goAddLease() {
      // this.$router.push({ path: '/project/attract/addprojectlease' })
      this.$refs.ShowAddProjectLease.detail()
    },
    goLuoDi() {
      this.$router.push({ path: '/project/attract/ldxm' })
    },
    handleDetail: function(record) {
      this.$refs.sysAnnouncementModal.detail(record)
      this.$refs.sysAnnouncementModal.title = '查看'
    },
    showOne(record) {
      this.$refs.ShowOne.detail(record)
    },
    showTwo(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowTwo.detail(row)
    },

    showZeroEdit(record) {
      this.$refs.ShowZero.detail(record)
      console.log('showZeroEdit')
    },
    // //写法1
    // showZeroAdd(record) {
    //   this.$refs.ShowZero.partDetail(record)
    //   console.log('showZeroAdd');
    //   //从list和modal内调用得到的参数有什么区别
    //   console.log(record);
    //   console.log(record.projectId);
    // },
    //写法2
    showZeroAdd(row) {
      // row.__key = Dom7(e.currentTarget)
      //   .parents('.ant-table-row')
      //   .data('row-key')
      this.$refs.ShowZero.partDetail(row)
      // console.log('showZeroAdd')
      //从list和modal内调用得到的参数有什么区别
      // console.log(record)
      // console.log(record.projectId)
    },

    //最新一条跟踪记录，数组中最后一个？从projectid获取到最新的一个recordid,然后用这个recordid请求
    showCard(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      let params = { projectId: row.projectId }
      getAction('/park.project/mgrProjectTrace/getById', params).then(res => {
        if (res.success) {
          row = res.result[res.result.length - 1]
          this.$refs.ShowCard.detail(row)
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
      })
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