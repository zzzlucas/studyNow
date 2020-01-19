<template>
  <!-- 项目分配表单 -->
  <a-drawer :title="myTitle" width="40%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-card :bordered="false">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="姓名">
          <a-input v-decorator="['memberName',{rules: [{required: true, message: '请输入姓名'}]}]" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="股权占比">
          <a-input
            addonAfter="%"
            v-decorator="['equrityRatio',{rules: [{required: true, message: '请输入股权占比'},ratePart]}]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="已授权发明专利数">
          <a-input v-decorator="['inventPatentMount']" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="工业固定资产投资额">
          <a-input addonAfter="万元" v-decorator="['fixedAssetInvest']" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="是否高新技术企业">
          <a-radio-group v-decorator="['isTechnologyCust']">
            <a-radio value="1">是</a-radio>
            <a-radio value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="附件">
          <j-upload v-decorator="['addDocFiles']" />
        </a-form-item>
      </a-form>

      <a-button type="primary" @click="handleOk">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </a-card>
  </a-drawer>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'
import JUpload from '@/components/jeecg/JUpload'
import { ratePart } from '@/config/regex'
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: { fillUnit: String },
  components: { JUpload },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        }
      },
      ratePart,
      form: this.$form.createForm(this),
      title: '通知消息',
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
      // myTitle: '新增法人股东',
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      //常用数据初始化
      record: {},
      model: {},
      visible: false,
      loading: false,
      dict: {
        trackerExt: [{ value: '1' }]
      },
      editBool: false,
      url: {
        list: '/project/mgrCustTeamMember/queryById',
        add: '/project/mgrCustTeamMember/add',
        edit: '/project/mgrCustTeamMember/edit',
        delete: '/project/mgrCustTeamMember/delete'
      }
    }
  },
  created() {
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackerExt = res.result
      }
    })
  },
  computed: {
    myTitle() {
      return (this.editBool ? '编辑' : '新增') + '法人股东'
    },
    ...mapGetters(['industrialParkId'])
  },
  methods: {
    handleOk() {
      //具备添加及编辑修改的能力
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          //没有股权占比，就认为是新增，对应的，该项在新增是应为必填项目
          //还是看有没有走detail获得项目id吧，上面这个股权占比感觉有问题
          //12-13 这个判断还是要出问题
          if (!this.editBool) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          //
          // let formData = {}
          let formData = Object.assign(this.model, values)
          //把公司id塞进数据里去
          //在编辑时，会重新拿一遍fillUnit
          formData.custId = this.fillUnit
          formData.projectId = that.$route.params.id
          formData.memberType = '1'
          formData.parkId = this.industrialParkId
          formData = qs.stringify(formData)
          console.log(formData)
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
      // this.form.resetFields()
    },
    add() {
      this.editBool = false
      this.visible = true
    },
    //还没自己写
    detail(record) {
      this.editBool = true
      let proId = this.$route.params.id
      //不存在record  等有了api再说   //现在有了
      // console.log(res.result[0].tracker);
      this.record = record
      // this.form.resetFields()
      this.model = Object.assign({}, this.record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'memberName',
            'equrityRatio',
            'inventPatentMount',
            'fixedAssetInvest',
            'isTechnologyCust',
            'addDocFiles'
          )
        )
      })
    },
    handleCancel() {
      this.visible = false
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
