<template>
	<div class="active-index">
		<div class="active-index-box">
			<Breadcrumb separator=">">
				<BreadcrumbItem :to="{name: 'HomeIndex'}">首页</BreadcrumbItem>
				<BreadcrumbItem>活动</BreadcrumbItem>
			</Breadcrumb>
			<div class="project-content">
				<Tabs value="name1">
					<TabPane label="新建项目" name="name1">
						<Row>
							<div>
								<Button>申请租赁项目</Button>
								<Button>申请拿地项目</Button>
							</div>	
						</Row>
						<Row>
							<Table border :columns="columns12" :data="data6">
								<template slot-scope="{ row }" slot="name">
									<strong>{{ row.name }}</strong>
								</template>
							</Table>
						</Row>
					</TabPane>
					<TabPane label="技改项目" name="name2"></TabPane>
				</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
	//我的项目
	export default {
		data() {
			return {
				columns12: [{
						title: '序号',
						slot: 'name'
					},
					{
						title: '项目名称',
						slot: 'name'
					},
					{
						title: '项目类别',
						slot: 'name'
					},
					{
						title: '行业类别',
						slot: 'name'
					},
					{
						title: '经办人',
						key: 'age'
					},

					{
						title: '申请状态',
						slot: 'action',
						align: 'center'
					}
				],
				data6: [{
						name: 'John Brown',
						age: 18,
						address: 'New York No. 1 Lake Park'
					},
					{
						name: 'Jim Green',
						age: 24,
						address: 'London No. 1 Lake Park'
					},
					{
						name: 'Joe Black',
						age: 30,
						address: 'Sydney No. 1 Lake Park'
					},
					{
						name: 'Jon Snow',
						age: 26,
						address: 'Ottawa No. 2 Lake Park'
					}
				]
			}
		},
		methods: {
			remove(index) {
				this.data6.splice(index, 1);
			}
		}
	}
</script>

<style lang="less">
	.active-index {
		margin-top: 90px;
		width: 100%;
		background-color: rgba(246, 246, 246, 1);
		.active-index-box {
			width: 90%;
			margin: auto;
			.ivu-breadcrumb {
				text-align: left;
				padding: 10px;
				border: 1px solid #eee;
				background-color: #fff;
			}
			.content {
				margin-top: 15px;
			}
			.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
				float: left;
				height: 120px;
				margin-top: -16px;
			}
			.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
				float: left;
				background: #fff;
				padding: 16px;
			}
			.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
				border-color: transparent;
			}
			.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
				border-color: #fff;
			}
		}
	}
</style>