<template>
  <a-card title="合同标签" class="contract-tags">
    <a-form :form="form">
      <a-radio-group v-model="form.floorType" buttonStyle="solid">
        <a-radio-button value="研发楼">研发楼</a-radio-button>
        <a-radio-button value="办公楼">办公楼</a-radio-button>
        <a-radio-button value="商业">商业</a-radio-button>
        <a-radio-button value="宿舍">宿舍</a-radio-button>
        <a-radio-button value="厂房">厂房</a-radio-button>
      </a-radio-group>
      <a-radio-group v-model="form.leaseType" buttonStyle="solid">
        <a-radio-button value="订租合同">订租合同</a-radio-button>
        <a-radio-button value="租赁合同">租赁合同</a-radio-button>
      </a-radio-group>
      <a-radio-group v-model="form.houseType" buttonStyle="solid">
        <a-radio-button value="期房合同">期房合同</a-radio-button>
        <a-radio-button value="现房合同">现房合同</a-radio-button>
      </a-radio-group>
      <a-checkbox-group v-model="form.check">
        <a-checkbox class="ant-radio-button-wrapper" value="中介介绍">中介介绍</a-checkbox>
        <a-checkbox class="ant-radio-button-wrapper" value="租转售">租转售</a-checkbox>
      </a-checkbox-group>
    </a-form>
  </a-card>
</template>

<script>
  import merge from 'lodash/merge'

  export default {
    name: 'ContractTags',
    props: {
      tags: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          floorType: '',
          leaseType: '',
          houseType: '',
          check: []
        }
      }
    },
    methods: {
      get() {
        return merge({}, this.form)
      }
    },
    watch: {
      'tags'(tags) {
        if (tags) {
          this.form = tags
        } else {
          this.form = {
            floorType: '',
            leaseType: '',
            houseType: '',
            check: []
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .contract-tags {
    @mixin group {
      .ant-radio-button-wrapper {
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        margin-bottom: 8px;

        & + .ant-radio-button-wrapper {
          margin-left: 8px;
        }

        &:before {
          display: none;
        }
      }
    }

    .ant-radio-group {
      @include group;

      .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
        box-shadow: unset;
        border-color: #1890ff;

        &:hover {
          border-color: #40a9ff;
        }

        &:active {
          border-color: #096dd9;
        }
      }
    }

    .ant-checkbox-group {
      @include group;

      .ant-radio-button-wrapper {
        .ant-checkbox .ant-checkbox-inner {
          display: none;
        }

        & > span:last-of-type {
          padding: 0;
        }

        &.ant-checkbox-wrapper-checked {
          color: #fff;
          background-color: #1890ff;
          border-color: #1890ff;

          &:hover {
            background-color: #40a9ff;
            border-color: #40a9ff;
          }

          &:active {
            background-color: #096dd9;
            border-color: #096dd9;
          }
        }
      }
    }

    .ant-radio-group + .ant-radio-group,
    .ant-radio-group + .ant-checkbox-group,
    .ant-checkbox-group + .ant-checkbox-group,
    .ant-checkbox-group + .ant-radio-group {
      margin-left: 8px;
    }
  }
</style>
