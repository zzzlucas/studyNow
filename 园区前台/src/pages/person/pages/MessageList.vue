<template>
	<div>
		<Tabs>
			<TabPane label="我的消息">
				<Row>
					<ul v-for="item in dataSource" >
						<li style="margin-top: 7px;">
							<Row :gutter="16" >
								<Col span="16" >
								<div style="font-size: 15px;font-weight: 700;">{{item.titile}}</div>
								</Col>
								<Col span="16">
								<div style="margin-top: 7px;">{{item.msgContent}}</div>
								</Col>
								<Col span="16">
								<div>{{item.sender}} :{{ item.sendTime }}</div>
								</Col>
							</Row>
						</li>
					</ul>
				</Row>
				<!--<List item-layout="vertical">
					<ListItem v-for="item in dataSource" :key="item.title" @click="open">
						<span>{{item.titile}}</span>
						<ListItemMeta :avatar="item.avatar" :description="item.msgContent" /> {{item.sender}} :{{ item.sendTime }}
					</ListItem>
				</List>-->
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import Mixin from '../mixin'
	import { getAction } from '@/api/manage'

	export default {
		mixins: [Mixin],
		data() {
			return {
				dataSource: [],
			}
		},
		methods: {
			// todo
			fetchServerList() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/logMessage', {
					keyword,
					parkId,
					pageNo,
					pageSize
				}).then(res => {
					if(res.success && res.code === 200) {
						this.dataSource = res.result.records
						console.log('asd')
						console.log(res.result)
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			
		},
		created() {
			this.fetchServerList()
		}
	}
</script>