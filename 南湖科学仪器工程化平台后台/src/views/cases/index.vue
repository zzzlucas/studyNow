<template>
  <a-card :bordered="false" class="info-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery" style="margin-bottom:24px;">
        <a-row :gutter="24">
          <a-col span="8">
            <div class="flex-box">
              <a-input placeholder="案例名称" v-model="keyword"></a-input>
              <a-button style="margin: 0 10px;" type="primary" @click="searchData">搜索</a-button>
              <a-button type="primary" @click="loadData">重置</a-button>
            </div>
          </a-col>
          <a-col span="12">
            <a-radio-group v-model="categoryId" @change="changeCategory">
              <a-radio-button
                v-for="(item,key) in categoryList"
                :key="key"
                :value="item.categoryId"
              >{{item.categoryName}}</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col span="4">
            <a-button style="float:right" type="primary" @click="AddInfoForm">添加案例</a-button>
            <a-button
              style="float:right;margin-right: 10px"
              type="danger"
              icon="delete"
              @click="batchDel"
              v-if="selectedRowKeys.length > 0"
            >批量删除</a-button>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
        :customRow="customRow"
      >
        <span slot="myImg" slot-scope="text, record">
          <img class="myImg" :src="getImgPre(record.imageList)" alt />
        </span>
        <span slot="isDisplay" slot-scope="text, record" @click.stop>
          <a-switch
            @click="clickisDisplay(record)"
            v-model="record.isDisplay"
            :checked="record.isDisplay"
          />
        </span>
        <span slot="action" slot-scope="text, record" @click.stop>
          <a v-if="true" @click.stop="EditInfoForm(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <!-- 大组件区域 -->
    <add-info-form ref="AddInfoForm" @reload="loadData" @reloadCategory="reloadCategory"></add-info-form>
    <detail ref="Detail" :categoryList="categoryList"></detail>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AddInfoForm from './AddInfoForm'
import Detail from './Detail'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import { getAction, putAction, deleteAction } from '@/api/manage'
import qs from 'qs'

export default {
  mixins: [JeecgListMixin],
  name: 'cases',
  components: { AddInfoForm, Detail },
  data() {
    return {
      dict: {},
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '案例标题',
          align: 'center',
          dataIndex: 'productName'
        },
        {
          title: '缩略图',
          align: 'center',
          dataIndex: 'myImg',
          scopedSlots: { customRender: 'myImg' },
          width: 300
        },
        // {
        //   title: '最近更新时间',
        //   align: 'center',
        //   dataIndex: 'updateTime',
        //   width: 200,
        //   customRender: text => {
        //     return moment(text).format('YYYY-MM-DD HH:mm')
        //   }
        // },
        {
          title: '案例类别',
          align: 'center',
          dataIndex: 'categoryId',
          width: 200,
          customRender: text => {
            return this.filterCategoryText(this.categoryList, text)
          }
        },
        {
          title: '排序',
          align: 'center',
          dataIndex: 'sortOrder',
          width: 100
        },
        {
          title: '首页显示',
          align: 'center',
          dataIndex: 'isDisplay',
          scopedSlots: { customRender: 'isDisplay' },
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 200
        }
      ],
      categoryList: [],
      url: {
        search: '/platform/platformProduct/controller/exploreProducts',
        list: '/platform/platformProduct/controller/queryProduct',
        delete: '/platform/platformProduct/controller/deleteProduct',
        deleteBatch: '/platform/platformProduct/controller/deleteBatchProduct',
        categoryUrl: '/platform/platformProduct/controller/queryCategorys',
        productIntroduce: '/platform/platformProduct/controller/queryContent',
        change: '/platform/platformProduct/controller/is_display'
      },
      params: {},
      categoryId: '',
      keyword: ''
    }
  },
  created() {
    console.log('this is case modules')
    this.loadCategory()
  },
  destroyed() {
    console.log('i am die.')
  },
  methods: {
    clickisDisplay(row) {
      //后端设置 0 展示 1 不展示
      let isDisplay = ''
      let message = ''
      this.loading = true
      getAction(this.url.productIntroduce, { id: row.id }).then(res => {
        if (res.code === 200) {
          isDisplay = res.result.isDisplay
          if (isDisplay == null || isDisplay == 1) {
            console.log('不展示=>展示')
            isDisplay = 0
            message = '该案例已添至首页展示'
          } else if (isDisplay == 0) {
            console.log('展示=>不展示')
            isDisplay = 1
            message = '该案例已撤销首页展示'
          }
          putAction(this.url.change, qs.stringify({ id: row.id, isDisplay: isDisplay })).then(resS => {
            if (resS.code === 200) {
              this.$message.success(message)
            } else if (resS.code === 500) {
              this.$message.error(resS.message)
              this.loadData()
            } else {
              this.$message.error(message)
            }
            this.loading = false
          })
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      })
    },
    //获取第一张图片的正确路径
    getImgPre(file) {
      if (file) {
        file = file.split(',')[0]
        return window._CONFIG.imgDomainURL + file
      } else {
        return process.env.BASE_URL + 'images/iu95.jpg'
      }
    },
    //行业类别过滤器   //界面过滤，非数据过滤，避免影响相关数据操作
    filterCategoryText(dictOptions, text) {
      if (dictOptions instanceof Array) {
        for (let dictItem of dictOptions) {
          if (text == dictItem.categoryId) {
            return dictItem.categoryName
          }
        }
      }
      return text
    },
    changeCategory(e) {
      this.categoryId = e.target.value
      this.loadData(1)
    },
    //配合当前的后端逻辑
    //先获取到案例分类，然后根据分类获取案例列表
    loadCategory() {
      getAction(this.url.categoryUrl).then(res => {
        if (res.code == 200) {
          this.categoryList = res.result
          //设置[0]为默认值
          //先给界面设，然后给逻辑预设？
          //之前园区管理系统的意向房源我是怎么做的   用v-model一口气做完
          this.categoryId = this.categoryList[0].categoryId
          this.loadData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    reloadCategory() {
      getAction(this.url.categoryUrl).then(res => {
        if (res.code == 200) {
          this.categoryList = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    loadData(arg) {
      this.keyword = ''
      if (arg == 1) {
        this.ipagination.current = 1
      }
      let params = {
        categoryId: this.categoryId,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.code === 200) {
          for (const item of res.result.records) {
            if (item.isDisplay == 0) {
              item.isDisplay = true
            } else {
              item.isDisplay = false
            }
          }
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      })
    },
    searchData() {
      this.ipagination.current = 1
      let params = {
        keyword: this.keyword,
        pageNo: this.ipagination.current,
        pageSize: this.ipagination.pageSize
      }
      this.loading = true
      getAction(this.url.search, params).then(res => {
        if (res.code === 200) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      })
    },
    handleDelete(row) {
      var that = this
      deleteAction(that.url.delete, { id: row.id }).then(res => {
        if (res.success) {
          that.$message.success('删除成功！')
          that.loadData()
        } else {
          that.$message.warning('删除失败！')
        }
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$refs.Detail.detail(row)
            // console.log(row)
          }
        }
      }
    },
    AddInfoForm() {
      this.$refs.AddInfoForm.Add()
    },
    EditInfoForm(row) {
      this.$refs.AddInfoForm.detail(row)
    }
  }
}
</script>

<style lang='less' scoped>
.flex-box {
  display: flex;
}
.myImg {
  width: 180px;
  height: auto;
  max-height: 130px;
}
.info-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>