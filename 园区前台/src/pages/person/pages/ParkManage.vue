<template>
	<Tabs>
		<TabPane label="公共设施" name="name1">
			<Row>
				<Input placeholder="输入问卷名称" style="width: 300px" />
			</Row>
			<Row>
				<Table border :columns="columns" :data="data">
					<template slot-scope="{ row }" slot="name">
						<strong>{{ row.name }}</strong>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a style="margin-right: 5px">查看</a>
					</template>
				</Table>
			</Row>
		</TabPane>
		<TabPane label="施工企业备案" name="name2">
			<Row>
				<Input placeholder="输入问卷名称" style="width: 300px" />
			</Row>
			<Row>
				<Table border :columns="columns" :data="data1">
					<template slot-scope="{ row }" slot="name">
						<strong>{{ row.name }}</strong>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a style="margin-right: 5px" @click="showDetail(row)">查看</a>
					</template>
				</Table>
			</Row>
		</TabPane>
		<TabPane label="建筑垃圾处置" name="name3">
			<Row>
				<Input placeholder="输入问卷名称" style="width: 300px" />
			</Row>
			<Row>
				<Table border :columns="columns" :data="data2">
					<template slot-scope="{ row }" slot="name">
						<strong>{{ row.name }}</strong>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a style="margin-right: 5px">查看</a>
					</template>
				</Table>
			</Row>
		</TabPane>
		<TabPane label="临时占用道路" name="name4">
			<Row>
				<Input placeholder="输入问卷名称" style="width: 300px" />
			</Row>
			<Row>
				<Table border :columns="columns" :data="data3">
					<template slot-scope="{ row }" slot="name">
						<strong>{{ row.name }}</strong>
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a style="margin-right: 5px">查看</a>
					</template>
				</Table>
			</Row>
		</TabPane>
	</Tabs>
</template>

<script>
	import { getAction } from '@/api/manage'
	export default {
		data() {
			return {
				columns: [{
						title: '企业名称',
						key: 'title'
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
						key: 'orderId'
					},
					{
						title: '操作',
						slot: 'action',
						align: 'center'
					}
				],
				data: [],
				data1: [],
				data2: [],
				data3: [],
			}
		},
		methods: {
			remove(index) {
				this.data.splice(index, 1);
			},
			fetchData() {
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
							if(item.orderType == 7) {
								this.data.push(item)
							} else if(item.orderType == 8) {
								console.log(item)
								this.data1.push(item)
							} else if(item.orderType == 9) {
								this.data2.push(item)
							} else if(item.orderType == 10) {

								this.data3.push(item)
							}
						})

					} else {
						this.$Message.error(res.message)
					}
				})
			},
			showDetail(row) {
				console.log(row)
				console.log('asd')
				this.$router.push({
					name: 'ParkDetail',
					query: row
				})
			}

		},
		created() {
			this.fetchData()
		}

	}
</script>