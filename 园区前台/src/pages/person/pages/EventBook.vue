<template>
	<div>
		<Tabs>
			<TabPane label="会议室预定">
				<Table border :columns="columns" :data="dataSource">
					<template slot-scope="{ row }" slot="reqDate">
						{{ row.begDate }} <br> - {{ row.endDate }}
					</template>
					<template slot-scope="{ row }" slot="eventName">
						{{ row.baseMeetingroom.roomName }}
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a type="primary" size="small" style="margin-right: 5px" @click="handleEdit('meeting', row)">编辑</a>
						<a size="small" @click="handleCancel('meeting', row)">取消</a>
					</template>
				</Table>
			</TabPane>
			<TabPane label="广告位预定">
				<Table border :columns="columns" :data="dataSource1">
					<template slot-scope="{ row }" slot="reqDate">
						{{ row.begDate }} <br> - {{ row.endDate }}
					</template>
					<template slot-scope="{ row }" slot="eventName">
						{{ row.advertsName }}
					</template>
					<template slot-scope="{ row, index }" slot="action">
						<a type="primary" size="small" style="margin-right: 5px" @click="handleEdit('ad', row)">编辑</a>
						<a size="small" @click="handleCancel('ad', row)">取消</a>
					</template>
				</Table>
			</TabPane>

			<!-- Edit -->
			<Modal v-model="modalRoom" title="预定会议室" @on-ok="ok">
				<Form :label-width="80" style="text-align: center;width: 90%;margin-top: 30px;" :model="rowData" ref="rowData">
					<FormItem label="名称">
						<Input disabled v-model="rowData.title"></Input>
					</FormItem>
					<FormItem label="预定时间">

						<DatePicker format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width: 46%;" v-model="rowData.begDate"></DatePicker>
						-
						<DatePicker format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width: 46%;" v-model="rowData.endDate"></DatePicker>
					</FormItem>
					<FormItem label="申请人">
						<Input></Input>
					</FormItem>
					<FormItem label="联系电话">
						<Input :placeholder=this.telephone v-model="rowData.telephone"></Input>
					</FormItem>
					<FormItem label="状态" prop="status_dictText">
						<Input></Input>
					</FormItem>
					<FormItem label="状态">
						<Input v-model="value17" maxlength="100" show-word-limit type="textarea" placeholder="" />
					</FormItem>
				</Form>
			</Modal>
			<!-- todo-->
			<Modal v-model="modalAd" title="预定广告位" @on-ok="ok1">
				<Form :label-width="80" style="text-align: center;width: 90%;margin-top: 30px;" :data="modaldata" ref="modaldata">
					<FormItem label="名称">
						<Input disabled v-model="modaldata.advertsName"></Input>
					</FormItem>
					<FormItem label="预定时间">
						<DatePicker format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width: 46%;" v-model="modaldata.begDate"></DatePicker>
						-
						<DatePicker format="yyyy-MM-dd HH:mm:ss" type="datetime" style="width: 46%;" v-model="modaldata.endDate"></DatePicker>
					</FormItem>
					<FormItem label="申请人">
						<Input></Input>
					</FormItem>
					<FormItem label="联系电话">
						<Input v-model="modaldata.telephone"></Input>
					</FormItem>
					<FormItem label="状态" prop="status_dictText">
						<Input></Input>
					</FormItem>
					<FormItem label="状态">
						<Input v-model="value17" maxlength="100" show-word-limit type="textarea" placeholder="" />
					</FormItem>
				</Form>
			</Modal>
		</Tabs>
	</div>
</template>

<script>
	import Mixin from '../mixin'
	import { getAction, deleteAction, postAction, putAction } from '@/api/manage'
	import qs from "querystring";
	import moment from "moment";

	export default {
		mixins: [Mixin],
		data() {
			return {
				columns: [{
						title: '序号',
						type: 'index',
						align: 'center',
						width: 80,
					},
					{
						title: '订单编号',
						key: 'requestId',
						align: 'center',
					},
					{
						title: '活动名称',
						slot: 'eventName',
						align: 'center',
					},
					{
						title: '订阅时间',
						slot: 'reqDate',
						align: 'center',
					},
					{
						title: '提交时间',
						key: 'createTime',
						align: 'center',
						width: 180
					},
					{
						title: '状态',
						key: 'status_dictText',
						align: 'center',
						width: 100
					},
					{
						title: '操作',
						slot: 'action',
						align: 'center',
						width: 150
					}
				],
				dataSource: [],
				dataSource1: [],
				modaldata: {
					begDate: 0,
					endDate: 0,
					requestId: '',
					parkId: '',
					advertId: '',
					advertsName: '',
				},
				// Modal
				modalRoom: false,
				modalAd: false,
				modalData: {},
				telephone: '',
				value17: '',
				rowData: {
					begDate: 0,
					endDate: 0,
					roomId: '',
					requestId: '',
					parkId: '',
					title: '',
					telephone: '',
				},
				requestId: '',
				form: {},
			}
		},
		methods: {
			fetchRoomRequest() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/meetingRoomRequestList', {
					keyword,
					parkId,
					pageNo,
					pageSize
				}).then(res => {
					if(res.success && res.code === 200) {
						this.dataSource = res.result.records
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			fetchAdRequest() {
				const {
					keyword,
					parkId,
					pageNo,
					pageSize
				} = this
				getAction('park.platform/userCenter/advertiseRequestList', {
					keyword,
					parkId,
					pageNo,
					pageSize
				}).then(res => {
					if(res.success && res.code === 200) {
						this.dataSource1 = res.result.records
						console.log(this.dataSource1)
					} else {
						this.$Message.error(res.message)
					}
				})
			},
			handleEdit(type, row) {
				if(type === 'ad') {
					this.modalAd = true
					console.log(row)
					this.modaldata.telephone = row.telephone
					this.modaldata.begDate = row.begDate
					this.modaldata.endDate = row.endDate
					this.modaldata.requestId = row.requestId
					this.modaldata.advertId = row.advertId
					this.modaldata.parkId = row.parkId
					this.modaldata.advertsName = row.advertsName
					console.log(this.modaldata)

				} else {
					this.modalRoom = true
					console.log(row)

					console.log('asd')

					console.log(row.begDate)
					this.rowData.begDate = row.begDate
					this.rowData.endDate = row.endDate
					console.log('asd')

					this.rowData.requestId = row.requestId //获取requestId
					console.log(this.rowData.requestId)

					this.rowData.title = row.baseMeetingroom.roomName

					this.telephone = row.telephone

					this.rowData.roomId = row.roomId //获取roomId
					this.rowData.parkId = row.parkId
					console.log(this.rowData.parkId)
					console.log(row.parkId)
					console.log(this.rowData)
				}
			},
			handleCancel(type, row) {
				let delAccount = row.requestId
				console.log(delAccount)
				deleteAction(`park.platform/userCenter/requestDelete?id=${delAccount}`).then(res => {
					if(res.success && res.code === 200) {
						console.log('asd')
						dataSource.splice(index, 1)
					} else {
						this.$Message.error(res.message)
					}
				})

			},
			ok(rowData) {
				this.rowData.begDate = moment(this.rowData.begDate).format("YYYY-MM-DD HH:mm:ss");
				this.rowData.endDate = moment(this.rowData.endDate).format("YYYY-MM-DD HH:mm:ss"); //更改时间格式
				console.log(this.rowData.begDate)

				rowData = qs.stringify(this.rowData)
				console.log(rowData)

				return new Promise((resolve, reject) => {
					putAction(`park.service/mgrMeetingroomRequest/edit`, rowData).then(res => {
						if(res.code == 200 && res.success) {
							console.log("表单提交成功！");
							this.$router.push({
								name: 'TenementAppealStep2'
							})
						} else {
							console.log(res.code);
						}
					})
				})
			},
			ok1() {
				this.modaldata.begDate = moment(this.modaldata.begDate).format("YYYY-MM-DD HH:mm:ss");
				this.modaldata.endDate = moment(this.modaldata.endDate).format("YYYY-MM-DD HH:mm:ss"); //更改时间格式
				console.log(this.modaldata.begDate)

				console.log(this.modaldata)

				let asd = qs.stringify(this.modaldata)
				console.log(asd)

				return new Promise((resolve, reject) => {
					putAction(`park.service/mgrAdvertsRequest/edit`, asd).then(res => {
						if(res.code == 200 && res.success) {
							console.log("表单提交成功！");

						} else {
							console.log(res.code);
						}
					})
				})
			},
			cancel() {
				this.$Message.info('您已取消更改');
			},
		},
		created() {
			this.fetchRoomRequest()
			this.fetchAdRequest()
		},
	}
</script>

<style>
	.person-index-box {
		.ivu-tabs {
			.ivu-tabs {
				color: red;
			}
		}
	}
</style>