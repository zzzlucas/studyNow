<template>
	<div class="active-index">
		<div class="active-index-box">
			<Breadcrumb separator=">">
				<BreadcrumbItem :to="{name: 'HomeIndex'}">首页</BreadcrumbItem>
				<BreadcrumbItem>活动</BreadcrumbItem>
			</Breadcrumb>
			<div class="project-content">
				<Tabs value="name1">
					<TabPane label="我的消息" name="name1">
						<List item-layout="vertical">
							<ListItem v-for="item in dataSource" :key="item.title">
								<ListItemMeta :avatar="item.avatar" :title="item.createTime" :description="item.description" /> 系统消息：  {{ item.createTime}}	
							</ListItem>
						</List>
					</TabPane>

				</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage'
	//消息中心
	export default {
		data() {
			return {
				columns12: [{
						title: '企业名称',
						key:'id'
					},
					{
						title: '经办人',
						slot: 'name'
					},
					{
						title: '项目名称',
						slot: 'name'
					},
					{
						title: '状态',
						slot: 'name'
					},

					{
						title: '操作',
						slot: 'action',
						align: 'center'
					}
				],
                
                dataSource:[],
				keyword: '',
				pageNo: 1,
				pageSize: 10,
				parkId: '',
				status: '1'
			}
		},
		methods: {
			remove(index) {
				this.data6.splice(index, 1);
			},
			init() {
				let {
					keyword,
					parkId,
					pageNo,
					pageSize,
				} = this
				getAction('park.platform/userCenter/logMessage', {
					keyword,
					parkId,
					pageNo,
					pageSize,
				}).then(res => {
					if(res.success && res.code === 200) {
						console.log(res.result)
						this.dataSource=res.result.records
						console.log(this.dataSource)

					} else {
						this.$Message.error(res.message)
					}

				})
			},
		},
		created() {
			this.init()
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
			.project-content {
				margin-top: 15px;
				text-align: left;
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