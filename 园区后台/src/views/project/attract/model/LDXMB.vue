<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />
      <a-card :bordered="false" style="width:1200px;margin:auto">
        <a-tabs :activeKey="activeKey" @change="changeTab">
          <a-tab-pane tab="项目初次申请" key="1">
            <!-- 11111111111111 -->
            <a-spin :spinning="confirmLoading">
              <a-form @submit="handleSubmit" :form="form">
                <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
                  <!-- 行1 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="填报单位">
                        <a-input
                          placeholder
                          v-decorator="['custId', {rules: [{ required: true, message: '请选择项目单位', whitespace: true}]}]"
                          @click="openEnterpriseModal"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="填报日期">
                        <a-date-picker style="width:100%" v-decorator="['reportTime']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行2 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目名称">
                        <a-input
                          placeholder
                          v-decorator="['projectName',{rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="成立年份" required>
                        <a-input
                          placeholder
                          v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行3 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <!-- importance -->
                      <a-form-item label="重要程度" required>
                        <a-select
                          v-decorator="['importance',{rules: [{ required: true, message: '请选择重要程度', whitespace: true}]}]"
                        >
                          <a-select-option
                            v-for="(item, key) in dict.importanceExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="跟踪人员  ">
                        <a-select v-decorator="['projectManager']">
                          <a-select-option
                            v-for="(item, key) in dict.projectManagerExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行4 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="产品名称">
                        <a-input
                          v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="行业类别">
                        <a-select v-decorator="['industrySectorValue']">
                          <a-select-option
                            v-for="(item, key) in dict.industrySectorValueExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行5 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建设地址">
                        <a-input placeholder v-decorator="['getLandBuildingAddress']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="所属主体">
                        <a-input placeholder v-decorator="['belongSubject']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行6 -->

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="法人代表">
                        <a-input
                          v-decorator="['legalPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="联系电话（法人）">
                        <a-input
                          v-decorator="[ 'legalTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="经办人">
                        <a-input
                          v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="联系电话（经办人）">
                        <a-input
                          v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行7 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="公司概况">
                        <a-textarea :rows="4" placeholder v-decorator="['companyDescription']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行8 -->

                  <!-- 行9 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="团队成员情况">
                        <a-textarea :rows="4" placeholder v-decorator="['teamMemberDescription']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行10 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="年产值">
                        <a-input
                          addonAfter="万元"
                          placeholder
                          v-decorator="[    'annualProductionValue'   ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="年税金">
                        <a-input addonAfter="万元" placeholder v-decorator="[  'annualTaxes'  ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="投资主体">
                        <a-input placeholder v-decorator="[    'investorValue'   ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="是否人才项目">
                        <a-radio-group v-decorator="['isTalentProject']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
                  </a-form-item>-->
                </a-card>

                <!-- 333333333333 -->
                <a-card
                  :bordered="false"
                  style="width:1200px;margin:auto;margin-top:20px"
                  title="项目投资"
                >
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目总投资">
                        <a-input
                          addonAfter="万元"
                          v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="注册资本">
                        <a-input
                          addonAfter="万元"
                          v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="是否外资">
                        <a-radio-group v-decorator="['isForeignCapital']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="租赁面积">
                        <a-input
                          addonAfter="m²"
                          v-decorator="['rentBuildArea',{rules: [{ required: true, message: '请输入租赁面积'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="固定资产投资">
                        <a-input addonAfter="万元" placeholder v-decorator="['fixedAssetInvest']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="单位面积固定资产投资">
                        <a-input addonAfter="万元/平方米" placeholder v-decorator="['areaFixedInvest']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="设备投资">
                        <a-input addonAfter="万元" placeholder v-decorator="['deviceInvest']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="其他">
                        <a-input addonAfter="万元" placeholder v-decorator="['otherInvest']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建筑占地面积">
                        <a-input addonAfter="m²" placeholder v-decorator="['buildingArea']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="总建筑面积（m²）">
                        <a-input addonAfter="m²" placeholder v-decorator="['allBuildingArea']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建筑密度">
                        <a-input addonAfter="%" placeholder v-decorator="['buildingDensity']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="容积率">
                        <a-input addonAfter="%" placeholder v-decorator="['plotRatio']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="单位面积税收">
                        <a-input addonAfter="元/平米" placeholder v-decorator="['areaTax']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="单位面积产值">
                        <a-input addonAfter="元/平米" placeholder v-decorator="['areaOutput']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="开工日期">
                        <a-date-picker placeholder style="width:100%" v-decorator="['startDate']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="竣工日期">
                        <a-date-picker placeholder style="width:100%" v-decorator="['endDate']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="工业增加值">
                        <a-input addonAfter="万元" placeholder v-decorator="['industryAddedValue']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="全员劳动生产率">
                        <a-input addonAfter="%" placeholder v-decorator="['productionRate']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="万元工业增加值能耗">
                        <a-input addonAfter="吨/万元" placeholder v-decorator="['addedEnergy']" />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目申请理由简述">
                        <a-textarea :rows="4" v-decorator="['applyReason' ]"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="备注">
                        <a-textarea :rows="4" v-decorator="['remark' ]"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="附件">
                        <j-upload v-decorator="['addDocFiles']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" size="small">
                  <a-button style="float:right;" type="primary" @click="handleSubmit">保存</a-button>
                  <!-- <a-button type="primary" html-type="submit" @click="handleSubmit">Test Submit</a-button> -->
                </a-card>
              </a-form>
            </a-spin>
          </a-tab-pane>

          <!-- 2222222222222222222222222222222222222222222222222222222222222222 -->

          <a-tab-pane tab="项目二次申请" key="2">
            <a-spin :spinning="confirmLoadingB">
              <a-form @submit="handleSubmitTwo" :form="formS">
                <a-card :bordered="false" title="公司注册信息">
                  <!-- 行1 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="拟注册公司名称" required>
                        <a-input
                          v-decorator="['custName',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="拟注册资本">
                        <a-input
                          v-decorator="['registerAssets',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="法人代表" required>
                        <a-input
                          v-decorator="['legalPerson',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <!-- 后端应该弄错了字段名，这里就先用这个吧 -->
                    <a-col :xl="{span: 12}">
                      <a-form-item label="联系方式">
                        <a-input
                          v-decorator="['telephone',{rules: [{ required: true, message: '请输入', whitespace: true},{ pattern: phone, message: '请输入正确的手机号' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="拟注册地址">
                        <a-input
                          v-decorator="['registerAddress',{rules: [{ required: true, message: '请输入', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="经营范围">
                        <a-textarea :rows="4" v-decorator="['businessScope']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" title="法人股东">
                  <a slot="extra" @click.prevent="addShowOne">
                    <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
                  </a>
                  <a-table
                    ref="table"
                    size="default"
                    bordered
                    rowKey="teamId"
                    :columns="columns1"
                    :dataSource="dataSourceA"
                    :pagination="false"
                    :loading="loading"
                  >
                    <span slot="action" slot-scope="text, record">
                      <a @click="ShowOne(record,...arguments)">编辑</a>
                      <a-divider type="vertical" />
                      <a @click="handleDelete(record)">删除</a>
                    </span>
                  </a-table>
                </a-card>

                <a-card :bordered="false" title="个人股东">
                  <a slot="extra" @click.prevent="addShowTwo">
                    <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
                  </a>
                  <a-table
                    ref="table"
                    size="default"
                    bordered
                    rowKey="teamId"
                    :columns="columns2"
                    :dataSource="dataSourceB"
                    :pagination="false"
                    :loading="loading"
                  >
                    <span slot="action" slot-scope="text, record">
                      <a @click="ShowTwo(record,...arguments)">编辑</a>
                      <a-divider type="vertical" />
                      <a @click="handleDelete(record)">删除</a>
                    </span>
                  </a-table>
                </a-card>
                <a-card :bordered="false" title="团队成员">
                  <a slot="extra" @click.prevent="addShowThree">
                    <a-icon type="plus-square" style="margin-right:5px;margin-top:5px" />新增
                  </a>
                  <a-table
                    ref="table"
                    size="default"
                    bordered
                    rowKey="teamId"
                    :columns="columns3"
                    :dataSource="dataSourceC"
                    :pagination="false"
                    :loading="loading"
                  >
                    <span slot="action" slot-scope="text, record">
                      <a @click="ShowThree(record,...arguments)">编辑</a>
                      <a-divider type="vertical" />
                      <a @click="handleDelete(record)">删除</a>
                    </span>
                  </a-table>
                </a-card>
                <a-card :bordered="false" title="生产工艺情况">
                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="单位产品原材料消耗">
                        <a-input
                          addonAfter="吨/吨产品"
                          v-decorator="['unitProductMaterialCost',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="生产工艺流程">
                        <a-input v-decorator="['produceFlow']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="安全生产">
                        <a-select
                          v-decorator="['produceSafe',{rules: [{ required: true, message: '请选择', whitespace: true}]}]"
                        >
                          <a-select-option
                            v-for="(item, key) in dict.produceSafeExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="技术来源">
                        <a-select
                          v-decorator="['technologySource',{rules: [{ required: true, message: '请选择技术来源', whitespace: true}]}]"
                        >
                          <a-select-option
                            v-for="(item, key) in dict.technologySourceExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="引进" required>
                        <a-select v-decorator="['introduce']" style="width:100%">
                          <a-select-option value="1">国内</a-select-option>
                          <a-select-option value="2">国外</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="专利号">
                        <a-input v-decorator="['patentNo']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="颁证年月" required>
                        <a-date-picker placeholder v-decorator="['issueDate']" style="width:100%" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="品牌名称">
                        <a-input v-decorator="['productName']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="颁证单位" required>
                        <a-input v-decorator="['issueAuthority']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" title="环保、安全、卫生">
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="污染所属类型">
                        <!-- pollutionType -->
                        <a-select v-decorator="['pollutionType']">
                          <a-select-option
                            v-for="(item, key) in dict.pollutionTypeExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>

                    <a-col :xl="{span: 12}">
                      <a-form-item label="废物排放种类">
                        <!-- wasteDischargeType -->
                        <a-select v-decorator="['wasteDischargeType']">
                          <a-select-option
                            v-for="(item, key) in dict.wasteDischargeTypeExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="污水管网是否接通">
                        <a-radio-group v-decorator="['isSewerLine']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="污水管网计划接通时间">
                        <a-date-picker
                          placeholder
                          v-decorator="['planSewerLineTime']"
                          style="width:100%"
                        />
                        <!-- <a-input v-decorator="['planSewerLineTime']"></a-input> -->
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="使用锅炉情况">
                        <!-- boilerUse -->
                        <a-select v-decorator="['boilerUse']">
                          <a-select-option
                            v-for="(item, key) in dict.boilerUseExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="项目与敏感点方位距离">
                        <a-input
                          addonAfter="米"
                          v-decorator="['projectToPointDistance',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="在一年内，环保、安全生产（消防）方面是否发生过重大事件">
                        <a-radio-group v-decorator="['isHappenAccent']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" title="能源与资源消耗情况（年消耗量）">
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 12}">
                      <a-form-item label="水">
                        <a-input
                          addonAfter="吨"
                          v-decorator="['waterConsume',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 12}">
                      <a-form-item label="原煤">
                        <a-input
                          addonAfter="吨"
                          v-decorator="['coalConsume',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="电">
                        <a-input
                          addonAfter="万千瓦时"
                          v-decorator="['powerConsume',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col>
                      <a-form-item label="蒸汽">
                        <a-input
                          addonAfter="吨"
                          v-decorator="['steamConsume',{rules:[{ pattern: /^\d+$/, message: '请输入数字' }]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" size="small">
                  <a-button style="float:right;" type="primary" @click="handleSubmitTwo">保存</a-button>
                </a-card>
              </a-form>
            </a-spin>
          </a-tab-pane>
        </a-tabs>
      </a-card>
      <!-- <button @click="ShowOne" value="ShowOne">ShowOne</button>
      <button @click="ShowTwo" value="ShowTwo">ShowTwo</button>
      <button @click="ShowThree" value="ShowThree">ShowThree</button>-->
      <show-one ref="ShowOne" @reload="getListA" :fillUnit="model.fillUnit"></show-one>
      <show-two ref="ShowTwo" @reload="getListB" :fillUnit="model.fillUnit"></show-two>
      <show-three ref="ShowThree" @reload="getListC" :fillUnit="model.fillUnit"></show-three>
    </page-layout>
    <yq-enterprise-modal ref="ent" @ok="getCust"></yq-enterprise-modal>
  </div>
</template>

<script>
import ShowOne from './LShowOne'
import ShowTwo from './LShowTwo'
import ShowThree from './LShowThree'
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import { getAction, putAction, httpAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import pick from 'lodash/pick'
import moment from 'moment'
import { AddProjectLeaseForm } from '@/config/pick-fields'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import qs from 'qs'
import Dom7 from 'dom7'
import JUpload from '@/components/jeecg/JUpload'
import { phone } from '@/config/regex'
import YqEnterpriseModal from '@comp/extend/YqEnterpriseModal'
import mixins from '../mixins'

export default {
  mixins: [JeecgListMixin, mixins],
  components: { PageLayout, JEditor, ShowOne, ShowTwo, ShowThree, JUpload, YqEnterpriseModal },
  data() {
    return {
      title: null,
      // title: '首页 / 技改项目/项目维护',
      form: this.$form.createForm(this, { name: 'first' }),
      formS: this.$form.createForm(this, { name: 'second' }),
      model: {},
      modelS: {},
      phone,
      activeKey: '1',
      dict: {
        // industrySectorValueExt: [{ value: '1' }],
        // companyRegisterType: [{ value: '1' }],
        // technologySource: [{ value: '1' }],
      },

      dataSourceA: [],
      dataSourceB: [],
      dataSourceC: [],
      columns1: [
        {
          title: '序号',
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'equrityRatio'
        },
        {
          title: '已授权发明专利数',
          align: 'center',
          dataIndex: 'inventPatentMount'
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
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '股权占比',
          align: 'center',
          dataIndex: 'equrityRatio'
        },
        {
          title: '学历',
          align: 'center',
          dataIndex: 'educationBackground'
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
          dataIndex: '',
          width: 100,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'memberName'
        },
        {
          title: '职务',
          align: 'center',
          dataIndex: 'position'
        },
        {
          title: '出生年月',
          align: 'center',
          dataIndex: 'birthday'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      confirmLoading: false,
      confirmLoadingB: false,
      url: {
        list: '/park.project/mgrProjectInfo/addProject',
        listA: '/project/mgrCustTeamMember/queryById',
        // listB: '/project/mgrCustRegisterInfo/list',
        // listC: '/project/mgrSecondApplyProjectInfo/list',
        edit: '/park.project/mgrProjectInfo/editProject',
        editS: '/park.project/mgrProjectInfo/secondApply'
      }
    }
  },
  created() {
    getAction('/park.customer/baseCustomer/listAll').then(res => {
      this.dict.custList = res.result.records
      console.log(this.dict.custList)
    })
    initDictOptions('technology_source').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.technologySourceExt = res.result
      }
    })
    initDictOptions('pollution_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.pollutionTypeExt = res.result
      }
    })
    initDictOptions('waste_discharge_type').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.wasteDischargeTypeExt = res.result
      }
    })
    initDictOptions('boiler_use').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.boilerUseExt = res.result
      }
    })
    initDictOptions('produce_safe').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.produceSafeExt = res.result
      }
    })
    initDictOptions('importance').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.importanceExt = res.result
      }
    })
    initDictOptions('tracker').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.projectManagerExt = res.result
      }
    })
    initDictOptions('industrySectorValue').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
    //加载数据项
    this.getListA()
    this.getListB()
    this.getListC()
    this.detail()
  },
  methods: {
    changeTab(e) {
      this.activeKey = e
    },
    //
    handleDelete: function(data) {
      if (typeof data !== 'object') {
        data = { id: data }
      }
      var that = this
      return deleteAction(that.url.delete, { id: data[this.deleteKey ? this.deleteKey : 'id'] }).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.getListA()
          that.getListB()
          that.getListC()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //获取  重载
    getListA() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '1' }).then(
        res => {
          if (res.success) {
            this.dataSourceA = res.result
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    getListB() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '2' }).then(
        res => {
          if (res.success) {
            this.dataSourceB = res.result
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    getListC() {
      getAction('/project/mgrCustTeamMember/queryById', { projectId: this.$route.params.id, memberType: '3' }).then(
        res => {
          if (res.success) {
            this.dataSourceC = res.result
          } else {
            this.$message.warning(res.message)
          }
        }
      )
    },
    //新增
    addShowOne() {
      this.$refs.ShowOne.add()
    },
    addShowTwo() {
      this.$refs.ShowTwo.add()
    },
    addShowThree() {
      this.$refs.ShowThree.add()
    },
    //编辑
    ShowOne(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowOne.detail(row)
    },
    ShowTwo(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowTwo.detail(row)
    },
    ShowThree(row, e) {
      row.__key = Dom7(e.currentTarget)
        .parents('.ant-table-row')
        .data('row-key')
      this.$refs.ShowThree.detail(row)
    },
    //二次申请提交
    handleSubmitTwo() {
      const that = this
      this.formS.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('values')
          console.log(values)
          that.confirmLoadingB = true
          let httpurl = ''
          let method = ''
          httpurl += this.url.editS
          method = 'put'
          //这个model不能复用
          let formData = Object.assign(this.modelS, values)
          if (formData.issueDate) {
            formData.issueDate = formData.issueDate ? formData.issueDate.format('YYYY-MM-DD') : null
          }
          if (formData.planSewerLineTime) {
            formData.planSewerLineTime = formData.planSewerLineTime
              ? formData.planSewerLineTime.format('YYYY-MM-DD')
              : null
          }
          formData.projectId = this.$route.params.id
          //二次表单已填，允许落地按钮出现
          formData.auditStatus = '1'
          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                //后端返回的是‘申请成功’，按照UI逻辑，第一次提交才是真正的申请、、、
                // that.$message.success(res.message)
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoadingB = false
            })
        }
      })
    },
    handleSubmit() {
      const that = this
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          // const { projectTechnologyFlow } = this.editor
          let httpurl = ''
          let method = ''
          httpurl += this.url.edit
          method = 'put'
          let formData = Object.assign(this.model, values)

          formData.reportTime = formData.reportTime ? formData.reportTime.format('YYYY-MM-DD') : null
          formData.startDate = formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null
          formData.endDate = formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null

          formData.fillUnit = this.cust.id
          formData.custId = this.cust.id

          // formData.projectTechnologyFlow = projectTechnologyFlow
          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.activeKey = '2'
                window.scrollTo(0, 0)
                //第一步：提交编辑
                //第二步：goWorkable  项目状态转变为落地
                // let ppaarrmmss = { projectId: this.$route.params.id, status: '4' }
                // ppaarrmmss = qs.stringify(ppaarrmmss)
                // putAction('/park.project/mgrProjectInfo/changeStatus', ppaarrmmss).then(res => {
                //   if (res.success) {
                //     that.$message.success('该项目已转变为落地项目')
                //     // 第三步，切换tab-pane
                //     that.activeKey = '2'
                //   } else {
                //     that.$message.warning(res.message)
                //   }
                // })
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
    detail() {
      console.log(this.dict)
      initDictOptions('industry_sector_value').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.industrySectorValueExt = res.result
        }
      })
      initDictOptions('mgr-attr-addpl-companyRegisterType').then(res => {
        if (res.code === 0 && res.success) {
          this.dict.companyRegisterTypeExt = res.result
        }
      })
      let params = { projectId: this.$route.params.id }
      console.log(params)
      this.confirmLoading = true
      getAction('/park.project/mgrProjectInfo/queryProjectById', params).then(res => {
        if (res.success) {
          let record = res.result
          this.form.resetFields()
          //后端少的内容
          if (record.mgrProjectCust) {
            record.fillUnit = record.mgrProjectCust.fillUnit
            record.setUpYear = record.mgrProjectCust.setUpYear
            record.totalAsset = record.mgrProjectCust.totalAsset
            record.legalPerson = record.mgrProjectCust.legalPerson
            record.legalTel = record.mgrProjectCust.legalTel
            record.companyDescription = record.mgrProjectCust.companyDescription
            record.teamMemberDescription = record.mgrProjectCust.teamMemberDescription

            record.reportTime = record.mgrProjectCust.reportTime
          }
          if (record.mgrProjectInvestLease) {
            record.investAmount = record.mgrProjectInvestLease.investAmount
            record.registerCapital = record.mgrProjectInvestLease.registerCapital
            record.isForeignCapital = record.mgrProjectInvestLease.isForeignCapital
            record.fixedAssetInvest = record.mgrProjectInvestLease.fixedAssetInvest
            record.areaFixedInvest = record.mgrProjectInvestLease.areaFixedInvest
            record.deviceInvest = record.mgrProjectInvestLease.deviceInvest
            record.otherInvest = record.mgrProjectInvestLease.otherInvest
            record.buildingArea = record.mgrProjectInvestLease.buildingArea
            record.allBuildingArea = record.mgrProjectInvestLease.allBuildingArea
            record.buildingDensity = record.mgrProjectInvestLease.buildingDensity
            record.plotRatio = record.mgrProjectInvestLease.plotRatio
            record.areaTax = record.mgrProjectInvestLease.areaTax
            record.areaOutput = record.mgrProjectInvestLease.areaOutput
            record.industryAddedValue = record.mgrProjectInvestLease.industryAddedValue
            record.productionRate = record.mgrProjectInvestLease.productionRate
            record.addedEnergy = record.mgrProjectInvestLease.addedEnergy
            record.remark = record.mgrProjectInvestLease.remark
            record.startDate = record.mgrProjectInvestLease.startDate
            record.endDate = record.mgrProjectInvestLease.endDate
            record.addDocFiles = record.mgrProjectInvestLease.addDocFiles
          }

          delete record.mgrProjectCust
          delete record.mgrProjectInvest
          delete record.mgrProjectInvestLease

          //获取公司名
          for (const item of this.dict.custList) {
            if (item.custId == record.custId) {
              this.cust.id = item.custId
              this.cust.name = item.customerName
            }
          }
          record.custId = this.cust.name
          this.model = Object.assign({}, record)
          this.visible = true
          this.$nextTick(() => {
            // this.editor = {
            //   projectTechnologyFlow: record.projectTechnologyFlow
            // }
            this.form.setFieldsValue(pick(this.model, AddProjectLeaseForm))
            //时间格式化
            this.form.setFieldsValue({
              reportTime: this.model.reportTime ? moment(this.model.reportTime) : null
            })
            this.form.setFieldsValue({
              startDate: this.model.startDate ? moment(this.model.startDate) : null
            })
            this.form.setFieldsValue({
              endDate: this.model.endDate ? moment(this.model.endDate) : null
            })
          })
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.confirmLoading = false
      })
    }
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