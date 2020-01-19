<template>
	<div>
		<Tabs value="name1">
			<TabPane label="服务记录" name="name1">
				<Row :gutter="16">
					<RadioGroup type="button" style="border: none;margin: 15px;" v-model="serveGroup" @on-change="changes">
						<Radio label="物业报修" value="1" style=""></Radio>
						<Radio label="物业投诉" value="2" style="margin-left: 10px;"></Radio>
						<Radio label="需求提报" value="3" style="margin-left: 10px;"></Radio>
						<Radio label="停车位申请" value="4" style="margin-left: 10px;"></Radio>
						<Radio label="IT保休" value="5" style="margin-left: 10px;"></Radio>
						<Radio label="广告位申请" value="6" style="margin-left: 10px;"></Radio>
					</RadioGroup>
				</Row>
				<Row>
					<Table border :columns="columns" :data="data" > 
						<template >
						</template>
						<template slot-scope="{ row, index }" slot="action">
							<a style="margin-right: 5px" @click="edit(row)">编辑</a>
							<a style="margin-right: 5px" @click="delOne(row)">取消</a>
						</template>
					</Table>
				</Row>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import { getAction,deleteAction } from '@/api/manage'
	import { initDictOptions, filterDictText } from "@/api/dict";

	export default {
		data() {
			return {
				columns: [{
						title: '报修物品',
						key: 'orderType_dictText',
                        render:(h,params)=>{
                        	return h('div',[
                        	   h('span',{
                        	   	style:{
                        	   		strong
                        	   	},
                        	   	on:{
                        	   		click:()=>{
                        	   			this.open
                        	   		}
                        	   	}
                        	   },'orderType_dictText'),
                        	])
                        }
					},
					{
						title: '公司团队',
					},
					{
						title: '申请人',
					},
					{
						title: '编号',
						key: 'orderId'
					},
					{
						title: '状态',
						key: 'status'
					},
					{
						title: '操作',
						slot: 'action',
						align: 'center'
					},
				],
				data: [],
				serveGroup: '物业报修',
			}
		},
		methods: {
			fetchRecord() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/serviceRecord', {
					keyword,
					parkId,
					pageNo,
					pageSize,
				}).then(res => {
					if(res.success && res.code === 200) {
						console.log(res.result.records)
						let rese = res.result.records
						rese.forEach(item => {
							//          	this.value=item.orderType_dictText
							if(item.orderType_dictText == "物业报修") {
								console.log(item)
								this.data.push(item)
							}
						})

					} else {
						this.$Message.error(res.message)
					}
				})

			},
			delOne(row){
				console.log(row)
				let delAccount=row.orderId
				deleteAction(`park.platform/userCenter/serviceDelete?id=${delAccount}`).then(res=>{
					if(res.success && res.code === 200) {
						console.log('ok')	
					}else{
						this.$Message.error(res.message)
					}
				})
			},
			changes(data) {
				console.log("data", data)
				this.data.length=0
				this.serveGroup=data;
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/serviceRecord', {
					keyword,
					parkId,
					pageNo,
					pageSize,
				}).then(res => {
					if(res.success && res.code === 200) {
						console.log(res.result.records)
						let rese = res.result.records
						rese.forEach(item => {
							//          	this.value=item.orderType_dictText
							if(item.orderType_dictText ==data) {
								console.log(item)
								this.data.push(item)
							}
						})

					} else {
						this.$Message.error(res.message)
					}
				})
			},
			open(row){
				console.log(row)
				this.$router.push({
					name: 'serList',
					query: row
				})
			},
			edit(row){
				console.log(row)
			}


		},
		created() {
			this.fetchRecord()
		}
	}
</script>