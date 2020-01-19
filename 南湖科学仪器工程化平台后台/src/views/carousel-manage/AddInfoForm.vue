<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="标题">
          <a-input v-decorator="['title',  {rules: [{required: true, message: '请输入标题'}]}]" />
        </a-form-item>
        <a-form-item label="图片">
          <j-upload v-decorator="['imageList',{rules: [{required: true, message: '请上传图片'}]}]" />
        </a-form-item>
        <a-form-item label="超链接">
          <a-input v-decorator="['url']" />
        </a-form-item>
        <a-form-item label="说明">
          <a-textarea :rows="4" v-decorator="['remark']" />
        </a-form-item>
        <a-row>
          <a-col span="12">
            <a-form-item label="排序">
              <a-input-number style="width:90%" v-decorator="['sortOrder']" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="显示状态">
              <a-switch @change="!checked" v-model="checked" />
            </a-form-item>
          </a-col>
        </a-row>
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
      checked: false,
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
        add: '/platformPictures/platformPictures/add',
        edit: '/platformPictures/platformPictures/edit',
        content: '/platformPictures/platformPictures/queryById'
        // switch: '/platformPictures/platformPictures/editStatus'
      }
    }
  },
  created() {},
  computed: {
    title() {
      return 'Banner' + (this.editBool ? '维护' : '新增')
    }
  },
  methods: {
    categoryManage() {
      this.$refs.categoryManage.detail()
    },
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
          console.log(that.checked)
          formData.status = that.checked
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
      getAction(this.url.content, { id: row.id }).then(res => {
        if (res.code === 200) {
          this.visible = true
          this.model = Object.assign({}, res.result)
          if (this.model.status == 'false') {
            this.checked = false
          } else if (this.model.status == 'true') {
            this.checked = true
          }
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'title', 'imageList', 'url', 'remark', 'sortOrder', 'status'))
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
