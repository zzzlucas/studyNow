<template>
  <a-card class="advertising-list" :bordered="false">
    <!-- Filter/Action -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="广告位名称、联系人、联系电话" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="厂房">
              <a-select style="width: 100%;" v-model="queryParam.projectId" @change="fetchBuildings">
                <a-select-option
                  :value="item.buildingProjectId"
                  v-for="item in types.project"
                  :key="item.buildingProjectId">
                  {{ item.projectName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6">
            <a-form-item label="楼宇">
              <a-select style="width: 100%;" v-model="queryParam.buildingId">
                <a-select-option
                  :value="item.buildingId"
                  v-for="item in types.building"
                  :key="item.buildingId">
                  {{ item.buildingName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="4">
            <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :xl="24">
            <a-form-item style="float:right">
              <a-button type="primary" @click="handleAdd">新建</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- table区域-begin -->
    <div class="table-operator">
      <a-button style="margin-left: 8px" type="danger" icon="delete" @click="batchDel" v-if="selectedRowKeys.length > 0">批量删除</a-button>
    </div>
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>
    <!-- Table -->
    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="orderId"
      :showHeader="false"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :customRow="handleCustomRow"
      @change="handleTableChange">
      <!-- Room & name -->
      <div slot="nameAndPos" slot-scope="text, record">
        <div class="ad-section">
          <div class="ad-preview ad-block">
            <img :src="getPreview(record.addDocFiles)" alt="" v-if="record.addDocFiles">
            <a-icon type="picture" v-else />
          </div>
          <div class="ad-name-address ad-block">
            <div class="ad-name">{{ record.advertName }}</div>
            <div class="ad-address">详细位置：{{ record.projectName }}/{{ record.buildingName }}/{{ record.floorName }}/{{ record.address }}</div>
          </div>
        </div>
      </div>
      <!-- Address -->
      <div slot="address" slot-scope="text, record">
        <div>联系方式</div>
        <div>{{ record.contactPerson }}/{{ record.contactTel }}</div>
      </div>
      <!-- ChargingArea -->
      <div slot="chargingArea" slot-scope="text, record">
        <div>占地面积</div>
        <div>
          <div v-if="record.chargingArea">{{ record.chargingArea }}m<sup>2</sup></div>
          <div v-else>-</div>
        </div>
      </div>
      <!-- Action -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <advertising-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
  </a-card>
</template>

<script>
  import AdvertisingEditForm from './components/AdvertisingEditForm'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import Mixin from './mixin/list'
  import { url } from './api'
  import '@assets/less/common.less'

  export default {
    components: {
      AdvertisingEditForm,
    },
    mixins: [
      JeecgListMixin,
      MixinList,
      Mixin,
    ],
    data() {
      return {
        // Mixin options
        deleteKey: 'advertId',
        // Url
        url: url.advertisingPlace,
        // Table
        columns: [
          {
            title: '名称、位置',
            scopedSlots: { customRender: 'nameAndPos' },
          },
          {
            title: '联系方式',
            scopedSlots: { customRender: 'address' },
          },
          {
            title: '占地面积',
            scopedSlots: { customRender: 'chargingArea' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
      }
    },
    methods: {
      // Getter
      getPreview(files) {
        return files.split(',')[0]
      },
      // Add/Edit
      async handleEditSubmit() {
        this.loadData(1)
      },
      // Fetch
      async fetchProjects() {
        this.types.project = []
        await this.getProjects(this.queryParam.parkId)
        this.types.project.unshift({ buildingProjectId: '', projectName: '全部', })
      },
      async fetchBuildings() {
        this.types.building = []
        if (this.queryParam.projectId) {
          await this.getBuildings(this.queryParam.projectId)
        }
        this.types.building.unshift({ buildingId: '', buildingName: '全部'  })
      },
      // View
      handleCustomRow(row) {
        return {
          on: {
            click: () => {
              this.$router.push({ name: 'property-management-advertising-info-@id', params: { id: row.advertId } })
            }
          }
        }
      }
    },
    created() {
      this.fetchProjects()
      this.fetchBuildings()
    },
  }
</script>

<style lang="less">
  .advertising-list {
    .ant-table-row {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.447);
      .ad-section {
        display: flex;
        align-items: center;
      }
      .ad-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: #f2f2f2;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .anticon-picture {
          font-size: 20px;
        }
      }
      .ad-name-address {
        margin-left: 5%;
      }
      .ad-name {
        font-weight: bold;
        color: #333;
      }
    }
  }
</style>
