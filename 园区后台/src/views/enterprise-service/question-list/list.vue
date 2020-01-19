<template>
	<a-card :border="false" class="question-list">
		<!--新建问卷-->
		<div>

			<a-tabs defaultActiveKey="1" tabPosition="left">
				<a-tab-pane tab="有效问卷" key="1">
					<div>
						<a-row>
							<a-col :span="12">
								<a-input-search placeholder="问卷名称" @search="onSearch" enterButton="查询" size="small" />
							</a-col>
							<a-col :span="12">
								<a-button type="primary" style="float: right;" @click="showDrawer">创建新的问卷</a-button>
							</a-col>
						</a-row>
						<a-drawer title="创建新问卷" width="500px" placement="right" :closable="false" @close="onClose" :visible="visible">
							<form :model="form" ref="form">
								<a-row>
									<a-col :span="6">
										<span style="color: red;">*</span><span>问卷名称</span>
									</a-col>
									<a-col :span="18">
										<a-input v-model="form.title" />
									</a-col>
								</a-row>
								<a-row style="margin-top: 10px;">
									<a-col :span="6">
										<span style="color: red;">*</span><span>问卷类型</span>
									</a-col>
									<a-col :span="18">
										<a-input v-model="form.type" />
									</a-col>
								</a-row>
								<a-row style="margin-top: 10px;">
									<a-col :span="6">
										<span style="color: red;">*</span><span>问卷描述</span>
									</a-col>
									<a-col :span="18">
										<a-input v-model="form.isAnonymous" />
									</a-col>
								</a-row>
								<div style="margin-top: 20px;float: right;">
									<a-button type="primary" style="marginRight: 8px" @click="openNew">
										下一步
									</a-button>
									<a-button style="marginRight: 8px" @click="onClose">
										取消
									</a-button>
								</div>
							</form>
						</a-drawer>
					</div>
					<!--表格-->
					<div style="margin-top: 40px;">
						<a-table ref="table" size="middle" bordered rowKey="paperId" :columns="columns" :dataSource="data">

						</a-table>
					</div>
				</a-tab-pane>

				<a-tab-pane tab="暂存问卷" key="2">
					<div>
						<a-row>
							<a-col :span="12">
								<a-input-search placeholder="问卷名称" @search="onSearch" enterButton="查询" size="small" />
							</a-col>
							<a-col :span="12">

							</a-col>
						</a-row>
					</div>
					<!--表格-->
					<div style="margin-top: 40px;">
						<a-table :columns="columns1" :dataSource="data1" rowKey="paperId" bordered>
							<span slot-scope="text, record" slot="action">
							  <a @click="showPeo(record)">发布</a>
						    </span>
						</a-table>
					</div>
				</a-tab-pane>

				<a-tab-pane tab="历史问卷" key="3">
					<div>
						<a-row>
							<a-col :span="12">
								<a-input-search placeholder="问卷名称" @search="onSearch" enterButton="查询" size="small" />
							</a-col>
							<a-col :span="12">
								<!--<button @click="tobook">asd</button>-->
							</a-col>
						</a-row>
					</div>
					<!--表格-->
					<div style="margin-top: 40px;">
						<a-table ref="table" size="middle" :columns="columns2" :pagination="false" :dataSource="data2" rowKey="paperId" bordered>
						

						
						</a-table>
					</div>
				</a-tab-pane>
			</a-tabs>
		</div>
	</a-card>
</template>

<script>
	import { getAction, putAction ,postAction} from '@/api/manage'
	import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

	export default {
		name: 'questionList',
		data() {
			return {
				form: {},
				visible: false,
				columns: [{
						title: '序号',
						dataIndex: '',
						width: 60,
						customRender: function(t, r, index) {
							return parseInt(index) + 1
						}
					},
					{
						title: '问卷名称',
						dataIndex: 'title',
					},
					{
						title: '发布时间',
						dataIndex: 'startTime',

					},
					{
						title: '有效期',
						dataIndex: 'endTime',
					},
					{
						title: '已经完成人数',
						dataIndex: 'achieveNumber'
					},
					{
						title: '是否匿名',
						dataIndex: 'isAnonymous'
					},
				],
				columns1: [{
						title: '序号',
						dataIndex: '',
						width: 60,
						customRender: function(t, r, index) {
							return parseInt(index) + 1
						}
					},
					{
						title: '问卷名称',
						dataIndex: 'title',

					},
					{
						title: '创建时间',
						dataIndex: 'endTime',
					},
					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						scopedSlots: {
							customRender: 'action'
						},
						width: 200
					},
				],
				columns2: [{
						title: '序号',
						dataIndex: '',
						width: 60,
						customRender: function(t, r, index) {
							return parseInt(index) + 1
						}
					},
					{
						title: '问卷名称',
						dataIndex: 'title',
					},
					{
						title: '有效期',
						dataIndex: 'tags',
					},
					{
						title: '完成情况（已达/目标量）',
						dataIndex: 'achieveNumber',
					},
//					{
//						title: '操作',
//						dataIndex: 'action',
//						align: 'center',
//						scopedSlots: {
//							customRender: 'action2'
//						},
//						width: 200
//					},
				],

				data: [],
				data1: [],
				data2: [],

			}
		},
		methods: {
			callback(val) {
				console.log(val)
			},
			createQustion() {
				console.log('asd')
			},
			onSearch(e) {
				console.log(e)
				getAction('/questionnaire/mgrQuestionnaireInfo/lists', {
					title: e
				}).then(res => {
					if(res.success) {
						console.log(res.result)
						this.data = res.result
					} else {
						this.$message.warning(res.message)
					}
				})
			},
			showPeo(record){
				console.log(record)
				console.log(record.paperId)
				let paperId=record.paperId
				console.log(paperId)
				let status=1
				postAction(`questionnaire/mgrQuestionnaireInfo/changeStatus?paperId=${paperId}`, status).then(res => {
					if(res.code == 200 && res.success) {
						console.log("发布成功！");
						
					} else {
						console.log(res.code);
					}
				})
			},
			showDrawer() {
				this.visible = true
			},
			onClose() {
				this.visible = false
			},
			loadData() {
				let status = 1
				getAction(`/questionnaire/mgrQuestionnaireInfo/lists?status=${status}`).then(res => {
					if(res.success && res.code == 200) {
						console.log(res.result)
						this.data = res.result
					} else {
						this.$message.warning(res.message)
					}
				})
			},
			loadData1() {
				let status = 0
				getAction(`/questionnaire/mgrQuestionnaireInfo/lists?status=${status}`).then(res => {
					if(res.success && res.code == 200) {
						console.log(res.result)
						this.data1 = res.result
					} else {
						this.$message.warning(res.message)
					}
				})
			},
			loadData2() {
				let status = 2
				getAction(`/questionnaire/mgrQuestionnaireInfo/lists?status=${status}`).then(res => {
					if(res.success && res.code == 200) {
						console.log(res.result)
						this.data2 = res.result
					} else {
						this.$message.warning(res.message)
					}
				})
			},
			openNew() {
				let form = this.form
				this.$router.push({
					//					name: newList
					path: '/enterprise-service/question-list/newList',
					query: {
						form
					}
				})
				console.log(form)
			},
			tobook() {
				console.log('qwe')
				this.$router.push({
					path: '/enterprise-service/question-list/asd',
				})
			}
		},
		created() {
			this.loadData();
			this.loadData1();
			this.loadData2();

		}
	}
</script>

<style>

</style>