<template>
  <a-drawer
    width="100%"
    placement="right"
    wrap-class-name="mgr-engineering-info"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    @close="close"
  >
    <a-button-group class="info-btn-group">
      <a-button @click="onEdit">编辑</a-button>
      <a-popconfirm
        title="确定删除吗？"
        placement="bottomRight"
        @confirm="onDel"
      >
        <a-button type="danger">删除</a-button>
      </a-popconfirm>
    </a-button-group>
    <a-divider orientation="left">基本信息</a-divider>
    <a-row>
      <a-col span="8">
        <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.projectName }}
        </a-form-item>
        <a-form-item label="项目类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.types }}
        </a-form-item>
        <a-form-item label="项目状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.status }}
        </a-form-item>
        <a-form-item label="立项文号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.setUpSerialNum }}
        </a-form-item>
        <a-form-item label="所属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.customerName }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="项目联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.manager }}
        </a-form-item>
        <a-form-item label="立项金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.setUpInvest }}
        </a-form-item>
        <a-form-item label="计划开工日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.planStartDate }}
        </a-form-item>
        <a-form-item label="初步设计批复文号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.approveSerialNum }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="项目进展" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.engineeringProcess }}
        </a-form-item>
        <a-form-item label="项目总投资" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.invest }}
        </a-form-item>
        <a-form-item label="计划完工日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.planEndDate }}
        </a-form-item>
        <a-form-item label="土地编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.serialNum }}
        </a-form-item>
      </a-col>
      <a-col span="24" class="full-item-col">
        <a-form-item label="项目性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.nature }}
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.remark }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-divider orientation="left">详细数据</a-divider>
    <a-row>
      <a-col span="8">
        <a-form-item label="总用地面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.area }}
        </a-form-item>
        <a-form-item label="总户数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.area }}
        </a-form-item>
        <a-form-item label="结构形式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.structuralStyle }}
        </a-form-item>
        <a-form-item label="承重" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.loadBearing }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="总建筑面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.overGroundArea }}
        </a-form-item>
        <a-form-item label="层数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.floorNumber }}
        </a-form-item>
        <a-form-item label="容积率" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.plotRatio }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="绿地面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.greenbeltArea }}
        </a-form-item>
        <a-form-item label="每层面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.defenceArea }}
        </a-form-item>
        <a-form-item label="绿地率" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.greeningRate }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-divider orientation="left">参建单位</a-divider>
    <a-row>
      <a-col span="8">
        <a-form-item label="设计单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.designer }}
        </a-form-item>
        <a-form-item label="施工单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.constructor }}
        </a-form-item>
        <a-form-item label="项目地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.constructor }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="建设单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.builder }}
        </a-form-item>
        <a-form-item label="代建单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.agencyBuilder }}
        </a-form-item>
        <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.tel }}
        </a-form-item>
      </a-col>
      <a-col span="8">
        <a-form-item label="勘察单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.perambulator }}
        </a-form-item>
        <a-form-item label="监理单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          {{ info.mgrEngineeringBuilder.supervisor }}
        </a-form-item>
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
  import { deleteAction, getAction } from '@api/manage'

  export default {
    name: 'EngineeringInfoView',
    data() {
      return {
        title: '项目：',
        id: '',
        visible: false,
        info: {
          mgrEngineeringBuilder: {}
        },
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
        }
      }
    },
    methods: {
      open(id) {
        this.visible = true
        this.id = id
        getAction('/park.engineering/mgrEngineeringInfo/queryById', { id }).then(res => {
          if (res.success) {
            let info = res.result
            this.info = res.result
            this.title = '项目：' + info.projectName
            console.log(_.merge({}, res.result))
          } else {
            this.$message.error(res.message)
          }
        })
      },
      close() {
        this.visible = false
      },
      onEdit() {
        this.close()
        this.$emit('edit', this.id)
      },
      onDel() {
        deleteAction('/park.engineering/mgrEngineeringInfo/delete', { id: this.id }).then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.close()
            this.$emit('load')
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .mgr-engineering-info {
    .ant-divider {
    }

    .info-btn-group {
      float: right;
      margin-bottom: 15px;

      &:after {
        content: "";
        display: block;
        clear: both;
      }
    }

    .full-item-col {
      .ant-form-item {
        @widthCol: (100% / (3 * 24));

        .ant-form-item-label {
          width: @widthCol * 6;
        }

        .ant-form-item-control-wrapper {
          width: @widthCol * (18 + 2 * 24);
        }
      }
    }
  }
</style>
