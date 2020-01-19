<template>
	<div class="parking-apply-step1">
		<h1 class="title">填写停车位申请单</h1>
		<div class="schedule">
			<Steps :current="1" status="error">
				<Step title="填写停车位申请单"></Step>
				<Step title="提交成功"></Step>
			</Steps>
		</div>
		<Form :model="form" :rules="rulesPark" ref="form">
			<div class="parking-apply-form">
				<p class="title">基本信息</p>
				<div class="parking-apply-form-body">
					<div class="form-box">
						<p class=""><span class="must">* </span> 使用开始时间：</p>
						<FormItem prop="startTime">
<!--							<DatePicker type="date" style="width: 100%" v-model="form.startDate"></DatePicker>-->
                                <DatePicker v-model="form.startTime" type="date" style="width: 100%"></DatePicker>
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">* </span> 使用结束时间：</p>
						<FormItem class="form-radio" prop="endTime">
<!--							<DatePicker type="date" style="width: 100%" v-model="form.endDate"></DatePicker>-->
                                <DatePicker v-model="form.endTime" type="date" style="width: 100%"></DatePicker>
						</FormItem>
					</div>
					<div class="form-box">
						<p class=""><span class="must">*</span> 需求描述:：</p>
						<FormItem class="form-radio" prop="describe">
							<Input v-model="form.describe" maxlength="300" show-word-limit type="textarea" :rows="5" />
						</FormItem>
					</div>

				</div>
			</div>
			<div class="parking-apply-form">
				<p class="title">联系信息</p>
				<div class="parking-apply-form-body">
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
		name: 'TenementAppealStep1',
		data() {
			return {
				form: {
					      startDate: 0,
					      endDate: 0,
					      describe: '',
					      name: '',
					      company: '',
					      email: '',
					      phone: ''
				},
				rulesPark:rules,
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
                    if (valid) {
                    this.form.startDate = moment(this.form.startDate).format("YYYY-MM-DD");
				    this.form.endDate = moment(this.form.endDate).format("YYYY-MM-DD");
                    let formData = this.form;
					formData.parkId = "1193719771573518336";
					formData = qs.stringify(formData);
					console.log(formData)
                    postAction("/workorder/mgrWorkorderInfo/add_4", formData).then(res => {
							if(res.code == 200 && res.success) {
								console.log("表单提交成功！");
								this.$router.push({
									name: 'ParkingApplyStep2'
								})
							} else {
								console.log(res.code);
							}
						})
                    } else {
                        this.$Message.error('请填写必填项!');
                    }
               })
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