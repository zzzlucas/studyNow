<template>
	<a-card :bordered="false" class="new-question-list">
		<a-row>
			<a-col :span="4">
				<!--选择区域-->
				<div>
					<span>题目类型</span>
					</br>
					<div style="margin-top: 60px;">
						<a-button type="primary" style="margin: 10px;" @click="addOne">单项多选题</a-button>
						</br>
						<a-button type="primary" style="margin: 10px;" @click="addMany">多项多选题</a-button>
						</br>
						<a-button type="primary" style="margin: 10px;" @click="addContenct">简答题</a-button>
					</div>

				</div>
			</a-col>

			<a-col :span="20">
				<!--问题页面区域-->
				<div>
					<a-form :form="form">
						<div style="text-align: center;">
							<span style="font-size: 30px;">{{form.title}}</span>
						</div>
						<div style="text-align: center;margin-top: 20px;">
							<span style="font-size: 15px;">{{form.isAnonymous}}</span>
						</div>

						<div>
							<li v-for="(item,index) in list" :ref="'q' + index" :is="item.name" :key="index" @click="asd">

							</li>
						</div>

						<div style="text-align: center;margin-bottom: 0;">
							<a-button type="primary" style="margin: 10px;" @click="submit">提交</a-button>
							<a-button type="primary" style="margin: 10px;" @click="saveQuestion">暂存</a-button>
							<a-button type="primary" style="margin: 10px;" @click="cancel">取消</a-button>
						</div>
					</a-form>
				</div>
			</a-col>

		</a-row>
	</a-card>

</template>

<script>
	import rdio from './radio'
	import Cb from './checkBox'
	import tA from './textArea'
	import qs from "querystring";
	import { getAction, putAction, postAction } from '@/api/manage'
	import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'

	export default {
		name: 'addNewList',
		components: {
			rdio,
			Cb,
			tA
		},

		data() {
			return {
				list: [],
				flag: true,
				form: {},
				formD:[],
			}
		},
		methods: {
			addOne() {
				console.log('qwe')
				this.list.push({
					name: "rdio"
				});
			},
			addMany() {
				console.log('asd');
				this.list.push({
					name: "Cb"
				});
				console.log(this.list)
			},
			addContenct() {
				console.log('asd')
				this.list.push({
					name: "tA"
				});
			},
			asd() {
				console.log(index)
			},
			submit() {
				this.list.forEach((key, index) => {
					//					console.log(this.$refs['q' + index])
					let data = this.$refs['q' + index]
					//					console.log('qwxsdcrf')
					console.log(data)
					console.log(index)
					data.forEach(item => {
						console.log(item)
						console.log(item.form)
						this.formD.push(item.form)
					})
					//					data.forEach(it=>{
					//						console.log('asdqwe ')
					//						console.log(it)
					//						console.log(it.form)
					//						this.form.push(it.form)
					//					})
				})
				console.log(this.formD)
				
				this.form.questions=Array.from(this.formD)
				console.log(this.form)
//				console.log(this.form)
				this.updata();
			},
			updata() {
//				this.form.questions=Array.from(this.formD)
//				console.log(this.form)
//				let formData = JSON.stringify(this.form).replace(new RegExp("\\\\\"", "gm"), "")
//				JSON.stringify(this.listCase).replace(new RegExp("\\\\\"", "gm"), "")
//				JSON.stringify(this.form)
                
          
//              let fd = new FormData()
//              Object.keys(this.form).forEach(key => {
//              	let v = this.form[key]
//              	if (key === 'questions') {
//              		return
//              	}
//              	fd.append(key, v)
//              })
//              console.log(this.form.questions)
//              this.form.questions.forEach((item, i) => {
//              	if (item.data) {
//              		fd.append('questions[' + i + '].questionOption', item.data)
//              	}
//              
//              	fd.append('questions[' + i + '].questionTitle', item.title)
//              	fd.append('questions[' + i + '].questionType', item.quertionType)
//              })
//              fd.Status=1
                this.form.status=1
                
                let formData=this.form
//				formData=JSON.stringify(this.form)
//				formData=qs.stringify(formData)
//				let basic = formData.substr(0, formData.length -1);  
				postAction("questionnaire/mgrQuestionnaireInfo/add", formData).then(res => {
					if(res.code == 200 && res.success) {
						console.log("表单提交成功！");
						this.$router.push({
							path: '/enterprise-service/question-list/list'
						})
						window.opener = null;
						window.close()
					} else {
						console.log(res.code);
					}
				})
			},
			cancel() {
				this.$router.push({
					path: '/enterprise-service/question-list/list'
				})
				window.opener = null;
				window.close()
			},
			saveQuestion() {
				this.list.forEach((key, index) => {
					//					console.log(this.$refs['q' + index])
					let data = this.$refs['q' + index]
					//					console.log('qwxsdcrf')
					console.log(data)
					console.log(index)
					data.forEach(item => {
						console.log(item)
						console.log(item.form)
						this.formD.push(item.form)
					})
					//					data.forEach(it=>{
					//						console.log('asdqwe ')
					//						console.log(it)
					//						console.log(it.form)
					//						this.form.push(it.form)
					//					})
				})
				console.log(this.formD)
				
				this.form.questions=Array.from(this.formD)
				console.log(this.form)
//				console.log(this.form)
				this.updata1();
			},
			updata1(){
				 this.form.status=0
                
                let formData=this.form
//				formData=JSON.stringify(this.form)
//				formData=qs.stringify(formData)
//				let basic = formData.substr(0, formData.length -1);  
				postAction("questionnaire/mgrQuestionnaireInfo/add", formData).then(res => {
					if(res.code == 200 && res.success) {
						console.log("表单提交成功！");
						this.$router.push({
							path: '/enterprise-service/question-list/list'
						})
						window.opener = null;
						window.close()
					} else {
						console.log(res.code);
					}
				})
			},
			asd() {
				console.log(index)
			}
		},
		created() {
			console.log(this.$route.query.form)
			this.form = this.$route.query.form
		}
	}
</script>

<style>

</style>