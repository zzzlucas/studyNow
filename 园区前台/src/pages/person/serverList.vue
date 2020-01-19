<template>
	<div class="active-index">
		<div class="active-index-box">
			<Breadcrumb separator=">">
				<BreadcrumbItem :to="{name: 'HomeIndex'}">首页</BreadcrumbItem>
				<BreadcrumbItem>活动</BreadcrumbItem>
			</Breadcrumb>
			<div class="server-list">
				<Tabs value="name1">
					<TabPane label="活动" name="name1">
						<Row :gutter="16">
							<RadioGroup type="button" style="border: none;">
								<Radio label="物业报休" ></Radio>
								<Radio label="物业投诉" ></Radio>
								<Radio label="需求提报" ></Radio>
								<Radio label="停车位申请"></Radio>
								<Radio label="预约看房" ></Radio>
								<Radio label="IT保休" ></Radio>
								<Radio label="广告位申请" ></Radio>
							</RadioGroup>
							</Col>
						</Row>
						<Row>
							<Table border :columns="columns12" :data="data6">
								<template slot-scope="{ row }" slot="name">
									<strong>{{ row.name }}</strong>
								</template>
								<template slot-scope="{ row, index }" slot="action">
									<a style="margin-right: 5px" >编辑</a>
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
	//我的活动
	    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '报修物品',
                        slot: 'name'
                    },
                    {
                        title: '公司团队',
                        slot: 'name'
                    },
                    {
                        title: '申请人',
                        slot: 'name'
                    },
                    {
                        title: '编号',
                        slot: 'name'
                    },
                    {
                        title: '状态',
                        key: 'age'
                    },
                    
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center'
                    }
                ],
                data6: [
                    {
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
            remove (index) {
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