<template>
	<Tabs value="name1">
		<TabPane label="服务记录" name="name1">
			工单处理记录
			<ul v-for="item in list" style="margin: 10px;">
				<li>{{list.createTime}}</li>
				<li>{{list.remark}}</li>
			</ul>
		</TabPane>
	</Tabs>
</template>

<script>
	import { getAction } from '@/api/manage'
	export default {
		data() {
			return {
				id: '',
				list: {},
			}
		},
		created() {
			console.log(this.$route.query.orderId)
			this.id = this.$route.query.orderId
			this.getMessage()
		},
		methods: {
			getMessage() {
				let id = this.id
				console.log('asd')
				getAction(`park.workorder/mgrOrderOperate/list2?orderId=${id}`).then(res => {
					if(res.success && res.code == 200) {
						let data = res.result
						data.forEach(item => {
							console.log(item)
							this.list = item
							console.log(this.list)
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>