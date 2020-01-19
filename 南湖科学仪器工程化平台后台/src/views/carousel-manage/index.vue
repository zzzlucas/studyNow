<template>
  <a-card :bordered="false" class="info-list">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery" style="margin-bottom:24px;">
        <a-row :gutter="24">
          <a-col>
            <a-button style="float:right;" type="primary" @click="AddInfoForm">添加Banner</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- table区域-begin -->
    <div class="industrial-parks-list">
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        :customRow="customRow"
      >
        <span slot="myImg" slot-scope="text, record">
          <img class="myImg" :src="getImgPre(record.imageList)" alt preview="1" />
        </span>
        <span slot="url" slot-scope="text, record">
          <a :href="record.url">{{record.url}}</a>
        </span>
        <span slot="status" slot-scope="text, record">
          <!-- @change="changeStatus" -->
          <a-switch @click="clickStatus(record)" v-model="record.status" :checked="record.status" />
          <!-- <span>{{record.status}}</span> -->
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
    <add-info-form ref="AddInfoForm" @reload="loadData"></add-info-form>
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AddInfoForm from './AddInfoForm'
import moment from 'moment'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import { getAction, putAction, deleteAction } from '@/api/manage'
import qs from 'qs'

export default {
  mixins: [JeecgListMixin],
  components: { AddInfoForm },
  data() {
    return {
      dict: {},
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'title'
        },
        {
          title: '主图',
          align: 'center',
          dataIndex: 'myImg',
          scopedSlots: { customRender: 'myImg' },
          width: 300
        },
        {
          title: '超链接',
          align: 'center',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' },
          width: 250
        },

        {
          title: '说明',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '排序',
          align: 'center',
          dataIndex: 'sortOrder',
          width: 100
        },
        {
          title: '显示状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
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
      dataSource: [],
      url: {
        list: '/platformPictures/platformPictures/display',
        delete: '/platformPictures/platformPictures/delete',
        change: '/platformPictures/platformPictures/editStatus',
        content: '/platformPictures/platformPictures/queryById'
      },
      params: {},
      rowId: ''
    }
  },
  created() {},
  methods: {
    //第一：要根据数据来，第二：要改数据提交
    //思路1：只传一个参数id，status就取反,那要知道该个status，就得api再查一次
    //感想：愚笨的方法。。。
    clickStatus(row) {
      let status = ''
      let message = ''
      this.loading = true
      getAction(this.url.content, { id: row.id }).then(res => {
        if (res.code === 200) {
          status = res.result.status
          if (status == 'true') {
            status = false
            message = '隐藏成功'
          } else if (status == 'false') {
            status = true
            message = '显示成功'
          }
          putAction(this.url.change, qs.stringify({ id: row.id, status: status })).then(res => {
            if (res.code === 200) {
              this.$message.success(message)
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
    //思路2：把customRow封装为promise。。。不靠谱
    changeStatus(e) {
      console.log(e)
      this.customRow() //并没有及时获取，因为这个说到底不是promise
      // console.log(this.rowId)
      putAction(this.url.change, { id: this.rowId, status: e }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
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
    loadData() {
      this.loading = true
      // let paramsCurrent = { title: this.params }
      getAction(this.url.list).then(res => {
        if (res.code === 200) {
          for (const item of res.result) {
            if (item.status == 'true') {
              item.status = true
            } else if (item.status == 'false') {
              item.status = false
            }
          }
          this.dataSource = res.result
          this.$previewRefresh()
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
            this.rowId = row.id
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
.myImg {
  width: 250px;
  height: auto;
  max-height: 130px;
  cursor: pointer;
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