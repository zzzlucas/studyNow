<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    :title="getTitle"
    width="40%"
    :visible="visible"
    @close="close"
    destroyOnClose
    :zIndex="1001"
  >
    <a-spin :spinning="confirmLoading">
      <div>
        <a-card class="daily-article" :bordered="false">
          <a-form class="project-drawer-form" :form="form">
            <a-row>
              <a-col span="24">
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="项目名称">
                  <a-input
                    placeholder="请输入项目名称"
                    disabled
                    v-decorator="['projectName',  {rules: [{required: true, message: '请输入项目名称'}]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪日期"
              >
                <a-date-picker
                  style="width:100%"
                  v-decorator="[ 'trackDate', {rules: [{required: true, message: '请选择跟踪日期'}]}]"
                />
              </a-form-item>
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪方式"
              >
                <a-select
                  v-decorator="['trackMethod', {rules: [{required: true, message: '请选择跟踪方式'}]}]"
                >
                  <a-select-option
                    v-for="(item, key) in dict.trackMethodExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="跟踪人"
                required
              >
                <a-select v-decorator="['tracker']" :disabled="this.editBool">
                  <a-select-option
                    v-for="(item, key) in dict.trackerExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                :labelCol="labelCol.default"
                :wrapperCol="wrapperCol.default"
                label="项目状态"
              >
                <a-input disabled v-model="statusText"></a-input>
                <!-- <a-select disabled v-decorator="['status']">
                  <a-select-option
                    v-for="(item, key) in dict.statusExt"
                    :value="item.value"
                    :key="key"
                  >{{ item.text }}</a-select-option>
                </a-select>-->
              </a-form-item>
            </a-col>
            <a-row>
              <a-col>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="过程纪要">
                  <a-textarea :rows="4" placeholde v-decorator="['content', {}]"></a-textarea>
                </a-form-item>
                <a-form-item
                  class="flag"
                  :labelCol="labelCol.long"
                  :wrapperCol="wrapperCol.long"
                  label="意向房源"
                >
                  <a-button
                    type="primary"
                    shape="circle"
                    icon="flag"
                    style="left:0px"
                    @click="ShowRoom"
                  />
                  <div class="finally-room">
                    <a-tag :key v-for="item in FINALLYROOM">{{ item }}</a-tag>
                  </div>
                  <!-- <a-input placeholder="请输入意向房源组ID" v-decorator="['resourceGroupId', {}]" /> -->
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="备注">
                  <a-textarea :rows="4" placeholder v-decorator="['remark', {}]"></a-textarea>
                </a-form-item>
                <a-form-item :labelCol="labelCol.long" :wrapperCol="wrapperCol.long" label="附件">
                  <j-upload v-decorator="['addDocFiles']" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </div>
      <div class="drawer-bottom-btn-group">
        <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </div>
      <show-room ref="ShowRoom" @getResourceGroupId="getResourceGroupIdAA"></show-room>
    </a-spin>
  </a-drawer>
</template>

<script>
import { initDictOptions, filterDictText } from '@comp/dict/JDictSelectUtil'
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import qs from 'querystring'
import { ProjectAttractShowZeroForm } from '@/config/pick-fields'
import moment from 'moment'
import { mapGetters } from 'vuex'
import JUpload from '@/components/jeecg/JUpload'
import ShowRoom from './ShowRoomM'
moment.locale('zh-cn')

export default {
  name: 'mgrProjectTraceDrawer',
  components: { JUpload, ShowRoom },
  props: {
    show: {
      type: Boolean,
      default: false
    }
    // headers:
  },
  // model: {
  //   prop: 'show',
  //   event: 'close'
  // },
  visible: false,
  data() {
    return {
      title: '操作',
      visible: false,
      // model: {},
      labelCol: {
        long: {
          span: 4
        },
        default: {
          span: 6
        }
      },
      wrapperCol: {
        long: {
          span: 20
        },
        default: {
          span: 18
        }
      },
      confirmLoading: false,
      //name 的作用？
      form: this.$form.createForm(this, { name: 'mgrProjectTraceDrawer' }),
      validatorRules: {
        recordId: { rules: [{ required: true, message: '请输入记录ID!' }] },
        parkId: { rules: [{ required: true, message: '请输入园区ID!' }] }
      },
      dict: {
        // trackMethodExt: [{ value: '1' }],
        // trackerExt: [{ value: '1' }]
      },
      //是否开启编辑模式的标记
      editBool: false,
      editData: {},
      url: {
        add: '/park.project/mgrProjectTrace/addMgrProjectTrace',
        edit: '/park.project/mgrProjectTrace/edit'
      },
      statusText: '',
      FINALLYROOM: [],
      FINALLYROOMGROUPID: []
    }
  },
  computed: {
    getTitle() {
      return '跟踪记录' + (this.editBool ? '编辑' : '登记')
    },
    ...mapGetters(['industrialParkId'])
  },
  created() {
    initDictOptions('track_method').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackMethodExt = res.result
      }
    })
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.trackerExt = res.result
      }
    })
  },
  methods: {
    getResourceGroupIdAA(a, b) {
      //获取显示的数组
      this.FINALLYROOM = a
      //获取要提交的数组
      this.FINALLYROOMGROUPID = b
    },
    ShowRoom() {
      this.$refs.ShowRoom.detail()
    },
    handleCancel() {
      this.visible = false
    },
    handleImportExcel() {},
    importExcelUrl() {},
    tokenHeader() {},
    //给列表页专用，列表页通过row获取projectId
    detail(record) {
      this.editBool = true
      const that = this
      that.record = record
      that.form.resetFields()
      //可能是record对象缺少属性，从getlist api获取到的参数中只有projectid和parkid可以在这里使用
      //方法一：需要api在传入时具备更多参数，使record具备更多参数
      //方法二：获取到record里的projectid，根据这个发起get请求获取到项目跟踪信息，写入record
      //但是，跟踪记录从逻辑上来说，应当只具备新表单能力即可，编辑旧表单反而破坏跟踪记录的意义，所以虽然后端api是put方式，当post使用即可
      //最终是否获取有待商榷
      //11.19 用recordId查
      let parma = { id: record.recordId }
      // console.log(record.recordId)
      getAction('/park.project/mgrProjectTrace/selectById', parma).then(res => {
        if (res.success) {
          //要重发两次请求，太慢了，visible提上来一级，其实应该使用spin
          that.visible = true
          getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: that.record.projectId }).then(
            resSSS => {
              if (resSSS.success) {
                that.record = res.result
                that.record.projectName = resSSS.result.projectName
                that.model = Object.assign({}, that.record)
                //用record里的resourceGroupNames 变成可以被 tag 遍历的数组 FINALLYROOM
                if (that.record.resourceGroupNames) {
                  that.FINALLYROOM = that.record.resourceGroupNames.split(',')
                }
                initDictOptions('project_status').then(resInit => {
                  if (resInit.success) {
                    that.dict.statusExt = resInit.result
                    that.statusText = filterDictText(that.dict.statusExt, that.model.status)
                  }
                })
                that.$nextTick(() => {
                  that.form.setFieldsValue(pick(that.model, ProjectAttractShowZeroForm))
                  that.form.setFieldsValue({ trackDate: that.model.trackDate ? moment(that.model.trackDate) : null })
                })
              } else {
                that.$message.warning(res.message)
              }
            }
          )
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //$route.params.id获取projectId
    moment,
    detailDDD(record) {
      this.editBool = true
      const that = this
      that.record = record
      that.form.resetFields()
      let parma = { id: record.recordId }
      getAction('/park.project/mgrProjectTrace/selectById', parma).then(res => {
        if (res.success) {
          getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: that.$route.params.id }).then(
            resSSS => {
              if (resSSS.success) {
                that.record = res.result
                that.record.projectName = resSSS.result.projectName
                that.model = Object.assign({}, that.record)
                if (that.record.resourceGroupNames) {
                  that.FINALLYROOM = that.record.resourceGroupNames.split(',')
                }
                initDictOptions('project_status').then(resInit => {
                  if (resInit.success) {
                    that.dict.statusExt = resInit.result
                    that.statusText = filterDictText(that.dict.statusExt, that.model.status)
                  }
                })
                that.visible = true
                that.$nextTick(() => {
                  that.form.setFieldsValue(pick(that.model, ProjectAttractShowZeroForm))
                  that.form.setFieldsValue({ trackDate: that.model.trackDate ? moment(that.model.trackDate) : null })
                })
              } else {
                that.$message.warning(res.message)
              }
            }
          )
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //只获取部分对应行的属性  在添加新记录时候使用
    partDetail(record) {
      this.editBool = false
      const that = this
      // console.log('partDetail')
      that.form.resetFields()
      //id查询项目基本信息api
      that.visible = true
      that.confirmLoading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', { projectId: record.projectId }).then(res => {
        if (res.success) {
          // console.log(res.result.projectManager)
          record.tracker = res.result.projectManager
          record.trackDate = moment()

          //根据recordId查最近的一条跟踪信息
          getAction('/park.project/mgrProjectTrace/getById', { projectId: record.projectId }).then(resA => {
            if (resA.success) {
              //判断如果已经存在过跟踪记录,不然不用覆写projectManager这个第一首发跟踪人
              //客户给了的跟踪人有三个不同字段 projectManager tracker keyword
              //前两个概念需要统合
              //这里在已有跟踪记录的前提下，将最新一条的跟踪人选为默认跟踪人
              //项目分配的跟踪人应当可以再次更新为默认跟踪人，这一点后端api上或许有问题
              if (resA.result) {
                if (resA.result[0]) {
                  record.tracker = resA.result[resA.result.length - 1].tracker
                }
              }
              that.model = Object.assign({}, record)
              initDictOptions('project_status').then(resInit => {
                if (resInit.success) {
                  that.dict.statusExt = resInit.result
                  that.statusText = filterDictText(that.dict.statusExt, that.model.status)
                }
              })
              that.$nextTick(() => {
                that.form.setFieldsValue(pick(that.model, 'projectId', 'projectName', 'trackDate', 'tracker', 'status'))
                that.confirmLoading = false
              })
            }
          })
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //未跟进 1122
    partDetailDDD() {
      this.editBool = false
      const that = this
      that.form.resetFields()
      let record = {}
      let params = { projectId: that.$route.params.id }
      // console.log(params)
      that.visible = true
      // that.confirmLoading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', params).then(res => {
        if (res.success) {
          // console.log('object');
          // console.log(res.result);
          record.tracker = res.result.projectManager
          record.projectName = res.result.projectName
          record.projectId = res.result.projectId
          record.status = res.result.status
          // record.trackDate = res.result.trackDate
          that.model = Object.assign({}, record)
          initDictOptions('project_status').then(resInit => {
            if (resInit.success) {
              that.dict.statusExt = resInit.result
              that.statusText = filterDictText(that.dict.statusExt, that.model.status)
            }
          })
          that.$nextTick(() => {
            that.form.setFieldsValue(pick(that.model, 'projectId', 'projectName', 'trackDate', 'tracker', 'status'))
          })
          // that.confirmLoading = false
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.FINALLYROOM = []
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          //row里传过来的id
          if (!this.model.trackMethod) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.trackDate = formData.trackDate ? formData.trackDate.format('YYYY-MM-DD') : null
          formData.parkId = this.industrialParkId
          //传房间名字过去
          formData.resourceGroupNames = this.FINALLYROOM.toString()
          //传房间id过去
          formData.roomIds = this.FINALLYROOMGROUPID.toString()

          console.log(formData.resourceGroupId)
          formData = qs.stringify(formData)
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.close()
              that.confirmLoading = false
            })
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
// .mgr-project-trace-drawer .ant-btn {
//   margin-left: 10px;
//   margin-bottom: 10px;
// }
.mgr-project-trace-drawer {
  /** Button按钮间距 */
  .flag .ant-btn {
    margin-left: 5px;
    margin-bottom: 10px;
    // float: left;
  }

  .project-drawer-form {
    @width: 120px;
    .ant-form-item-label {
      width: @width;
    }

    .ant-form-item-control-wrapper {
      width: calc(~'100% - @{width}');
    }
    .ant-col-12 {
      z-index: 10;
    }
  }
}
</style>