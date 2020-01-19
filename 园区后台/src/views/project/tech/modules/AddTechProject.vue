<template>
  <a-drawer
    wrapClassName="mgr-project-trace-drawer"
    width="90%"
    :visible="visible"
    @close="handleCancel"
    destroyOnClose
    :title="title"
  >
    <a-spin :spinning="confirmLoading">
      <div>
        <a-form @submit="handleSubmit" :form="form">
          <!-- 11111111111111 -->
          <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
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
                    v-decorator="['setUpYear',{rules: [{ required: true, message: '请输入成立年份', whitespace: true},{ pattern: /^\d{4}$/, message: '请输入四位数字年份' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行3 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="企业登记注册类型" required>
                  <a-select
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
                <a-form-item label="注册资金">
                  <a-input
                    placeholder
                    addonAfter="万元"
                    v-decorator="['registerMoney',{rules: [{ required: true, message: '请输入注册资金'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行4 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="企业总资产">
                  <a-input
                    addonAfter="万元"
                    v-decorator="['totalAsset',{rules: [{ required: true, message: '请输入企业总资产'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="固定资产净值">
                  <a-input
                    addonAfter="万元"
                    v-decorator="['fixedAsset',{rules: [{ required: true, message: '请输入固定资产净值'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
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
                <a-form-item label="联系电话（法人）">
                  <a-input
                    placeholder
                    v-decorator="['legalTel',{rules:[{ pattern: phone, message: '请输入正确的手机号' }]}]"
                  />
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
                    v-decorator="[ 'agentTel',{rules: [{ required: true, message: '请输入经办人电话', whitespace: true},{ pattern: phone, message: '请输入正确的手机号' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 行7 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="电子信箱">
                  <a-input
                    placeholder
                    v-decorator="['email',{rules:[{ pattern: email, message: '请输入正确的邮箱' }]}]"
                  />
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
                <a-form-item label="年产值">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['annualProductionValue',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="年税金">
                  <a-input
                    addonAfter="万元"
                    placeholder
                    v-decorator="['annualTaxes',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
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
                <a-form-item label="亩均绩效评价（A类、B类、C类、D类）">
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
                  <a-input
                    placeholder
                    v-decorator="['allUseArea',{rules:[{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="新征用地面积">
                  <a-input
                    placeholder
                    v-decorator="['newUseArea',{rules:[{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="租赁建设面积">
                  <a-input
                    addonAfter="m²"
                    placeholder
                    v-decorator="['rentBuildArea',{rules:[{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
                  />
                </a-form-item>
              </a-col>
              <!-- 按要求，应该使用数据字典 -->
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="所属行业" required>
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
                  <a-date-picker placeholder v-decorator="['buildingEndDate']" style="width:100%" />
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
                <a-form-item label="拿地面积">
                  <a-input
                    addonAfter="m²"
                    placeholder
                    v-decorator="['gainArea',{rules: [{ required: true, message: '请输入拿地面积'},{ pattern: /^\d+(\.\d{1,2})?$/, message: '请输入数字，最多两位小数' }]}]"
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
                    v-decorator="['investAmount',{rules: [{ required: true, message: '请输入数额'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="其中项目用汇（万美元）">
                  <a-input
                    placeholder
                    v-decorator="['projectUseInvest',{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="注册资本（万元）">
                  <a-input
                    v-decorator="[ 'registerCapital',{rules: [{ required: true, message: '请输入数额'},{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
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
                  <a-input
                    placeholder
                    v-decorator="['fixedAssetInvest',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
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
                  <a-input placeholder v-decorator="['device']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="工程建设其他费用">
                  <a-input placeholder v-decorator="['projectBuilding']" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="预备费">
                  <a-input placeholder v-decorator="['budget']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="建设期利息">
                  <a-input placeholder v-decorator="['buildingInterest']" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="铺底流动资金">
                  <a-input placeholder v-decorator="['bottomWorkingCapital']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="自有资金">
                  <a-input placeholder v-decorator="['freeCapital']" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="股票/债券">
                  <a-input placeholder v-decorator="['sharesBond']" />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="银行贷款">
                  <a-input placeholder v-decorator="['bankLoan']" />
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
                  <a-input
                    placeholder
                    v-decorator="['newSale',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="新增利润（万元）">
                  <a-input
                    placeholder
                    v-decorator="['newProfit',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="新增税金（万元）">
                  <a-input
                    placeholder
                    v-decorator="['newTax',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="创汇（万美元）">
                  <a-input
                    placeholder
                    v-decorator="['foreignEarning',{rules:[{ pattern: /^\d+(\.\d{1,4})?$/, message: '请输入正确数额' }]}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="项目申请理由简述">
                  <a-textarea :rows="4" v-decorator="['applyReason']"></a-textarea>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>

          <!-- 4444444 -->
          <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目用地">
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="固定资产投资（万元）">
                  <p class="myinput">
                    1.项目总用地面积
                    <a-input v-decorator="['allUseArea']" style="width:100px" />平方米；其中：新征用地面积
                    <!-- <a-input v-decorator="['totalUseArea']" style="width:100px" />平方米；其中：新征用地面积 -->
                    <a-input v-decorator="['newUseArea']" style="width:100px" />平方米。项目利用企业已有土地的，土地证等证书文件编号
                    <a-input v-decorator="['ownLandNumber']" style="width:200px;" />。租赁使用其他企业厂房的，出租房土地证等证书文件编号
                    <a-input v-decorator="['rentLandNumber']" style="width:200px;" />。
                    <br />2.项目原建筑面积
                    <a-input v-decorator="['originalBuildArea']" style="width:100px" />平方米，实施技术改造后建筑面积
                    <a-input v-decorator="['afterChangeBuildArea']" style="width:100px" />平方米。新增建筑面积
                    <a-input v-decorator="['newBuildArea']" style="width:100px" />平方米。实施技术改造是否涉及主体建筑结构改变
                    <a-input v-decorator="['isChangeBuild']" />（填“是”或“否”）。
                  </p>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 富文本  projectTechnologyFlow   项目工艺流程及说明 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="项目工艺流程（图示式）及说明">
                  <j-editor v-model="editor.projectTechnologyFlow"></j-editor>
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
            <!-- upload  addDocFiles   附件 -->
            <a-row class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="附件">
                  <j-upload v-decorator="['addDocFiles']" />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 后台需要这个选项，前台写死 -->
            <a-row v-if="!this.model.projectId" class="form-row" :gutter="16">
              <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
                <a-form-item label="工作流程" required>
                  <a-select
                    v-decorator="['workFlowUseObject',{initialValue: dict.workFlow[0].workFlowUseObject},{rules: [{ required: true, message: '请选择工作流程', whitespace: true}]}]"
                  >
                    <a-select-option
                      v-for="(item, key) in dict.workFlow"
                      :value="item.workFlowUseObject"
                      :key="item.workFlowId"
                    >{{ item.workFlowName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
      </div>
      <div class="drawer-bottom-btn-group">
        <a-button style="margin-right: 8px" type="primary" @click="handleSubmit">确定</a-button>
        <a-button @click="handleCancel">取消</a-button>
      </div>
    </a-spin>
    <yq-enterprise-modal ref="ent" @ok="getCust"></yq-enterprise-modal>
  </a-drawer>
</template>

<script>
// import '@/components/dict/JDictSelectUtil'
// import { JeecgListMixin } from '@/mixins/JeecgListMixin'     //1107

import qs from 'qs'
import JEditor from '@/components/jeecg/JEditor'
import JUpload from '@/components/jeecg/JUpload'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { initDictOptions } from '@/components/dict/JDictSelectUtil'
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash/pick'
import moment from 'moment'
import { AddTechProjectForm } from '@/config/pick-fields'
import { mapGetters } from 'vuex'
import { phone, email } from '@/config/regex'
import YqEnterpriseModal from '@comp/extend/YqEnterpriseModal'
import mixins from '../mixins'

export default {
  name: 'AddTechProjectForm',
  mixins: [mixins],
  components: { JEditor, JDictSelectTag, JUpload, YqEnterpriseModal },
  data() {
    return {
      //在添加与编辑时修改
      // title: '技改项目用地信息添加',
      //   form: {}
      form: this.$form.createForm(this, { name: '' }),
      formItem: {
        label: { span: 6 },
        value: { span: 18 }
      },
      phone,
      email,
      url: {
        add: '/park.project/mgrProjectLand/add',
        edit: '/park.project/mgrProjectLand/edit'
      },
      confirmLoading: false,
      model: {},
      // setUpYear: '',
      dateFormat: 'YYYY-MM-DD',
      testData: '',
      industrySectorValue: '',
      companyRegisterType: '',
      dict: {
        workFlow: [{ value: '1' }]
      },
      editor: {
        projectTechnologyFlow: ''
      },
      record: {},
      visible: false,
      loading: false
      // value:""
      // DictDataindustrySectorValue:this.form.getFieldValue('industrySectorValue')
    }
  },
  //先搞定添加，回头再做这个
  computed: {
    title() {
      return '技改项目' + (this.model.projectId ? '维护' : '新建')
    },
    ...mapGetters(['industrialParkId'])
  },
  updated() {
    // this.edit(this.record.id)
  },
  created() {
    getAction('/park.customer/baseCustomer/listAll', { parkId: this.industrialParkId }).then(res => {
      this.dict.custList = res.result.records
      console.log(this.dict.custList)
    })
    initDictOptions('INDUSTRY_SECTOR_VALUE').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.industrySectorValueExt = res.result
      }
    })
    initDictOptions('mgr-attr-addpl-companyRegisterType').then(res => {
      if (res.code === 0 && res.success) {
        this.dict.companyRegisterTypeExt = res.result
      }
    })
    getAction('/park.workflow/baseWorkFlowSet/list', { parkId: this.industrialParkId }).then(res => {
      if (res.success) {
        this.dict.workFlow = res.result
      } else {
        this.$message.warning(res.message)
      }
    })
  },
  methods: {
    importExcelUrl() {},
    handleImportExcel() {},
    moment,
    add() {
      this.model = {}
      this.visible = true
    },
    // detail(record) {
    //   // this.record = record
    //   // console.log(this.record.recordId)
    //   this.form.resetFields()
    //   this.model = Object.assign({}, record)
    //   this.visible = true
    //   // console.log(pick(this.model, ProjectAttractShowZeroForm))
    //   this.$nextTick(() => {
    //     this.form.setFieldsValue(pick(this.model, AddTechProjectForm))
    //     //时间格式化
    //     // this.form.setFieldsValue({ trackDate: this.model.trackDate ? moment(this.model.trackDate) : null })
    //   })
    // },
    edit(recordA) {
      console.log('edit开始了')
      this.form.resetFields()
      getAction('/park.project/mgrProjectLand/queryById', { id: recordA.projectId }).then(res => {
        console.log('res')
        console.log(res)

        //获取公司名
        for (const item of this.dict.custList) {
          if (item.custId == res.result.custId) {
            this.cust.id = item.custId
            this.cust.name = item.customerName
          }
        }
        res.result.custId = this.cust.name

        this.model = Object.assign({}, res.result)
        this.visible = true
        this.$nextTick(() => {
          this.editor = {
            projectTechnologyFlow: this.model.projectTechnologyFlow
          }
          this.form.setFieldsValue(pick(this.model, AddTechProjectForm))
          this.form.setFieldsValue({
            buildingBeginDate: this.model.buildingBeginDate ? moment(this.model.buildingBeginDate) : null
          })
          this.form.setFieldsValue({
            buildingEndDate: this.model.buildingEndDate ? moment(this.model.buildingEndDate) : null
          })
        })
      })
    },

    handleCancel() {
      this.visible = false
    },
    handleSubmit() {
      const that = this
      // 触发表单验证
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.projectId) {
            //增
            console.log('post方式')
            httpurl += this.url.add
            method = 'post'
          } else {
            //改
            console.log('put方式')
            console.log(this.model.projectId)
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          if (formData.buildingBeginDate) {
            formData.buildingBeginDate = formData.buildingBeginDate
              ? formData.buildingBeginDate.format('YYYY-MM-DD')
              : null
          }
          if (formData.buildingEndDate) {
            formData.buildingEndDate = formData.buildingEndDate ? formData.buildingEndDate.format('YYYY-MM-DD') : null
          }

          const { projectTechnologyFlow } = this.editor
          formData.projectTechnologyFlow = projectTechnologyFlow
          formData.status = 1
          formData.parkId = this.industrialParkId
          formData.fillUnit = this.cust.id
          formData.custId = this.cust.id

          formData = qs.stringify(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('reload')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.visible = false
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
.mgr-project-trace-drawer .ant-btn {
  margin-bottom: 0;
}
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