<template>
  <a-card :bordered="false" class="info-list">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery" style="margin-bottom:24px;">
        <a-row :gutter="24">
          <a-col>
            <a-button style="float:right;" type="primary" @click="AddInfoForm">添加内容</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- table区域 -->
    <div class="industrial-parks-list">
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSourceLocal"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        :customRow="customRow"
      >
        <span slot="action" slot-scope="text, record" @click.stop>
          <a v-if="true" @click.stop="EditInfoForm(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <add-info-form ref="AddInfoForm" @reload="loadDataLocal"></add-info-form>
    <detail ref="Detail"></detail>
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
  components: { AddInfoForm, Detail },
  data() {
    return {
      dict: {},
      dataSourceLocal: [],
      columns: [
        {
          title: '内容标题',
          align: 'center',
          dataIndex: 'contentTitle'
        },
        // {
        //   title: '内容概要',
        //   align: 'center',
        //   dataIndex: 'contentTitle',
        //   scopedSlots: { customRender: 'titile' }
        // },
        {
          title: '排序',
          align: 'center',
          dataIndex: 'sortOrder',
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
      url: {
        list: '/platform/platformBody.controller/queryTitles',
        content: '/platform/platformBody.controller/queryContent',
        delete: '/platform/platformBody.controller/delete'
      },
      params: ''
    }
  },
  created() {
    console.log(this.$route)
    switch (this.$route.path) {
      case '/platform-introduce':
        this.params = '平台简介'
        break
      case '/platform-function':
        this.params = '平台功能'
        break
      case '/platform-advantage':
        this.params = '条件优势'
        break
      // case '/about-us':
      //   this.params = '关于我们'
      //   break
    }
    this.loadDataLocal()
  },
  watch: {
    $route() {
      // console.log('this.$route')
      // console.log(this.$route)
      switch (this.$route.path) {
        case '/platform-introduce':
          this.params = '平台简介'
          break
        case '/platform-function':
          this.params = '平台功能'
          break
        case '/platform-advantage':
          this.params = '条件优势'
          break
        // case '/about-us':
        //   this.params = '关于我们'
        //   break
      }
      this.loadDataLocal()
    }
  },
  methods: {
    loadDataLocal() {
      let paramsCurrent = { title: this.params }
      console.log(paramsCurrent)
      this.loading = true
      getAction(this.url.list, paramsCurrent).then(res => {
        if (res.code === 200) {
          this.dataSourceLocal = res.result
          console.log('this.dataSourceLocal')
          console.log(this.dataSourceLocal)
        } else {
          this.$message.error(res.message)
        }
        this.loading = false
      })
    },
    handleDelete(row) {
      var that = this
      deleteAction(that.url.delete, { title: this.params, contentTitle: row.contentTitle }).then(res => {
        if (res.success) {
          that.$message.success('删除成功！')
          that.loadDataLocal()
        } else {
          that.$message.warning('删除失败！')
        }
      })
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$refs.Detail.detail(row.contentTitle)
          }
        }
      }
    },
    AddInfoForm() {
      this.$refs.AddInfoForm.Add()
    },
    EditInfoForm(row) {
      this.$refs.AddInfoForm.detail(row.contentTitle)
    }
  }
}
</script>

<style lang='less' scoped>
.info-list {
  .anticon-fire {
    color: #dc143c;
  }
  .ant-table-row {
    cursor: pointer;
  }
}
</style>