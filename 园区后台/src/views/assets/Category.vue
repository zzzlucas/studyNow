<template>
  <a-card class="assets-category-list assets-list" :bordered="false">
    <a-layout>
      <a-layout-sider theme="light">
        <assets-category :show-last="false" @select="selectCategory" v-if="showCategory" />
      </a-layout-sider>
      <a-layout-content>
        <!-- Filter/Action -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24" type="flex" justify="end">
              <a-col>
                <a-form-item>
                  <a-button type="primary" @click="handleAdd">新增分类</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <!-- Table -->
        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="categoryId"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange">
            <span slot="action" slot-scope="text, record" @click.stop>
              <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteOnPage(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
        </a-table>
      </a-layout-content>
    </a-layout>
    <!-- Add/Edit form -->
    <assets-category-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import { list as AssetsListMixin } from './mixins'
  import AssetsCategoryEditForm from './components/AssetsCategoryEditForm'
  import { url } from './api'
  import './style/list.less'

  export default {
    mixins: [
      JeecgListMixin,
      MixinList,
      AssetsListMixin,
    ],
    components: {
      AssetsCategoryEditForm,
    },
    data() {
      return {
        // Mixin option
        deleteKey: 'categoryId',
        // Url
        url: url.category,
        // Table
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: (t, r, index) => Number(index) + 1
          },
          {
            title: '分类名称',
            align: 'center',
            dataIndex: 'categoryName'
          },
          {
            title: '上级分类',
            align: 'center',
            dataIndex: 'parentName'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
      }
    },
    methods: {
      handleAdd() {
        this.$refs.modalForm.add({ parentId: this.selectCategoryKey });
        this.$refs.modalForm.title = "新增";
        this.$refs.modalForm.disableSubmit = false;
      },
      async handleDeleteOnPage(record) {
        await this.handleDelete(record)
        this.reloadCategory()
      },
    },
    watch: {
      selectCategoryKey(val) {
        this.queryParam.categoryId = val
        this.loadData(1)
      },
    }
  }
</script>

<style lang="less">
  .assets-category-list {
    .ant-table-row {
      cursor: unset;
    }
  }
</style>
