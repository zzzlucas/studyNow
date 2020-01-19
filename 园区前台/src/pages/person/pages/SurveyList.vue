<template>
	<!--问卷调查  78-->
	<div>
		<Tabs value="name1">
			<TabPane label="问卷列表" name="name1">
				<Row>
					<div style="margin: 15px;">
						<Input suffix="ios-search" placeholder="输入问卷名称" style="width: 30%" />
					</div>
				</Row>
				<Row>
					<Table border :columns="columnSurvey" :data="dataSurvey">
						<template slot-scope="{ row, index }" slot="action">
							<a style="margin-right: 5px" @click="open(row)">参与问答</a>
						</template>
					</Table>
				</Row>
			</TabPane>
			<TabPane label="我参与的">
				<Row>
					<div style="text-align: right;margin: 15px;">
						<Input suffix="ios-search" placeholder="输入问卷名称" style="width: 30%" />
					</div>
				</Row>
				<Row>
					<Table border :columns="columnSurvey" :data="dataProject">
						<template slot-scope="{ row, index }" slot="action">
							<a style="margin-right: 5px">查看</a>
						</template>
					</Table>
				</Row>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import { getAction } from '@/api/manage'

	export default {
		data() {
			return {
				columnSurvey: [{
						title: '问卷名称',
						key: 'title'
					},
					{
						title: '状态',
						key: 'projectType_dictText'
					},
					{
						title: '截至时间',
						key: 'publishTime'
					},
					{
						title: '状态',
						key: 'status_dictText'
					},
					{
						title: '操作',
						slot: 'action',
						align: 'center'
					},
				],
				columnProject: [],
				dataSurvey: [],
				dataProject: [],
			}
		},
		methods: {
			fetchSurvey() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('/park.platform/userCenter/questionnaire', {
					keyword,
					parkId,
					pageNo,
					pageSize,
				}).then(res => {
					if(res.success && res.code === 200) {
						this.dataProject = res.result.records
						//          console.log(res.result.records)
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			myData() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('/park.platform/userCenter/questionnaireList', {
					keyword,
					parkId,
					pageNo,
					pageSize,
				}).then(res => {
					if(res.success && res.code === 200) {
						console.log(res.result)
						this.dataSurvey = res.result
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			open(row) {
				console.log(row)
				this.$router.push({
					name: 'survertDetail',
					query: row
				})
			}
		},
		created() {
			this.fetchSurvey()
			this.myData()
		}
	}
</script>