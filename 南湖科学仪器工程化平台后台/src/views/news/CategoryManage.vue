<template>
  <!-- 跟踪记录表单  下拉1-->
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭"
    okText="添加"
    destroyOnClose
  >
    <a-card :bordered="false">
      <!-- <a-button style="margin-bottom:24px;" type="primary" @click="AddInfoForm">添加分类</a-button> -->
      <!-- table区域-begin -->
      <div class="industrial-parks-list">
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="newId"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, record" @click.stop>
            <a v-if="true" @click.stop="EditInfoForm(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              v-if="record.categoryNum==0"
              title="确定删除该分类吗?"
              @confirm="() => handleDelete(record)"
            >
              <a>删除</a>
            </a-popconfirm>
            <a-popconfirm
              v-if="record.categoryNum>0"
              title="该分类下存在案例，依旧确定删除该分类吗?"
              @confirm="() => handleDelete(record)"
            >
              <a disabled>删除</a>
            </a-popconfirm>
          </span>
        </a-table>
        <a-alert message="存在内容的分类不允许直接删除。" style="margin-top:20px" type="warning" closeText="关闭提示" />
      </div>
      <!-- table区域-end -->
    </a-card>
    <category-manage-form ref="CategoryManageForm" @reload="loadData"></category-manage-form>
  </a-modal>
</template>

<script>
//父组件已有，子组件不需要
import { getAction, putAction, deleteAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import CategoryManageForm from './CategoryManageForm'

export default {
  mixins: [JeecgListMixin],
  components: { CategoryManageForm },
  name: '',
  data() {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      title: '分类管理',
      visible: false,
      loading: false,
      columns: [
        {
          title: '分类名称',
          align: 'center',
          dataIndex: 'categoryName'
        },
        {
          title: '该分类下条目数',
          align: 'center',
          dataIndex: 'categoryNum'
        },
        {
          title: '分类排序',
          align: 'center',
          dataIndex: 'sortOrder'
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
        list: '/platform/platformNews/controller/queryCategorys',
        delete: '/platform/platformNews/controller/delete',
        num: '/platform/platformNews/controller/countNums'
      }
    }
  },
  created() {},
  methods: {
    handleDelete(row) {
      var that = this
      deleteAction(that.url.delete, { categoryId: row.categoryId }).then(res => {
        if (res.success) {
          that.$message.success('删除成功！')
          that.loadData()
        } else {
          that.$message.warning('删除失败！')
        }
      })
    },
    loadData() {
      getAction(this.url.list).then(res => {
        if (res.code == 200) {
          for (const item of res.result) {
            getAction(this.url.num, { categoryId: item.categoryId }).then(resNum => {
              Object.assign(item, { categoryNum: resNum })
              //最后一次循环时候再复制，保护性能
              if (item == res.result[res.result.length - 1]) {
                this.dataSource = res.result
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleOk() {
      console.log('1')
      this.$refs.CategoryManageForm.Add()
    },
    EditInfoForm(row) {
      this.$refs.CategoryManageForm.detail(row)
    },
    detail() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      this.$emit('reload')
    }
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
