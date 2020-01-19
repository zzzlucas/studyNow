<template>
  <a-drawer
    width="65%"
    placement="right"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    @close="close"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="drawer-form building-block-form" layout="horizontal" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="厂房名称">
          <a-input placeholder="请输入厂房名称" v-decorator="['projectName', {rules: rules.projectName}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="厂房简称">
          <a-input placeholder="请输入厂房简称" v-decorator="['projectAbbr', {rules: rules.projectAbbr}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="房源类型">
          <a-input placeholder="请输入房源类型" v-decorator="['rentTypeValue', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="业主">
          <a-input placeholder="请输入业主" v-decorator="['ownerName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="物业公司">
          <a-input placeholder="请输入物业公司" v-decorator="['propertyCompany', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总建筑面积">
          <a-input placeholder="请输入总建筑面积" v-decorator="['buildingArea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总计费面积">
          <a-input placeholder="请输入总计费面积" v-decorator="['rentArea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea rows="4" placeholder="请输入备注" v-decorator="['remark', {}]" />
        </a-form-item>
        <a-form-item label="附件" help="单张图片不超过 10M" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            ref="upload"
            action
            listType="picture-card"
            accept="image/jpeg, image/png"
            :fileList="fileList"
            :customRequest="uploadFile"
            :beforeUpload="uploadBefore"
            @preview="uploadPreview"
            @change="uploadChange"
          >
            <div v-if="fileList.length < 5">
              <a-icon type="plus" />
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
      <div class="drawer-bottom-btn-group">
        <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </div>
    </a-spin>
  </a-drawer>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import _ from 'lodash'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import qs from 'qs'
import { PickBuildingBlockForm } from '@/config/pick-fields'
import { block as rules } from '../../js/rules'
import { mapState } from 'vuex'

export default {
  name: 'BuildingBlockForm',
  data() {
    return {
      rules,
      uploadFile,
      title: '厂房',
      visible: false,
      model: {},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
      confirmLoading: false,
      form: this.$form.createForm(this, { name: 'buildingBlock' }),
      url: {
        add: '/park.architecture/baseArchitectureProject/add',
        edit: '/park.architecture/baseArchitectureProject/edit'
      },
      fileList: []
    }
  },
  methods: {
    init() {
      this.fileList = []
    },
    add() {
      this.init()
      this.title = '新建厂房'
      this.form.resetFields()
      this.visible = true
    },
    edit(record) {
      this.init()
      this.title = '编辑厂房'
      this.form.resetFields()
      this.model = Object.assign({}, record)

      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, PickBuildingBlockForm))

        let images = JSON.parse(record.addDocFiles)
        images = _.map(images, obj => {
          obj.response = { old: obj.url }
          obj.url = getOneImage(obj.url)
          obj.thumbUrl = obj.url
          return obj
        })

        this.fileList = images
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      // 触发表单验证
      this.confirmLoading = true
      const form = promiseForm(this.form)

      form
        .then(form => {
          this.confirmLoading = true
          let httpUrl = ''
          let method = ''

          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          if (!this.model.buildingProjectId) {
            form.parkId = this.parkId
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.buildingProjectId = this.model.buildingProjectId
            // form.parkId = this.model.parkId
            form.parkId = this.parkId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then(res => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'block')
              this.close()
              this.confirmLoading = false
            } else {
              this.$message.warning(res.message)
              this.confirmLoading = false
            }
          })
        })
        .catch(err => {
          console.log('厂房新增：', err)
          this.confirmLoading = false
        })
    },
    handleCancel() {
      this.close()
    },
    async uploadBefore(file) {
      if (file.size > 10485760) {
        const errorStr = '该图片大于 10M'
        this.$message.error(errorStr)
        throw new Error(errorStr)
      }

      return true
    },
    uploadPreview(e) {
      window.open(e.response.url)
    },
    uploadChange({ file, fileList }) {
      if (file.status === 'done') {
        const data = fileList[fileList.length - 1]
        data.url = data.response.url
        data.thumbUrl = data.response.url
        fileList[fileList.length - 1] = data
      }

      this.fileList = fileList

      if (file.status === 'error') {
        this.$message.error(file.response.message)
        this.$delete(this.fileList, this.fileList.length - 1)
      }
    }
  },
  computed: mapState({
    parkId: state => state.industrialPark.id
  })
}
</script>
