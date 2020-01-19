<template>
  <a-drawer
    class="form-edit-drawer"
    :title="getTitle"
    width="65%"
    closable
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer">
    <a-spin :spinning="confirmLoading">
      <a-form
        class="form-edit-drawer-form"
        layout="horizontal"
        :form="form"
        :label-col="gridOptions.formItem.label"
        :wrapper-col="gridOptions.formItem.value"
        @submit="submit">
        <a-row>
          <a-col :xl="24">
            <a-form-item label="分类名称">
              <a-input v-decorator="['categoryName', {rules: rules.categoryName}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item label="上级分类">
              <a-tree-select
                treeDefaultExpandAll
                v-decorator="['parentId']"
                :treeData="categoryTreeData" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="action-row" type="flex" justify="end">
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button @click="closeDrawer">取消</a-button>
            </a-form-item>
          </a-col>
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button type="primary" html-type="submit">确认</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { filterObj, promiseForm, buildTreeData } from '@utils/util'
import { assetsCategoryEditForm } from '@/config/pick-fields'
import { treeListCategory, addCategory, editCategory } from '../api'

export default {
  mixins: [FormEditDrawerMixin('assets-category')],
  data() {
    return {
      // Grid
      gridOptions: {
        formItem: {
          label: { span: 6 },
          value: { span: 18 }
        }
      },
      confirmLoading: false,
      // Form
      fields: assetsCategoryEditForm,
      // Rules
      rules: {
        categoryName: [{ required: true, message: '请输入分类名称' }]
      },
      category: []
    }
  },
  computed: {
    categoryTreeData() {
      if (!this.category || !this.category.length) {
        return []
      }
      return buildTreeData(this.category, 'categoryId', 'categoryName')
    }
  },
  methods: {
    async getCategory() {
      if (!this.category.length) {
        await this.fetchCategory()
      }
    },
    async fetchCategory() {
      const resp = await treeListCategory({ parkId: this.industrialParkId, need: 1 })
      this.category = resp.result
    },
    async setDefaultFields() {
      await this.$nextTick()
      if (this.record.parentId) {
        this.form.setFieldsValue({ parentId: this.record.parentId })
      }
    },
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()
      try {
        const data = await promiseForm(this.form)
        filterObj(data)
        data.parkId = this.industrialParkId
        let resp
        if (this.isEdit) {
          data.categoryId = this.record.categoryId
          resp = await editCategory(data)
        } else {
          resp = await addCategory(data)
        }
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.category = []
        this.$message.success('操作成功')
        this.closeDrawer()
        this.$emit('submit')
        this.confirmLoading = false
      } catch (e) {
        this.$message.error(e.message)
        this.confirmLoading = false
      }
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return
      }
      this.getCategory()
      this.setDefaultFields()
    }
  }
}
</script>
