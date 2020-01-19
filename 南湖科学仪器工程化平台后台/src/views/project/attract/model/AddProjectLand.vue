<template>
  <div>
    <page-layout :title="title">
      <a-divider type="vertical" />
      <a-form @submit="handleSubmit" :form="form">
        <!-- 11111111111111 -->
        <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目单位">
                <a-input
                  placeholder
                  v-decorator="['fillUnit',{rules: [{ required: true, message: '请输入项目单位', whitespace:true}]}]"
                />
                <!-- getFieldDecorator="[]"   initialValue:'test' -->
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
                <a-select
                  style="width:100%"
                  v-decorator="['companyRegisterType',{initialValue: '1'},{rules: [{ required: true, message: '请输入企业登记注册类型', whitespace: true}]}]"
                >
                  <a-select-option value="1">股份合作企业</a-select-option>
                  <a-select-option value="2">联营企业</a-select-option>
                  <a-select-option value="3">有限责任公司</a-select-option>
                  <a-select-option value="4">股份有限公司</a-select-option>
                  <a-select-option value="5">私营企业</a-select-option>
                </a-select>
                <!-- 根据excel表，此处无需字典表 -->
                <!-- <JDictSelectTag v-model="testData" dictCode="mgr-attr-addpl-companyRegisterType"></JDictSelectTag> -->
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资金（万元）">
                <a-input
                  placeholder
                  v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入注册资金', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行4 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业总资产（万元）">
                <a-input
                  v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产净值（万元）">
                <a-input
                  v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入固定资产净值', whitespace: true}]}]"
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

          <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>-->
        </a-card>

        <!-- 22222222 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设项目名称">
                <a-input
                  v-decorator="['projectName',{rules: [{ required: true, message: '请输入建设项目名称', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拟建设地址">
                <a-input
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
                  v-decorator="['mainBuildingContent',{rules: [{ required: true, message: '请输入内容', whitespace: true}]}]"
                ></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="亩均效绩介（A类、B类、C类、D类）">
                <a-textarea :rows="4" v-decorator="['areaPerformance']"></a-textarea>
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
                <a-textarea :rows="4" v-decorator="['waterElec']"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="环保、消防等措施">
                <a-textarea :rows="4" v-decorator="['greenFire']"></a-textarea>
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
                <a-select
                  v-decorator="['industrySectorValue', {initialValue: dict.industrySectorValueExt[0].value}]"
                >
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
                <a-date-picker v-decorator="['buildingBeginDate']" style="width:100%" />
              </a-form-item>
            </a-col>

            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设结束时间" required>
                <a-date-picker v-decorator="['buildingEndDate']" style="width:100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否人才项目">
                <a-radio-group v-decorator="['isTalentProject']">
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拿地面积（m²）">
                <a-input
                  placeholder
                  v-decorator="['gainArea',{rules: [{ required: true, message: '请输入拿地面积', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <!-- 333333333333 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目投资">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目总投资（万元）">
                <a-input
                  v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
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
                  v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额', whitespace: true}]}]"
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
                <a-input placeholder v-decorator="[ 'otherCapital' ]" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增销售收入（万元）">
                <a-input placeholder v-decorator="[ 'newSale' ]" />
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
                <a-textarea :rows="4" v-decorator="['applyReason' ]"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>

          <!-- 富文本  projectTechnologyFlow   项目工艺流程及说明 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目工艺流程（图示式）及说明">
                <j-editor v-decorator="['projectTechnologyFlow']"></j-editor>
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
              <a-form-item label="projectId test">
                <a-input
                  placeholder
                  v-decorator="['projectId', {rules: [{ required: true, message: '请输入projectId', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="parkId test">
                <a-input
                  placeholder
                  v-decorator="['parkId', {rules: [{ required: true, message: '请输入parkId', whitespace: true}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- upload  addDocFiles   附件 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="附件">
                <a-upload name="file" :showUploadList="true" :multiple="false">
                  <!-- :headers="tokenHeader"
                  :action="importExcelUrl"
                  @change="handleImportExcel"-->
                  <a-button type="primary" icon="import">上传附件</a-button>
                  <!-- <span>（单个图片大小不可超过10.00M，全部图片大小不可超过30.00M）</span> -->
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card
          :bordered="false"
          size="small"
          style="position:fixed;bottom:0;width:calc(100% - 200px - 15px)"
        >
          <a-button style="float:right;" type="primary" @click="handleSubmit">保存（Test Submit）</a-button>
          <!-- <a-button type="primary" html-type="submit" @click="handleSubmit">Test Submit</a-button> -->
        </a-card>
      </a-form>
    </page-layout>
  </div>
</template>

<script>
// import '@/components/dict/JDictSelectUtil'
// import { JeecgListMixin } from '@/mixins/JeecgListMixin'     //1107

import qs from 'qs'
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'
export default {
  name: 'addProjectLandForm',
  // mixins: [JeecgListMixin],
  components: { PageLayout, JEditor, JDictSelectTag },
  data() {
    return {
      title: '首页 / 拿地项目 / 项目维护',
      //   form: {}
      form: this.$form.createForm(this, { name: 'addProjectLandForm' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      url: {
        add: '/park.project/mgrProjectInfo/addProject',
        edit: '/park.project/mgrProjectInfo/editProject'
      },
      confirmLoading: false, //独立页面，其实不需要该项
      model: {},
      // setUpYear: '',
      dateFormat: 'YYYY-MM-DD',
      // record: { id: 1191619700384071680 }
      testData: '',
      industrySectorValue: '',
      dict: {
        industrySectorValueExt: [{ value: '1' }]
      }
      // value:""
      // DictDataindustrySectorValue:this.form.getFieldValue('industrySectorValue')
    }
  },
  updated() {
    // this.edit(this.record.id)
  },
  created() {
    initDictOptions('INDUSTRY_SECTOR_VALUE').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
  },
  methods: {
    importExcelUrl() {},
    handleImportExcel() {},
    moment,
    add() {
      this.edit({})
    },
    // add() {
    //   this.picUrl = ''
    //   this.refresh()
    //   this.edit({ activitiSync: '1' })
    // },
    edit(record) {
      console.log('edit开始了')
      this.form.resetFields()
      this.model = Object.assign({}, record)
      // console.log(this.model)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'projectId', //id
            'fillUnit',
            'creditCode',
            'unitAddress',
            'setUpYear',
            'companyRegisterType',
            'registerMoney',
            'totalAsset',
            'fixedAsset',
            'legalPerson',
            'legalTel',
            'email',
            'companyDescription',
            'teamMemberDescription',
            'parkId', //表单无此项
            'version', //版本号
            'createUserName', //创建者名称
            'updateUserName', //更新者名称

            'projectName',
            'projectType', //无
            'agentPerson',
            'agentTel',
            'belongSubject', //无  所属主体
            'investorValue', //无  投资主体
            'custId', //无  企业ID
            'getLandBuildingAddress',
            'mainBuildingContent', //目前注释  已填   textarea
            'areaPerformance', //目前注释  已填   textarea
            'mainMaterial',
            'materialCost',
            'mainProduct',
            'productOutput',
            'waterElec', //目前注释  已填   textarea
            'greenFire', //目前注释  已填   textarea
            'allUseArea',
            'newUseArea',
            'rentBuildArea',
            'industrySectorValue', //目前注释  已填   select 可能数据字典
            'isTalentProject', //目前注释  已填  radio
            'gainArea', //需加require
            'annualProductionValue',
            'annualTaxes',
            'status', //无  表单无此项  项目状态
            'applyReason', //目前注释  已填   textarea
            'projectTechnologyFlow', //目前注释  已填   富文本
            'importance', //无
            'projectManager', //无
            'auditStatus', //无

            'investAmount',
            'projectUseInvest',
            'registerCapital',
            'isForeignCapital', //目前注释  已填  radio
            'fixedAssetInvest',
            'civilWork',
            'install',
            'device',
            'projectBuilding',
            'budget',
            'buildingInterest',
            'bottomWorkingCapital',
            'freeCapital',
            'sharesBond',
            'bankLoan',
            'otherCapital',
            'newSale',
            'newProfit',
            'newTax',
            'foreignEarning',
            'remark',
            'addDocFiles'

            //表单有，但是这里没有的
            //buildingBeginDate
            //buildingEndDate
          )
        )
        //时间格式化
      })
      // console.log(this.model)
    },
    // close() {
    //   this.$emit('close')
    //   this.visible = false
    // },
    handleSubmit() {
      // console.log(this.form.getFieldValue('setUpYear'))
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        // values.setUpYear = 1
        // console.log(values.setUpYear)

        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          // console.log('2222')
          if (!this.model.id) {
            //增
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            //改
            console.log('put方式')
            httpurl += this.url.edit
            method = 'put'
          }

          // let formData = {}
          let formData = Object.assign(this.model, values)
          // formData.setUpYear = formData.setUpYear ? formData.setUpYear.format() : null
          formData.buildingBeginDate = formData.buildingBeginDate ? formData.buildingBeginDate.format('YYYY-MM-DD') : null
          formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format('YYYY-MM-DD') : null
          // if (formData.buildingBeginDate) {
          //   formData.buildingBeginDate = formData.buildingBeginDate.slice(0, 10)
          // }
          // if (formData.buildingEndDate) {
          //   formData.buildingEndDate = formData.buildingEndDate.slice(0, 10)
          // }
          // console.log(formData)

          //qs.stringify  目前看来必须转换
          formData = qs.stringify(formData)
          console.log(formData)

          // formData = JSON.stringify(formData);
          // console.log(formData)

          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                // that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              // that.close()
            })
        }
      })
      // this.form.resetFields()
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