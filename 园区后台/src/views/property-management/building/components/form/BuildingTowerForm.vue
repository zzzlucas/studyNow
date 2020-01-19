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
      <a-form class="drawer-form building-tower-form" layout="horizontal" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在厂房">
          <a-input disabled :value="names.project" v-if="names.project"></a-input>
          <a-select
            v-else
            v-decorator="['buildingProjectId', {rules: rules.buildingProjectId}]"
            placeholder="请选择厂房"
          >
            <a-select-option
              v-for="(item, key) in select.project"
              :value="item.value"
              :key="key"
            >{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="楼宇名称">
          <a-input placeholder="请输入楼宇名称" v-decorator="['buildingName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="建筑面积">
          <a-input placeholder="请输入建筑面积" v-decorator="['estimateArea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地上层数">
          <a-input placeholder="请输入地上层数" v-decorator="['groundFloor', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地下层数">
          <a-input placeholder="请输入地下层数" v-decorator="['undergroundFloor', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人">
          <a-input placeholder="请输入联系人" v-decorator="['contactPerson', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['contactTel', {rules: rules.contactTel}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否虚拟">
          <a-switch
            checkedChildren="是"
            unCheckedChildren="否"
            v-decorator="['isVirtual', {initialValue: false, valuePropName: 'checked'}]"
          />
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
import { getAction, httpAction } from '@/api/manage'
import pick from 'lodash/pick'
import _ from 'lodash'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import qs from 'qs'
import { PickBuildingTowerForm } from '@/config/pick-fields'
import { tower as rules } from '../../js/rules'
import { mapState } from 'vuex'
import { ajaxGetDictItems } from '@api/api'

export default {
  name: 'BuildingTowerForm',
  data() {
    return {
      rules,
      uploadFile,
      title: '楼宇',
      visible: false,
      model: {},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
      form: this.$form.createForm(this, { name: 'buildingTower' }),
      url: {
        add: '/park.architecture/baseArchitectureBuilding/add',
        edit: '/park.architecture/baseArchitectureBuilding/edit'
      },
      fileList: [],
      confirmLoading: false,
      select: {
        project: []
      },
      names: {
        project: ''
      },
      ids: {
        project: ''
      }
    }
  },
  methods: {
    init(names, ids) {
      this.fileList = []
      this.names = names
        ? names
        : {
            project: ''
          }
      this.ids = ids
        ? ids
        : {
            project: ''
          }

      let projectDict = 'base_architecture_project,project_name,building_project_id,park_id=' + this.parkId
      ajaxGetDictItems(projectDict)
        .then(res => {
          if (res.success) {
            this.select.project = res.result
            let id = this.ids.project || res.result[0].value
            this.ids.project = ''
            this.form.setFields({ buildingProjectId: { value: id } })
          } else {
            throw new Error(res.message)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    add(ids) {
      this.init(null, ids)
      this.title = '新建楼宇'
      this.form.resetFields()
      this.visible = true
    },
    edit(record, names) {
      this.init(names)
      this.title = '编辑楼宇'
      this.form.resetFields()

      record.isVirtual = record.isVirtual === 'true'

      this.model = Object.assign({}, record)

      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, PickBuildingTowerForm))

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
      this.confirmLoading = true
      // 触发表单验证
      promiseForm(this.form)
        .then(form => {
          this.confirmLoading = true
          let httpUrl = ''
          let method = ''

          form.allFloor = parseInt(form.groundFloor) + parseInt(form.undergroundFloor)
          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.buildingProjectId

          if (!this.model.buildingId) {
            form.parkId = this.parkId
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.parkId = this.parkId
            form.buildingId = this.model.buildingId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then(res => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'tower', pid)
              this.close()
              this.confirmLoading = false
            } else {
              this.$message.warning(res.message)
              this.confirmLoading = false
            }
          })
        })
        .catch(err => {
          console.log('新建楼宇：', err)
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
