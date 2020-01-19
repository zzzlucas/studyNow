<template>
  <!-- 客户分配表单 -->
  <a-drawer title="客户分配" width="40%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-form :form="form">
          <!-- <a-form-item label="企业ID">
          <a-input disabled v-decorator="['custId']" />
          </a-form-item>-->
          <a-form-item label="企业名称">
            <a-input
              disabled
              v-decorator="['customerName',  {rules: [{required: true, message: '请输入企业名称'}]}]"
            />
          </a-form-item>
          <a-form-item label="服务人员" required>
            <a-input v-decorator="['servicer',  {rules: [{required: true, message: '请输入服务人员'}]}]" />
            <!-- 数据字典 -->
            <!-- <a-select v-decorator="['servicer',  {rules: [{required: true, message: '请输入服务人员'}]}]">
            <a-select-option
              v-for="(item, key) in dict.trackerExt"
              :value="item.value"
              :key="key"
            >{{ item.text }}</a-select-option>
            </a-select>-->
          </a-form-item>
        </a-form>
        <!-- <div class="drawer-bottom-btn-group"> -->
          <a-button type="primary" @click="handleOk">确定</a-button>
          <a-button @click="handleCancel">取消</a-button>
        <!-- </div> -->
      </a-card>
    </a-spin>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import qs from 'qs'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { initDictOptions } from '@comp/dict/JDictSelectUtil'

export default {
  name: 'SysAnnouncementModal',
  components: {},
  data() {
    return {
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
      confirmLoading: false,
      modelStyle: {
        width: '60%',
        style: { top: '20px' },
        fullScreen: false
      },
      //常用数据初始化
      record: {},
      visible: false,
      loading: false,
      //这是跟踪人，不是服务人员，是否走字典有待考究
      dict: {
        trackerExt: [{ value: '1' }]
      },
      url: {
        edit: '/park.customer/baseCustomer/editServicer'
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
  methods: {
    handleOk() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          console.log(this.model)
          //这里其实默认走put了
          // if (!this.model.servicer) {
          //   httpurl += this.url.add
          //   method = 'post'
          // } else {
          httpurl += this.url.edit
          method = 'put'
          // }
          // let formData = {}
          let formData = Object.assign(this.model, values)
          formData = qs.stringify(formData)
          console.log(formData)
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
              that.handleCancel()
              that.confirmLoading = false
            })
        }
      })
      // this.form.resetFields()
    },
    detail(record) {
      // this.record = record
      // console.log('record');
      // console.log(record);
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'custId', 'customerName', 'servicer'))
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
