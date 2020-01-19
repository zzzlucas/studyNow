<template>
  <a-drawer :title="title" width="400" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="分类名称">
          <a-input
            v-decorator="['categoryName',  {rules: [{required: true, message: '请输入分类名称'}]}]"
          />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-decorator="['sortOrder']" />
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="handleOk">提交</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import pick from 'lodash/pick'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction, putAction, httpAction } from '@/api/manage'

export default {
  name: '',
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
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
      //常用数据初始化
      record: {},
      editor: {},
      model: {},
      visible: false,
      editBool: false,
      dict: {},
      url: {
        add: '/platform/platformProduct/controller/addCategory',
        edit: '/platform/platformProduct/controller/editCategory'
      }
    }
  },
  created() {},
  computed: {
    title() {
      return '分类' + (this.editBool ? '维护' : '添加')
    }
  },
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.editBool) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          // formData.title = '案例动态'
          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.handleCancel()
            })
        }
      })
    },
    detail(row) {
      this.editBool = true
      this.form.resetFields()
      this.model = Object.assign({}, row)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'categoryName', 'sortOrder'))
      })
    },
    Add() {
      console.log(this.url.add)
      this.editBool = false
      this.form.resetFields()
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      this.editor.content = ''
    }
  }
}
</script>

<style lang="less">
.ant-calendar-time-picker-panel {
  .ant-calendar-time-picker-select:last-child {
    display: none !important;
  }
}
.ant-calendar-time-picker-column-3 {
  .ant-calendar-time-picker-select {
    width: 50% !important;
  }
}
</style>
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
