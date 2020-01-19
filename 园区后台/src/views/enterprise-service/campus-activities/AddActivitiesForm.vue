<template>
  <a-drawer :title="title" width="50%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-form :form="form">
          <a-form-item label="活动名称">
            <a-input v-decorator="['title',{rules: [{required: true, message: '请输入活动名称'}]}]" />
          </a-form-item>
          <a-form-item label="活动时间">
            <!-- <a-range-picker
            v-decorator="[['begDate','endDate'], {initialValue: ['2019-11-11','2019-11-25']}]"
            ></a-range-picker>-->
            <a-date-picker
              showTime
              placeholder
              style="width:50%"
              format="YYYY-MM-DD HH:mm"
              v-decorator="['begDate',{rules: [{required: true, message: '请输入活动开始时间'}]}]"
            />
            <a-date-picker
              showTime
              placeholder
              format="YYYY-MM-DD HH:mm"
              style="width:50%"
              v-decorator="['endDate',{rules: [{required: true, message: '请输入活动结束时间'}]}]"
            />
          </a-form-item>
          <a-form-item label="活动地点">
            <a-input v-decorator="['address',{rules: [{required: true, message: '请输入活动地点'}]}]" />
          </a-form-item>
          <a-form-item label="发布时间">
            <a-date-picker
              placeholder
              format="YYYY-MM-DD"
              style="width:100%"
              v-decorator="['publishDate',{rules: [{required: true, message: '请输入发布时间'}]}]"
            />
          </a-form-item>
          <a-form-item label="活动限额">
            <a-input
              v-decorator="['applyMembersMax',{rules: [{required: true, message: '请输入活动限额'}, { pattern: /^\d+$/, message: '请输入数字' }]}]"
            />
          </a-form-item>
          <a-form-item label="主办单位">
            <a-input v-decorator="['hostUnit',{rules: [{required: true, message: '请输入主办单位'}]}]" />
          </a-form-item>
          <a-form-item label="图片">
            <j-upload v-decorator="['addDocFiles']" />
          </a-form-item>
          <a-form-item label="活动介绍">
            <j-editor v-model="editor.context"></j-editor>
          </a-form-item>
        </a-form>

        <a-button type="primary" @click="handleOk">发布</a-button>
        <a-button @click="handleOOKK">暂存</a-button>
      </a-card>
    </a-spin>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import JUpload from '@/components/jeecg/JUpload'
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import { mapGetters } from 'vuex'
import { getAction } from '../../../api/manage'

export default {
  name: '',
  components: { JEditor, JUpload },
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
        add: '/park.service/mgrActivityInfo/add',
        edit: '/park.service/mgrActivityInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '活动' + (this.editBool ? '编辑' : '发布')
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
    handleOOKK() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.activityId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.begDate = formData.begDate ? formData.begDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.publishDate = formData.publishDate ? formData.publishDate.format('YYYY-MM-DD') : null
          formData.context = context
          //暂存发布状态
          formData.status = '0'
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
          // console.log(formData)
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
              that.handleCancel()
              that.confirmLoading = false
            })
        }
      })
    },
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          if (!this.model.activityId) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          formData.begDate = formData.begDate ? formData.begDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD HH:mm:ss') : null
          formData.publishDate = formData.publishDate ? formData.publishDate.format('YYYY-MM-DD') : null

          //把这个填入的时间，和今天作比较，如果在未来，就要提示确认，以免将未来定时发布的，误操作直接发布了
          let Today = moment().format('YYYY-MM-DD')
          if (formData.publishDate > Today) {
            return that.$message.warning('填入的发布日期不是今日，请再次确认是否立即发布!')
          }

          formData.context = context
          //直接发布状态
          formData.status = '1'
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
          // console.log(formData)
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
              this.visible = false
              this.editor = {}
              setTimeout(() => {
                that.confirmLoading = false
              }, 1000)
            })
        }
      })
    },
    detail(record) {
      this.editBool = true
      this.form.resetFields()
      let rreeccoorrdd = {}
      getAction('/park.service/mgrActivityInfo/queryById', { activityId: this.$route.params.id }).then(res => {
        if (res.success) {
          rreeccoorrdd = res.result
          this.model = Object.assign({}, rreeccoorrdd)
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(
              pick(
                this.model,
                'title',
                'begDate',
                'address',
                'endDate',
                'publishDate',
                'applyMembersMax',
                'hostUnit',
                'addDocFiles',
                'context'
              )
            )
            this.editor = {
              context: rreeccoorrdd.context
            }
            this.form.setFieldsValue({
              begDate: this.model.begDate ? moment(this.model.begDate) : null
            })
            this.form.setFieldsValue({
              endDate: this.model.endDate ? moment(this.model.endDate) : null
            })
            this.form.setFieldsValue({
              publishDate: this.model.publishDate ? moment(this.model.publishDate) : null
            })
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    Add() {
      this.visible = true
      this.editBool = false
      let record = {}
      record.publishDate = moment()
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'publishDate'))
      })
    },
    handleCancel() {
      this.visible = false
      this.editor = {}
      // this.editor.context = ''
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
