<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />

      <!-- <a-card > </a-card> -->
      <a-card :bordered="false" style="width:1200px;margin:auto">
        <a-tabs :activeKey="activeKey" @change="changeTab">
          <!-- <a-tabs :activeKey="activeKey">   12.03 -->
          <a-tab-pane tab="项目初次申请" key="1">
            <!-- 11111111111111 -->
            <a-spin :spinning="confirmLoading">
              <a-form @submit="handleSubmit" :form="form">
                <a-card :bordered="false" title="企业信息">
                  <!-- 行1 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目单位">
                        <a-input
                          placeholder
                          v-decorator="['custId', {rules: [{ required: true, message: '请选择项目单位', whitespace: true}]}]"
                          @click="openEnterpriseModal"
                        ></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="组织机构代码">
                        <a-input
                          placeholder
                          v-decorator="['creditCode',{rules: [{ required: true, message: '请输入组织机构代码', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行2 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="单位地址">
                        <a-input
                          placeholder
                          v-decorator="['unitAddress',{rules: [{ required: true, message: '请输入单位地址', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="成立年份" required>
                        <a-input
                          placeholder
                          v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true}]}]"
                        />
                        <!-- 此处不应使用时间框 -->
                        <!-- <a-date-picker style="width:100%" v-decorator="['setUpYear']" /> -->
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行3 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="企业登记注册类型" required>
                        <!-- {initialValue: '1'}, -->
                        <a-select
                          placeholder
                          v-decorator="['companyRegisterType',{rules: [{ required: true, message: '请输入企业登记注册类型', whitespace: true}]}]"
                        >
                          <a-select-option
                            v-for="(item, key) in dict.companyRegisterTypeExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                        <!-- 根据excel表，此处无需字典表 -->
                        <!-- <JDictSelectTag v-model="testData" dictCode="mgr-attr-addpl-companyRegisterType"></JDictSelectTag> -->
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="注册资金（万元）">
                        <a-input
                          placeholder
                          v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入注册资金'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行4 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="企业总资产（万元）">
                        <a-input
                          placeholder
                          v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="固定资产净值（万元）">
                        <a-input
                          placeholder
                          v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入固定资产净值'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行5 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="法定代表人">
                        <a-input placeholder v-decorator="['legalPerson']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="联系电话（法人">
                        <a-input placeholder v-decorator="['legalTel']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行6 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="经办人">
                        <a-input
                          placeholder
                          v-decorator="['agentPerson', {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]} ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="联系电话（经办人）">
                        <a-input
                          placeholder
                          v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行7 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="电子信箱">
                        <a-input placeholder v-decorator="['email']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 行8 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="公司概况">
                        <a-textarea :rows="4" placeholder v-decorator="['companyDescription']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
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
                      <a-form-item label="年产值（万元）">
                        <a-input placeholder v-decorator="[    'annualProductionValue'   ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="年税金（万元）">
                        <a-input placeholder v-decorator="[  'annualTaxes'  ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card :bordered="false" title="项目信息">
                  <!-- 行1 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建设项目名称">
                        <a-input
                          placeholder
                          v-decorator="['projectName',{rules: [{ required: true, message: '请输入建设项目名称', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="拟建设地址">
                        <a-input
                          placeholder
                          v-decorator="['getLandBuildingAddress',{rules: [{ required: true, message: '请输入拟建设地址', whitespace: true}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="主要建设内容及规模（生产能力）">
                        <a-textarea
                          :rows="4"
                          placeholder
                          v-decorator="['mainBuildingContent',{rules: [{ required: true, message: '请输入内容', whitespace: true}]}]"
                        ></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="亩均效绩介（A类、B类、C类、D类）">
                        <a-textarea placeholder :rows="4" v-decorator="['areaPerformance']"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="主要原料">
                        <a-input placeholder v-decorator="['mainMaterial']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="消耗量或产出量">
                        <a-input placeholder v-decorator="['materialCost']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="主要产品">
                        <a-input placeholder v-decorator="['mainProduct']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="消耗量或产出量">
                        <a-input placeholder v-decorator="['productOutput']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="水、电等配套情况">
                        <a-textarea placeholder :rows="4" v-decorator="['waterElec']"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="环保、消防等措施">
                        <a-textarea placeholder :rows="4" v-decorator="['greenFire']"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="总用地面积">
                        <a-input placeholder v-decorator="['allUseArea']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="新征用地面积">
                        <a-input placeholder v-decorator="['newUseArea']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="租赁建设面积（平方米）">
                        <a-input placeholder v-decorator="['rentBuildArea']" />
                      </a-form-item>
                    </a-col>
                    <!-- 按要求，应该使用数据字典 -->
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="所属行业" required>
                        <!-- <JDictSelectTag v-decorator="['industrySectorValue', {initialValue: '1'}]" dictCode="INDUSTRY_SECTOR_VALUE"></JDictSelectTag> -->
                        <!-- {initialValue: dict.industrySectorValueExt[0].value} -->
                        <a-select placeholder v-decorator="['industrySectorValue']">
                          <a-select-option
                            v-for="(item, key) in dict.industrySectorValueExt"
                            :value="item.value"
                            :key="key"
                          >{{ item.text }}</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建设开始时间" required>
                        <a-date-picker
                          placeholder
                          v-decorator="['buildingBeginDate']"
                          style="width:100%"
                        />
                      </a-form-item>
                    </a-col>

                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建设结束时间" required>
                        <a-date-picker
                          placeholder
                          v-decorator="['buildingEndDate']"
                          style="width:100%"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="是否人才项目">
                        <a-radio-group placeholder v-decorator="['isTalentProject']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="拿地面积（m²）">
                        <a-input
                          placeholder
                          v-decorator="['gainArea',{rules: [{ required: true, message: '请输入拿地面积'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-card>

                <!-- 333333333333 -->
                <a-card :bordered="false" title="项目投资">
                  <!-- 行1 -->
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目总投资（万元）">
                        <a-input
                          placeholder
                          v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="其中项目用汇（万美元）">
                        <a-input placeholder v-decorator="['projectUseInvest']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="注册资本（万元）">
                        <a-input
                          placeholder
                          v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额'}]}]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="是否外资">
                        <a-radio-group placeholder v-decorator="['isForeignCapital']">
                          <a-radio value="1">是</a-radio>
                          <a-radio value="2">否</a-radio>
                        </a-radio-group>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="固定资产投资（万元）">
                        <a-input placeholder v-decorator="['fixedAssetInvest']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="土建">
                        <a-input placeholder v-decorator="[ 'civilWork' ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="安装">
                        <a-input placeholder v-decorator="['install']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="设备">
                        <a-input placeholder v-decorator="[ 'device' ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="工程建设其他费用">
                        <a-input placeholder v-decorator="['projectBuilding' ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="预备费">
                        <a-input placeholder v-decorator="[ 'budget'  ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="建设期利息">
                        <a-input placeholder v-decorator="[ 'buildingInterest' ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="铺底流动资金">
                        <a-input placeholder v-decorator="[ 'bottomWorkingCapital'  ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="自有资金">
                        <a-input placeholder v-decorator="[ 'freeCapital' ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="股票/债券">
                        <a-input placeholder v-decorator="[ 'sharesBond'  ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="银行贷款">
                        <a-input placeholder v-decorator="[  'bankLoan'   ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="其他">
                        <a-input placeholder v-decorator="['otherCapital']" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="新增销售收入（万元）">
                        <a-input placeholder v-decorator="['newSale']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="新增利润（万元）">
                        <a-input placeholder v-decorator="[ 'newProfit' ]" />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="新增税金（万元）">
                        <a-input placeholder v-decorator="['newTax' ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="创汇（万美元）">
                        <a-input placeholder v-decorator="['foreignEarning' ]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目申请理由简述">
                        <a-textarea placeholder :rows="4" v-decorator="['applyReason' ]"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="项目工艺流程（图示式）及说明">
                        <j-editor placeholder v-model="editor.projectTechnologyFlow"></j-editor>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row class="form-row" :gutter="16">
                    <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                      <a-form-item label="备注">
                        <a-textarea placeholder :rows="4" v-decorator="['remark' ]"></a-textarea>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <!-- upload  addDocFiles   附件 -->
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
import JUpload from '@/components/jeecg/JUpload'
import { getAction, putAction, httpAction, deleteAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import pick from 'lodash/pick'
import moment from 'moment'
import { AddProjectLandForm } from '@/config/pick-fields'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import qs from 'qs'
import Dom7 from 'dom7'
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
      phone,
      model: {},
      modelS: {},
      //
      activeKey: '1',
      deleteKey: 'teamId',
      dict: {
        // industrySectorValueExt: [{ value: '1' }],
        // companyRegisterType: [{ value: '1' }],
        // technologySource: [{ value: '1' }],
      },
      editor: {
        projectTechnologyFlow: ''
      },
      confirmLoading: false,
      confirmLoadingB: false,
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
          // title: '公司名称',
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
      url: {
        list: '/park.project/mgrProjectInfo/addProject',
        listA: '/project/mgrCustTeamMember/queryById',
        // listB: '/project/mgrCustRegisterInfo/list',
        // listC: '/project/mgrSecondApplyProjectInfo/list',
        edit: '/park.project/mgrProjectInfo/editProject',
        editS: '/park.project/mgrProjectInfo/secondApply',
        delete: '/project/mgrCustTeamMember/delete'
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
      console.log(data)
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
          const { projectTechnologyFlow } = this.editor
          let httpurl = ''
          let method = ''
          httpurl += this.url.edit
          method = 'put'
          let formData = Object.assign(this.model, values)
          formData.buildingBeginDate = formData.buildingBeginDate
            ? formData.buildingBeginDate.format('YYYY-MM-DD')
            : null
          formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format('YYYY-MM-DD') : null
          formData.projectTechnologyFlow = projectTechnologyFlow

          formData.fillUnit = this.cust.id
          formData.custId = this.cust.id

          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                // that.$message.success('项目维护编辑成功')
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
            record.totalAsset = record.mgrProjectCust.totalAsset
            record.legalTel = record.mgrProjectCust.legalTel
            record.companyDescription = record.mgrProjectCust.companyDescription
            record.updateUserName = record.mgrProjectCust.updateUserName
            record.createUserName = record.mgrProjectCust.createUserName
            record.updateTime = record.mgrProjectCust.updateTime
            record.fillUnit = record.mgrProjectCust.fillUnit
            record.version = record.mgrProjectCust.version
            record.unitAddress = record.mgrProjectCust.unitAddress
            // record.parkId = record.mgrProjectCust.parkId
            record.companyRegisterType = record.mgrProjectCust.companyRegisterType
            record.createBy = record.mgrProjectCust.createBy
            record.creditCode = record.mgrProjectCust.creditCode
            record.createTime = record.mgrProjectCust.createTime
            record.updateBy = record.mgrProjectCust.updateBy
            record.legalPerson = record.mgrProjectCust.legalPerson
            record.fixedAsset = record.mgrProjectCust.fixedAsset
            record.registerMoney = record.mgrProjectCust.registerMoney
            record.teamMemberDescription = record.mgrProjectCust.teamMemberDescription
            // record.projectId = record.mgrProjectCust.projectId
            record.setUpYear = record.mgrProjectCust.setUpYear
            record.email = record.mgrProjectCust.email
          }

          if (record.mgrProjectInvest) {
            record.isForeignCapital = record.mgrProjectInvest.isForeignCapital
            record.fixedAssetInvest = record.mgrProjectInvest.fixedAssetInvest
            record.newProfit = record.mgrProjectInvest.newProfit
            record.remark = record.mgrProjectInvest.remark
            record.createUserName = record.mgrProjectInvest.createUserName
            // // record.parkId = record.mgrProjectInvest.parkId
            record.projectUseInvest = record.mgrProjectInvest.projectUseInvest
            record.newTax = record.mgrProjectInvest.newTax
            record.freeCapital = record.mgrProjectInvest.freeCapital
            record.addDocFiles = record.mgrProjectInvest.addDocFiles
            record.updateBy = record.mgrProjectInvest.updateBy
            record.civilWork = record.mgrProjectInvest.civilWork
            record.otherCapital = record.mgrProjectInvest.otherCapital
            record.budget = record.mgrProjectInvest.budget
            record.bankLoan = record.mgrProjectInvest.bankLoan
            record.sharesBond = record.mgrProjectInvest.sharesBond
            record.updateUserName = record.mgrProjectInvest.updateUserName
            record.updateTime = record.mgrProjectInvest.updateTime
            record.foreignEarning = record.mgrProjectInvest.foreignEarning
            record.version = record.mgrProjectInvest.version
            record.createBy = record.mgrProjectInvest.createBy
            record.registerCapital = record.mgrProjectInvest.registerCapital
            record.install = record.mgrProjectInvest.install
            record.projectBuilding = record.mgrProjectInvest.projectBuilding
            record.createTime = record.mgrProjectInvest.createTime
            record.investAmount = record.mgrProjectInvest.investAmount
            record.bottomWorkingCapital = record.mgrProjectInvest.bottomWorkingCapital
            record.newSale = record.mgrProjectInvest.bottomWorkingCapital
            // record.projectId = record.mgrProjectInvest.projectId
            record.device = record.mgrProjectInvest.device
            record.buildingInterest = record.mgrProjectInvest.buildingInterest
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
            this.editor = {
              projectTechnologyFlow: record.projectTechnologyFlow
            }
            this.form.setFieldsValue(pick(this.model, AddProjectLandForm))
            //时间格式化
            this.form.setFieldsValue({
              buildingEndDate: this.model.buildingEndDate ? moment(this.model.buildingEndDate) : null
            })
            this.form.setFieldsValue({
              buildingBeginDate: this.model.buildingBeginDate ? moment(this.model.buildingBeginDate) : null
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