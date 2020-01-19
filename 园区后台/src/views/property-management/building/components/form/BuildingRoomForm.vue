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
      <a-form class="drawer-form building-room-form" layout="horizontal" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在厂房">
          <a-input disabled :value="names.project" v-if="names.project"></a-input>
          <a-select
            v-else
            v-decorator="['buildingProjectId', {rules: rules.buildingProjectId}]"
            placeholder="请选择厂房"
            @change="selectChange('project', ...arguments)"
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
            @change="selectChange('build', ...arguments)"
          >
            <a-select-option
              v-for="(item, key) in select.build"
              :value="item.value"
              :key="key"
            >{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所在楼层">
          <a-input disabled :value="names.floor" v-if="names.floor"></a-input>
          <a-select v-else v-decorator="['floorId', {rules: rules.floorId}]" placeholder="请选择楼层">
            <a-select-option
              v-for="(item, key) in select.floor"
              :value="item.value"
              :key="key"
            >{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="房间名称">
          <a-input placeholder="请输入房间名称" v-decorator="['roomName', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="房间面积">
          <a-input placeholder="请输入房间面积" v-decorator="['actualArea', {}]" addonAfter="㎡" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系人">
          <a-input placeholder="请输入联系人" v-decorator="['contactPerson', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['contactTel', {rules: rules.contactTel}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否可租">
          <a-switch
            checkedChildren="是"
            unCheckedChildren="否"
            v-decorator="['isRented', {initialValue: false, valuePropName: 'checked'}]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否自用">
          <a-switch
            checkedChildren="是"
            unCheckedChildren="否"
            v-decorator="['isSelfUse', {initialValue: false, valuePropName: 'checked'}]"
          />
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
        <a-form-item label="房间照片" help="单张图片不超过 10M" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
import qs from 'qs'
import { getFileListData, getOneImage, promiseForm, uploadFile } from '@utils/util'
import { PickBuildingRoomForm } from '@/config/pick-fields'
import { room as rules } from '../../js/rules'
import { mapState } from 'vuex'
import { ajaxGetDictItems } from '@api/api'

export default {
  name: 'BuildingRoomForm',
  data() {
    return {
      rules,
      uploadFile,
      title: '房间',
      visible: false,
      model: {},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      },
      form: this.$form.createForm(this, { name: 'buildingRoom' }),
      url: {
        add: '/park.architecture/baseArchitectureRoom/add',
        edit: '/park.architecture/baseArchitectureRoom/edit'
      },
      fileList: [],
      confirmLoading: false,
      select: {
        project: [],
        build: [],
        floor: []
      },
      names: {
        project: '',
        build: '',
        floor: ''
      },
      ids: {
        project: '',
        build: '',
        floor: ''
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
            build: '',
            floor: ''
          }
      this.ids = ids
        ? ids
        : {
            project: '',
            build: '',
            floor: ''
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
        .then(this.getFloorDict.bind(this))
        .catch(err => {
          this.$message.error(err)
        })
    },
    add(ids) {
      this.init(null, ids)
      this.title = '新建房间'
      this.form.resetFields()
      this.visible = true
    },
    edit(record, names) {
      this.init(names)
      this.title = '编辑房间'
      this.form.resetFields()

      record.isRented = record.isRented === 'true'
      record.isSelfUse = record.isSelfUse === 'true'
      record.isVirtual = record.isVirtual === 'true'

      this.model = Object.assign({}, record)

      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, PickBuildingRoomForm))

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
      const form = promiseForm(this.form)

      form
        .then(form => {
          this.confirmLoading = true
          let httpUrl = ''
          let method = ''

          form.addDocFiles = JSON.stringify(getFileListData(this.fileList))

          const pid = form.floorId

          if (!this.model.roomId) {
            form.parkId = this.parkId
            httpUrl = this.url.add
            method = 'post'
          } else {
            form.parkId = this.parkId
            form.roomId = this.model.roomId
            httpUrl = this.url.edit
            method = 'put'
          }

          form = qs.stringify(form)

          httpAction(httpUrl, form, method).then(res => {
            this.confirmLoading = false
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok', 'rooms', pid, [data.buildingProjectId, data.buildingId, data.floorId])
              this.close()
              this.confirmLoading = false
            } else {
              this.$message.warning(res.message)
              this.confirmLoading = false
            }
          })
        })
        .catch(err => {
          console.log('新建房间：', err)
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
              this.form.resetFields(['buildingId', 'floorId'])
              reject('没有查到楼宇')
            }
          } else {
            reject(res.message)
          }
        })
      })
    },
    getFloorDict(id) {
      return new Promise((resolve, reject) => {
        let floorDict = 'base_architecture_floor,floor_name,floor_id,building_id=' + id
        ajaxGetDictItems(floorDict).then(res => {
          if (res.success) {
            this.select.floor = res.result
            if (res.result.length > 0) {
              let id = this.ids.floor || res.result[0].value
              this.ids.floor = ''
              this.form.setFields({ floorId: { value: id } })
              resolve(id)
            } else {
              this.form.resetFields(['floorId'])
              reject('没有查到楼层')
            }
          } else {
            reject(res.message)
          }
        })
      })
    },
    selectChange(type, id) {
      switch (type) {
        case 'project': {
          this.getBuildDict(id)
            .then(this.getFloorDict.bind(this))
            .catch(err => {
              this.$message.error(err)
            })
          break
        }
        case 'build': {
          this.getFloorDict(id).catch(err => {
            this.$message.error(err)
          })
          break
        }
      }
    }
  },
  computed: mapState({
    parkId: state => state.industrialPark.id
  })
}
</script>

<style lang="less">
.select-tree-long {
  height: 300px;
}
</style>
