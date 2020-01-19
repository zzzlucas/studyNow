<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
import { postAction } from '@api/manage'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
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
      default: 'lists image media table wordcount fullscreen'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | fullscreen'
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        language_url: process.env.BASE_URL + 'tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: process.env.BASE_URL + 'tinymce/skins/lightgray',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        
        relative_urls: false,
        remove_script_host: false,
        images_upload_handler: (blobInfo, success) => {
          //原逻辑
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)

          //zzzluas逻辑
          let formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())
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
      console.log(newValue)
      if (this.triggerChange) {
        console.log(1)
        this.$emit('change', newValue)
      } else {
        console.log(2)
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
<style scoped>
</style>
