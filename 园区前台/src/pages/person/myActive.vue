<template>
	<div class="active-index">
		<div class="active-index-box">
			<Breadcrumb separator=">">
				<BreadcrumbItem :to="{name: 'HomeIndex'}">首页</BreadcrumbItem>
				<BreadcrumbItem>活动</BreadcrumbItem>
			</Breadcrumb>
			<div class="content">
				<Tabs value="name1">
					<TabPane label="我的活动" name="name1">
						<Row>
							<Col span="2" style="margin-left: 15px;">活动状态：</Col>
							<Col span="20">
							<RadioGroup type="button" style="margin: 7px;">
								<Radio label="开始" border style="margin-left: 10px;"></Radio>
								<Radio label="未开始" border style="margin-left: 10px;"></Radio>
								<Radio label="进行中" border style="margin-left: 10px;"></Radio>
								<Radio label="已结束" border style="margin-left: 10px;"></Radio>
							</RadioGroup>
							</Col>
						</Row>
						<Row>
							<Table border :columns="columns12" :data="dataSource">
								<template slot-scope="{ row }" slot="name">
								</template>
								<template slot-scope="{ row, index }" slot="action">
									<a style="margin-right: 5px" >取消</a>
								</template>
							</Table>
						</Row>
					</TabPane>
				</Tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage'
	//我的活动
	    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '序号',
                        key:'personName'
                    },
                    {
                        title: '活动名称',
                        slot: 'name'
                    },
                    {
                        title: '开始日期',
                        slot: 'name'
                    },
                    {
                        title: '报名人数',
                        slot: 'name'
                    },
                    {
                        title: '报名时间',
                        key: 'createTime'
                    },
                    {
                        title: '审核状态',
                        key: 'address'
                    },
                    {
                        title: '活动状态',
                        key:'status_dictText'
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
            remove (index) {
                this.data6.splice(index, 1);
            },
            init() {
				let {
					keyword,
					parkId,
					pageNo,
					pageSize,
				} = this
				getAction('park.platform/userCenter/activitySignUp', {
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
			}
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
			.content {
				margin-top: 15px;
				text-align: left;
			}
			
		}
	}
</style>