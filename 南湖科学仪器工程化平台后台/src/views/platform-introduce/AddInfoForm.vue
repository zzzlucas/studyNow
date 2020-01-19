<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="内容标题">
          <a-input v-decorator="['contentTitle',  {rules: [{required: true, message: '请输入标题'}]}]" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number  v-decorator="['sortOrder']" />
        </a-form-item>
        <a-form-item label="内容">
          <j-editor v-model="editor.content"></j-editor>
        </a-form-item>
        <!-- <a-form-item label="图片">
          <j-upload v-decorator="['addDocFiles']" />
        </a-form-item>-->
      </a-form>
      <a-button type="primary" @click="handleOk">提交</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import JUpload from '@/components/jeecg/JUpload'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { getAction, putAction, httpAction } from '@/api/manage'

export default {
  name: '',
  components: { JEditor, JUpload },
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
        add: '',
        add1: '/platform/platformBody.controller/add_1',
        add2: '/platform/platformBody.controller/add_2',
        add3: '/platform/platformBody.controller/add_3',
        add4: '/platform/platformBody.controller/add_4',
        edit: '/platform/platformBody.controller/edit',
        content: '/platform/platformBody.controller/queryContent'
      },
      params: ''
    }
  },
  created() {
    switch (this.$route.path) {
      case '/platform-introduce':
        this.url.add = this.url.add1
        this.params = '平台简介'
        break
      case '/platform-function':
        this.url.add = this.url.add2
        this.params = '平台功能'
        break
      case '/platform-advantage':
        this.url.add = this.url.add3
        this.params = '条件优势'
        break
      case '/about-us':
        this.url.add = this.url.add4
        break
    }
  },
  watch: {
    $route() {
      switch (this.$route.path) {
        case '/platform-introduce':
          this.url.add = this.url.add1
          this.params = '平台简介'
          break
        case '/platform-function':
          this.url.add = this.url.add2
          this.params = '平台功能'
          break
        case '/platform-advantage':
          this.url.add = this.url.add3
          this.params = '条件优势'
          break
        case '/about-us':
          this.url.add = this.url.add4
          break
      }
    }
  },
  computed: {
    title() {
      return '内容' + (this.editBool ? '编辑' : '新建')
    }
  },
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { content } = this.editor
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
          formData.content = content
          // debugger
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
      getAction(this.url.content, { title: this.params, contentTitle: row }).then(res => {
        if (res.code === 200) {
          this.model = Object.assign({}, res.result)
          delete this.model.platformProduct
          delete this.model.platformNews
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'contentTitle','sortOrder'))
            this.editor = {
              content: this.model.content
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    Add() {
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
