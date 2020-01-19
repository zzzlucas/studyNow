<template>
  <div class="meeting-list">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8">
            <a-form-item label="关键字">
              <a-input placeholder="会议室名称" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="5">
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
          <a-col :xl="5">
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
          <a-col :xl="5">
            <a-form-item label="人数限制">
              <j-dict-select-tag
                v-model="queryParam.capacity"
                @input="handleChangeCapacity"
                dictCode="meeting_room_capacity" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :xl="4">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
          <a-col :xl="20">
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
      rowKey="roomId"
      :showHeader="false"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :customRow="handleCustomRow"
      @change="handleTableChange">
      <!-- Column slot -->
      <!-- Room & name -->
      <div slot="nameAndPos" slot-scope="text, record">
        <div class="room-section">
          <div class="room-preview room-block">
            <img :src="getRoomPreview(record.addDocFiles)" alt="" v-if="record.addDocFiles">
            <a-icon type="picture" v-else />
          </div>
          <div class="room-name-address room-block">
            <div class="room-name">{{ record.roomName }}</div>
            <div class="room-address">详细位置：{{ record.projectName }}/{{ record.buildingName }}/{{ record.floorName }}/{{ record.address }}</div>
          </div>
        </div>
      </div>
      <!-- MaxCapacity -->
      <div slot="maxCapacity" slot-scope="text, record">
        <div>容纳人数</div>
        <div>{{ record.maxCapacity }}人</div>
      </div>
      <!-- Address -->
      <div slot="address" slot-scope="text, record">
        <div>联系方式</div>
        <div>{{ record.contactPerson }}/{{ record.contactTel }}</div>
      </div>
      <!-- Equipment -->
      <div slot="equipment" slot-scope="text, record">
        <div>标准配置</div>
        <div>
          {{ record.roomDevices }}
        </div>
      </div>
      <!-- ChargingArea -->
      <div slot="chargingArea" slot-scope="text, record">
        <div>占地面积</div>
        <div>
          <div>{{ record.chargingArea }}m<sup>2</sup></div>
        </div>
      </div>
      <!-- Action -->
      <span slot="action" slot-scope="text, record" @click.stop>
        <a @click.stop="handleBook(record, ...arguments)">预定</a>
        <a-divider type="vertical" />
        <a @click.stop="handleEdit(record, ...arguments)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <!-- table区域-end -->
    <!-- Add/Edit form -->
    <meeting-room-edit-form
      ref="modalForm"
      @submit="handleEditSubmit" />
    <!-- Book form -->
    <meeting-event-edit-form
      ref="modalFormBook"
      @submit="handleEditSubmit" />
  </div>
</template>

<script>
  import MeetingRoomEditForm from '@views/property-management/components/MeetingRoomEditForm'
  import MeetingEventEditForm from '@views/property-management/components/MeetingEventEditForm'
  import JDate from '@/components/jeecg/JDate'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import MixinList from '@/mixins/List'
  import Mixin from '../mixin/list'
  import { url } from '../api'
  import '@assets/less/common.less'

  export default {
    mixins: [
      JeecgListMixin,
      MixinList,
      Mixin,
    ],
    components: {
      JDate,
      MeetingRoomEditForm,
      MeetingEventEditForm,
    },
    data() {
      return {
        // Mixin options
        deleteKey: 'roomId',
        // Url
        url: url.meetingRoom,
        // Table
        columns: [
          {
            title: '名称、位置',
            scopedSlots: { customRender: 'nameAndPos' },
          },
          {
            title: '容纳人数',
            scopedSlots: { customRender: 'maxCapacity' },
          },
          {
            title: '联系方式',
            scopedSlots: { customRender: 'address' },
          },
          {
            title: '标准配置',
            scopedSlots: { customRender: 'equipment' },
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
      // Filter
      handleChangeCapacity(value) {
        const values = value.split('-')
        this.queryParam.minCapacity = values[0]
        this.queryParam.maxCapacity = values[1]
      },
      // Getter
      getRoomPreview(files) {
        let url = files.split(',')[0]
        if (url) {
          url = window._CONFIG['imgDomainURL'] + url
        }
        return url
      },
      // Action
      handleBook(record) {
        this.$refs.modalFormBook.add({ roomName: record.roomName, roomId: record.roomId });
        this.$refs.modalFormBook.title = "新增";
        this.$refs.modalFormBook.disableSubmit = false;
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
              this.$router.push({ name: 'property-management-meeting-room-info-@id', params: { id: row.roomId } })
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
  .meeting-list {
    .ant-table-row {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.447);
      .room-section {
        display: flex;
        align-items: center;
      }
      .room-preview {
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
      .room-name-address {
        margin-left: 5%;
      }
      .room-name {
        font-weight: bold;
        color: #333;
      }
    }
  }
</style>
