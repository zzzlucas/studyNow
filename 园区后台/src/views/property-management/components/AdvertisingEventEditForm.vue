<template>
  <a-drawer
    wrapClassName="advertising-event-edit form-edit-drawer"
    width="65%"
    closable
    :title="getTitle"
    :mask-closable="true"
    :visible="show"
    @close="closeDrawer"
  >
    <a-spin :spinning="confirmLoading">
      <a-form
        class="form-edit-drawer-form"
        layout="horizontal"
        :form="form"
        :label-col="gridOptions.formItem.label"
        :wrapper-col="gridOptions.formItem.value"
        @submit="submit"
      >
        <a-row>
          <a-col :xl="24">
            <a-form-item
              label="广告位名称"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-select v-decorator="['advertId', {rules: rules.advertId}]" @change="calcCharge">
                <a-select-option
                  :value="item.advertId"
                  v-for="item in advertisingPlaceList"
                  :key="item.advertId"
                >{{ item.advertName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="预定时间">
              <j-date
                show-time
                dateFormat="YYYY-MM-DD HH:mm:ss"
                v-decorator="['begDate', {rules: rules.begDate}]"
                style="width: 100%;"
                @change="calcCharge"
              ></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item class="form-item-label-align" label="—" :colon="false">
              <j-date
                show-time
                dateFormat="YYYY-MM-DD HH:mm:ss"
                v-decorator="['endDate', {rules: rules.endDate}]"
                style="width: 100%;"
                @change="calcCharge"
              ></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="需求描述"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-textarea v-decorator="['remark']" :rows="6" />
            </a-form-item>
          </a-col>
          <a-col :xl="24">
            <a-form-item
              label="附件"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <j-upload v-decorator="['addDocFiles']" />
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系人">
              <a-input v-decorator="['requestPerson', {rules: rules.requestPerson}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="公司/企业">
              <a-input v-decorator="['companyName', {rules: rules.companyName}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="手机号码">
              <a-input v-decorator="['telephone', {rules: rules.telephone}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="邮箱">
              <a-input v-decorator="['email', {rules: rules.email}]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12">
            <a-form-item label="联系地址">
              <a-input v-decorator="['contactAddress', {rules: rules.contactAddress}]"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="charge-view">
          <a-col
            :xl="24"
            :label-col="gridOptions.formItemFullRow.label"
            :wrapper-col="gridOptions.formItemFullRow.value"
          >
            <a-form-item
              label="收费标准"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-input v-model="charge.rule" disabled />
            </a-form-item>
            <a-form-item
              label="预定广告位"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-input v-model="charge.bookAdvertPlace" disabled />
            </a-form-item>
            <a-form-item
              label="收费价格"
              :label-col="gridOptions.formItemFullRow.label"
              :wrapper-col="gridOptions.formItemFullRow.value"
            >
              <a-input v-model="charge.price" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="action-row" type="flex" justify="end">
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button @click="closeDrawer">取消</a-button>
            </a-form-item>
          </a-col>
          <a-col :xl="2">
            <a-form-item style="float: right">
              <a-button type="primary" html-type="submit">确认</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import FormEditDrawerMixin from '@/components/form/FormEditDrawerMixin'
import { advertisingPlace as BookAdvertisingMixin } from '../mixin/book'
import { filterObj, promiseForm } from '@utils/util'
import { advertisingEventForm } from '@/config/pick-fields'
import { addAdEvent, editAdEvent, calcPriceAdEvent } from '../api'

export default {
  mixins: [FormEditDrawerMixin('advertising-event-edit'), BookAdvertisingMixin],
  components: {
    JDate,
    JUpload
  },
  data() {
    return {
      // Query
      queryParam: {
        // Dummy
      },
      // Form
      fields: advertisingEventForm,
      confirmLoading: false,
      // Rules
      rules: {
        begDate: [{ required: true, message: '请填写预约时间' }],
        endDate: [{ required: true, message: '请填写预约时间' }],
        requestPerson: [{ required: true, message: '请填写申请人' }],
        companyName: [{ required: true, message: '请填写公司/企业' }],
        telephone: [{ required: true, message: '请填写手机号码' }],
        email: [{ required: true, message: '请填写邮箱' }],
        contactAddress: [{ required: true, message: '请填写联系地址' }]
      },
      // Charge view
      charge: {
        rule: '-',
        bookAdvertPlace: '-',
        price: '-'
      }
    }
  },
  computed: {
    advertisingPlaceListMap() {
      const map = {}
      this.advertisingPlaceList.forEach((item, index) => {
        map[item.advertId] = index
      })
      return map
    }
  },
  methods: {
    async submit(ev) {
      this.confirmLoading = true
      ev.preventDefault()

      try {
        const data = await promiseForm(this.form)
        filterObj(data)
        data.parkId = this.industrialParkId
        let resp
        if (this.isEdit) {
          data.advertId = this.record.advertId
          resp = await editAdEvent(data)
        } else {
          resp = await addAdEvent(data)
        }
        if (!resp.success) {
          throw new Error(resp.message)
        }
        this.$message.success('操作成功')
        this.closeDrawer()
        this.$emit('submit')
        setTimeout(() => {
          that.confirmLoading = false
        }, 1000)
      } catch (e) {
        this.$message.error(e.message)
        setTimeout(() => {
          that.confirmLoading = false
        }, 1000)
      }
      setTimeout(() => {
        that.confirmLoading = false
      }, 1000)
    },
    async init() {
      this.getAdvertisingPlaceList()
      if (!this.isEdit) {
        await this.$nextTick()
        this.form.setFieldsValue({
          advertId: this.record.advertId,
          begDate: this.record.begDate,
          endDate: this.record.endDate
        })
      }
    },
    // Calc
    async calcCharge() {
      await this.$nextTick()
      const view = {
        rule: '-',
        bookAdvertPlace: '1个',
        price: '-'
      }
      this.charge = view
      const advertId = this.form.getFieldValue('advertId')
      if (!advertId) {
        return
      }
      const begDate = this.form.getFieldValue('begDate')
      const endDate = this.form.getFieldValue('endDate')
      if (!begDate || !endDate) {
        return
      }
      const place = this.advertisingPlaceList[this.advertisingPlaceListMap[advertId]]
      view.rule = `${place.price} ${place.unit_dictText || '元'}`
      const price = await calcPriceAdEvent({ advertId: place.advertId, begDate, endDate })
      const currency = place.unit_dictText.split('/')[0]
      view.price = `${price}${currency}`
      this.charge = view
    }
  },
  watch: {
    show(val) {
      if (!val) {
        return
      }
      this.init()
    }
  }
}
</script>

<style lang="less">
.advertising-event-edit {
  .form-item-label-align label {
    text-align: center;
    display: block;
    &:before {
      content: '';
    }
  }
  .charge-view {
    .ant-input {
      border-color: transparent;
      background-color: transparent;
      color: #666;
      cursor: auto;
    }
  }
}
</style>
