<template>
  <a-drawer
    title="添加跟踪记录"
    width="500px"
    :visible="visible"
    :mask-closable="true"
    @close="close">
    <a-form class="drawer-form engineering-track-form" :form="form">
      <a-form-item label="记录人">
        <a-select placeholder="请选择记录人" v-decorator="['tracker', {rules: rules.tracker}]">
          <a-select-option v-for="(item, key) in users" :value="item.value" :key="key">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="记录时间">
        <a-date-picker v-decorator="['trackDate', {rules: rules.trackDate}]"></a-date-picker>
      </a-form-item>
      <a-form-item label="项目进展">
        <a-textarea :rows="3" v-decorator="['process', {rules: rules.process}]"></a-textarea>
      </a-form-item>
      <a-form-item label="遇到的问题">
        <a-textarea :rows="3" v-decorator="['issue', {}]"></a-textarea>
      </a-form-item>
    </a-form>
    <div class="drawer-bottom-btn-group">
      <a-button style="margin-right: 8px" type="primary" @click="handleOk">确定</a-button>
      <a-button @click="close">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import qs from 'qs'
  import { ajaxGetDictItems } from '@api/api'
  import { track } from '../js/rules'
  import { promiseForm } from '@utils/util'
  import { mapState } from 'vuex'
  import { postAction } from '@api/manage'

  export default {
    name: 'TrackDrawer',
    data() {
      return {
        rules: track,
        id: '',
        visible: false,
        users: [],
        form: this.$form.createForm(this, { name: 'TrackDrawer' })
      }
    },
    computed: mapState('industrialPark', {
      parkId: state => state.id
    }),
    created() {
      ajaxGetDictItems('sys_user,realname,id').then(res => {
        if (res.success) {
          this.users = res.result
        } else {
          throw new Error(res.message)
        }
      }).catch(err => {
        this.$message.warning(err)
      })
    },
    methods: {
      open(id) {
        this.id = id
        this.visible = true
      },
      handleOk() {
        promiseForm(this.form).then(form => {
          form.projectId = this.id
          form.trackDate = form.trackDate.format('YYYY-MM-DD')
          form.parkId = this.parkId

          postAction('/park.engineering/mgrEngineeringTrace/add', qs.stringify(form)).then(res => {
            if (res.success) {
              this.$message.success('添加成功')
              this.close()
            } else {
              this.$message.warning(res.message)
            }
          })
        })
      },
      close() {
        this.visible = false
      }
    }
  }
</script>

<style lang="less">
  .engineering-track-form {
    .ant-calendar-picker {
      width: 100% !important;
    }
  }
</style>
