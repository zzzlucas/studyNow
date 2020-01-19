<template>
	<div class="parking-apply-step1">
		<h1 class="title">公共设施</h1>
		<div class="schedule">
			<Steps :current="1" status="error">
				<Step title="填写施工企业备案登记表"></Step>
				<Step title="申请成功"></Step>
			</Steps>
		</div>
		<Form :model="form" ref="form" :rules="rulesPub">
			<div class="parking-apply-form">
				<p class="title">基本信息</p>
				<div class="parking-apply-form-body">
					<div class="form-box">
						<p class=""><span class="must">* </span> 企业名称：</p>
						<FormItem class="form-radio" prop="company">
							<Input v-model="form.company" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">* </span> 经办人：</p>
						<FormItem class="form-radio" prop="name">
							<Input v-model="form.name" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span> 联系方式:：</p>
						<FormItem class="form-radio" prop="phone">
							<Input v-model="form.phone" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span> 项目名称:：</p>
						<FormItem class="form-radio" prop="project">
							<Input v-model="form.project" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class="">
							<span class="must">*</span> 申请挖掘或占用期限:：</p>
						<div class="form-radio">
							<Row>
								<Col span="11">
								<FormItem prop="startDate">
									<DatePicker v-model="form.startDate" type="date" style="width: 100%"></DatePicker>
								</FormItem>
								</Col>
								<Col span="2" style="text-align: center;line-height: 32px;">至</Col>
								<Col span="11">
								<FormItem prop="endDate">
									<DatePicker v-model="form.endDate" type="date" style="width: 100%"></DatePicker>
								</FormItem>
								</Col>
							</Row>
						</div>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>附件：</p>
						<div class="form-radio">
							<div class="demo-upload-list" v-for="(item, key) in uploadList" :key="key">
								<template v-if="item.status === 'finished'">
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
									</div>
								</template>
								<template v-else>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<Upload
ref="upload"
:show-upload-list="false"
:default-file-list="defaultList"
:on-success="handleSuccess"
:format="['jpg','jpeg','png']"
:max-size="2048"
:on-format-error="handleFormatError"
:on-exceeded-size="handleMaxSize"
:before-upload="handleBeforeUpload"
multiple
type="drag"
action="//jsonplaceholder.typicode.com/posts/"
style="display: inline-block;width:100px;">
								<div style="width: 100px;height:100px;line-height: 100px;">
									<Icon type="ios-camera" size="20"></Icon>
								</div>
							</Upload>
							<Modal title="View Image" v-model="visible">
								<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
							</Modal>
						</div>

						<div class="form-radio">
							<p>注意：请先下载需要的表格，填写完毕并进行盖章后以图片或pdf形式进行上传。</p>
						</div>
						<div class="form-radio">
							<p>表格下载链接： <span style="color: red;">建筑垃圾处置申请备案表.doc</span></p>
						</div>
					</div>
					<Button class="next-btn" @click="next">暂存</Button>
					<Button type="error" class="next-btn" @click="next('form')">提交</Button>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
	import { getAction, putAction, postAction } from "@/api/manage";
	import qs from "querystring";
	import rules from "./rules.js";
	import moment from "moment";
	import { initDictOptions } from "@/api/dict";

	export default {
		name: 'TenementAppealStep1',
		data() {
			return {
				form: {
										name: '',
										company: '',
										project: '',
										phone: '',
										startDate: '',
										endDate: '',
				},
				rulesPub: rules,
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: []
			}
		},
		created(){
			this.form.startDate=moment().format("YYYY-MM-DD");
			this.form.endDate=moment().format("YYYY-MM-DD");
			console.log(this.form.startDate);
		},
		methods: {
			next(form) {
				this.$refs.form.validate(valid => {
					if(valid) {
						console.log(this.form)
						this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD");
						this.form.endDate = moment(this.form.endDate).format("YYYY-MM-DD");
						let formData = this.form;
						formData.parkId = "1193719771573518336";
						formData = qs.stringify(formData);
						console.log(formData)
						postAction("/workorder/mgrWorkorderInfo/add_1", formData).then(res => {
							if(res.code == 200 && res.success) {
								console.log("表单提交成功！");
								this.$router.push({
									name: 'TenementRepairsStep2'
								})
							} else {
								console.log(res.code);
							}
						})
					} else {
						this.$Message.error('Fail!');
					}
				})

				//				this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD");
				//				this.form.endDate = moment(this.form.endDate).format("YYYY-MM-DD");
				//				console.log(this.form)
				//
				//				return new Promise((resolve, reject) => {
				//					let formData = this.FormData
				//					formData.parkId = "12345789";
				//					formData = qs.stringify(formData);
				//					getAction("workorder/mgrWorkorderInfo/add_8", formData).then(res => {
				//						if(res.code == 200 && res.success) {
				//							console.log("表单提交成功！");
				//							this.$router.push({
				//								name: 'PublicFacilitiesStep2'
				//							})
				//						} else {
				//							console.log(res.code);
				//						}
				//					})
				//				})
				//    this.$router.push({name: 'PublicFacilitiesStep2'})
			},
			handleView(name) {
				this.imgName = name
				this.visible = true
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
			},
			handleSuccess(res, file) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
				file.name = '7eb99afb9d5f317c912f08b5212fd69a'
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				})
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				})
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5
				if(!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					})
				}
				return check
			}
		}
	}
</script>

<style lang="less">
	.parking-apply-step1 {
		margin: 100px auto;
		width: 95%;
		.title {
			text-align: left;
			font-size: 18px;
			border-bottom: 1px solid #eee;
			padding-bottom: 20px;
		}
		.schedule {
			width: 60%;
			margin: 30px auto 0;
			.ivu-steps-item {
				text-align: left;
				.ivu-steps-head-inner {
					border-color: #999999;
					.ivu-steps-icon {
						color: #999999;
					}
				}
			}
		}
		.parking-apply-form {
			text-align: left;
			width: 80%;
			margin: 30px auto 0;
			.title {
				color: #797979;
				font-weight: 500;
			}
			.parking-apply-form-body {
				width: 60%;
				margin: 30px auto 0;
				.form-box {
					margin-top: 30px;
					.form-radio {
						margin-top: 20px;
						.zj-radio {
							color: #999999;
						}
					}
					.must {
						color: red;
					}
				}
				.next-btn {
					margin-top: 30px;
					padding: 0 30px;
					height: 38px;
					line-height: 38px;
				}
			}
		}
	}
</style>