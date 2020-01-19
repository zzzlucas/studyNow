<template>
  <a-card title="合同附件" class="contract-files" :style="{height: height + 'px'}">
    <a-upload
      ref="file"
      name="file"
      accept=".jpg,.png,.doc,.docx,.xls,.xlsx,.pdf"
      :action="`${domianURL}/sys/common/upload`"
      :headers="{'X-Access-Token': token}"
      :multiple="true"
      :remove="fileRemove"
      @preview="openFile">
      <template v-if="!readonly">
        <span>你还没用附件，点击</span>
        <a href="javascript:;" style="margin-top: 40px;">上传附件</a>
      </template>
    </a-upload>
  </a-card>
</template>

<script>
  import Dom7 from 'dom7'
  import { mapGetters } from 'vuex'
  import { openFileUrl } from '@utils/util'
  import { postAction } from '@api/manage'
  import merge from 'lodash/merge'
  import map from 'lodash/map'
  import qs from 'qs'

  export default {
    name: 'ContractFile',
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      files: {
        type: Array,
        default() {
          return []
        }
      },
      parentClass: [String]
    },
    data() {
      return {
        height: 0,
        domianURL: window._CONFIG.domianURL
      }
    },
    computed: mapGetters(['token']),
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let tagsHeight = Dom7(`.${this.parentClass} .contract-tags`).height()
        let formHeight = Dom7(`.${this.parentClass} .contract-height-mark`).height()
        this.height = formHeight - tagsHeight - 16
      },
      openFile({ response }) {
        window.open(openFileUrl(response.message))
      },
      fileRemove({ response }) {
        if (response) {
          if (response.success) {
            let form = new FormData
            form.append('path', response.message)
            return postAction('/sys/common/delete', form).then(res => {
              return (res.success && res.code === 200)
            })
          }
        }

        return true
      },
      list() {
        return map(merge([], this.$refs.file.sFileList), file => {
          let { name, response, status, type, uid } = file
          return { name, response, status, type, uid }
        })
      },
      close() {
        let list = this.list()
        this.$refs.file.sFileList = []
        map(list, file => {
          if (file.status === 'done' && file.response && file.response.success) {
            postAction('/sys/common/delete', qs.stringify({ path: file.response.message }))
          }
        })
      }
    },
    watch: {
      'files'(list) {
        setTimeout(() => {
          this.init()
        }, 50)
        this.$refs.file.sFileList = list
      }
    }
  }
</script>
