/**
 * Form edit draw mixin. Usually used on right side edit/add form.
 * To use, call this function after import this mixin.
 *
 * Originally there's an component contain the ant <Form> w/o form content, and use slot expose form content.
 * So we can use slot insert whatever we want fields in form. But <Form> does not allow us to do this,
 * so i have to write this mixin to make this edit drawer.
 */

import pick from 'lodash/pick'
import { mapGetters } from 'vuex'
import './FormEditDrawer.less'

export default function make(name) {
  return {
    data() {
      return {
        // Grid
        gridOptions: {
          formItem: {
            label: { xl: 6 },
            value: { xl: 18 }
          },
          formItemFullRow: {
            label: { xl: 3 },
            value: { xl: 21 }
          },
        },
        // Status
        isEdit: false,
        show: false,
        title: '',
        disableSubmit: false,
        // Form
        formLabel: '',
        form: this.$form.createForm(this, { name }),
        fields: [], // Please overwrite me
        // Rules
        rules: {},
        record: {},
      }
    },
    computed: {
      getTitle() {
        let action = this.title
        if (!action) {
          action = this.isEdit ? '编辑' : '添加'
        }
        return action + this.formLabel
      },
      ...mapGetters([
        'industrialParkId'
      ]),
    },
    methods: {
      closeDrawer() {
        this.show = false
        this.$emit('close', false)
      },
      async edit(record) {
        this.isEdit = true
        this.show = true
        this.record = record
        await this.$nextTick()
        this.form.setFieldsValue(pick(record, this.fields))
        this.$emit('open', false)
      },
      async add(data = {}) {
        this.isEdit = false
        this.show = true
        this.record = { ...data }
        await this.$nextTick()
        this.form.resetFields()
        this.$emit('open', false)
      },
      /**
       * 字段将转换为 **部分支持type** 后再进行验证（仅影响验证内部类型，并非实际的值被转换类型）。
       * 部分支持type如下：
       * "number"  => Number
       * "integer" => parseInt(val, 10)
       * "float"   => parseFloat
       * "boolean" => [true，1, '1'] 转为 true，否则为false
       */
      async fixRules() {
        await this.$nextTick()
        const items = this.form.formItems
        Object.keys(items).forEach(key => {
          const item = items[key]
          // Convert
          item.getMeta().validate
            .forEach(item => {
              if (!item.rules) {
                return
              }
              item.rules.forEach(rule => {
                if (rule.type == null) {
                  return
                }
                if (rule.type === 'number') {
                  rule.transform = Number
                }
                if (rule.type === 'integer') {
                  rule.transform = val => parseInt(val, 10)
                }
                if (rule.type === 'float') {
                  rule.transform = parseFloat
                }
                if (rule.type === 'boolean') {
                  rule.transform = val => [true, 1, '1'].indexOf(val) !== -1
                }
              })
            })
        })
      },
    },
    watch: {
      show(val) {
        if (!val) {
          return
        }
        this.fixRules()
      },
    },
  }
}
