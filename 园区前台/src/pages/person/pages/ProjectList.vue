<template>
	<div>
		<Tabs value="name1">
			<TabPane label="新建项目" name="name1">
				<Row>
					<div style="text-align: right;margin: 15px;">
						<Button style="background: red;color: #fff;margin-right: 10px;" @click="goRouter('NewRentalProjectStep1')">申请租赁项目</Button>
						<Button style="background: red;color: #fff;margin-right: 10px;" @click="goRouter('NewLandProjectStep1')">申请拿地项目</Button>
					</div>
				</Row>
				<Row>
					<Table border :columns="column" :data="data1" @on-row-click="open">
						<template slot-scope="{ row }">
						</template>
					</Table>
				</Row>
			</TabPane>
			<TabPane label="技改项目">
				<Row>
					<div style="text-align: right;margin: 15px;">
						<Button style="background: red;color: #fff;margin-right: 10px;">申请技改项目</Button>
					</div>
				</Row>
				<Row>
					<Table border :columns="column" :data="data2">
						<template slot-scope="{ row }" slot="name">
						</template>
					</Table>
				</Row>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage'
	import Mixin from '../mixin'

	export default {
		mixins: [Mixin],
		data() {
			return {
				column: [{
						title: '序号',
						type: 'index'
					},
					{
						title: '项目名称',
						key: 'projectType_dictText'
					},
					{
						title: '项目类别',
						key: 'projectType_dictText'
					},
					{
						title: '行业类别',
						key: 'projectName'
					},
					{
						title: '经办人',
						key: 'status'
					},
					{
						title: '申请状态',
						key: 'status_dictText',
						align: 'center'
					},
				],
				data1: [],
				data2: [],
			}
		},
		methods: {
			fetchNewProject() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/newProject', {
					keyword,
					parkId,
					pageNo,
					pageSize
				}).then(res => {
					if(res.success && res.code === 200) {
						this.data1 = res.result.records
						//          console.log(this.data1)
					} else {
						this.$Message.error(res.message)
					}

				})
			},
			open(row) {
				console.log('asd')
				console.log(row)
				this.$router.push({
					name: 'proDeta',
					query: row
				})
			},
			fetchTechProject() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/newTechProject', {
					keyword,
					parkId,
					pageNo,
					pageSize
				}).then(res => {
					if(res.success && res.code === 200) {
						//          this.data2 = res.result.records
						//          console.log(data2)
						console.log(res.result.records)
						let asd = res.result.records
						asd.forEach(item => {
							console.log(item.mgrProjectInfo)
							this.data2.push(item.mgrProjectInfo)
						})
					} else {
						this.$Message.error(res.message)
					}
				})
			},
		},
		created() {
			this.fetchNewProject()
			this.fetchTechProject()
		}
	}
</script>

<style lang="less">

</style>