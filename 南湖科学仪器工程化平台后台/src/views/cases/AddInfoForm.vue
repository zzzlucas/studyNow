<template>
  <a-drawer :title="title" width="1180" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col span="24">
            <a-form-item label="案例标题">
              <a-input
                v-decorator="['productName',  {rules: [{required: true, message: '请输入标题'}]}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="16">
            <a-form-item label="案例类别">
              <a-radio-group
                v-decorator="['categoryId',  {rules: [{required: true, message: '请选择案例类别'}]}]"
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
            <a-form-item label="单位">
              <a-input v-decorator="['createrUnit']" />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="作者">
              <a-input v-decorator="['productCreater']" />
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
            <a-form-item label="实施日期">
              <a-date-picker
                v-decorator="['inventTime',{rules: [{required: true, message: '请选择日期'}]}]"
                style="width:100%"
                placeholder
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="封面图片">
          <j-upload v-decorator="['imageList', {rules: [{required: true, message: '请上传封面图'}]}]" />
        </a-form-item>

        <!-- <a-form-item label="案例简介（选填）">
          <a-input v-decorator="['newsTitle']" />
        </a-form-item>-->
        <a-form-item label="案例介绍">
          <j-editor v-model="editor.productIntroduce"></j-editor>
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
        add: '/platform/platformProduct/controller/add',
        edit: '/platform/platformProduct/controller/editContent',
        productIntroduce: '/platform/platformProduct/controller/queryContent',
        categoryUrl: '/platform/platformProduct/controller/queryCategorys'
      }
    }
  },
  created() {
    this.loadCategory()
  },
  computed: {
    title() {
      return '案例' + (this.editBool ? '编辑' : '新建')
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
          const { productIntroduce } = this.editor
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
          formData.productIntroduce = productIntroduce
          formData.inventTime = formData.inventTime ? moment(formData.inventTime).format('YYYY-MM-DD') : null
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
      getAction(this.url.productIntroduce, { id: row.id }).then(res => {
        if (res.code == 200) {
          this.visible = true
          this.model = Object.assign({}, res.result)
          this.$nextTick(() => {
            this.form.setFieldsValue(
              pick(this.model, 'productName', 'createrUnit', 'productCreater', 'imageList', 'categoryId', 'sortOrder')
            )
            this.form.setFieldsValue({
              inventTime: this.model.inventTime ? moment(this.model.inventTime) : null
            })
            this.editor = {
              productIntroduce: res.result.productIntroduce
            }
          })
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
      this.editor.productIntroduce = ''
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
  .article-productIntroduce {
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
