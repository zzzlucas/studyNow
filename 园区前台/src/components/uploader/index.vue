<!--
  This component is intentionally design like jeecg uploader, make it more easy to use.
-->

<template>
  <div class="app-uploader">
    <Upload
      multiple
      ref="upload"
      :format="formatList"
      :max-size="maxSize"
      :action="uploadAction"
      :headers="headers"
      :data="{ 'isup': 1 }"
      :default-file-list="fileList"
      :on-success="handleSuccess"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload">
      <Button icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
  </div>
</template>

<script>
  const getFileName = (path) => {
    if (path.lastIndexOf("\\") >= 0) {
      let reg = new RegExp("\\\\", "g")
      path = path.replace(reg, "/")
    }
    return path.substring(path.lastIndexOf("/") + 1)
  }

  export default {
    props: {
      // 文件类型，影响格式类型
      type: {
        type: String,
        default: 'image',
        validator(val) {
          return ['image', 'file'].indexOf(val) !== -1
        },
      },
      // 格式类型，默认只允许基本的图片类型
      formatList: {
        type: Array,
        default () {
          if (this.type === 'image') {
            return ['png', 'jpeg', 'jpg']
          }
          return []
        }
      },
      // 文件个数限制，不等于0时生效
      limit: {
        type: Number,
        default: 0,
      },
      // 文件大小限制，默认10MB，不等于0时生效
      maxSize: {
        type: Number,
        default: 10 * 1024
      },
      // Model，数组和字符串（用英文逗号分隔）均可使用
      value: {
        type: [Array, String],
        default: '',
      },
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        urlImage: window._CONFIG['imgDomainURL'],
        fileList: [],
      }
    },
    computed: {
      headers() {
        return { 'X-Access-Token': this.$store.getters.token }
      },
    },
    watch: {
      value() {
        this.buildFileList()
      },
    },
    methods: {
      buildFileList() {
        this.fileList = []
        let val = this.value
        if (!val || val.length === 0) {
          return
        }
        if (typeof this.value === 'string') {
          val = val.split(',')
        }
        this.fileList = val.map(item => {
          return {
            name: getFileName(item),
            url: item,
          }
        })
      },
      buildConcatFileList(fileList) {
        return fileList
          .map(item => item.url)
          .join(',')
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: file.name + " 文件格式错误"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "超过文件大小限制",
          desc: file.name + " 过大"
        });
      },
      handleBeforeUpload() {
        if (!this.limit) {
          return true
        }
        if (this.fileList.length < this.limit) {
          this.$Notice.warning({
            title: "最多只能上传" + this.limit + "个文件"
          });
          return false
        }
        return true
      },
      async handleRemove() {
        this.handlePathChange()
      },
      handleSuccess (res, file) {
        if (!res.success) {
          this.$Message.error(res.message)
          throw new Error(res.message)
        }
        file.url = res.message
        this.handlePathChange()
      },
      handlePathChange() {
        const uploadFiles = this.$refs.upload.fileList
        let path = []
        const flag = uploadFiles.some(file => {
          // Don't commit change if there's one file still uploading
          if (file.status === 'uploading') {
            return true
          }
          path.push(file.url)
          return false
        })
        if (flag) {
          return
        }
        this.$emit('change', path.join(','))
      },
    },
    created() {
      this.buildFileList()
    },
  }
</script>

<style lang="less">
  .upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .upload-list img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .upload-list:hover .upload-list-cover {
    display: block;
  }

  .upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
