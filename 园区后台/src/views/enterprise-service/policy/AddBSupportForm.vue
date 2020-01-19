<template>
  <a-drawer :title="title" width="70%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item label="内容描述">
          <j-editor v-model="editor.context"></j-editor>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import JEditor from '@comp/jeecg/JEditor'
import { httpAction, getAction } from '@/api/manage'
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
      key: '',
      editor: {},
      model: {},
      visible: false,
      loading: false,
      editBool: false,
      dict: {
        talentPolicyExt: '',
        publishingDepartmentExt: ''
      },
      url: {
        add: '/park.service/mgrPolicyInfo/add',
        edit: '/park.service/mgrPolicyInfo/edit'
      }
    }
  },
  computed: {
    title() {
      return '政策详情' + (this.editBool ? '编辑' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {},
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          const { context } = this.editor
          let httpurl = ''
          let method = ''
          let url = ''
          //后端逻辑给了留个不同接口来提交富文本，而第一个又区别于其他五个的要求
          switch (this.key) {
            case '1':
              url = '/park.service/mgrPolicyInfo/edit'
              break
            case '2':
              url = '/park.service/mgrPolicyInfo/addSupport'
              values.support = context
              break
            case '3':
              url = '/park.service/mgrPolicyInfo/addConditions'
              values.conditions = context
              break
            case '4':
              url = '/park.service/mgrPolicyInfo/addProcedure'
              values.procedure = context
              break
            case '5':
              url = '/park.service/mgrPolicyInfo/addMaterial'
              values.material = context
              break
            case '6':
              url = '/park.service/mgrPolicyInfo/addServices'
              values.services = context
              break
          }
          httpurl += url
          method = 'put'
          let formData = Object.assign(this.model, values)
          formData.context = context
          let typeGroups = []
          for (const item of formData.types) {
            typeGroups.push(item.labelNo)
          }
          typeGroups = typeGroups.toString()
          formData.typeGroups = typeGroups
          let deptGroups = []
          for (const item of formData.depts) {
            deptGroups.push(item.labelNo)
          }
          deptGroups = deptGroups.toString()
          formData.deptGroups = deptGroups
          delete formData.types
          delete formData.depts
          delete formData.isPublic
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
    //根据当前页面的tab
    //打开时参数传入当前页签key   ？  自己判断当前key
    //key为1，就走政策原文流程，key为2，就走扶持力度流程，以此类推
    detail(key) {
      console.log(key)
      this.key = key
      this.editBool = true
      this.form.resetFields()
      let record = {}
      let params = { id: this.$route.params.id }
      getAction('/park.service/mgrPolicyInfo/queryById', params).then(res => {
        if (res.success) {
          record = res.result
          switch (key) {
            case '1':
              record.context = record.context
              break
            case '2':
              record.context = record.support
              break
            case '3':
              record.context = record.conditions
              break
            case '4':
              record.context = record.procedureFlow
              break
            case '5':
              record.context = record.material
              break
            case '6':
              record.context = record.services
              break
          }
          //打印当前要显示的富文本内容
          console.log(record.context)
          this.model = Object.assign({}, record)
          this.visible = true
          this.$nextTick(() => {
            this.editor = {
              context: record.context
            }
          })
        } else {
          this.$message.warning(res.message)
        }
      })
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
