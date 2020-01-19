<template>
	<div class="tenement-repairs-step1">
		<h1 class="title">物业报修</h1>
		<div class="schedule">
			<Steps :current="0" status="error">
				<Step title="填写报修申请单"></Step>
				<Step title="申请成功"></Step>
			</Steps>
		</div>
		<Form :model="form" :rules="rulesTenement" ref="form">
			<div class="basic-repairs-form" >
				<p class="title">基本信息</p>
				<div class="basic-repairs-form-body">
					<div class="form-box">
						<p class=""><span class="must">*</span>自用部分：</p>
						<div class="form-radio">
							<RadioGroup v-model="form.type">
								<Radio label="空调"></Radio>
								<Radio label="电路"></Radio>
								<p style="margin-top: 30px;"><span class="must">*</span>公用部分</p>
								<Radio label="电梯" style="margin-top: 20px;"></Radio>
								<Radio label="消防" style="margin-top: 20px;"></Radio>
							</RadioGroup>
						</div>
					</div>
				</div>
			</div>
			<div class="tenement-repairs-form">
				<p class="title">基本信息</p>
				<div class="tenement-repairs-form-body">
					<div class="form-box">
						<p class=""><span class="must">*</span>产品种类：</p>
						<FormItem class="form-radio" prop="type">
							<Input v-model="form.type" disabled />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>报修地址：</p>
						<FormItem class="form-radio" prop="site">
							<Input v-model="form.site" />
						</FormItem>
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
style="display: inline-block;width:58px;">
								<div style="width: 58px;height:58px;line-height: 58px;">
									<Icon type="ios-camera" size="20"></Icon>
								</div>
							</Upload>
							<Modal title="View Image" v-model="visible">
								<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
							</Modal>
						</div>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>问题描述：</p>
						<FormItem class="form-radio" prop="describe">
							<Input v-model="form.describe" maxlength="300" show-word-limit type="textarea" :rows="5" />
						</FormItem>
					</div>
				</div>
			</div>
			<div class="tenement-repairs-form">
				<p class="title">联系信息</p>
				<div class="tenement-repairs-form-body">
					<div class="form-box">
						<p class=""><span class="must">*</span>联系人：</p>
						<FormItem class="form-radio" prop="name">
							<Input v-model="form.name" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>公司/企业：</p>
						<FormItem class="form-radio" prop="company">
							<Input v-model="form.company" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>联系邮箱：</p>
						<FormItem class="form-radio" prop="email">
							<Input v-model="form.email" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>手机号码：</p>
						<FormItem class="form-radio" prop="phone">
							<Input v-model="form.phone" />
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span>联系地址：</p>
						<FormItem class="form-radio" prop="relationSite">
							<Input v-model="form.relationSite" />
						</FormItem>
					</div>
					<Button type="error" class="next-btn" @click="next('form')">下一步</Button>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
	import { getAction, putAction, postAction } from "@/api/manage";
	import rules from "./rules.js";
	import qs from "querystring";
	import moment from "moment";
	import { initDictOptions } from "@/api/dict";

	export default {
		name: 'TenementRepairsstep1',
		data() {
			return {
				form: {},
				rulesTenement: rules,
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
			}
		},
		methods: {
			next(form) {
				this.$refs.form.validate(valid => {
					if(valid) {
						this.$Message.success('Success!');
						console.log(this.form)
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
						this.$Message.error('请填写必填项!');
					}
					//					let formDate=this.form
					//					formData.parkId = "1193719771573518336";
					//					formData = qs.stringify(formData);
					//					console.log(formData)

				})

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
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList
		}
	}
</script>

<style lang="less">
	.tenement-repairs-step1 {
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
		.tenement-repairs-form {
			text-align: left;
			width: 80%;
			margin: 30px auto 0;
			.title {
				color: #797979;
				font-weight: 500;
			}
			.tenement-repairs-form-body {
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
				}
				.next-btn {
					margin-top: 30px;
					padding: 0 30px;
					height: 38px;
					line-height: 38px;
				}
			}
		}
		.basic-repairs-form {
			text-align: left;
			width: 80%;
			margin: 30px auto 0;
			.title {
				color: #797979;
				font-weight: 500;
			}
			.basic-repairs-form-body {
				width: 60%;
				margin: 30px auto 0;
				.form-box {
					margin-top: 30px;
					.form-radio {
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>