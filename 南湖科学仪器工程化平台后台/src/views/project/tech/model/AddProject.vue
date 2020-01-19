<template>
  <div>
    <page-layout :title="title">
      <!-- <a-card class="top" :bordered="false">首页 / 技改项目/项目维护</a-card> -->
      <a-divider type="vertical" />
      <a-form @submit="handleSubmit" :form="form">
        <!-- 第一大块 -->
        <a-card :bordered="false" style="width:1200px;margin:auto" title="企业信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目单位" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入单位名称', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="组织机构代码" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入组织机构代码', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行2 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="单位地址" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入单位地址', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="成立年份" required>
                <a-date-picker style="width:100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行3 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
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
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资金（万元）" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行4 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="企业总资产（万元）" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产净值（万元）" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行5 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="法定代表人">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入法人姓名', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（法人">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入法人电话', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行6 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="经办人" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入经办人姓名', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="联系电话（经办人）" required>
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入经办人电话', whitespace: true}]}
            ]"
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
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入电子信箱', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行8 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="公司概况">
                <a-textarea
                  :rows="4"
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行9 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="团队成员情况">
                <a-textarea
                  :rows="4"
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- 行10 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年产值（万元）">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="年税金（万元）">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- <a-form-item v-if="showSubmit">
            <a-button htmlType="submit">Submit</a-button>
          </a-form-item>-->
        </a-card>

        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目信息">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设项目名称" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入项目名称', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="拟建设地址" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入拟建设地址', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要建设内容及规模（生产能力）" required>
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="亩均效绩介（A类、B类、C类、D类）" required>
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <!--进度 1.5 / 4-->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要原料">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入原料', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数量', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="主要产品">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入产品', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="消耗量或产出量">
                <a-input
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数量', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="所属行业" required>
                <a-select defaultValue="1" style="width:100%">
                  <a-select-option value="1">股份合作企业</a-select-option>
                  <a-select-option value="2">联营企业</a-select-option>
                  <a-select-option value="3">有限责任公司</a-select-option>
                  <a-select-option value="4">股份有限公司</a-select-option>
                  <a-select-option value="5">私营企业</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设开始时间" required>
                <a-date-picker style="width:100%" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设结束时间" required>
                <a-date-picker style="width:100%" />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否人才项目">
                <a-radio-group v-model="Rvalue">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <!-- 3 -->
        <a-card :bordered="false" style="width:1200px;margin:auto;margin-top:20px" title="项目投资">
          <!-- 行1 -->
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目总投资（万元）" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其中项目用汇（万美元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="注册资本（万元）" required>
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="是否外资">
                <a-radio-group v-model="Rvalue">
                  <a-radio :value="1">是</a-radio>
                  <a-radio :value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="固定资产投资（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name',
              {rules: [{ required: true, message: '请输入数额', whitespace: true}]}
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="土建">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="安装">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="设备">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="工程建设其他费用">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="预备费">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="建设期利息">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="铺底流动资金">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="自有资金">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="股票/债券">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="银行贷款">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="其他">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增销售收入（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增利润（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
            <a-col :xl="{span: 10, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="新增税金（万元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="创汇（万美元）">
                <a-input
                  required
                  placeholder
                  v-decorator="[
              'repository.name'
            ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目申请理由简述">
                <a-textarea :rows="4"></a-textarea>
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
                  1.项目总用地面
                  <a-input />平方米；其中：新征用地面积
                  <a-input />平方米。项目利用企业已有土地的，土地证等证书文件编号
                  <a-input style="width:200px;" />。租赁使用其他企业厂房的，出租房土地证等证书文件编号
                  <a-input style="width:200px;" />。
                  <br />2.项目原建筑面积
                  <a-input />平方米，实施技术改造后建筑面积
                  <a-input />平方米。新增建筑面积
                  <a-input />平方米。实施技术改造是否涉及主体建筑结构改变
                  <a-input />（填“是”或“否”）。
                </p>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="项目工艺流程（图示式）及说明">
                <!-- 富文本 -->
                <j-editor />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="备注">
                <a-textarea :rows="4"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :xl="{span: 21, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
              <a-form-item label="附件">
                <a-upload
                  name="file"
                  :showUploadList="false"
                  :multiple="false"
                  :headers="tokenHeader"
                  :action="importExcelUrl"
                  @change="handleImportExcel"
                >
                  <a-button type="primary" icon="import">上传附件</a-button>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>

      <!-- <a-button slot="tabBarExtraContent" @click="add">立项登记</a-button> -->
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
      title: '首页 / 技改项目/项目维护'
      //   form: {}
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