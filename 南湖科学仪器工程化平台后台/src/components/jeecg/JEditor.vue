<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
import { postAction } from '@/api/manage'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/fullscreen'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      required: false
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image link media table textcolor wordcount contextmenu fullscreen'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | fontsizeselect  bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image media table | removeformat | fullscreen',
      branding: false
    }
  },
  data() {
    return {
      // uploadAction: ,
      // urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
      //初始化配置
      init: {
        language_url: process.env.BASE_URL + 'tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: process.env.BASE_URL + 'tinymce/skins/lightgray',
        height: 400,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true,
        toolbar_drawer: false,

        // relative_urls: false,
        // remove_script_host: false,
        images_upload_handler: (blobInfo, success) => {
          //原逻辑
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)

          //zzzluas逻辑
          let formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
          //此处请求需与后端沟通
          //好奇
          postAction('/sys/common/upload', formData).then(res => {
            success('/jeecg-boot/sys/common/view/' + res.message)
          })
        }
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue == null ? '' : newValue
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
<style scoped>
</style>