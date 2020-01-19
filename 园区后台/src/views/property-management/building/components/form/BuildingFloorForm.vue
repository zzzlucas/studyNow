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
      <a-form class="drawer-form building-floor-form" layout="horizontal" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在厂房">
          <a-input disabled :value="names.project" v-if="names.project"></a-input>
          <a-select
            v-else
            v-decorator="['buildingProjectId', {rules: rules.buildingProjectId}]"
            placeholder="请选择厂房"
            @change="selectChange"
          >
            <a-select-option
              v-for="(item, key) in select.project"
              :value="item.value"
              :key="key"
            >{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在楼宇">
          <a-input disabled :value="names.build" v-if="names.build"></a-input>
          <a-select
            v-else
            v-decorator="['buildingId', {rules: rules.buildingId}]"
            placeholder="请选择楼宇"
          >
            <a-select-option
              v-for="(item, key) in select.build"
              :value="item.value"
              :key="key"
            >{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="楼层名称">
          <a-input placeholder="请输入楼层名称" v-decorator="['floorName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="楼层面积">
          <a-input placeholder="请输入楼层面积" v-decorator="['allarea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="计费面积">
          <a-input placeholder="请输入计费面积" v-decorator="['chargingArea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="层高">
          <a-input placeholder="请输入层高" v-decorator="['height', {}]" addonAfter="米" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="承重">
          <a-input placeholder="请输入承重" v-decorator="['bearing', {}]" addonAfter="KN/㎡" />
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
import pick from 'lodash/pick'
import _ from 'lodash'
import qs from 'qs'
import { httpAction } from '@/api/manage'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import { PickBuildingFloorForm } from '@/config/pick-fields'
import { floor as rules } from '../../js/rules'
import { mapState } from 'vuex'
import { ajaxGetDictItems } from '@api/api'

export default {
  name: 'BuildingFloorForm',
  data() {
    return {
      rules,
      uploadFile,
      title: '楼层',
      visible: false,
      model: {},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
      form: this.$form.createForm(this, { name: 'buildingFloor' }),
      url: {
        add: '/park.architecture/baseArchitectureFloor/add',
        edit: '/park.architecture/baseArchitectureFloor/edit'
      },
      confirmLoading: false,
      fileList: [],
      select: {
        project: [],
        build: []
      },
      names: {
        project: '',
        build: ''
      },
      ids: {
        project: '',
        build: ''
      }
    }
  },
  methods: {
    init(names, ids) {
      this.fileList = []
      this.names = names
        ? names
        : {
            project: '',
            build: ''
          }
      this.ids = ids
        ? ids
        : {
            project: '',
            build: ''
          }

      let projectDict = 'base_architecture_project,project_name,building_project_id,park_id=' + this.parkId
      ajaxGetDictItems(projectDict)
        .then(res => {
          if (res.success) {
            this.select.project = res.result
            let id = this.ids.project || res.result[0].value
            this.ids.project = ''
            this.form.setFields({ buildingProjectId: { value: id } })
            return id
          } else {
            throw new Error(res.message)
          }
        })
        .then(this.getBuildDict.bind(this))
        .catch(err => {
          this.$message.error(err)
        })
    },
    add(ids) {
      this.init(null, ids)
      this.title = '新建楼层'
      this.form.resetFields()
      this.visible = true
    },
    edit(record, names) {
      this.init(names)
      this.title = '编辑楼层'
      this.form.resetFields()

      record.isVirtual = record.isVirtual === 'true'

      this.model = Object.assign({}, record)

      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, PickBuildingFloorForm))

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

          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.buildingId

          if (!this.model.floorId) {
            form.parkId = this.parkId
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.parkId = this.parkId
            form.floorId = this.model.floorId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then(res => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'floor', pid, [data.buildingProjectId, data.buildingId])
              this.close()
              this.confirmLoading = false
            } else {
              this.$message.warning(res.message)
              this.confirmLoading = false
            }
          })
        })
        .catch(err => {
          console.log('新建楼层：', err)
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
    },
    getBuildDict(id) {
      return new Promise((resolve, reject) => {
        let buildDict = 'base_architecture_building,building_name,building_id,building_project_id=' + id
        ajaxGetDictItems(buildDict).then(res => {
          if (res.success) {
            this.select.build = res.result
            if (res.result.length > 0) {
              let id = this.ids.build || res.result[0].value
              this.ids.build = ''
              this.form.setFields({ buildingId: { value: id } })
              resolve(id)
            } else {
              this.form.resetFields(['buildingId'])
              reject('没有查到楼宇')
            }
          } else {
            reject(res.message)
          }
        })
      })
    },
    selectChange(id) {
      this.getBuildDict(id).catch(err => {
        this.$message.error(err)
      })
    }
  },
  computed: mapState({
    parkId: state => state.industrialPark.id
  })
}
</script>
