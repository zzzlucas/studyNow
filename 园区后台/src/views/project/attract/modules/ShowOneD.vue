<template>
  <!-- 项目分配表单 -->
  <a-drawer title="选择跟踪人员" width="40%" destroyOnClose :visible="visible" @close="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-form :form="form">
          <a-form-item label="项目名称">
            <a-input
              placeholder="请输入项目名称"
              disabled
              v-decorator="['projectName',  {rules: [{required: true, message: '请输入项目名称'}]}]"
            />
          </a-form-item>
          <a-form-item label="跟踪人">
            <!-- 数据字典 -->
            <a-select
              v-decorator="['tracker',  {rules: [{required: true, message: '请输入选择项目跟踪人'}]}]"
            >
              <a-select-option
                v-for="(item, key) in dict.trackerExt"
                :value="item.value"
                :key="key"
              >{{ item.text }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
      <div class="drawer-bottom-btn-group">
        <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>

<script>
import { httpAction, getAction, putAction } from '@/api/manage'
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
      confirmLoading: false,
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
      visible: false,
      loading: false,
      dict: {
        trackerExt: [{ value: '1' }]
      },
      url: {
        // list: '/park.project/mgrProjectInfo/assignProject',
        edit: '/park.project/mgrProjectInfo/assignProject'
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

          httpurl += this.url.edit
          method = 'put'

          // let formData = {}
          let formData = Object.assign(this.model, values)
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                //在这里改变项目状态
                that.goKeyFollow(that.record)
                // that.$emit('reload')
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
      let proId = record.projectId
      getAction('/park.project/mgrProjectTrace/getById', { projectId: proId }).then(resAAA => {
        // console.log(resAAA.result[0].tracker);
        if (resAAA.result[resAAA.result.length - 1]) {
          record.tracker = resAAA.result[resAAA.result.length - 1].tracker
        }
        this.record = record
        // this.form.resetFields()
        this.model = Object.assign({}, this.record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'projectName', 'tracker'))
        })
      })
    },
    handleCancel() {
      this.visible = false
    },
    goKeyFollow(record) {
      // console.log('record')
      // const that = this
      let params = { projectId: record.projectId, status: '2' }
      params = qs.stringify(params)
      putAction('/park.project/mgrProjectInfo/changeStatus', params).then(res => {
        if (res.success) {
          // console.log('hello');
          // console.log(res.result);
          this.$message.success('该项目已成为重点跟进项目！')
          this.$emit('reload')
          // this.$message.success(res.message)

          //跳转路由   项目分配这里，暂时就不跳转了
          // this.$router.push({ path: '/project/attract/keyfollow' })
        } else {
          // console.log('hello X-X');
          this.$message.warning(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-spin-nested-loading {
  position: inherit;
  /deep/ .ant-spin-container {
    position: inherit;
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
// .ant-btn {
//   margin-left: 30px;
//   margin-bottom: 30px;
//   float: right;
// }
// .daily-article {
//   .article-button {
//     font-size: 1.2rem !important;
//   }
//   .ant-card-body {
//     padding: 18px !important;
//   }
//   .ant-card-head {
//     padding: 0 1rem;
//   }
//   .ant-card-meta {
//     margin-bottom: 1rem;
//   }
//   .article-content {
//     p {
//       word-wrap: break-word;
//       word-break: break-all;
//       text-overflow: initial;
//       white-space: normal;
//       font-size: 0.9rem !important;
//       margin-bottom: 0.8rem;
//     }
//   }
// }
</style>
