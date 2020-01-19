<template>
  <a-drawer :title="title" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-form :form="form">
          <a-form-item label="问题描述">
            <a-input v-decorator="['titile',  {rules: [{required: true, message: '请输入活动名称'}]}]" />
          </a-form-item>

          <a-form-item label="答案描述">
            <!-- <a-input v-decorator="['context', {rules: [{required: true, message: '请输入活动介绍'}]}]" /> -->
            <j-editor v-model="editor.context"></j-editor>
          </a-form-item>
        </a-form>

        <a-button type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </a-card>
    </a-spin>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: { JEditor },
  data() {
    return {
      form: this.$form.createForm(this),
      // title: '通知消息',
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
      loading: false,
      editBool: false,
      confirmLoading: false,
      //这是跟踪人，不是服务人员，是否走字典有待考究
      dict: {
        trackerExt: [{ value: '1' }]
      },
      url: {
        add: '/park.service/mgrNewsInfo/add',
        edit: '/park.service/mgrNewsInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '问题' + (this.editBool ? '编辑' : '添加')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackerExt = res.result
      }
    })
  },
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
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
          formData.context = context
          //常见问题使用的类型是1 ，此项不在表中填写
          formData.type = '1'
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
          // console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                // that.visible = false
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.visible = false
              this.editor.context = ''
              setTimeout(() => {
                that.confirmLoading = false
              }, 1000)
            })
        }
      })
      // this.form.resetFields()
    },
    detail(record) {
      this.editBool = true
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.editor = {
          context: record.context
        }
        this.form.setFieldsValue(pick(this.model, 'titile'))
      })
    },
    Add() {
      this.editBool = false
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      this.editor.context = ''
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
