<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />

      <a-form @submit="handleSubmit" :form="form">
        <!-- <a-card > </a-card> -->
        <a-card :bordered="false" style="width:1200px;margin:auto">
          <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="项目初次申请" key="1">
              <!-- 11111111111111 -->
              <a-card :bordered="false" title="企业信息">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="项目单位">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="组织机构代码" required>
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入组织机构代码', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行2 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="单位地址" required>
                      <a-input
                        v-decorator="['repository.name',{rules: [{ required: true, message: '请输入单位地址', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="成立年份" required>
                      <a-date-picker style="width:100%" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行3 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="企业登记注册类型" required>
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="注册资金（万元）" required>
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行4 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="企业总资产（万元）" required>
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="固定资产净值（万元）" required>
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行5 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="法定代表人">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="联系电话（法人">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行6 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="经办人" required>
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="联系电话（经办人）" required>
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行7 -->
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="电子信箱">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行8 -->
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="公司概况">
                      <a-textarea :rows="4" v-decorator="['repository.name']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行9 -->
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="团队成员情况">
                      <a-textarea :rows="4" v-decorator="['repository.name']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 行10 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="年产值（万元）">
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="年税金（万元）">
                      <a-input
                        v-decorator="['repository.ads1',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-tab-pane>
            <!-- 22222222222222222222222222222 -->
            <a-tab-pane tab="项目二次申请" key="2">
              <a-card :bordered="false" title="公司注册信息">
                <!-- 行1 -->
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="拟注册公司名称" required>
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="拟注册资本">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="法人代表" required>
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="联系方式">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="拟注册地址">
                      <a-input
                        v-decorator="['repository.ads',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="经营范围">
                      <a-textarea :rows="4" v-decorator="['repository.name']" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>

              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns1"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                  @change="handleTableChange"
                >
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns2"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                  @change="handleTableChange"
                >
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="法人股东">
                <a-table
                  ref="table"
                  size="default"
                  bordered
                  rowKey="id"
                  :columns="columns3"
                  :dataSource="dataSource"
                  :pagination="ipagination"
                  :loading="loading"
                  @change="handleTableChange"
                >
                  <span slot="action" slot-scope="text, record">
                    <a @click="twoShowOne(record)">编辑</a>
                  </span>
                </a-table>
              </a-card>
              <a-card :bordered="false" title="生产工艺情况">
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="单位产品原材料消耗（吨/吨产品）">
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="生产工艺流程">
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="安全生产">
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="技术来源">
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="引进" required>
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="专利号">
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="颁证年月" required>
                      <a-date-picker style="width:100%" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="品牌名称">
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="颁证单位" required>
                      <a-input v-decorator="['repository.ads']" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" title="环保、安全、卫生">
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="污染所属类型">
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col :xl="{span: 12}">
                    <a-form-item label="废物排放种类">
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="污水管网是否接通">
                      <a-radio-group v-model="Rvalue">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="???????">
                      <a-input></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="使用锅炉情况">
                      <a-select defaultValue="1" style="width:100%">
                        <a-select-option value="1">股份合作企业</a-select-option>
                        <a-select-option value="2">联营企业</a-select-option>
                        <a-select-option value="3">有限责任公司</a-select-option>
                        <a-select-option value="4">股份有限公司</a-select-option>
                        <a-select-option value="5">私营企业</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="项目与敏感点方位距离（米）">
                      <a-input></a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="在一年内，环保、安全生产（消防）方面是否发生过重大事件">
                      <a-radio-group v-model="Rvalue">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
              <a-card :bordered="false" title="能源与资源消耗情况（年消耗量）">
                <a-row class="form-row" :gutter="16">
                  <a-col :xl="{span: 12}">
                    <a-form-item label="水（吨）">
                      <a-input
                        v-decorator="['repository.ads']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xl="{span: 12}">
                    <a-form-item label="原煤（吨）" >
                      <a-input
                        v-decorator="['repository.ads1']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="电（万千瓦时）">
                      <a-input
                        v-decorator="['repository.ads']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row class="form-row" :gutter="16">
                  <a-col>
                    <a-form-item label="蒸汽（吨）" >
                      <a-input
                        v-decorator="['repository.ads1']"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-card>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-form>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
export default {
  components: { PageLayout, JEditor },
  data() {
    return {
      title: '首页 / 技改项目/项目维护',
      //   form: {}
      form: this.$form.createForm(this),
      columns1: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '公司名称',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '已授权发明专利数',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns2: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '学历',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      columns3: [
        {
          title: '序号',
          align: 'center',
          dataIndex: ''
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'trackDate'
        },
        {
          title: '职务',
          align: 'center',
          dataIndex: 'tracker'
        },
        {
          title: '出生年月',
          align: 'center',
          dataIndex: 'content'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created() {},
  methods: {
    handleSubmit() {}
  }
}
</script>

<style lang='scss' scoped>
.top {
  margin: 0;
}
.myinput {
  color: rgba(0, 0, 0, 0.85);
  .ant-input {
    width: 50px;
  }
}
</style>