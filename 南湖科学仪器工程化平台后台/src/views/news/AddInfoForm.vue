<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="资讯标题">
          <a-input v-decorator="['newsTitle',  {rules: [{required: true, message: '请输入标题'}]}]" />
        </a-form-item>
        <!-- <a-divider /> -->

        <a-row>
          <a-col span="16">
            <a-form-item label="资讯类别">
              <a-radio-group
                v-decorator="['categoryId',  {rules: [{required: true, message: '请选择资讯类别'}]}]"
              >
                <a-radio
                  v-for="(item,key) in categoryList"
                  :key="key"
                  :value="item.categoryId"
                >{{item.categoryName}}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item>
              <a @click.prevent="categoryManage" style="float:right">
                <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />类别管理
              </a>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col span="12">
            <a-form-item label="排序">
              <a-input-number style="width:100%" v-decorator="['sortOrder']" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="发布时间">
              <a-date-picker
                showTime
                v-decorator="['publishTime',{rules: [{required: true, message: '请选择时间'}]}]"
                style="width:100%"
                format="YYYY-MM-DD HH:mm"
                placeholder
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="封面图">
          <j-upload v-decorator="['imageList', {rules: [{required: true, message: '请上传封面图'}]}]" />
        </a-form-item>
        <a-form-item label="资讯内容">
          <j-editor v-model="editor.content"></j-editor>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="handleOk">提交</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
    <category-manage ref="categoryManage" @reload="loadCategory"></category-manage>
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
import categoryManage from './CategoryManage'

export default {
  name: '',
  components: { JEditor, JUpload, categoryManage },
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
      categoryList: [],
      record: {},
      editor: {},
      model: {},
      visible: false,
      editBool: false,
      dict: {},
      url: {
        add: '/platform/platformNews/controller/add',
        edit: '/platform/platformNews/controller/editContent',
        content: '/platform/platformNews/controller/queryContent',
        categoryUrl: '/platform/platformNews/controller/queryCategorys'
      }
    }
  },
  created() {
    this.loadCategory()
  },
  computed: {
    title() {
      return '资讯' + (this.editBool ? '编辑' : '新建')
    }
  },
  methods: {
    loadCategory() {
      getAction(this.url.categoryUrl).then(res => {
        if (res.code == 200) {
          this.categoryList = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    categoryManage() {
      this.$refs.categoryManage.detail()
    },
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
          formData.publishTime = formData.publishTime ? formData.publishTime.format('YYYY-MM-DD HH:mm:ss') : null
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
        if (res.code == 200) {
          this.visible = true
          this.model = Object.assign({}, res.result)
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model, 'newsTitle', 'categoryId', 'imageList', 'sortOrder'))
            this.editor = {
              content: res.result.content
            }
            this.form.setFieldsValue({
              publishTime: this.model.publishTime ? moment(this.model.publishTime) : null
            })
          })
        }
      })
    },
    // detail(row) {
    //   this.editBool = true
    //   this.form.resetFields()
    //   console.log(row)
    //   //后端徐大神给的api压根没有生成id，所以不拿详情api再查询了，就直接拿分页得到的对付吧；前台那个还是必须要详情api的
    //   this.model = Object.assign({}, row)
    //   this.visible = true
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue(pick(this.model, 'newsTitle', 'categoryId', 'imageList'))
    //     this.editor = {
    //       content: this.model.content
    //     }
    //   })
    // },
    Add() {
      this.editBool = false
      this.form.resetFields()
      this.visible = true
      let record = {}
      record.publishTime = moment()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'publishTime'))
      })
    },
    handleCancel() {
      this.visible = false
      this.editor.content = ''
      this.$emit('reloadCategory')
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
