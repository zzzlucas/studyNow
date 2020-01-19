<template>
  <a-time-picker
    :disabled="disabled || readOnly"
    :placeholder="placeholder"
    @change="handleTimeChange"
    :value="momVal"
    :format="timeFormat"
    :getPopupContainer="getPopupContainer"
  />
</template>
<script>
  import moment from 'moment'

  export default {
    name: 'JTime',
    props: {
      placeholder: {
        type: String,
        default: '',
        required: false
      },
      value: {
        type: String,
        required: false
      },
      timeFormat: {
        type: String,
        default: 'HH:mm:ss',
        required: false
      },
      readOnly: {
        type: Boolean,
        required: false,
        default: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      getPopupContainer: {
        type: Function,
        default: () => document.body
      }
    },
    data() {
      let str = this.value;
      return {
        decorator: "",
        momVal: !str ? null : moment(str, this.timeFormat)
      }
    },
    watch: {
      value(val) {
        if (!val) {
          this.momVal = null
        } else {
          this.momVal = moment(val, this.timeFormat)
        }
      }
    },
    methods: {
      moment,
      handleTimeChange(mom, timeStr) {
        this.$emit('change', timeStr);
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
